'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  PaginationState,
  VisibilityState,
  RowSelectionState,
} from '@tanstack/react-table';
import { Dialog, Switch } from '@headlessui/react';
import { Exchange } from '../types/exchange';
import { exchanges } from '../data/exchanges';
import { formatCellValue, getPlaceholderColor, getSortComparison, calculateDiscountedFee } from '../utils/tableHelpers';
import IncidentBadge from './IncidentBadge';
import Tooltip from './Tooltip';
import TableTooltip from './TableTooltip';
import {
  PreviewLinkCard,
  PreviewLinkCardTrigger,
  PreviewLinkCardContent,
  PreviewLinkCardImage,
} from '@/components/animate-ui/components/radix/preview-link-card';

type FilterType = 'features' | 'fees' | 'security';

// Rank assignment function - placeholder ranks
const getExchangeRank = (exchangeName: string): number => {
  const rankMap: Record<string, number> = {
    'Kraken Pro': 1,
    'Binance': 2,
    'AscendEx': 3,
  };
  
  if (rankMap[exchangeName]) {
    return rankMap[exchangeName];
  }
  
  const allExchanges = exchanges.map(e => e.app_name);
  const rankedExchanges = ['Kraken Pro', 'Binance', 'AscendEx'];
  const unrankedExchanges = allExchanges.filter(name => !rankedExchanges.includes(name));
  
  const index = unrankedExchanges.indexOf(exchangeName);
  return index >= 0 ? index + 4 : 999;
};

// Column definitions matching your live site
const columnDefinitions = {
  features: [
    { key: 'app_name', label: 'Name' },
    { key: 'coins', label: '# of Coins' },
    { key: 'number_of_futures', label: '# of Futures' },
    { key: 'max_leverage', label: 'Max Leverage' },
    { key: 'fiat_currencies', label: 'Fiat Currencies' },
    { key: 'margin_spot', label: 'Max Margin (spot)' },
    { key: 'copy_trading', label: 'Copy Trading' },
    { key: 'trading_bots', label: 'Trading Bots' },
    { key: 'p2p_trading', label: 'P2P Trading' },
    { key: 'staking_or_earn', label: 'Staking or Earn' },
    { key: 'mobile_app', label: 'Mobile App' },
    { key: '247_support', label: '24/7 Support' },
  ],
  fees: [
    { key: 'app_name', label: 'Name' },
    { key: 'maker_fee', label: 'Maker Fee' },
    { key: 'taker_fee', label: 'Taker Fee' },
    { key: 'futures_maker_fee', label: 'Futures Maker Fee' },
    { key: 'futures_taker_fee', label: 'Futures Taker Fee' },
    { key: 'rankfi_discount', label: 'RankFi Discount' },
    { key: 'rankfi_bonus', label: 'RankFi Bonus' },
  ],
  security: [
    { key: 'app_name', label: 'Name' },
    { key: 'founded', label: 'Founded' },
    { key: 'number_of_users', label: '# of Users' },
    { key: 'proof_of_reserves', label: 'Proof of Reserves' },
    { key: 'uses_cold_storage', label: 'Uses Cold Storage' },
    { key: 'insurance_policy', label: 'Insurance Policy' },
    { key: 'hacks_or_incidents', label: 'Hacks' },
    { key: 'other_incidents', label: 'Other Incidents' },
    { key: '2fa', label: '2FA' },
    { key: 'kyc', label: 'KYC' },
    { key: 'publicly_traded', label: 'Publicly Traded' },
    { key: 'headquarters', label: 'Headquarters' },
  ],
};

// Helper to render name cell with logo
const renderNameCell = (exchange: Exchange) => {
  const placeholderColor = getPlaceholderColor(exchange.app_name);

  return (
    <div className="flex items-center">
      <div
        className="w-5 h-5 rounded mr-2 shrink-0"
        style={{ backgroundColor: placeholderColor }}
      />
      <a
        href={`/cex/${exchange.app_name.toLowerCase().replace(/\s+/g, '-')}/`}
        className="text-black font-bold hover:underline"
      >
        {exchange.app_name}
      </a>
    </div>
  );
};

// Toggle switch component using Headless UI
const ToggleSwitch = ({ 
  enabled, 
  onChange, 
  disabled = false 
}: { 
  enabled: boolean; 
  onChange: () => void;
  disabled?: boolean;
}) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Switch
        checked={enabled}
        onChange={onChange}
        disabled={disabled}
        className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white ${
          enabled ? 'bg-[#00a38f]' : 'bg-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className="sr-only">Toggle discount</span>
        <span
          className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </Switch>
    </div>
  );
};

// Custom sorting function for rank
const rankSortingFn = (rowA: any, rowB: any, columnId: string) => {
  const rankA = getExchangeRank(rowA.original.app_name);
  const rankB = getExchangeRank(rowB.original.app_name);
  if (rankA < rankB) return -1;
  if (rankA > rankB) return 1;
  return 0;
};

// Custom sorting function using existing helper
// Note: TanStack handles direction, so we always sort ascending here
const customSortingFn = (rowA: any, rowB: any, columnId: string) => {
  const exchangeA = rowA.original as Exchange;
  const exchangeB = rowB.original as Exchange;
  const sortComparison = getSortComparison(columnId, 'asc');
  return sortComparison(exchangeA, exchangeB);
};

export default function ComparisonTable() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('features');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'rank', desc: false }]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25, // Default to 25 rows
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [comparisonApplied, setComparisonApplied] = useState(false);
  const [compareDropdownOpen, setCompareDropdownOpen] = useState(false);
  const [columnVisibilityModalOpen, setColumnVisibilityModalOpen] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const compareDropdownRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  
  // Region selector state
  const [selectedRegion, setSelectedRegion] = useState<string>('global');
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const regionDropdownRef = useRef<HTMLDivElement>(null);
  
  // Discount toggle state
  const [discountToggleEnabled, setDiscountToggleEnabled] = useState(false);
  
  const regions = [
    { id: 'global', label: '🌎 Global', url: '' },
    { id: 'canada', label: '🇨🇦 Canada', url: '' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        compareDropdownRef.current &&
        !compareDropdownRef.current.contains(event.target as Node)
      ) {
        setCompareDropdownOpen(false);
      }
      if (
        regionDropdownRef.current &&
        !regionDropdownRef.current.contains(event.target as Node)
      ) {
        setRegionDropdownOpen(false);
      }
    };

    if (compareDropdownOpen || regionDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [compareDropdownOpen, regionDropdownOpen]);

  const filters = [
    { id: 'features' as FilterType, label: 'Features' },
    { id: 'fees' as FilterType, label: 'Fees' },
    { id: 'security' as FilterType, label: 'Security' },
  ];

  // Build TanStack columns based on active filter
  const columns = useMemo<ColumnDef<Exchange>[]>(() => {
    const baseColumns: ColumnDef<Exchange>[] = [
      // Rank column
      {
        id: 'rank',
        header: '#',
        enableSorting: true,
        enableHiding: true,
        accessorFn: (row) => getExchangeRank(row.app_name),
        sortingFn: rankSortingFn,
        cell: ({ row }) => (
          <div className="text-center">{getExchangeRank(row.original.app_name)}</div>
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
      },
    ];

    const filterColumns = columnDefinitions[activeFilter];
    
    // Add columns based on active filter
    filterColumns.forEach((col) => {
      const isNameColumn = col.key === 'app_name';
      const isHacksColumn = col.key === 'hacks_or_incidents';
      const isIncidentsColumn = col.key === 'other_incidents';
      const isProofOfReservesColumn = col.key === 'proof_of_reserves';
      const isInsurancePolicyColumn = col.key === 'insurance_policy';
      const isDiscountColumn = col.key === 'rankfi_discount';
      const isFeeColumn = ['maker_fee', 'taker_fee', 'futures_maker_fee', 'futures_taker_fee'].includes(col.key);

      const columnDef: ColumnDef<Exchange> = {
        id: col.key,
        accessorKey: col.key,
        header: col.label,
        enableSorting: true,
        sortingFn: col.key === 'rank' ? rankSortingFn : customSortingFn,
        cell: ({ row }) => {
          const exchange = row.original;
          
          if (isNameColumn) {
            return <div className="text-left">{renderNameCell(exchange)}</div>;
          } else if (isDiscountColumn) {
            const discountValue = exchange.rankfi_discount || 'N/A';
            const discountText = discountValue !== 'N/A' ? `${discountValue} Discount` : 'N/A';
            return (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <ToggleSwitch
                    enabled={discountToggleEnabled}
                    onChange={() => setDiscountToggleEnabled(!discountToggleEnabled)}
                  />
                  <span className="text-[13px]">{discountText}</span>
                  <TableTooltip
                    content="This discount applies to trading fees when enabled via the toggle."
                    position="bottom"
                    variant="default"
                    zIndex={9999}
                  >
                    <svg
                      className="w-4 h-4 text-gray-400 cursor-help"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </TableTooltip>
                </div>
              </div>
            );
          } else if (isFeeColumn) {
            const originalFee = formatCellValue(exchange[col.key as keyof Exchange]);
            if (discountToggleEnabled && exchange.rankfi_discount) {
              const discountedFee = calculateDiscountedFee(originalFee, exchange.rankfi_discount);
              return (
                <div className="text-center">
                  <span>{discountedFee}</span>
                </div>
              );
            }
            return <div className="text-center">{originalFee}</div>;
          } else if (isHacksColumn) {
            return (
              <div className="text-center">
                <IncidentBadge
                  value={String(exchange.hacks_or_incidents || 'No')}
                  url={exchange.hacks_or_incidents_url}
                  type="hack"
                />
              </div>
            );
          } else if (isIncidentsColumn) {
            return (
              <div className="text-center">
                <IncidentBadge
                  value={String(exchange.other_incidents || 'No')}
                  url={exchange.other_incidents_url}
                  type="incident"
                />
              </div>
            );
          } else if (isProofOfReservesColumn) {
            const rawValue = exchange.proof_of_reserves;
            const value = formatCellValue(rawValue);
            const url = exchange.proof_of_reserves_url;
            const shouldBeLink = (rawValue === true || rawValue === 'Yes') && url;
            
            if (shouldBeLink) {
              return (
                <div className="text-center">
                  <PreviewLinkCard href={url}>
                    <PreviewLinkCardTrigger
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00a38f] hover:underline"
                    >
                      {value}
                    </PreviewLinkCardTrigger>
                    <PreviewLinkCardContent 
                      side="top" 
                      align="center" 
                      sideOffset={8}
                      className="p-0 bg-white border border-gray-200 shadow-xl max-w-xs overflow-hidden"
                      style={{ zIndex: 99999 }}
                    >
                      <div className="relative">
                        <PreviewLinkCardImage 
                          alt="Link preview" 
                          className="w-full h-auto max-h-32 object-cover"
                        />
                        <div className="p-3 bg-white border-t border-gray-200">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-900 truncate">
                                {new URL(url).hostname.replace('www.', '')}
                              </p>
                              <p className="text-xs text-gray-500 truncate mt-0.5">
                                {url.length > 50 ? `${url.substring(0, 50)}...` : url}
                              </p>
                            </div>
                            <svg 
                              className="w-4 h-4 text-gray-400 flex-shrink-0" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </PreviewLinkCardContent>
                  </PreviewLinkCard>
                </div>
              );
            } else {
              return <div className="text-center">{value}</div>;
            }
          } else if (isInsurancePolicyColumn) {
            const rawValue = exchange.insurance_policy;
            const value = formatCellValue(rawValue);
            const url = exchange.insurance_policy_url;
            const shouldBeLink = (rawValue !== false && rawValue !== 'No' && rawValue !== 'no') && url;
            
            if (shouldBeLink) {
              return (
                <div className="text-center">
                  <PreviewLinkCard href={url}>
                    <PreviewLinkCardTrigger
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00a38f] hover:underline"
                    >
                      {value}
                    </PreviewLinkCardTrigger>
                    <PreviewLinkCardContent 
                      side="top" 
                      align="center" 
                      sideOffset={8}
                      className="p-0 bg-white border border-gray-200 shadow-xl max-w-xs overflow-hidden"
                      style={{ zIndex: 99999 }}
                    >
                      <div className="relative">
                        <PreviewLinkCardImage 
                          alt="Link preview" 
                          className="w-full h-auto max-h-32 object-cover"
                        />
                        <div className="p-3 bg-white border-t border-gray-200">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-900 truncate">
                                {new URL(url).hostname.replace('www.', '')}
                              </p>
                              <p className="text-xs text-gray-500 truncate mt-0.5">
                                {url.length > 50 ? `${url.substring(0, 50)}...` : url}
                              </p>
                            </div>
                            <svg 
                              className="w-4 h-4 text-gray-400 flex-shrink-0" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </PreviewLinkCardContent>
                  </PreviewLinkCard>
                </div>
              );
            } else {
              return <div className="text-center">{value}</div>;
            }
          } else {
            return <div className="text-center">{formatCellValue(exchange[col.key as keyof Exchange])}</div>;
          }
        },
        size: isNameColumn ? 175 : undefined,
        minSize: isNameColumn ? 175 : undefined,
        maxSize: isNameColumn ? 175 : undefined,
      };

      baseColumns.push(columnDef);
    });

    // Add Website column
    baseColumns.push({
      id: 'website',
      header: 'Website',
      enableSorting: false,
      cell: ({ row }) => {
        const exchange = row.original;
        return (
          <div className="text-center">
            {exchange.website ? (
              <PreviewLinkCard href={exchange.website}>
                <PreviewLinkCardTrigger
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00a38f] hover:underline"
                >
                  Visit →
                </PreviewLinkCardTrigger>
                <PreviewLinkCardContent 
                  side="top" 
                  align="center" 
                  sideOffset={8}
                  className="p-0 bg-white border border-gray-200 shadow-xl max-w-xs overflow-hidden"
                  style={{ zIndex: 99999 }}
                >
                  <div className="relative">
                    <PreviewLinkCardImage 
                      alt="Website preview" 
                      className="w-full h-auto max-h-32 object-cover"
                    />
                    <div className="p-3 bg-white border-t border-gray-200">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {new URL(exchange.website).hostname.replace('www.', '')}
                          </p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {exchange.website.length > 50 ? `${exchange.website.substring(0, 50)}...` : exchange.website}
                          </p>
                        </div>
                        <svg 
                          className="w-4 h-4 text-gray-400 flex-shrink-0" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </PreviewLinkCardContent>
              </PreviewLinkCard>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </div>
        );
      },
    });

    return baseColumns;
  }, [activeFilter, discountToggleEnabled]);

  // Filter exchanges based on comparison mode (using TanStack row selection)
  const filteredExchanges = useMemo(() => {
    if (comparisonApplied && Object.keys(rowSelection).length > 0) {
      const selectedNames = Object.keys(rowSelection).filter(key => rowSelection[key]);
      return exchanges.filter((exchange) =>
        selectedNames.includes(exchange.app_name)
      );
    }
    return exchanges;
  }, [comparisonApplied, rowSelection]);


  // Reset to page 1 when filter changes
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const table = useReactTable({
    data: filteredExchanges,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
    getRowId: (row) => row.app_name,
    manualSorting: false,
    manualPagination: false,
  });

  // Comparison feature handlers (using TanStack row selection)
  const handleCompareButtonClick = () => {
    if (comparisonApplied) {
      setComparisonApplied(false);
      setRowSelection({});
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    } else {
      setCompareDropdownOpen(!compareDropdownOpen);
    }
  };

  const handleExchangeToggle = (exchangeName: string) => {
    const selectedCount = Object.values(rowSelection).filter(Boolean).length;
    if (rowSelection[exchangeName]) {
      // Deselect
      setRowSelection((prev) => {
        const newSelection = { ...prev };
        delete newSelection[exchangeName];
        return newSelection;
      });
    } else {
      // Select (max 7)
      if (selectedCount < 7) {
        setRowSelection((prev) => ({
          ...prev,
          [exchangeName]: true,
        }));
      }
    }
  };

  const handleApplyComparison = () => {
    const selectedCount = Object.values(rowSelection).filter(Boolean).length;
    if (selectedCount > 0) {
      setComparisonApplied(true);
      setCompareDropdownOpen(false);
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  };

  // Use TanStack's filtered row model for dropdown
  const filteredExchangesForDropdown = table.getFilteredRowModel().rows.map(row => row.original);

  // Pagination helpers
  const totalPages = table.getPageCount();
  const currentPage = pagination.pageIndex + 1;
  const startIndex = pagination.pageIndex * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const totalRows = filteredExchanges.length;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const total = totalPages;
    const current = currentPage;

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < total - 1) {
        pages.push('...');
      }

      pages.push(total);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      table.setPageIndex(page - 1);
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    table.setPageSize(value);
    table.setPageIndex(0);
  };

  // Infinite scroll handler
  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

      if (isNearBottom && !loadingMore && !comparisonApplied) {
        const currentPageSize = pagination.pageSize;
        const totalRows = filteredExchanges.length;
        
        if (currentPageSize < totalRows) {
          setLoadingMore(true);
          // Load 10 more rows
          setTimeout(() => {
            table.setPageSize(Math.min(currentPageSize + 10, totalRows));
            setLoadingMore(false);
          }, 300);
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [pagination.pageSize, loadingMore, comparisonApplied, filteredExchanges.length, table]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      {/* Filter Buttons and Compare */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
        <div className="flex flex-wrap gap-3">
          {/* Region Selector */}
          <div className="relative" ref={regionDropdownRef}>
            <button
              onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
              className="px-5 py-2 rounded-lg text-[13px] font-normal transition-colors cursor-pointer bg-[#f0f0f0] text-black hover:bg-[#e0e0e0]"
            >
              {regions.find(r => r.id === selectedRegion)?.label || '🌎 Global'}
            </button>
            
            {regionDropdownOpen && (
              <div
                className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-md z-50"
                onClick={(e) => e.stopPropagation()}
              >
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => {
                      setSelectedRegion(region.id);
                      setRegionDropdownOpen(false);
                      if (region.url) {
                        // window.location.href = region.url;
                      }
                    }}
                    className={`${
                      selectedRegion === region.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                    } w-full text-left px-4 py-2 text-[13px] text-gray-700 transition-colors`}
                  >
                    {region.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-5 py-2 rounded-lg text-[13px] font-normal transition-colors cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-[#2d2d2d] text-white'
                  : 'bg-[#f0f0f0] text-black hover:bg-[#e0e0e0]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Column Visibility Button */}
          <button
            onClick={() => setColumnVisibilityModalOpen(true)}
            className="px-3 py-2 rounded-lg text-[13px] font-normal transition-colors cursor-pointer bg-[#f0f0f0] text-black hover:bg-[#e0e0e0]"
            title="Column Visibility"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>

          {/* Compare Button */}
        <div className="relative" ref={compareDropdownRef}>
          <button
            onClick={handleCompareButtonClick}
            className={`px-5 py-2 rounded-lg text-[13px] font-normal transition-colors cursor-pointer flex items-center gap-2 ${
              comparisonApplied
                ? 'bg-[#2d2d2d] text-white'
                : 'bg-[#f0f0f0] text-black hover:bg-[#e0e0e0]'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            {comparisonApplied ? 'Clear Filter' : 'Compare'}
            {Object.values(rowSelection).filter(Boolean).length > 0 && (
              <span className="ml-1">({Object.values(rowSelection).filter(Boolean).length})</span>
            )}
          </button>

          {/* Compare Dropdown */}
          {compareDropdownOpen && !comparisonApplied && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#eaeaea] rounded-lg shadow-lg z-50 p-4" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                placeholder="Search exchanges..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full px-3 py-2 mb-3 border border-[#eaeaea] rounded text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a38f]"
              />

              <div className="max-h-60 overflow-y-auto mb-3">
                {filteredExchangesForDropdown.map((exchange) => {
                  const isSelected = rowSelection[exchange.app_name] === true;
                  const selectedCount = Object.values(rowSelection).filter(Boolean).length;
                  return (
                    <div
                      key={exchange.app_name}
                      className="flex items-center gap-2 py-2 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleExchangeToggle(exchange.app_name)}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleExchangeToggle(exchange.app_name)}
                        disabled={!isSelected && selectedCount >= 7}
                        className="cursor-pointer"
                      />
                      <span className="text-[13px] text-gray-900 flex-1">
                        {exchange.app_name}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleApplyComparison}
                disabled={Object.values(rowSelection).filter(Boolean).length === 0}
                className="w-full px-4 py-2 bg-[#2d2d2d] text-white rounded text-[13px] font-medium hover:bg-[#3a3a3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply ({Object.values(rowSelection).filter(Boolean).length}/7)
              </button>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Column Visibility Modal */}
      <Dialog open={columnVisibilityModalOpen} onClose={() => setColumnVisibilityModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <Dialog.Title className="text-lg font-semibold mb-4">Column Visibility</Dialog.Title>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {table.getAllColumns()
                .filter(column => column.getCanHide() && column.id !== 'app_name' && column.id !== 'website')
                .map((column) => (
                  <label key={column.id} className="flex items-center gap-2 py-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={() => column.toggleVisibility()}
                      className="cursor-pointer"
                    />
                    <span className="text-[13px] text-gray-900">
                      {column.id === 'rank' 
                        ? 'Ranking'
                        : typeof column.columnDef.header === 'string' 
                        ? column.columnDef.header 
                        : column.id}
                    </span>
                  </label>
                ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  table.getAllColumns().forEach(col => {
                    if (col.getCanHide() && col.id !== 'app_name' && col.id !== 'website') {
                      col.toggleVisibility(true);
                    }
                  });
                }}
                className="px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                Show All
              </button>
              <button
                onClick={() => setColumnVisibilityModalOpen(false)}
                className="px-4 py-2 bg-[#2d2d2d] text-white rounded text-[13px] font-medium hover:bg-[#3a3a3a] transition-colors"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Table */}
      <div className="bg-white rounded border border-[#eaeaea]">
        <div 
          ref={tableContainerRef}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse">
          <thead className="sticky top-0 z-40 overflow-visible">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-[#2d2d2d]" style={{ height: '48px' }}>
                {headerGroup.headers.map((header, idx) => {
                  const isRankColumn = header.id === 'rank';
                  const isNameColumn = header.id === 'app_name';
                  const isHacksColumn = header.id === 'hacks_or_incidents';
                  const isIncidentsColumn = header.id === 'other_incidents';
                  const canSort = header.column.getCanSort();
                  const sortDirection = header.column.getIsSorted();
                  
                  return (
                    <th
                      key={header.id}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={`text-xs font-semibold text-white tracking-wider border border-[#eaeaea] ${
                        canSort ? 'cursor-pointer hover:bg-[#3a3a3a]' : ''
                      } transition-colors relative overflow-visible ${
                        isRankColumn
                          ? 'sticky left-0 z-30 bg-[#2d2d2d] px-1 py-3 text-center'
                          : isNameColumn
                          ? 'sticky left-[40px] z-20 bg-[#2d2d2d] px-2 py-3'
                          : 'px-2 py-3'
                      }`}
                      style={{
                        height: '48px',
                        ...(isRankColumn && {
                          width: '40px',
                          minWidth: '40px',
                          maxWidth: '40px',
                          boxShadow: '2px 0 8px 0 rgba(0,0,0,0.15)',
                        }),
                        ...(isNameColumn && {
                          width: '175px',
                          minWidth: '175px',
                          maxWidth: '175px',
                          boxShadow: '2px 0 4px -2px rgba(0,0,0,0.15)',
                        }),
                        ...((isHacksColumn || isIncidentsColumn) && {
                          minWidth: '120px',
                          width: 'auto',
                        }),
                      }}
                    >
                      <div className={`flex items-center ${isNameColumn ? 'justify-start' : 'justify-center'}`}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sortDirection && (
                          <span className="ml-1 text-[10px]">
                            {sortDirection === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr 
                  key={row.id} 
                  className="group bg-white hover:bg-[#f0f0f0] transition-colors duration-75 border-b border-[#eaeaea]"
                  data-exchange-name={row.original.app_name}
                >
                  {row.getVisibleCells().map((cell, idx) => {
                    const isRankColumn = cell.column.id === 'rank';
                    const isNameColumn = cell.column.id === 'app_name';
                    const isHacksColumn = cell.column.id === 'hacks_or_incidents';
                    const isIncidentsColumn = cell.column.id === 'other_incidents';
                    
                    return (
                      <td
                        key={cell.id}
                        className={`whitespace-nowrap text-[13px] border border-[#eaeaea] transition-colors duration-75 ${
                          isRankColumn
                            ? 'sticky left-0 z-20 bg-white group-hover:!bg-[#f0f0f0] px-1 py-1.5 text-center'
                            : isNameColumn
                            ? 'sticky left-[40px] z-10 bg-white group-hover:!bg-[#f0f0f0] px-2 py-1.5'
                            : 'px-2 py-1.5'
                        }`}
                        style={{
                          ...(isRankColumn && {
                            width: '40px',
                            minWidth: '40px',
                            maxWidth: '40px',
                            boxShadow: '2px 0 8px 0 rgba(0,0,0,0.15)',
                            color: '#000000',
                          }),
                          ...(isNameColumn && {
                            width: '175px',
                            minWidth: '175px',
                            maxWidth: '175px',
                            boxShadow: '2px 0 4px -2px rgba(0,0,0,0.15)',
                            color: '#000000',
                          }),
                          ...((isHacksColumn || isIncidentsColumn) && {
                            minWidth: '120px',
                            width: 'auto',
                          }),
                          ...(!isRankColumn && !isNameColumn && {
                            color: '#000000',
                          }),
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {loadingMore && (
          <div className="text-center py-4 text-[13px] text-gray-600">
            Loading more exchanges...
          </div>
        )}
        </div>
      </div>

      {/* Pagination Footer */}
      {!comparisonApplied && (
        <div className="flex justify-between items-center mt-4 px-2 flex-wrap gap-4">
          {/* Exchange Count */}
          <div className="text-[13px] text-gray-600">
            Showing {startIndex + 1} - {Math.min(endIndex, totalRows)} out of {totalRows}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-1 border border-[#eaeaea] bg-white rounded text-[12px] text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, idx) => {
                if (page === '...') {
                  return (
                    <span key={`ellipsis-${idx}`} className="px-1 text-gray-500 text-[12px]">
                      ...
                    </span>
                  );
                }
                const pageNum = page as number;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-2 py-1 border border-[#eaeaea] rounded text-[12px] transition-colors ${
                      currentPage === pageNum
                        ? 'bg-[#2d2d2d] text-white border-[#2d2d2d]'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-2 py-1 border border-[#eaeaea] bg-white rounded text-[12px] text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>

          {/* Items Per Page Dropdown */}
          <div className="flex items-center gap-2 text-[13px] text-gray-600">
            <span>Show</span>
            <select
              value={pagination.pageSize}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="px-2 py-1.5 border border-[#eaeaea] rounded bg-white text-[13px] text-gray-700 cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

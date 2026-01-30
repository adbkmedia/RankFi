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
  ColumnPinningState,
  Row,
} from '@tanstack/react-table';
import { Switch } from '@headlessui/react';
import { TableFilters, CompareDropdown, ColumnVisibilityModal, TablePagination } from './components';
import { getExchanges, Exchange } from '../../data';
import { formatCellValue, getPlaceholderColor, getSortComparison, calculateDiscountedFee } from '../../utils/tableHelpers';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { useClickOutside } from '@/hooks/useClickOutside';
import IncidentBadge from '../IncidentBadge';
import TableTooltip from '../TableTooltip';
import { LinkPreviewCell } from '../LinkPreviewCell';
import {
  COLUMN_WIDTHS,
  HEADER_HEIGHT,
  STICKY_SHADOW,
  FilterType,
  columnDefinitions,
  getExchangeRank,
} from './constants';
import { Z_INDEX } from '../../constants/zIndex';

// Helper to render name cell with logo
const renderNameCell = (exchange: Exchange) => {
  const placeholderColor = getPlaceholderColor(exchange.app_name);

  return (
    <div className="flex items-center overflow-hidden">
      <div
        className="w-5 h-5 rounded mr-2 shrink-0"
        style={{ backgroundColor: placeholderColor }}
      />
      <a
        href={`/cex/${exchange.app_name.toLowerCase().replace(/\s+/g, '-')}/`}
        className="text-black font-bold hover:underline truncate block whitespace-nowrap"
        style={{ maxWidth: 'calc(175px - 30px)' }}
        title={exchange.app_name}
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
          enabled ? 'bg-rankfi-teal' : 'bg-gray-300'
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
const rankSortingFn = (rowA: Row<Exchange>, rowB: Row<Exchange>, _columnId: string) => {
  const rankA = getExchangeRank(rowA.original.app_name);
  const rankB = getExchangeRank(rowB.original.app_name);
  if (rankA < rankB) return -1;
  if (rankA > rankB) return 1;
  return 0;
};

// Custom sorting function using existing helper
const customSortingFn = (rowA: Row<Exchange>, rowB: Row<Exchange>, columnId: string) => {
  const exchangeA = rowA.original;
  const exchangeB = rowB.original;
  const sortComparison = getSortComparison(columnId, 'asc');
  return sortComparison(exchangeA, exchangeB);
};

export default function ComparisonTable() {
  // Get exchange data (memoized - will be replaced with async fetch for Airtable)
  const exchanges = useMemo(() => getExchanges(), []);

  const [activeFilter, setActiveFilter] = useState<FilterType>('features');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'rank', desc: false }]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
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
  
  const [selectedRegion, setSelectedRegion] = useState<string>('global');
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const regionDropdownRef = useRef<HTMLDivElement>(null);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const [discountToggleEnabled, setDiscountToggleEnabled] = useState(false);
  
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ['rank', 'app_name', 'sticky_shadow'],
  });
  
  const canScrollHorizontally = useHorizontalScroll(tableContainerRef);

  // Close dropdowns when clicking outside
  useClickOutside(compareDropdownRef, () => setCompareDropdownOpen(false), compareDropdownOpen);
  useClickOutside(regionDropdownRef, () => setRegionDropdownOpen(false), regionDropdownOpen);
  useClickOutside(mobileMenuRef, () => setMobileMenuOpen(false), mobileMenuOpen);

  // Build TanStack columns based on active filter
  const columns = useMemo<ColumnDef<Exchange>[]>(() => {
    const baseColumns: ColumnDef<Exchange>[] = [
      {
        id: 'rank',
        header: '#',
        enableSorting: true,
        enableHiding: true,
        enablePinning: true,
        accessorFn: (row) => getExchangeRank(row.app_name),
        sortingFn: rankSortingFn,
        cell: ({ row }) => (
          <div className="text-center">{getExchangeRank(row.original.app_name)}</div>
        ),
        size: COLUMN_WIDTHS.rank,
        minSize: COLUMN_WIDTHS.rank,
        maxSize: COLUMN_WIDTHS.rank,
      },
    ];

    // Add shadow column after sticky columns (will be inserted after app_name)
    // This column has 0 width - the shadow is rendered via absolute positioning
    const shadowColumn: ColumnDef<Exchange> = {
      id: 'sticky_shadow',
      header: () => null,
      enableSorting: false,
      enableHiding: false,
      enablePinning: true,
      cell: () => null,
      size: 0,
      minSize: 0,
      maxSize: 0,
    };

    const filterColumns = columnDefinitions[activeFilter];
    
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
        enablePinning: isNameColumn,
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
            const displayFee = discountToggleEnabled && exchange.rankfi_discount
              ? calculateDiscountedFee(originalFee, exchange.rankfi_discount)
              : originalFee;
            const isSpotFeeColumn = ['maker_fee', 'taker_fee'].includes(col.key);

            return (
              <div className="text-center flex items-center justify-center gap-1">
                <span>{displayFee}</span>
                {exchange.uses_spread_fee && isSpotFeeColumn && (
                  <TableTooltip
                    content="This exchange uses spread-based pricing instead of fixed fees. Spread fees are typically higher and vary based on market conditions."
                    position="top"
                    variant="default"
                  >
                    <span className="inline-flex items-center justify-center w-[15px] h-[15px] bg-red-500 text-white text-[10px] font-bold rounded cursor-help">
                      S
                    </span>
                  </TableTooltip>
                )}
              </div>
            );
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
                  <LinkPreviewCell url={url} label={value} />
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
                  <LinkPreviewCell url={url} label={value} />
                </div>
              );
            } else {
              return <div className="text-center">{value}</div>;
            }
          } else {
            const hasTruncation = col.maxSize && !['uses_cold_storage', 'publicly_traded'].includes(col.key);
            const cellValue = formatCellValue(exchange[col.key as keyof Exchange]);
            return (
              <div
                className={`text-center ${hasTruncation ? 'truncate overflow-hidden text-ellipsis whitespace-nowrap' : ''}`}
                title={hasTruncation ? cellValue : undefined}
              >
                {cellValue}
              </div>
            );
          }
        },
        size: col.size || (isNameColumn ? COLUMN_WIDTHS.name : undefined),
        minSize: col.minSize || (isNameColumn ? COLUMN_WIDTHS.name : undefined),
        maxSize: col.maxSize || (isNameColumn ? COLUMN_WIDTHS.name : undefined),
      };
      baseColumns.push(columnDef);

      // Insert shadow column right after the name column
      if (isNameColumn) {
        baseColumns.push(shadowColumn);
      }
    });

    baseColumns.push({
      id: 'website',
      header: 'Website',
      enableSorting: false,
      cell: ({ row }) => {
        const exchange = row.original;
        return (
          <div className="text-center">
            {exchange.website ? (
              <LinkPreviewCell url={exchange.website} label="Visit →" />
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </div>
        );
      },
    });

    return baseColumns;
  }, [activeFilter, discountToggleEnabled]);

  const filteredExchanges = useMemo(() => {
    if (comparisonApplied && Object.keys(rowSelection).length > 0) {
      const selectedNames = Object.keys(rowSelection).filter(key => rowSelection[key]);
      return exchanges.filter((exchange) =>
        selectedNames.includes(exchange.app_name)
      );
    }
    return exchanges;
  }, [comparisonApplied, rowSelection]);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    // Don't reset pagination - keep user on same page
    // Clamping to max page is handled by TanStack Table automatically
  };

  const table = useReactTable({
    data: filteredExchanges,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableColumnPinning: true,
    state: {
      sorting,
      pagination,
      columnVisibility,
      rowSelection,
      globalFilter,
      columnPinning,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnPinningChange: setColumnPinning,
    enableRowSelection: true,
    getRowId: (row) => row.app_name,
    manualSorting: false,
    manualPagination: false,
  });

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
      setRowSelection((prev) => {
        const newSelection = { ...prev };
        delete newSelection[exchangeName];
        return newSelection;
      });
    } else {
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

  // Memoize filtered exchanges for dropdown to prevent unnecessary recalculations
  const filteredExchangesForDropdown = useMemo(
    () => table.getFilteredRowModel().rows.map(row => row.original),
    [table.getFilteredRowModel().rows]
  );
  const totalRows = filteredExchanges.length;

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
        <TableFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          regionDropdownOpen={regionDropdownOpen}
          setRegionDropdownOpen={setRegionDropdownOpen}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          regionDropdownRef={regionDropdownRef}
          mobileMenuRef={mobileMenuRef}
        />

        <CompareDropdown
          comparisonApplied={comparisonApplied}
          compareDropdownOpen={compareDropdownOpen}
          rowSelection={rowSelection}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          onCompareButtonClick={handleCompareButtonClick}
          onExchangeToggle={handleExchangeToggle}
          onApplyComparison={handleApplyComparison}
          filteredExchanges={filteredExchangesForDropdown}
          compareDropdownRef={compareDropdownRef}
          onOpenColumnVisibilityModal={() => setColumnVisibilityModalOpen(true)}
        />
      </div>

      {/* Column Visibility Modal */}
      <ColumnVisibilityModal
        open={columnVisibilityModalOpen}
        onClose={() => setColumnVisibilityModalOpen(false)}
        table={table}
      />

      {/* Table */}
      <div className="bg-white rounded-none sm:rounded overflow-hidden -mx-4 sm:mx-0">
        <div ref={tableContainerRef} className="overflow-x-auto" style={{ paddingLeft: 0, marginLeft: 0 }}>
          <table className="w-full" style={{ marginLeft: 0, paddingLeft: 0, borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead className="sticky top-0" style={{ height: `${HEADER_HEIGHT}px`, display: 'table-header-group', zIndex: Z_INDEX.tableHeader }}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-[#2d2d2d]" style={{ height: `${HEADER_HEIGHT}px`, display: 'table-row', boxSizing: 'border-box' }}>
                  {headerGroup.headers.map((header) => {
                    const isRankColumn = header.id === 'rank';
                    const isNameColumn = header.id === 'app_name';
                    const isShadowColumn = header.id === 'sticky_shadow';
                    const isHacksColumn = header.id === 'hacks_or_incidents';
                    const isIncidentsColumn = header.id === 'other_incidents';
                    const isWrappableColumn = ['uses_cold_storage', 'publicly_traded'].includes(header.id);
                    const canSort = header.column.getCanSort();
                    const sortDirection = header.column.getIsSorted();
                    const isPinned = header.column.getIsPinned();
                    const pinnedIndex = header.column.getPinnedIndex();

                    // Shadow column - renders as continuous vertical shadow indicator
                    if (isShadowColumn) {
                      return (
                        <th
                          key={header.id}
                          className="p-0 border-0"
                          style={{
                            position: 'sticky',
                            left: `${COLUMN_WIDTHS.stickyTotal}px`,
                            width: 0,
                            minWidth: 0,
                            maxWidth: 0,
                            padding: 0,
                            zIndex: Z_INDEX.stickyColumnName + 1,
                            overflow: 'visible',
                          }}
                        >
                          {canScrollHorizontally && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                width: '8px',
                                background: 'linear-gradient(to right, rgba(0,0,0,0.08), rgba(0,0,0,0.02) 50%, transparent)',
                                pointerEvents: 'none',
                              }}
                            />
                          )}
                        </th>
                      );
                    }

                    // Custom sort handler: only toggle between asc and desc (no unsorted state)
                    const handleSort = canSort ? () => {
                      const currentSort = header.column.getIsSorted();
                      if (currentSort === 'asc') {
                        header.column.toggleSorting(true); // set to desc
                      } else {
                        header.column.toggleSorting(false); // set to asc
                      }
                    } : undefined;

                    return (
                      <th
                        key={header.id}
                        data-column-id={header.id}
                        onClick={handleSort}
                        className={`text-xs font-medium text-white tracking-wider border-b border-gray-700 align-middle ${
                          canSort ? 'cursor-pointer hover:bg-[#3a3a3a]' : ''
                        } transition-colors relative ${
                          isPinned === 'left' ? 'bg-[#2d2d2d]' : ''
                        } ${
                          isRankColumn ? 'px-1 text-center' : isNameColumn ? 'px-2 text-left' : 'px-2 text-center'
                        }`}
                        style={{
                          height: `${HEADER_HEIGHT}px`,
                          minHeight: `${HEADER_HEIGHT}px`,
                          maxHeight: `${HEADER_HEIGHT}px`,
                          verticalAlign: 'middle',
                          paddingTop: '6px',
                          paddingBottom: '6px',
                          overflow: 'hidden',
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                          boxSizing: 'border-box',
                          lineHeight: '1.2',
                          ...(isPinned === 'left' && {
                            position: 'sticky',
                            left: pinnedIndex === 0 ? 0 : pinnedIndex === 1 ? `${COLUMN_WIDTHS.rank}px` : undefined,
                            zIndex: isRankColumn ? Z_INDEX.stickyColumnRank : isNameColumn ? Z_INDEX.stickyColumnName : Z_INDEX.stickyColumn,
                          }),
                          ...(isRankColumn && {
                            width: `${COLUMN_WIDTHS.rank}px`,
                            minWidth: `${COLUMN_WIDTHS.rank}px`,
                            maxWidth: `${COLUMN_WIDTHS.rank}px`,
                            marginLeft: '-1px',
                          }),
                          ...(isNameColumn && {
                            width: `${COLUMN_WIDTHS.name}px`,
                            minWidth: `${COLUMN_WIDTHS.name}px`,
                            maxWidth: `${COLUMN_WIDTHS.name}px`,
                            paddingRight: '12px',
                          }),
                          ...((isHacksColumn || isIncidentsColumn) && { minWidth: '120px', width: 'auto' }),
                          ...(header.column.columnDef.minSize && !isRankColumn && !isNameColumn && !isHacksColumn && !isIncidentsColumn && {
                            minWidth: `${header.column.columnDef.minSize}px`,
                            width: 'auto',
                          }),
                          ...(header.column.columnDef.maxSize && !isRankColumn && !isNameColumn && !isHacksColumn && !isIncidentsColumn && !isWrappableColumn && {
                            maxWidth: `${header.column.columnDef.maxSize}px`,
                            width: 'auto',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }),
                          ...(header.column.columnDef.maxSize && !isRankColumn && !isNameColumn && !isHacksColumn && !isIncidentsColumn && isWrappableColumn && {
                            maxWidth: `${header.column.columnDef.maxSize}px`,
                            width: 'auto',
                          }),
                        }}
                      >
                        <div className={`flex items-center ${isNameColumn ? 'justify-start' : 'justify-center'} relative w-full`}>
                          {canSort && (
                            <span
                              className="text-[#999] absolute"
                              style={{ fontSize: '7px', opacity: sortDirection ? 1 : 0, left: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                            >
                              {sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '▲'}
                            </span>
                          )}
                          <span className={isNameColumn ? 'text-left pl-4' : 'text-center w-full'}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="group bg-white hover:bg-[#f0f0f0] transition-colors duration-75 border-b border-gray-100" data-exchange-name={row.original.app_name}>
                  {row.getVisibleCells().map((cell) => {
                    const isRankColumn = cell.column.id === 'rank';
                    const isNameColumn = cell.column.id === 'app_name';
                    const isShadowColumn = cell.column.id === 'sticky_shadow';
                    const isHacksColumn = cell.column.id === 'hacks_or_incidents';
                    const isIncidentsColumn = cell.column.id === 'other_incidents';
                    const isWrappableColumn = ['uses_cold_storage', 'publicly_traded'].includes(cell.column.id);
                    const isPinned = cell.column.getIsPinned();
                    const pinnedIndex = cell.column.getPinnedIndex();

                    // Shadow column - renders as continuous vertical shadow indicator
                    if (isShadowColumn) {
                      return (
                        <td
                          key={cell.id}
                          className="p-0 border-0"
                          style={{
                            position: 'sticky',
                            left: `${COLUMN_WIDTHS.stickyTotal}px`,
                            width: 0,
                            minWidth: 0,
                            maxWidth: 0,
                            padding: 0,
                            zIndex: Z_INDEX.stickyColumnBody + 1,
                            overflow: 'visible',
                          }}
                        >
                          {canScrollHorizontally && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                width: '8px',
                                background: 'linear-gradient(to right, rgba(0,0,0,0.08), rgba(0,0,0,0.02) 50%, transparent)',
                                pointerEvents: 'none',
                              }}
                            />
                          )}
                        </td>
                      );
                    }
                    
                    return (
                      <td
                        key={cell.id}
                        data-column-id={cell.column.id}
                        className={`text-[13px] border-r border-b border-[#eaeaea] transition-colors duration-75 align-middle ${
                          isPinned === 'left' ? 'bg-white group-hover:bg-[#f0f0f0]' : ''
                        } ${
                          isRankColumn ? 'px-1 py-1.5 text-center whitespace-nowrap'
                            : isNameColumn ? 'px-2 py-1.5 overflow-hidden'
                            : isWrappableColumn ? 'px-2 py-1.5 overflow-hidden'
                            : 'px-2 py-1.5 whitespace-nowrap overflow-hidden text-ellipsis'
                        }`}
                        style={{
                          verticalAlign: 'middle',
                          ...(isPinned === 'left' && {
                            position: 'sticky',
                            left: pinnedIndex === 0 ? 0 : pinnedIndex === 1 ? `${COLUMN_WIDTHS.rank}px` : undefined,
                            zIndex: isRankColumn ? Z_INDEX.stickyColumnBodyRank : isNameColumn ? Z_INDEX.stickyColumnBodyName : Z_INDEX.stickyColumnBody,
                          }),
                          ...(isRankColumn && {
                            width: `${COLUMN_WIDTHS.rank}px`,
                            minWidth: `${COLUMN_WIDTHS.rank}px`,
                            maxWidth: `${COLUMN_WIDTHS.rank}px`,
                            color: '#000000',
                            marginLeft: '-1px',
                          }),
                          ...(isNameColumn && {
                            width: `${COLUMN_WIDTHS.name}px`,
                            minWidth: `${COLUMN_WIDTHS.name}px`,
                            maxWidth: `${COLUMN_WIDTHS.name}px`,
                            color: '#000000',
                            overflow: 'hidden',
                            paddingRight: '12px',
                          }),
                          ...((isHacksColumn || isIncidentsColumn) && { minWidth: '120px', width: 'auto' }),
                          ...(cell.column.columnDef.minSize && !isRankColumn && !isNameColumn && !isHacksColumn && !isIncidentsColumn && {
                            minWidth: `${cell.column.columnDef.minSize}px`,
                            width: 'auto',
                          }),
                          ...(cell.column.columnDef.maxSize && !isRankColumn && !isNameColumn && !isHacksColumn && !isIncidentsColumn && !isWrappableColumn && {
                            maxWidth: `${cell.column.columnDef.maxSize}px`,
                            width: 'auto',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }),
                          ...(cell.column.columnDef.maxSize && !isRankColumn && !isNameColumn && !isHacksColumn && !isIncidentsColumn && isWrappableColumn && {
                            maxWidth: `${cell.column.columnDef.maxSize}px`,
                            width: 'auto',
                          }),
                          ...(!isRankColumn && !isNameColumn && { color: '#000000' }),
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {loadingMore && (
            <div className="text-center py-4 text-[13px] text-gray-600">Loading more exchanges...</div>
          )}
        </div>
      </div>

      {/* Pagination Footer */}
      {!comparisonApplied && (
        <TablePagination
          table={table}
          pagination={pagination}
          totalRows={totalRows}
        />
      )}
    </div>
  );
}

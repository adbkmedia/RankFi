'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Exchange } from '../types/exchange';
import { exchanges } from '../data/exchanges';
import { formatCellValue, getPlaceholderColor, getSortComparison } from '../utils/tableHelpers';
import IncidentBadge from './IncidentBadge';
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
  
  // If exchange has a specific rank, return it
  if (rankMap[exchangeName]) {
    return rankMap[exchangeName];
  }
  
  // For other exchanges, assign sequential ranks starting from 4
  // We'll use a simple hash-based approach to assign consistent ranks
  const allExchanges = exchanges.map(e => e.app_name);
  const rankedExchanges = ['Kraken Pro', 'Binance', 'AscendEx'];
  const unrankedExchanges = allExchanges.filter(name => !rankedExchanges.includes(name));
  
  // Find index in unranked list and add 4
  const index = unrankedExchanges.indexOf(exchangeName);
  return index >= 0 ? index + 4 : 999; // Default to 999 if not found
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
      {/* Placeholder logo - will be replaced with actual images later */}
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

type SortState = {
  column: string;
  direction: 'asc' | 'desc';
};

export default function ComparisonTable() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('features');
  const [sortState, setSortState] = useState<SortState>({
    column: 'rank',
    direction: 'asc',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [selectedExchanges, setSelectedExchanges] = useState<Set<string>>(new Set());
  const [comparisonApplied, setComparisonApplied] = useState(false);
  const [compareDropdownOpen, setCompareDropdownOpen] = useState(false);
  const [compareSearchTerm, setCompareSearchTerm] = useState('');
  const compareDropdownRef = useRef<HTMLDivElement>(null);
  
  // Region selector state
  const [selectedRegion, setSelectedRegion] = useState<string>('global');
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const regionDropdownRef = useRef<HTMLDivElement>(null);
  
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

  const columns = columnDefinitions[activeFilter];

  // Handle header click for sorting
  const handleSort = (columnKey: string) => {
    setSortState((prev) => {
      if (prev.column === columnKey) {
        // Toggle direction if same column
        return {
          column: columnKey,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        // New column, set to ascending
        return {
          column: columnKey,
          direction: 'asc',
        };
      }
    });
  };

  // Sort exchanges based on current sort state
  const sortedExchanges = useMemo(() => {
    // Handle rank sorting separately
    if (sortState.column === 'rank') {
      const directionMultiplier = sortState.direction === 'asc' ? 1 : -1;
      return [...exchanges].sort((a, b) => {
        const rankA = getExchangeRank(a.app_name);
        const rankB = getExchangeRank(b.app_name);
        return directionMultiplier * (rankA - rankB);
      });
    }
    const sortComparison = getSortComparison(sortState.column, sortState.direction);
    return [...exchanges].sort(sortComparison);
  }, [sortState]);

  // Reset to page 1 when filter changes
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  // Filter exchanges based on comparison mode
  const filteredExchanges = useMemo(() => {
    if (comparisonApplied && selectedExchanges.size > 0) {
      return sortedExchanges.filter((exchange) =>
        selectedExchanges.has(exchange.app_name)
      );
    }
    return sortedExchanges;
  }, [sortedExchanges, comparisonApplied, selectedExchanges]);

  // Calculate pagination (only show if comparison not applied)
  const totalPages = Math.ceil(filteredExchanges.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExchanges = comparisonApplied
    ? filteredExchanges
    : filteredExchanges.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const total = totalPages;
    const current = currentPage;

    if (total <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Show pages around current
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

      // Always show last page
      pages.push(total);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Comparison feature handlers
  const handleCompareButtonClick = () => {
    if (comparisonApplied) {
      // Clear comparison
      setComparisonApplied(false);
      setSelectedExchanges(new Set());
      setCurrentPage(1);
    } else {
      // Toggle dropdown
      setCompareDropdownOpen(!compareDropdownOpen);
    }
  };

  const handleExchangeToggle = (exchangeName: string) => {
    setSelectedExchanges((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(exchangeName)) {
        newSet.delete(exchangeName);
      } else {
        if (newSet.size < 7) {
          newSet.add(exchangeName);
        }
      }
      return newSet;
    });
  };

  const handleApplyComparison = () => {
    if (selectedExchanges.size > 0) {
      setComparisonApplied(true);
      setCompareDropdownOpen(false);
      setCurrentPage(1);
    }
  };

  // Filter exchanges for dropdown search
  const filteredExchangesForDropdown = useMemo(() => {
    if (!compareSearchTerm) return sortedExchanges;
    const term = compareSearchTerm.toLowerCase();
    return sortedExchanges.filter((exchange) =>
      exchange.app_name.toLowerCase().includes(term)
    );
  }, [sortedExchanges, compareSearchTerm]);

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
            
            {/* Region Dropdown - Variation 5 style (no checkmark) */}
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
                      // URL handling will be implemented later
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
            {selectedExchanges.size > 0 && (
              <span className="ml-1">({selectedExchanges.size})</span>
            )}
          </button>

          {/* Compare Dropdown */}
          {compareDropdownOpen && !comparisonApplied && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#eaeaea] rounded-lg shadow-lg z-50 p-4" onClick={(e) => e.stopPropagation()}>
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search exchanges..."
                value={compareSearchTerm}
                onChange={(e) => setCompareSearchTerm(e.target.value)}
                className="w-full px-3 py-2 mb-3 border border-[#eaeaea] rounded text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a38f]"
              />

              {/* Exchange List */}
              <div className="max-h-60 overflow-y-auto mb-3">
                {filteredExchangesForDropdown.map((exchange) => {
                  const isSelected = selectedExchanges.has(exchange.app_name);
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
                        disabled={!isSelected && selectedExchanges.size >= 7}
                        className="cursor-pointer"
                      />
                      <span className="text-[13px] text-gray-900 flex-1">
                        {exchange.app_name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Apply Button */}
              <button
                onClick={handleApplyComparison}
                disabled={selectedExchanges.size === 0}
                className="w-full px-4 py-2 bg-[#2d2d2d] text-white rounded text-[13px] font-medium hover:bg-[#3a3a3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply ({selectedExchanges.size}/7)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded border border-[#eaeaea]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#2d2d2d]">
              {/* Rank Column Header */}
              <th
                onClick={() => handleSort('rank')}
                className="text-xs font-semibold text-white tracking-wider border-t border-b border-l border-[#eaeaea] cursor-pointer hover:bg-[#3a3a3a] transition-colors relative sticky left-0 z-30 bg-[#2d2d2d] px-1 py-3 text-center"
                style={{
                  height: '48px',
                  width: '40px',
                  minWidth: '40px',
                  maxWidth: '40px',
                  boxShadow: '2px 0 8px 0 rgba(0,0,0,0.15)',
                }}
              >
                <div className="flex items-center justify-center">
                  <span>#</span>
                  {sortState.column === 'rank' && (
                    <span className="ml-0.5 text-[10px]">
                      {sortState.direction === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </div>
              </th>
              {columns.map((column) => {
                const isSorted = sortState.column === column.key;
                const isAsc = sortState.direction === 'asc';
                const isFirstColumn = column.key === 'app_name';
                const isHacksColumn = column.key === 'hacks_or_incidents';
                const isIncidentsColumn = column.key === 'other_incidents';
                return (
                  <th
                    key={column.key}
                    onClick={() => handleSort(column.key)}
                    className={`text-xs font-semibold text-white tracking-wider border border-[#eaeaea] cursor-pointer hover:bg-[#3a3a3a] transition-colors relative ${
                      isFirstColumn
                        ? 'sticky left-[40px] z-20 bg-[#2d2d2d] px-2 py-3'
                        : 'px-2 py-3'
                    }`}
                    style={{
                      height: '48px',
                      ...(isFirstColumn && {
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
                    <div className={`flex items-center ${isFirstColumn ? 'justify-start' : 'justify-center'}`}>
                      <span>{column.label}</span>
                      {isSorted && (
                        <span className="ml-1 text-[10px]">
                          {isAsc ? '▲' : '▼'}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
              <th
                className="px-2 py-3 text-xs font-semibold text-white tracking-wider border border-[#eaeaea] text-center"
                style={{ height: '48px' }}
              >
                Website
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedExchanges.map((exchange, idx) => (
              <tr key={idx} className="group bg-white hover:bg-[#f0f0f0] transition-colors duration-75 border-b border-[#eaeaea]">
                {/* Rank Column Cell */}
                <td
                  className="sticky left-0 z-20 bg-white group-hover:!bg-[#f0f0f0] px-1 py-1.5 whitespace-nowrap text-[13px] border-t border-b border-l border-[#eaeaea] transition-colors duration-75 text-center"
                  style={{
                    width: '40px',
                    minWidth: '40px',
                    maxWidth: '40px',
                    boxShadow: '2px 0 8px 0 rgba(0,0,0,0.15)',
                    color: '#000000',
                  }}
                >
                  {getExchangeRank(exchange.app_name)}
                </td>
                {columns.map((column) => {
                  const isFirstColumn = column.key === 'app_name';
                  const isHacksColumn = column.key === 'hacks_or_incidents';
                  const isIncidentsColumn = column.key === 'other_incidents';
                  const isProofOfReservesColumn = column.key === 'proof_of_reserves';
                  const isInsurancePolicyColumn = column.key === 'insurance_policy';
                  
                  // Determine cell content
                  let cellContent;
                  if (isFirstColumn) {
                    cellContent = <div className="text-left">{renderNameCell(exchange)}</div>;
                  } else if (isHacksColumn) {
                    cellContent = (
                      <div className="text-center">
                        <IncidentBadge
                          value={String(exchange.hacks_or_incidents || 'No')}
                          url={exchange.hacks_or_incidents_url}
                          type="hack"
                        />
                      </div>
                    );
                  } else if (isIncidentsColumn) {
                    cellContent = (
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
                      cellContent = (
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
                      cellContent = <div className="text-center">{value}</div>;
                    }
                  } else if (isInsurancePolicyColumn) {
                    const rawValue = exchange.insurance_policy;
                    const value = formatCellValue(rawValue);
                    const url = exchange.insurance_policy_url;
                    const shouldBeLink = (rawValue !== false && rawValue !== 'No' && rawValue !== 'no') && url;
                    
                    if (shouldBeLink) {
                      cellContent = (
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
                      cellContent = <div className="text-center">{value}</div>;
                    }
                  } else {
                    cellContent = <div className="text-center">{formatCellValue(exchange[column.key as keyof Exchange])}</div>;
                  }
                  
                  return (
                    <td
                      key={column.key}
                      className={`whitespace-nowrap text-[13px] border border-[#eaeaea] transition-colors duration-75 ${
                        isFirstColumn
                          ? 'sticky left-[40px] z-10 bg-white group-hover:!bg-[#f0f0f0] px-2 py-1.5'
                          : 'px-2 py-1.5'
                      }`}
                      style={{
                        ...(isFirstColumn && {
                          width: '175px',
                          minWidth: '175px',
                          maxWidth: '175px',
                          boxShadow: '2px 0 4px -2px rgba(0,0,0,0.15)',
                        }),
                        ...((isHacksColumn || isIncidentsColumn) && {
                          minWidth: '120px',
                          width: 'auto',
                        }),
                        color: '#000000',
                      }}
                    >
                      {cellContent}
                    </td>
                  );
                })}
                <td
                  className="px-2 py-1.5 whitespace-nowrap text-[13px] border border-[#eaeaea] text-center"
                  style={{ color: '#000000' }}
                >
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {!comparisonApplied && (
        <div className="flex justify-between items-center mt-4 px-2 flex-wrap gap-4">
        {/* Exchange Count */}
        <div className="text-[13px] text-gray-600">
          Showing {startIndex + 1} - {Math.min(endIndex, sortedExchanges.length)} out of {sortedExchanges.length}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 border border-[#eaeaea] bg-white rounded text-[13px] text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ←
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, idx) => {
              if (page === '...') {
                return (
                  <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
                    ...
                  </span>
                );
              }
              const pageNum = page as number;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1.5 border border-[#eaeaea] rounded text-[13px] transition-colors ${
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
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 border border-[#eaeaea] bg-white rounded text-[13px] text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            →
          </button>
        </div>

        {/* Items Per Page Dropdown */}
        <div className="flex items-center gap-2 text-[13px] text-gray-600">
          <span>Show</span>
          <select
            value={itemsPerPage}
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

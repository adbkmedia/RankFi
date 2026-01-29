'use client';

import { RefObject } from 'react';
import { RowSelectionState } from '@tanstack/react-table';
import { Exchange } from '../../../types/exchange';

interface CompareDropdownProps {
  comparisonApplied: boolean;
  compareDropdownOpen: boolean;
  rowSelection: RowSelectionState;
  globalFilter: string;
  setGlobalFilter: (filter: string) => void;
  onCompareButtonClick: () => void;
  onExchangeToggle: (exchangeName: string) => void;
  onApplyComparison: () => void;
  filteredExchanges: Exchange[];
  compareDropdownRef: RefObject<HTMLDivElement | null>;
  onOpenColumnVisibilityModal: () => void;
}

export function CompareDropdown({
  comparisonApplied,
  compareDropdownOpen,
  rowSelection,
  globalFilter,
  setGlobalFilter,
  onCompareButtonClick,
  onExchangeToggle,
  onApplyComparison,
  filteredExchanges,
  compareDropdownRef,
  onOpenColumnVisibilityModal,
}: CompareDropdownProps) {
  const selectedCount = Object.values(rowSelection).filter(Boolean).length;

  return (
    <div className="flex items-center gap-2">
      {/* Column Visibility Button */}
      <button
        onClick={onOpenColumnVisibilityModal}
        className="px-3 py-2 rounded-lg text-[13px] font-normal transition-colors cursor-pointer bg-[#f0f0f0] text-black hover:bg-[#e0e0e0]"
        title="Column Visibility"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </button>

      {/* Compare Button */}
      <div className="relative" ref={compareDropdownRef}>
        <button
          onClick={onCompareButtonClick}
          className={`px-5 py-2 rounded-lg text-[13px] font-normal transition-colors cursor-pointer flex items-center gap-2 ${
            comparisonApplied
              ? 'bg-[#2d2d2d] text-white'
              : 'bg-[#f0f0f0] text-black hover:bg-[#e0e0e0]'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {comparisonApplied ? 'Clear Filter' : 'Compare'}
          {selectedCount > 0 && (
            <span className="ml-1">({selectedCount})</span>
          )}
        </button>

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
              {filteredExchanges.map((exchange) => {
                const isSelected = rowSelection[exchange.app_name] === true;
                return (
                  <div
                    key={exchange.app_name}
                    className="flex items-center gap-2 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => onExchangeToggle(exchange.app_name)}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onExchangeToggle(exchange.app_name)}
                      disabled={!isSelected && selectedCount >= 7}
                      className="cursor-pointer"
                    />
                    <span className="text-[13px] text-gray-900 flex-1">{exchange.app_name}</span>
                  </div>
                );
              })}
            </div>
            <button
              onClick={onApplyComparison}
              disabled={selectedCount === 0}
              className="w-full px-4 py-2 bg-[#2d2d2d] text-white rounded text-[13px] font-medium hover:bg-[#3a3a3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply ({selectedCount}/7)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

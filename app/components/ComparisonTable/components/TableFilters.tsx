'use client';

import { RefObject } from 'react';
import { TabGroup, TabList, Tab } from '@headlessui/react';
import { FilterType, regions, filters } from '../constants';

interface TableFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  regionDropdownOpen: boolean;
  setRegionDropdownOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  regionDropdownRef: RefObject<HTMLDivElement | null>;
  mobileMenuRef: RefObject<HTMLDivElement | null>;
  customViewColumnsCount: number;
  onCustomEditClick: () => void;
}

// Pencil icon SVG component
const PencilIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

// Plus icon SVG component
const PlusIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export function TableFilters({
  activeFilter,
  onFilterChange,
  selectedRegion,
  setSelectedRegion,
  regionDropdownOpen,
  setRegionDropdownOpen,
  mobileMenuOpen,
  setMobileMenuOpen,
  regionDropdownRef,
  mobileMenuRef,
  customViewColumnsCount,
  onCustomEditClick,
}: TableFiltersProps) {
  const hasCustomColumns = customViewColumnsCount > 0;
  return (
    <div className="flex gap-3">
      {/* Region Selector */}
      <div className="relative" ref={regionDropdownRef}>
        <button
          type="button"
          onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
          className="px-5 py-2 rounded-lg text-[13px] font-normal transition-colors cursor-pointer bg-[#f0f0f0] text-black hover:bg-[#e0e0e0] whitespace-nowrap"
        >
          {regions.find(r => r.id === selectedRegion)?.label || '🌎 Global'}
        </button>

        {regionDropdownOpen && (
          <div
            className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-md z-[100]"
            onClick={(e) => e.stopPropagation()}
          >
            {regions.map((region) => (
              <button
                type="button"
                key={region.id}
                onClick={() => {
                  setSelectedRegion(region.id);
                  setRegionDropdownOpen(false);
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

      {/* Desktop: Show all filter buttons */}
      <div className="hidden md:flex">
        <TabGroup
          selectedIndex={filters.findIndex(f => f.id === activeFilter)}
          onChange={(index) => onFilterChange(filters[index].id)}
        >
          <TabList className="bg-[#EFEFEF] rounded-lg px-1 py-0.5 gap-0.5 flex">
            {filters.map((filter) => {
              const isCustom = filter.id === 'custom';
              const isSelected = activeFilter === filter.id;
              return (
                <Tab
                  key={filter.id}
                  onClick={() => {
                    // Allow re-clicking custom tab to edit when already selected
                    if (isCustom && isSelected) {
                      onCustomEditClick();
                    }
                  }}
                  className={({ selected }) =>
                    `rounded-md text-[13px] font-medium transition-all focus:outline-none focus:ring-0 ${
                      isCustom ? 'px-3' : 'px-5'
                    } ${
                      selected
                        ? 'bg-white text-black shadow-sm py-[5px]'
                        : isCustom
                        ? 'text-rankfi-teal hover:text-rankfi-teal/80 py-1.5 border border-dashed border-rankfi-teal/50 hover:border-rankfi-teal'
                        : 'text-gray-600 hover:text-gray-800 py-1.5'
                    }`
                  }
                >
                  {isCustom ? (hasCustomColumns ? <PencilIcon /> : <PlusIcon />) : filter.label}
                </Tab>
              );
            })}
          </TabList>
        </TabGroup>
      </div>

      {/* Mobile: Show dropdown */}
      <div className="relative md:hidden" ref={mobileMenuRef}>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="px-5 py-2 rounded-lg text-[13px] font-normal transition-colors cursor-pointer bg-[#f0f0f0] text-black hover:bg-[#e0e0e0] flex items-center gap-2 whitespace-nowrap"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '16px',
            paddingRight: '32px',
          }}
        >
          {filters.find(f => f.id === activeFilter)?.label || 'Features'}
        </button>

        {mobileMenuOpen && (
          <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-md z-[100]">
            {filters.map((filter) => {
              const isCustom = filter.id === 'custom';
              const isSelected = activeFilter === filter.id;
              return (
                <button
                  type="button"
                  key={filter.id}
                  onClick={() => {
                    if (isCustom && isSelected) {
                      // Re-clicking custom when already selected opens edit modal
                      onCustomEditClick();
                    } else {
                      onFilterChange(filter.id);
                    }
                    setMobileMenuOpen(false);
                  }}
                  className={`${
                    isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'
                  } w-full text-left px-4 py-2 text-[13px] transition-colors flex items-center gap-2 ${
                    isCustom ? 'text-rankfi-teal border-t border-gray-100' : 'text-gray-700'
                  }`}
                >
                  {isSelected && <span>✓</span>}
                  {isCustom ? (hasCustomColumns ? '✏️ Edit Custom' : '+ Custom') : filter.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

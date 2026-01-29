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
}

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
}: TableFiltersProps) {
  return (
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
            {filters.map((filter) => (
              <Tab
                key={filter.id}
                className={({ selected }) =>
                  `px-5 rounded-md text-[13px] font-medium transition-all focus:outline-none focus:ring-0 ${
                    selected
                      ? 'bg-white text-black shadow-sm py-[5px]'
                      : 'text-gray-600 hover:text-gray-800 py-1.5'
                  }`
                }
              >
                {filter.label}
              </Tab>
            ))}
          </TabList>
        </TabGroup>
      </div>

      {/* Mobile: Show dropdown */}
      <div className="relative md:hidden" ref={mobileMenuRef}>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="px-5 py-2 rounded-lg text-[13px] font-normal transition-colors cursor-pointer bg-[#f0f0f0] text-black hover:bg-[#e0e0e0] flex items-center gap-2"
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
          <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-md z-50">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  onFilterChange(filter.id);
                  setMobileMenuOpen(false);
                }}
                className={`${
                  activeFilter === filter.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                } w-full text-left px-4 py-2 text-[13px] text-gray-700 transition-colors flex items-center gap-2`}
              >
                {activeFilter === filter.id && <span>✓</span>}
                {filter.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

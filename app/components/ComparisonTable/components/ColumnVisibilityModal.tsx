'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { TabGroup, TabList, Tab } from '@headlessui/react';
import { VisibilityState } from '@tanstack/react-table';
import {
  columnDefinitions,
  presetFilters,
  FilterType,
  PresetFilterType,
  getAllColumnDefinitions
} from '../constants';

interface ColumnVisibilityModalProps {
  open: boolean;
  onClose: () => void;
  columnVisibility: VisibilityState;
  setColumnVisibility: (visibility: VisibilityState) => void;
  activeFilter: FilterType;
  // Custom view props
  customViewColumns: string[];
  setCustomViewColumns: (columns: string[]) => void;
  isCustomMode: boolean;
}

export function ColumnVisibilityModal({
  open,
  onClose,
  columnVisibility,
  setColumnVisibility,
  activeFilter,
  customViewColumns,
  setCustomViewColumns,
  isCustomMode,
}: ColumnVisibilityModalProps) {
  const [selectedTab, setSelectedTab] = useState<PresetFilterType>(
    activeFilter === 'custom' ? 'features' : activeFilter
  );

  // Sync selected tab with active filter when modal opens (only for preset filters)
  useEffect(() => {
    if (open && activeFilter !== 'custom') {
      setSelectedTab(activeFilter);
    }
  }, [open, activeFilter]);

  // Get columns for the selected tab (excluding app_name which is always shown)
  const getColumnsForTab = (tabId: PresetFilterType) => {
    return columnDefinitions[tabId].filter(col => col.key !== 'app_name');
  };

  // Check if a column is visible (default to true if not explicitly set)
  const isColumnVisible = (columnKey: string): boolean => {
    return columnVisibility[columnKey] !== false;
  };

  // Check if a column is selected for custom view
  const isColumnInCustomView = (columnKey: string): boolean => {
    return customViewColumns.includes(columnKey);
  };

  // Toggle column visibility (for preset filter mode)
  const toggleColumnVisibility = (columnKey: string) => {
    const currentVisibility = isColumnVisible(columnKey);
    setColumnVisibility({
      ...columnVisibility,
      [columnKey]: !currentVisibility,
    });
  };

  // Toggle column in custom view
  const toggleCustomColumn = (columnKey: string) => {
    if (customViewColumns.includes(columnKey)) {
      setCustomViewColumns(customViewColumns.filter(k => k !== columnKey));
    } else {
      setCustomViewColumns([...customViewColumns, columnKey]);
    }
  };

  // Show all columns in current tab (for preset mode)
  const showAllInTab = () => {
    const tabColumns = getColumnsForTab(selectedTab);
    const newVisibility = { ...columnVisibility };
    tabColumns.forEach(col => {
      newVisibility[col.key] = true;
    });
    setColumnVisibility(newVisibility);
  };

  // Hide all columns in current tab (for preset mode)
  const hideAllInTab = () => {
    const tabColumns = getColumnsForTab(selectedTab);
    const newVisibility = { ...columnVisibility };
    tabColumns.forEach(col => {
      newVisibility[col.key] = false;
    });
    setColumnVisibility(newVisibility);
  };

  // Select all columns for custom view
  const selectAllForCustom = () => {
    const allColumns = getAllColumnDefinitions();
    const allKeys = allColumns.flatMap(cat => cat.columns.map(col => col.key));
    setCustomViewColumns(allKeys);
  };

  // Clear all columns for custom view
  const clearAllForCustom = () => {
    setCustomViewColumns([]);
  };

  const currentTabColumns = getColumnsForTab(selectedTab);
  const allCategorizedColumns = getAllColumnDefinitions();

  // Custom mode: show all columns grouped by category
  if (isCustomMode) {
    return (
      <Dialog open={open} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <Dialog.Title className="text-lg font-semibold mb-2">Custom View</Dialog.Title>
            <p className="text-[13px] text-gray-500 mb-4">
              Select columns to include in your custom view:
            </p>

            {/* Columns List - Grouped by category */}
            <div className="h-80 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {allCategorizedColumns.map((category) => (
                <div key={category.category} className="mb-4 last:mb-0">
                  {/* Category Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide">
                      {category.category}
                    </span>
                  </div>

                  {/* Columns Grid */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                    {category.columns.map((column) => (
                      <label
                        key={column.key}
                        className="flex items-center gap-2 py-1.5 px-2 cursor-pointer hover:bg-gray-50 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={isColumnInCustomView(column.key)}
                          onChange={() => toggleCustomColumn(column.key)}
                          className="cursor-pointer w-4 h-4 rounded border-gray-300 shrink-0 accent-rankfi-teal"
                        />
                        <span className="text-[13px] text-gray-900 truncate">
                          {column.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected count */}
            <div className="mt-3 text-[12px] text-gray-500">
              {customViewColumns.length} column{customViewColumns.length !== 1 ? 's' : ''} selected
            </div>

            {/* Actions */}
            <div className="mt-3 flex justify-between">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selectAllForCustom}
                  className="px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded transition-colors"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={clearAllForCustom}
                  className="px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded transition-colors"
                >
                  Clear All
                </button>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#2d2d2d] text-white rounded text-[13px] font-medium hover:bg-[#3a3a3a] transition-colors"
              >
                Done
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  }

  // Preset mode: show tabs for Features, Fees, Security
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <Dialog.Title className="text-lg font-semibold mb-4">Column Visibility</Dialog.Title>

          {/* Tab Navigation - Only preset filters */}
          <TabGroup
            selectedIndex={presetFilters.findIndex(f => f.id === selectedTab)}
            onChange={(index) => setSelectedTab(presetFilters[index].id)}
          >
            <TabList className="bg-[#EFEFEF] rounded-lg px-1 py-0.5 gap-0.5 flex mb-4">
              {presetFilters.map((filter) => (
                <Tab
                  key={filter.id}
                  className={({ selected }) =>
                    `flex-1 px-3 rounded-md text-[13px] font-medium transition-all focus:outline-none focus:ring-0 ${
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

          {/* Columns List - Two column grid with fixed height */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 h-64 overflow-y-auto border border-gray-200 rounded-lg p-3 content-start">
            {currentTabColumns.map((column) => (
              <label key={column.key} className="flex items-center gap-2 py-1.5 px-2 cursor-pointer hover:bg-gray-50 rounded">
                <input
                  type="checkbox"
                  checked={isColumnVisible(column.key)}
                  onChange={() => toggleColumnVisibility(column.key)}
                  className="cursor-pointer w-4 h-4 rounded border-gray-300 shrink-0 accent-rankfi-teal"
                />
                <span className="text-[13px] text-gray-900 truncate">
                  {column.label}
                </span>
              </label>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-4 flex justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={showAllInTab}
                className="px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                Show All
              </button>
              <button
                type="button"
                onClick={hideAllInTab}
                className="px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                Hide All
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#2d2d2d] text-white rounded text-[13px] font-medium hover:bg-[#3a3a3a] transition-colors"
            >
              Done
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

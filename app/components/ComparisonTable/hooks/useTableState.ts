import { useState, useRef } from 'react';
import {
  SortingState,
  PaginationState,
  VisibilityState,
  RowSelectionState,
  ColumnPinningState,
} from '@tanstack/react-table';
import { FilterType } from '../constants';

export interface TableState {
  // Filter state
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;

  // Table state
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
  rowSelection: RowSelectionState;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  columnPinning: ColumnPinningState;
  setColumnPinning: React.Dispatch<React.SetStateAction<ColumnPinningState>>;
  globalFilter: string;
  setGlobalFilter: (filter: string) => void;

  // Compare state
  comparisonApplied: boolean;
  setComparisonApplied: (applied: boolean) => void;
  compareDropdownOpen: boolean;
  setCompareDropdownOpen: (open: boolean) => void;

  // Column visibility modal
  columnVisibilityModalOpen: boolean;
  setColumnVisibilityModalOpen: (open: boolean) => void;

  // Region state
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  regionDropdownOpen: boolean;
  setRegionDropdownOpen: (open: boolean) => void;

  // Mobile menu state
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  // Discount toggle state
  discountToggleEnabled: boolean;
  setDiscountToggleEnabled: (enabled: boolean) => void;

  // Loading state
  loadingMore: boolean;
  setLoadingMore: (loading: boolean) => void;

  // Refs
  compareDropdownRef: React.RefObject<HTMLDivElement | null>;
  tableContainerRef: React.RefObject<HTMLDivElement | null>;
  regionDropdownRef: React.RefObject<HTMLDivElement | null>;
  mobileMenuRef: React.RefObject<HTMLDivElement | null>;
}

export function useTableState(): TableState {
  // Filter state
  const [activeFilter, setActiveFilter] = useState<FilterType>('features');

  // Table state
  const [sorting, setSorting] = useState<SortingState>([{ id: 'rank', desc: false }]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ['rank', 'app_name'],
  });
  const [globalFilter, setGlobalFilter] = useState('');

  // Compare state
  const [comparisonApplied, setComparisonApplied] = useState(false);
  const [compareDropdownOpen, setCompareDropdownOpen] = useState(false);

  // Column visibility modal
  const [columnVisibilityModalOpen, setColumnVisibilityModalOpen] = useState(false);

  // Region state
  const [selectedRegion, setSelectedRegion] = useState<string>('global');
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Discount toggle state
  const [discountToggleEnabled, setDiscountToggleEnabled] = useState(false);

  // Loading state
  const [loadingMore, setLoadingMore] = useState(false);

  // Refs
  const compareDropdownRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const regionDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  return {
    activeFilter,
    setActiveFilter,
    sorting,
    setSorting,
    pagination,
    setPagination,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
    columnPinning,
    setColumnPinning,
    globalFilter,
    setGlobalFilter,
    comparisonApplied,
    setComparisonApplied,
    compareDropdownOpen,
    setCompareDropdownOpen,
    columnVisibilityModalOpen,
    setColumnVisibilityModalOpen,
    selectedRegion,
    setSelectedRegion,
    regionDropdownOpen,
    setRegionDropdownOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
    discountToggleEnabled,
    setDiscountToggleEnabled,
    loadingMore,
    setLoadingMore,
    compareDropdownRef,
    tableContainerRef,
    regionDropdownRef,
    mobileMenuRef,
  };
}

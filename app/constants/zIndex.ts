/**
 * Centralized z-index values for consistent layering across components.
 * Higher numbers appear above lower numbers.
 */
export const Z_INDEX = {
  // Table body sticky columns (lower than header)
  stickyColumnBody: 5,
  stickyColumnBodyName: 10,
  stickyColumnBodyRank: 20,

  // Table header sticky columns
  stickyColumn: 10,
  stickyColumnName: 20,
  stickyColumnRank: 30,
  tableHeader: 40,

  // Overlays and dropdowns
  dropdown: 50,
  header: 50,

  // Modals and tooltips
  modal: 100,
  tooltip: 200,

  // Preview cards and highest priority
  previewCard: 99999,
} as const;

export type ZIndexKey = keyof typeof Z_INDEX;

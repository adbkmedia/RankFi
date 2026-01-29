'use client';

import { Table, PaginationState } from '@tanstack/react-table';
import { Exchange } from '../../../types/exchange';

interface TablePaginationProps {
  table: Table<Exchange>;
  pagination: PaginationState;
  totalRows: number;
}

export function TablePagination({
  table,
  pagination,
  totalRows,
}: TablePaginationProps) {
  const totalPages = table.getPageCount();
  const currentPage = pagination.pageIndex + 1;
  const startIndex = pagination.pageIndex * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;

  const getPageNumbers = (): (number | string)[] => {
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
      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < total - 1) pages.push('...');
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

  return (
    <div className="flex justify-between items-center mt-4 px-2 flex-wrap gap-4">
      <div className="text-[13px] text-gray-600">
        Showing {startIndex + 1} - {Math.min(endIndex, totalRows)} out of {totalRows}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-1 border border-[#eaeaea] bg-white rounded text-[12px] text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ←
        </button>
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, idx) => {
            if (page === '...') {
              return <span key={`ellipsis-${idx}`} className="px-1 text-gray-500 text-[12px]">...</span>;
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
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 py-1 border border-[#eaeaea] bg-white rounded text-[12px] text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          →
        </button>
      </div>
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
  );
}

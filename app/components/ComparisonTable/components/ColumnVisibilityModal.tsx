'use client';

import { Dialog } from '@headlessui/react';
import { Table } from '@tanstack/react-table';
import { Exchange } from '../../../types/exchange';

interface ColumnVisibilityModalProps {
  open: boolean;
  onClose: () => void;
  table: Table<Exchange>;
}

export function ColumnVisibilityModal({
  open,
  onClose,
  table,
}: ColumnVisibilityModalProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
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
              onClick={onClose}
              className="px-4 py-2 bg-[#2d2d2d] text-white rounded text-[13px] font-medium hover:bg-[#3a3a3a] transition-colors"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

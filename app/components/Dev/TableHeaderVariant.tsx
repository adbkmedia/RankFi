'use client';

import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table';
import { Exchange } from '../../types/exchange';
import { exchanges } from '../../data/exchanges';
import { formatCellValue, getPlaceholderColor, getSortComparison } from '../../utils/tableHelpers';
import TableTooltip from '../TableTooltip';

type HeaderVariant = 'original' | 'tanstack-default' | 'light' | 'border-only' | 'coinmarketcap';

interface TableHeaderVariantProps {
  variant: HeaderVariant;
  title: string;
  description: string;
}

// Get first 5 exchanges for comparison (or all for coinmarketcap)
const getDataForVariant = (variant: HeaderVariant) => {
  return variant === 'coinmarketcap' ? exchanges : exchanges.slice(0, 5);
};

// Rank assignment function
const getExchangeRank = (exchangeName: string): number => {
  const rankMap: Record<string, number> = {
    'Kraken Pro': 1,
    'Binance': 2,
    'AscendEx': 3,
  };
  
  if (rankMap[exchangeName]) {
    return rankMap[exchangeName];
  }
  
  const allExchanges = exchanges.map(e => e.app_name);
  const rankedExchanges = ['Kraken Pro', 'Binance', 'AscendEx'];
  const unrankedExchanges = allExchanges.filter(name => !rankedExchanges.includes(name));
  
  const index = unrankedExchanges.indexOf(exchangeName);
  return index >= 0 ? index + 4 : 999;
};

// Custom sorting function for rank
const rankSortingFn = (rowA: any, rowB: any, columnId: string) => {
  const rankA = getExchangeRank(rowA.original.app_name);
  const rankB = getExchangeRank(rowB.original.app_name);
  if (rankA < rankB) return -1;
  if (rankA > rankB) return 1;
  return 0;
};

// Custom sorting function using existing helper
const customSortingFn = (rowA: any, rowB: any, columnId: string) => {
  const exchangeA = rowA.original as Exchange;
  const exchangeB = rowB.original as Exchange;
  const sortComparison = getSortComparison(columnId, 'asc');
  return sortComparison(exchangeA, exchangeB);
};

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
      >
        {exchange.app_name}
      </a>
    </div>
  );
};

// Helper to check if value is true/yes
const isTrue = (value: any): boolean => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    return lower === 'yes' || lower === 'true' || lower === '1';
  }
  return false;
};

// Checkmark and X mark style variations
type CheckmarkStyle = 'icon-only' | 'badge';

// Badge color variations
type BadgeColorVariant = 
  | 'darker'          // Darker green/red
  | 'dark-red-white'  // Dark red with white text
  | 'dark-green-white' // Dark green with white text
  | 'emerald';        // Emerald green palette from screenshot

interface CheckmarkXProps {
  value: boolean;
  style?: CheckmarkStyle;
  badgeColorVariant?: BadgeColorVariant;
}

const CheckmarkX = ({ value, style = 'icon-only', badgeColorVariant = 'darker' }: CheckmarkXProps) => {
  if (value) {
    // Green checkmark variations
    switch (style) {
      case 'icon-only':
        return (
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'badge':
        const greenBadgeClasses: Record<BadgeColorVariant, string> = {
          'darker': 'bg-green-600 text-white',
          'dark-green-white': 'bg-green-700 text-white',
          'emerald': 'bg-green-500 text-white', // Using green from red-white variation
          'dark-red-white': 'bg-green-700 text-white', // Fallback
        };
        return (
          <div className="flex items-center justify-center">
            <span className={`inline-block px-1.5 py-0 rounded text-[12px] font-medium ${greenBadgeClasses[badgeColorVariant]}`}>
              Yes
            </span>
          </div>
        );
    }
  } else {
    // Red X mark variations
    switch (style) {
      case 'icon-only':
        return (
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case 'badge':
        const redBadgeClasses: Record<BadgeColorVariant, string> = {
          'darker': 'bg-red-600 text-white',
          'dark-red-white': 'bg-red-700 text-white',
          'emerald': 'bg-red-600 text-white', // Keep red the same
          'dark-green-white': 'bg-red-700 text-white', // Fallback
        };
        return (
          <div className="flex items-center justify-center">
            <span className={`inline-block px-1.5 py-0 rounded text-[12px] font-medium ${redBadgeClasses[badgeColorVariant]}`}>
              No
            </span>
          </div>
        );
    }
  }
};

// Helper to create header with tooltip for coinmarketcap variant
// Returns a function to satisfy TanStack Table's ColumnDefTemplate type
const createHeaderWithTooltip = (label: string, tooltipContent: string, variant: HeaderVariant) => {
  if (variant === 'coinmarketcap') {
    return () => (
      <div className="flex items-center gap-1.5">
        <span>{label}</span>
        <TableTooltip
          content={tooltipContent}
          position="bottom"
          variant="default"
          zIndex={9999}
        >
          <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </TableTooltip>
      </div>
    );
  }
  return label;
};

export default function TableHeaderVariant({ variant, title, description }: TableHeaderVariantProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'rank', desc: false }]);
  const [checkmarkStyle, setCheckmarkStyle] = useState<CheckmarkStyle>('badge');
  const [badgeColorVariant, setBadgeColorVariant] = useState<BadgeColorVariant>('darker');

  // Define columns - full features set for coinmarketcap, simplified for others
  const columns = useMemo<ColumnDef<Exchange>[]>(() => {
    const baseColumns: ColumnDef<Exchange>[] = [
      {
        id: 'rank',
        header: '#',
        enableSorting: variant === 'coinmarketcap',
        accessorFn: (row) => getExchangeRank(row.app_name),
        sortingFn: variant === 'coinmarketcap' ? rankSortingFn : undefined,
        cell: ({ row }) => (
          <div className="text-center">{getExchangeRank(row.original.app_name)}</div>
        ),
        size: 40,
      },
      {
        id: 'app_name',
        header: 'Name',
        enableSorting: variant === 'coinmarketcap',
        accessorKey: 'app_name',
        sortingFn: variant === 'coinmarketcap' ? customSortingFn : undefined,
        cell: ({ row }) => (
          <div className="text-left">{variant === 'coinmarketcap' ? renderNameCell(row.original) : <span className="font-bold">{row.original.app_name}</span>}</div>
        ),
        size: 175,
      },
    ];

    // For coinmarketcap, add all features columns
    if (variant === 'coinmarketcap') {
      baseColumns.push(
        {
          id: 'coins',
          header: createHeaderWithTooltip('# of Coins', 'Total number of cryptocurrencies supported by this exchange', variant),
          enableSorting: true,
          accessorKey: 'coins',
          sortingFn: customSortingFn,
          cell: ({ row }) => (
            <div className="text-center">{formatCellValue(row.original.coins)}</div>
          ),
        },
        {
          id: 'number_of_futures',
          header: createHeaderWithTooltip('# of Futures', 'Number of futures trading pairs available', variant),
          enableSorting: true,
          accessorKey: 'number_of_futures',
          sortingFn: customSortingFn,
          cell: ({ row }) => (
            <div className="text-center">{formatCellValue(row.original.number_of_futures)}</div>
          ),
        },
        {
          id: 'max_leverage',
          header: createHeaderWithTooltip('Max Leverage', 'Maximum leverage multiplier available for trading on this exchange', variant),
          enableSorting: true,
          accessorKey: 'max_leverage',
          sortingFn: customSortingFn,
          cell: ({ row }) => (
            <div className="text-center">{formatCellValue(row.original.max_leverage)}</div>
          ),
        },
        {
          id: 'fiat_currencies',
          header: createHeaderWithTooltip('Fiat Currencies', 'Number of fiat currencies supported for deposits and withdrawals', variant),
          enableSorting: true,
          accessorKey: 'fiat_currencies',
          sortingFn: customSortingFn,
          cell: ({ row }) => (
            <div className="text-center">{formatCellValue(row.original.fiat_currencies)}</div>
          ),
        },
        {
          id: 'margin_spot',
          header: createHeaderWithTooltip('Max Margin (spot)', 'Maximum margin available for spot trading', variant),
          enableSorting: true,
          accessorKey: 'margin_spot',
          sortingFn: customSortingFn,
          cell: ({ row }) => (
            <div className="text-center">{formatCellValue(row.original.margin_spot)}</div>
          ),
        },
        {
          id: 'copy_trading',
          header: 'Copy Trading',
          enableSorting: true,
          accessorKey: 'copy_trading',
          sortingFn: customSortingFn,
          cell: ({ row }) => (
            <div className="text-center">
              {variant === 'coinmarketcap' ? (
                <CheckmarkX value={isTrue(row.original.copy_trading)} style={checkmarkStyle} badgeColorVariant={badgeColorVariant} />
              ) : (
                formatCellValue(row.original.copy_trading)
              )}
            </div>
          ),
        },
        {
          id: 'trading_bots',
          header: 'Trading Bots',
          enableSorting: true,
          accessorKey: 'trading_bots',
          sortingFn: customSortingFn,
          cell: ({ row }) => (
            <div className="text-center">
              {variant === 'coinmarketcap' ? (
                <CheckmarkX value={isTrue(row.original.trading_bots)} style={checkmarkStyle} badgeColorVariant={badgeColorVariant} />
              ) : (
                formatCellValue(row.original.trading_bots)
              )}
            </div>
          ),
        },
        {
          id: 'p2p_trading',
          header: 'P2P Trading',
          enableSorting: true,
          accessorKey: 'p2p_trading',
          sortingFn: customSortingFn,
          cell: ({ row }) => (
            <div className="text-center">
              {variant === 'coinmarketcap' ? (
                <CheckmarkX value={isTrue(row.original.p2p_trading)} style={checkmarkStyle} badgeColorVariant={badgeColorVariant} />
              ) : (
                formatCellValue(row.original.p2p_trading)
              )}
            </div>
          ),
        },
        {
          id: 'staking_or_earn',
          header: createHeaderWithTooltip('Staking or Earn', 'Whether the exchange offers staking or earning programs', variant),
          enableSorting: true,
          accessorKey: 'staking_or_earn',
          sortingFn: customSortingFn,
          cell: ({ row }) => (
            <div className="text-center">
              {variant === 'coinmarketcap' ? (
                <CheckmarkX value={isTrue(row.original.staking_or_earn)} style={checkmarkStyle} badgeColorVariant={badgeColorVariant} />
              ) : (
                formatCellValue(row.original.staking_or_earn)
              )}
            </div>
          ),
        },
        {
          id: 'mobile_app',
          header: 'Mobile App',
          enableSorting: true,
          accessorKey: 'mobile_app',
          sortingFn: customSortingFn,
          cell: ({ row }) => (
            <div className="text-center">
              {variant === 'coinmarketcap' ? (
                <CheckmarkX value={isTrue(row.original.mobile_app)} style={checkmarkStyle} badgeColorVariant={badgeColorVariant} />
              ) : (
                formatCellValue(row.original.mobile_app)
              )}
            </div>
          ),
        },
        {
          id: '247_support',
          header: createHeaderWithTooltip('24/7 Support', 'Whether the exchange provides round-the-clock customer support', variant),
          enableSorting: true,
          accessorKey: '247_support',
          sortingFn: customSortingFn,
          cell: ({ row }) => (
            <div className="text-center">
              {variant === 'coinmarketcap' ? (
                <CheckmarkX value={isTrue(row.original['247_support'])} style={checkmarkStyle} badgeColorVariant={badgeColorVariant} />
              ) : (
                formatCellValue(row.original['247_support'])
              )}
            </div>
          ),
        }
      );
    } else {
      // Simplified columns for other variants (non-coinmarketcap)
      baseColumns.push(
        {
          id: 'coins',
          header: '# of Coins',
          enableSorting: false,
          accessorKey: 'coins',
          cell: ({ row }) => (
            <div className="text-center">{formatCellValue(row.original.coins)}</div>
          ),
        },
        {
          id: 'max_leverage',
          header: 'Max Leverage',
          enableSorting: false,
          accessorKey: 'max_leverage',
          cell: ({ row }) => (
            <div className="text-center">{formatCellValue(row.original.max_leverage)}</div>
          ),
        },
        {
          id: 'mobile_app',
          header: 'Mobile App',
          enableSorting: false,
          accessorKey: 'mobile_app',
          cell: ({ row }) => (
            <div className="text-center">{formatCellValue(row.original.mobile_app)}</div>
          ),
        },
        {
          id: '247_support',
          header: '24/7 Support',
          enableSorting: false,
          accessorKey: '247_support',
          cell: ({ row }) => (
            <div className="text-center">{formatCellValue(row.original['247_support'])}</div>
          ),
        }
      );
    }

    return baseColumns;
  }, [variant, checkmarkStyle, badgeColorVariant]);

  const tableData = getDataForVariant(variant);
  
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(variant === 'coinmarketcap' && {
      getSortedRowModel: getSortedRowModel(),
      state: {
        sorting,
      },
      onSortingChange: setSorting,
      enableSorting: true,
    }),
  });


  // Get header styling based on variant
  const getHeaderStyles = () => {
    switch (variant) {
      case 'original':
        return {
          headerRowClass: 'bg-[#2d2d2d]',
          headerCellClass: 'text-xs font-semibold text-white tracking-wider border border-[#eaeaea] cursor-pointer hover:bg-[#3a3a3a] transition-colors',
          headerHeight: '60px',
        };
      case 'tanstack-default':
        return {
          headerRowClass: '',
          headerCellClass: 'text-sm font-medium text-gray-900',
          headerHeight: 'auto',
        };
      case 'light':
        return {
          headerRowClass: 'bg-[#f0f0f0]',
          headerCellClass: 'text-xs font-semibold text-gray-900 tracking-wider border border-[#eaeaea]',
          headerHeight: '60px',
        };
      case 'border-only':
        return {
          headerRowClass: 'bg-white',
          headerCellClass: 'text-xs font-semibold text-gray-900 border-2 border-gray-300',
          headerHeight: 'auto',
        };
      case 'coinmarketcap':
        return {
          headerRowClass: 'bg-black',
          headerCellClass: 'text-xs font-medium text-white',
          headerHeight: 'auto',
        };
      default:
        return {
          headerRowClass: '',
          headerCellClass: '',
          headerHeight: 'auto',
        };
    }
  };

  const headerStyles = getHeaderStyles();

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className={`bg-white rounded ${variant === 'coinmarketcap' ? '' : 'border border-[#eaeaea]'} overflow-hidden ${variant === 'coinmarketcap' ? 'w-full' : ''}`}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className={headerStyles.headerRowClass} style={{ height: headerStyles.headerHeight }}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const isRankColumn = header.id === 'rank';
                    const isNameColumn = header.id === 'app_name';
                    const canSort = header.column.getCanSort();
                    const sortDirection = header.column.getIsSorted();
                    
                    return (
                      <th
                        key={header.id}
                        onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                        className={`${headerStyles.headerCellClass} align-middle ${
                          variant === 'coinmarketcap' ? 'border-b border-gray-700' : ''
                        } ${
                          canSort && variant === 'coinmarketcap' ? 'cursor-pointer hover:bg-gray-900 transition-colors' : ''
                        } ${
                          isRankColumn
                            ? 'px-1 text-center'
                            : isNameColumn
                            ? 'px-2 text-left'
                            : 'px-2 text-center'
                        }`}
                        style={{
                          height: headerStyles.headerHeight === '60px' ? '60px' : undefined,
                          minHeight: headerStyles.headerHeight === '60px' ? '60px' : undefined,
                          maxHeight: headerStyles.headerHeight === '60px' ? '60px' : undefined,
                          verticalAlign: 'middle',
                          paddingTop: headerStyles.headerHeight === '60px' ? '6px' : variant === 'border-only' ? '4px' : variant === 'coinmarketcap' ? '12px' : '8px',
                          paddingBottom: headerStyles.headerHeight === '60px' ? '6px' : variant === 'border-only' ? '4px' : variant === 'coinmarketcap' ? '12px' : '8px',
                          paddingLeft: variant === 'border-only' ? '4px' : undefined,
                          paddingRight: variant === 'border-only' ? '4px' : undefined,
                          ...(isRankColumn && {
                            width: '40px',
                            minWidth: '40px',
                            maxWidth: '40px',
                          }),
                          ...(isNameColumn && {
                            width: '175px',
                            minWidth: '175px',
                            maxWidth: '175px',
                          }),
                        }}
                      >
                        <div className={`flex items-center ${isNameColumn ? 'justify-start' : 'justify-center'} relative w-full`}>
                          {canSort && variant === 'coinmarketcap' && (
                            <span 
                              className="text-gray-400 absolute"
                              style={{ 
                                fontSize: '8px', 
                                opacity: sortDirection ? 1 : 0.3,
                                left: '2px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                              }}
                            >
                              {sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '▲'}
                            </span>
                          )}
                          <span className={isNameColumn ? 'text-left' : 'text-center w-full'}>
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
              {table.getRowModel().rows.map((row, rowIndex) => {
                const isCoinmarketcap = variant === 'coinmarketcap';
                const isEvenRow = rowIndex % 2 === 0;
                const rowBgClass = isCoinmarketcap 
                  ? (isEvenRow ? 'bg-white' : 'bg-gray-50/50')
                  : 'bg-white';
                // Add subtle horizontal lines for coinmarketcap variant
                const borderClass = isCoinmarketcap ? 'border-b border-gray-100' : '';
                const cellBorderClass = variant === 'coinmarketcap' ? '' : 'border-x border-[#eaeaea]';
                
                return (
                  <tr
                    key={row.id}
                    className={`${rowBgClass} hover:bg-gray-100 transition-colors duration-75 ${borderClass}`}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isRankColumn = cell.column.id === 'rank';
                      const isNameColumn = cell.column.id === 'app_name';
                      
                      return (
                        <td
                          key={cell.id}
                          className={`text-[13px] ${cellBorderClass} align-middle ${
                            isRankColumn
                              ? 'px-1 py-1.5 text-center whitespace-nowrap'
                              : isNameColumn
                              ? 'px-2 py-1.5 text-left'
                              : 'px-2 py-1.5 whitespace-nowrap text-center'
                          }`}
                          style={{
                            verticalAlign: 'middle',
                            ...(isRankColumn && {
                              width: '40px',
                              minWidth: '40px',
                              maxWidth: '40px',
                            }),
                            ...(isNameColumn && {
                              width: '175px',
                              minWidth: '175px',
                              maxWidth: '175px',
                            }),
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checkmark/X Mark Style Variations */}
      {variant === 'coinmarketcap' && (
        <div className="mt-8 space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Style Type</h4>
            <p className="text-sm text-gray-600 mb-4">Choose the display style</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(['icon-only', 'badge'] as CheckmarkStyle[]).map((style) => (
                <button
                  key={style}
                  onClick={() => setCheckmarkStyle(style)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    checkmarkStyle === style
                      ? 'border-[#00a38f] bg-[#00a38f]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-sm font-medium text-gray-700 mb-3 capitalize">
                    {style.replace('-', ' ')}
                  </div>
                  <div className="flex items-center justify-center gap-6">
                    <CheckmarkX value={true} style={style} badgeColorVariant={badgeColorVariant} />
                    <CheckmarkX value={false} style={style} badgeColorVariant={badgeColorVariant} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Badge Color Variations */}
          {checkmarkStyle === 'badge' && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Badge Color Variations</h4>
              <p className="text-sm text-gray-600 mb-4">Click a color variation to apply it to the table above</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {([
                  { id: 'darker', label: 'Darker', desc: 'Darker green/red' },
                  { id: 'dark-red-white', label: 'Dark Red White', desc: 'Dark red with white text' },
                  { id: 'dark-green-white', label: 'Dark Green White', desc: 'Dark green with white text' },
                  { id: 'emerald', label: 'Emerald', desc: 'Green-500 / Red-600' },
                ] as { id: BadgeColorVariant; label: string; desc: string }[]).map((colorVariant) => (
                  <button
                    key={colorVariant.id}
                    onClick={() => setBadgeColorVariant(colorVariant.id)}
                    className={`p-3 border-2 rounded-lg transition-all text-left ${
                      badgeColorVariant === colorVariant.id
                        ? 'border-[#00a38f] bg-[#00a38f]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-xs font-medium text-gray-700 mb-1">
                      {colorVariant.label}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      {colorVariant.desc}
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <CheckmarkX value={true} style="badge" badgeColorVariant={colorVariant.id} />
                      <CheckmarkX value={false} style="badge" badgeColorVariant={colorVariant.id} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

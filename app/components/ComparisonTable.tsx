'use client';

import { useState } from 'react';
import { Exchange } from '../types/exchange';
import { exchanges } from '../data/exchanges';
import { formatCellValue, getPlaceholderColor } from '../utils/tableHelpers';

type FilterType = 'features' | 'fees' | 'security';

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

export default function ComparisonTable() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('features');

  const filters = [
    { id: 'features' as FilterType, label: 'Features' },
    { id: 'fees' as FilterType, label: 'Fees' },
    { id: 'security' as FilterType, label: 'Security' },
  ];

  const columns = columnDefinitions[activeFilter];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 bg-white">

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-5 py-2 rounded-full text-[13px] font-normal transition-colors cursor-pointer ${
              activeFilter === filter.id
                ? 'bg-[#2d2d2d] text-white'
                : 'bg-[#f0f0f0] text-black hover:bg-[#e0e0e0]'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded border border-[#eaeaea]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-2 py-3 h-12 text-xs font-semibold text-gray-700 uppercase tracking-wider border border-[#eaeaea]"
                  style={{ height: '48px' }}
                >
                  {column.key === 'app_name' ? (
                    <div className="text-left">{column.label}</div>
                  ) : (
                    <div className="text-center">{column.label}</div>
                  )}
                </th>
              ))}
              <th
                className="px-2 py-3 h-12 text-xs font-semibold text-gray-700 uppercase tracking-wider border border-[#eaeaea] text-center"
                style={{ height: '48px' }}
              >
                Website
              </th>
            </tr>
          </thead>
          <tbody>
            {exchanges.map((exchange, idx) => (
              <tr key={idx} className="bg-white hover:bg-[#f0f0f0] transition-colors border-b border-[#eaeaea]">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-2 py-1.5 whitespace-nowrap text-[13px] text-gray-900 border border-[#eaeaea]"
                  >
                    {column.key === 'app_name' ? (
                      <div className="text-left">{renderNameCell(exchange)}</div>
                    ) : (
                      <div className="text-center">{formatCellValue(exchange[column.key as keyof Exchange])}</div>
                    )}
                  </td>
                ))}
                <td className="px-2 py-1.5 whitespace-nowrap text-[13px] text-gray-900 border border-[#eaeaea] text-center">
                  <a
                    href={exchange.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00a38f] hover:underline"
                  >
                    Visit →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

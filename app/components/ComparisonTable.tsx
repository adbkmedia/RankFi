'use client';

import { useState } from 'react';

// Sample exchange data
const exchanges = [
  {
    name: 'Binance',
    security: 'High',
    features: 'Advanced',
    fees: '0.1%',
    supportedCoins: 350,
    region: 'Global',
  },
  {
    name: 'Coinbase',
    security: 'Very High',
    features: 'Basic',
    fees: '0.5%',
    supportedCoins: 200,
    region: 'US, Europe',
  },
  {
    name: 'Kraken',
    security: 'High',
    features: 'Advanced',
    fees: '0.16%',
    supportedCoins: 180,
    region: 'Global',
  },
  {
    name: 'Gemini',
    security: 'Very High',
    features: 'Basic',
    fees: '0.5%',
    supportedCoins: 100,
    region: 'US',
  },
];

type FilterType = 'all' | 'security' | 'features' | 'fees';

export default function ComparisonTable() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filters = [
    { id: 'all' as FilterType, label: 'All' },
    { id: 'security' as FilterType, label: 'Security' },
    { id: 'features' as FilterType, label: 'Features' },
    { id: 'fees' as FilterType, label: 'Fees' },
  ];

  // Columns to show based on filter
  const getColumns = () => {
    switch (activeFilter) {
      case 'security':
        return ['Exchange', 'Security', 'Region'];
      case 'features':
        return ['Exchange', 'Features', 'Supported Coins'];
      case 'fees':
        return ['Exchange', 'Trading Fees', 'Region'];
      default:
        return ['Exchange', 'Security', 'Features', 'Fees', 'Supported Coins', 'Region'];
    }
  };

  const getRowData = (exchange: typeof exchanges[0]) => {
    switch (activeFilter) {
      case 'security':
        return [exchange.name, exchange.security, exchange.region];
      case 'features':
        return [exchange.name, exchange.features, exchange.supportedCoins.toString()];
      case 'fees':
        return [exchange.name, exchange.fees, exchange.region];
      default:
        return [
          exchange.name,
          exchange.security,
          exchange.features,
          exchange.fees,
          exchange.supportedCoins.toString(),
          exchange.region,
        ];
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cryptocurrency Exchange Comparison</h1>
        <p className="text-gray-600">Compare the top cryptocurrency exchanges</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {getColumns().map((column) => (
                <th
                  key={column}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {exchanges.map((exchange, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                {getRowData(exchange).map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile-friendly card view (shows on small screens) */}
      <div className="md:hidden mt-6 space-y-4">
        {exchanges.map((exchange, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">{exchange.name}</h3>
            <div className="space-y-2">
              {activeFilter === 'all' || activeFilter === 'security' ? (
                <div className="flex justify-between">
                  <span className="text-gray-600">Security:</span>
                  <span className="font-medium">{exchange.security}</span>
                </div>
              ) : null}
              {activeFilter === 'all' || activeFilter === 'features' ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Features:</span>
                    <span className="font-medium">{exchange.features}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Supported Coins:</span>
                    <span className="font-medium">{exchange.supportedCoins}</span>
                  </div>
                </>
              ) : null}
              {activeFilter === 'all' || activeFilter === 'fees' ? (
                <div className="flex justify-between">
                  <span className="text-gray-600">Trading Fees:</span>
                  <span className="font-medium">{exchange.fees}</span>
                </div>
              ) : null}
              {activeFilter === 'all' || activeFilter === 'security' || activeFilter === 'fees' ? (
                <div className="flex justify-between">
                  <span className="text-gray-600">Region:</span>
                  <span className="font-medium">{exchange.region}</span>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


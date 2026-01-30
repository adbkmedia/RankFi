import { exchanges } from '../../data/exchanges';

// Layout constants
export const COLUMN_WIDTHS = {
  rank: 40,
  name: 175,
  stickyTotal: 215, // rank + name
} as const;

export const HEADER_HEIGHT = 60;
export const STICKY_SHADOW = '6px 0 8px -4px rgba(0,0,0,0.15)';

export type FilterType = 'features' | 'fees' | 'security';

// Column definition type
export interface ColumnDefinition {
  key: string;
  label: string;
  size?: number;
  minSize?: number;
  maxSize?: number;
}

// Column definitions matching your live site
export const columnDefinitions: Record<FilterType, ColumnDefinition[]> = {
  features: [
    { key: 'app_name', label: 'Name' },
    { key: 'coins', label: '# of Coins' },
    { key: 'number_of_futures', label: '# of Futures' },
    { key: 'max_leverage', label: 'Max Leverage' },
    { key: 'margin_spot', label: 'Max Margin (spot)' },
    { key: 'fiat_currencies', label: 'Fiat Wallets' },
    { key: '247_support', label: '24/7 Support' },
    { key: 'staking_or_earn', label: 'Staking or Earn' },
    { key: 'mobile_app', label: 'Mobile App' },
    { key: 'copy_trading', label: 'Copy Trading' },
    { key: 'trading_bots', label: 'Trading Bots' },
    { key: 'p2p_trading', label: 'P2P Trading' },
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
    { key: 'founded', label: 'Founded', minSize: 85 },
    { key: 'number_of_users', label: 'Users', minSize: 75 },
    { key: 'proof_of_reserves', label: 'POR', minSize: 70 },
    { key: 'uses_cold_storage', label: 'Cold Storage', maxSize: 95 },
    { key: '2fa', label: '2FA', minSize: 70 },
    { key: 'insurance_policy', label: 'Insurance', minSize: 100 },
    { key: 'hacks_or_incidents', label: 'Hacks' },
    { key: 'other_incidents', label: 'Incidents' },
    { key: 'kyc', label: 'KYC', minSize: 75 },
    { key: 'publicly_traded', label: 'Publicly Traded', maxSize: 90 },
    { key: 'headquarters', label: 'Headquarters', maxSize: 120 },
  ],
};

export const regions = [
  { id: 'global', label: '🌎 Global', url: '' },
  { id: 'canada', label: '🇨🇦 Canada', url: '' },
];

export const filters = [
  { id: 'features' as FilterType, label: 'Features' },
  { id: 'fees' as FilterType, label: 'Fees' },
  { id: 'security' as FilterType, label: 'Security' },
];

// Rank assignment function - placeholder ranks
export const getExchangeRank = (exchangeName: string): number => {
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

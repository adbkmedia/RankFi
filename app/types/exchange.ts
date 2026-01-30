// Exchange data structure matching your live site
export type Exchange = {
  app_name: string;
  logoUrl?: string;
  // Features
  coins?: number | string;
  number_of_futures?: number | string;
  max_leverage?: number | string;
  fiat_currencies?: number | string;
  supported_fiat_currencies?: string[]; // e.g., ['USD', 'EUR', 'GBP']
  margin_spot?: number | string;
  copy_trading?: boolean | string;
  trading_bots?: boolean | string;
  p2p_trading?: boolean | string;
  staking_or_earn?: boolean | string;
  mobile_app?: boolean | string;
  '247_support'?: boolean | string;
  // Fees
  maker_fee?: string;
  taker_fee?: string;
  futures_maker_fee?: string;
  futures_taker_fee?: string;
  rankfi_discount?: string;
  rankfi_bonus?: string;
  uses_spread_fee?: boolean;
  // Security
  founded?: number | string;
  number_of_users?: number | string;
  proof_of_reserves?: boolean | string;
  proof_of_reserves_url?: string;
  uses_cold_storage?: boolean | string;
  insurance_policy?: boolean | string;
  insurance_policy_url?: string;
  hacks_or_incidents?: string;
  hacks_or_incidents_url?: string | string[]; // Support single or multiple URLs
  other_incidents?: string;
  other_incidents_url?: string | string[]; // Support single or multiple URLs
  '2fa'?: boolean | string;
  kyc?: string;
  publicly_traded?: boolean | string;
  headquarters?: string;
  // Website
  website?: string;
};


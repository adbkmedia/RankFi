// Exchange data structure matching your live site
export type Exchange = {
  app_name: string;
  logoUrl?: string;
  // Features
  coins?: number | string;
  number_of_futures?: number | string;
  max_leverage?: number | string;
  fiat_currencies?: number | string;
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
  // Security
  founded?: number | string;
  number_of_users?: number | string;
  proof_of_reserves?: boolean | string;
  uses_cold_storage?: boolean | string;
  insurance_policy?: boolean | string;
  hacks_or_incidents?: string;
  other_incidents?: string;
  '2fa'?: boolean | string;
  kyc?: string;
  publicly_traded?: boolean | string;
  headquarters?: string;
  // Website
  website?: string;
};


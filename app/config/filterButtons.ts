export interface FilterButtonConfig {
  label: string;
  emoji: string;
  href?: string;
}

export const filterButtonSets: Record<string, FilterButtonConfig[]> = {
  cryptoExchanges: [
    { label: 'Global', emoji: '🌍' },
    { label: 'Futures', emoji: '📊' },
    { label: 'No KYC', emoji: '🥷' },
    { label: 'CEXs', emoji: '🇨🇦' },
    { label: 'Perp DEXs', emoji: '📈' },
    { label: 'Hardware Wallets', emoji: '📁' },
  ],
  futuresExchanges: [
    // Future: buttons for futures exchanges page
    { label: 'Global', emoji: '🌍' },
    { label: 'Futures', emoji: '📊' },
    { label: 'No KYC', emoji: '🥷' },
  ],
  noKycExchanges: [
    // Future: buttons for no KYC exchanges page
    { label: 'Global', emoji: '🌍' },
    { label: 'No KYC', emoji: '🥷' },
    { label: 'CEXs', emoji: '🏢' },
  ],
};

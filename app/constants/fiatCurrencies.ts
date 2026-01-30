// Fiat currency code to flag/name mapping
// Used by FiatCurrencyTooltip to display currency icons

export const FIAT_CURRENCIES: Record<string, { flag: string; name: string }> = {
  // Major currencies
  USD: { flag: '🇺🇸', name: 'US Dollar' },
  EUR: { flag: '🇪🇺', name: 'Euro' },
  GBP: { flag: '🇬🇧', name: 'British Pound' },
  JPY: { flag: '🇯🇵', name: 'Japanese Yen' },
  CHF: { flag: '🇨🇭', name: 'Swiss Franc' },

  // Other common currencies
  AUD: { flag: '🇦🇺', name: 'Australian Dollar' },
  CAD: { flag: '🇨🇦', name: 'Canadian Dollar' },
  NZD: { flag: '🇳🇿', name: 'New Zealand Dollar' },
  SGD: { flag: '🇸🇬', name: 'Singapore Dollar' },
  HKD: { flag: '🇭🇰', name: 'Hong Kong Dollar' },

  // Asian currencies
  CNY: { flag: '🇨🇳', name: 'Chinese Yuan' },
  KRW: { flag: '🇰🇷', name: 'South Korean Won' },
  INR: { flag: '🇮🇳', name: 'Indian Rupee' },
  IDR: { flag: '🇮🇩', name: 'Indonesian Rupiah' },
  MYR: { flag: '🇲🇾', name: 'Malaysian Ringgit' },
  PHP: { flag: '🇵🇭', name: 'Philippine Peso' },
  THB: { flag: '🇹🇭', name: 'Thai Baht' },
  VND: { flag: '🇻🇳', name: 'Vietnamese Dong' },
  TWD: { flag: '🇹🇼', name: 'Taiwan Dollar' },

  // European currencies
  SEK: { flag: '🇸🇪', name: 'Swedish Krona' },
  NOK: { flag: '🇳🇴', name: 'Norwegian Krone' },
  DKK: { flag: '🇩🇰', name: 'Danish Krone' },
  PLN: { flag: '🇵🇱', name: 'Polish Zloty' },
  CZK: { flag: '🇨🇿', name: 'Czech Koruna' },
  HUF: { flag: '🇭🇺', name: 'Hungarian Forint' },
  RON: { flag: '🇷🇴', name: 'Romanian Leu' },
  BGN: { flag: '🇧🇬', name: 'Bulgarian Lev' },
  HRK: { flag: '🇭🇷', name: 'Croatian Kuna' },

  // Americas
  BRL: { flag: '🇧🇷', name: 'Brazilian Real' },
  MXN: { flag: '🇲🇽', name: 'Mexican Peso' },
  ARS: { flag: '🇦🇷', name: 'Argentine Peso' },
  CLP: { flag: '🇨🇱', name: 'Chilean Peso' },
  COP: { flag: '🇨🇴', name: 'Colombian Peso' },
  PEN: { flag: '🇵🇪', name: 'Peruvian Sol' },

  // Middle East & Africa
  AED: { flag: '🇦🇪', name: 'UAE Dirham' },
  SAR: { flag: '🇸🇦', name: 'Saudi Riyal' },
  ILS: { flag: '🇮🇱', name: 'Israeli Shekel' },
  TRY: { flag: '🇹🇷', name: 'Turkish Lira' },
  ZAR: { flag: '🇿🇦', name: 'South African Rand' },
  NGN: { flag: '🇳🇬', name: 'Nigerian Naira' },
  KES: { flag: '🇰🇪', name: 'Kenyan Shilling' },
  EGP: { flag: '🇪🇬', name: 'Egyptian Pound' },

  // Eastern Europe
  RUB: { flag: '🇷🇺', name: 'Russian Ruble' },
  UAH: { flag: '🇺🇦', name: 'Ukrainian Hryvnia' },
  KZT: { flag: '🇰🇿', name: 'Kazakh Tenge' },

  // Oceania
  FJD: { flag: '🇫🇯', name: 'Fijian Dollar' },

  // South Asia
  PKR: { flag: '🇵🇰', name: 'Pakistani Rupee' },
  BDT: { flag: '🇧🇩', name: 'Bangladeshi Taka' },
  LKR: { flag: '🇱🇰', name: 'Sri Lankan Rupee' },
  NPR: { flag: '🇳🇵', name: 'Nepalese Rupee' },
};

// Helper function to get currency info with fallback
export function getCurrencyInfo(code: string): { flag: string; name: string } {
  return FIAT_CURRENCIES[code] || { flag: '💵', name: code };
}

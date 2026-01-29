/**
 * Data Layer Abstraction
 *
 * This module provides a clean API for accessing exchange data.
 * Currently uses static data, but designed to be easily swapped
 * for Airtable or other data sources.
 *
 * AIRTABLE INTEGRATION POINT:
 * When ready to integrate Airtable, replace the static imports
 * with API calls to your Airtable base. Consider:
 * - Using @airtable/blocks or airtable npm package
 * - Implementing caching (SWR, React Query, or Next.js cache)
 * - Adding error handling for network failures
 * - Adding loading states for async data fetching
 */

import { exchanges as staticExchanges } from './exchanges';
import { Exchange } from '../types/exchange';

/**
 * Get all exchanges
 *
 * AIRTABLE: Replace with async function that fetches from Airtable
 * ```ts
 * export async function getExchanges(): Promise<Exchange[]> {
 *   const response = await fetch('/api/exchanges');
 *   return response.json();
 * }
 * ```
 */
export function getExchanges(): Exchange[] {
  return staticExchanges;
}

/**
 * Get a single exchange by slug (URL-friendly name)
 *
 * AIRTABLE: Replace with async function that fetches a single record
 */
export function getExchangeBySlug(slug: string): Exchange | undefined {
  const normalizedSlug = slug.toLowerCase();
  return staticExchanges.find(
    (exchange) =>
      exchange.app_name.toLowerCase().replace(/\s+/g, '-') === normalizedSlug
  );
}

/**
 * Get exchanges filtered by region
 *
 * AIRTABLE: This could be a filtered view or query parameter
 */
export function getExchangesByRegion(region: string): Exchange[] {
  // TODO: Implement region filtering when region data is available
  // For now, return all exchanges
  if (region === 'global') {
    return staticExchanges;
  }
  // When region data is added to Exchange type, filter here
  return staticExchanges;
}

/**
 * Get featured/top picks exchanges
 *
 * AIRTABLE: Could be a separate view or filtered query
 */
export function getTopPicks(): Exchange[] {
  // Return top 3 exchanges (hardcoded for now, will come from data later)
  const topPickNames = ['Kraken', 'Binance', 'Bybit'];
  return staticExchanges.filter((exchange) =>
    topPickNames.some((name) =>
      exchange.app_name.toLowerCase().includes(name.toLowerCase())
    )
  );
}

// Re-export the Exchange type for convenience
export type { Exchange } from '../types/exchange';

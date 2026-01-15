import { Exchange } from '../types/exchange';

// Helper function to format cell values
export const formatCellValue = (value: Exchange[keyof Exchange]): string => {
  if (value === null || value === undefined || value === '') {
    return 'N/A';
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return String(value);
};

// Generate placeholder color for exchange logo
export const getPlaceholderColor = (exchangeName: string): string => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];
  const colorIndex = exchangeName.charCodeAt(0) % colors.length;
  return colors[colorIndex];
};

// Check if value is missing/N/A
const isValueMissing = (value: any): boolean => {
  return value === null || value === undefined || value === '' || value === 'N/A';
};

// Extract year from hacks_or_incidents string (e.g., "2021" or "2023, 2025")
const extractYear = (value: string): number => {
  if (!value || value === 'No') return 0;
  const match = value.match(/\d{4}/);
  return match ? parseInt(match[0]) : 0;
};

// Sort comparison function
export const getSortComparison = (
  column: string,
  direction: 'asc' | 'desc'
): ((a: Exchange, b: Exchange) => number) => {
  const directionMultiplier = direction === 'asc' ? 1 : -1;

  return (a: Exchange, b: Exchange) => {
    const valueA = a[column as keyof Exchange];
    const valueB = b[column as keyof Exchange];

    // Handle missing values - always put them at the end
    const isAMissing = isValueMissing(valueA);
    const isBMissing = isValueMissing(valueB);

    if (isAMissing && isBMissing) return 0;
    if (isAMissing) return 1; // Put missing values at the end
    if (isBMissing) return -1; // Put missing values at the end

    // Special handling for hacks_or_incidents
    if (column === 'hacks_or_incidents' || column === 'other_incidents') {
      const yearA = extractYear(String(valueA));
      const yearB = extractYear(String(valueB));
      return directionMultiplier * (yearA - yearB);
    }

    // Integer columns
    const intColumns = ['coins', 'number_of_futures', 'max_leverage', 'margin_spot', 'founded', 'fiat_currencies'];
    if (intColumns.includes(column)) {
      // Handle strings like "300+" or "1M"
      const numA = typeof valueA === 'string' 
        ? parseInt(valueA.replace(/[^0-9]/g, '')) || 0
        : parseInt(String(valueA)) || 0;
      const numB = typeof valueB === 'string'
        ? parseInt(valueB.replace(/[^0-9]/g, '')) || 0
        : parseInt(String(valueB)) || 0;
      return directionMultiplier * (numA - numB);
    }

    // Float columns (fees)
    const floatColumns = ['maker_fee', 'taker_fee', 'futures_maker_fee', 'futures_taker_fee'];
    if (floatColumns.includes(column)) {
      // Extract number from strings like "0.10%" or "0.10% to 0.20%"
      const extractFloat = (val: string): number => {
        const match = val.match(/[\d.]+/);
        return match ? parseFloat(match[0]) : 0;
      };
      const numA = extractFloat(String(valueA));
      const numB = extractFloat(String(valueB));
      return directionMultiplier * (numA - numB);
    }

    // Boolean columns
    if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
      return directionMultiplier * (valueA === valueB ? 0 : valueA ? 1 : -1);
    }

    // String columns (default)
    return directionMultiplier * String(valueA).trim().localeCompare(String(valueB).trim());
  };
};


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
      // Parse integer values with support for "300+", "1M", "1B", "1K" formats
      const parseIntValue = (val: any): number => {
        if (typeof val === 'number') return val;
        const str = String(val).trim();
        
        // Handle "300+" format
        const plusMatch = str.match(/^(\d+)\+?$/);
        if (plusMatch) return parseInt(plusMatch[1]);
        
        // Handle "1M", "1B", "1K" format
        const suffixMatch = str.match(/^([\d.]+)([MBK])?$/i);
        if (suffixMatch) {
          const num = parseFloat(suffixMatch[1]);
          const suffix = suffixMatch[2]?.toUpperCase();
          if (suffix === 'M') return num * 1000000;
          if (suffix === 'B') return num * 1000000000;
          if (suffix === 'K') return num * 1000;
          return num;
        }
        
        // Fallback: extract all digits
        const digits = str.replace(/[^0-9]/g, '');
        return digits ? parseInt(digits) : 0;
      };
      
      const numA = parseIntValue(valueA);
      const numB = parseIntValue(valueB);
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

    // Boolean columns - handle both actual booleans and Yes/No strings
    const boolColumns = ['copy_trading', 'trading_bots', 'p2p_trading', 'staking_or_earn', 'mobile_app', '247_support', 'proof_of_reserves', 'uses_cold_storage', 'insurance_policy', '2fa', 'kyc', 'publicly_traded'];
    if (boolColumns.includes(column)) {
      const parseBoolean = (val: any): boolean => {
        if (typeof val === 'boolean') return val;
        const str = String(val).toLowerCase().trim();
        return str === 'yes' || str === 'true' || str === '1';
      };
      
      const boolA = parseBoolean(valueA);
      const boolB = parseBoolean(valueB);
      return directionMultiplier * (boolA === boolB ? 0 : boolA ? 1 : -1);
    }

    // String columns (default)
    return directionMultiplier * String(valueA).trim().localeCompare(String(valueB).trim());
  };
};

// Extract numeric value from fee string (handles "0.10%" or "0.10% to 0.20%")
const extractFeeValue = (feeString: string): number | null => {
  if (!feeString || feeString === 'N/A') return null;
  const match = feeString.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
};

// Calculate discounted fee
export const calculateDiscountedFee = (fee: string, discountPercent: string): string => {
  if (!fee || fee === 'N/A' || !discountPercent) return fee;
  
  // Extract discount percentage
  const discountMatch = discountPercent.match(/[\d.]+/);
  if (!discountMatch) return fee;
  const discount = parseFloat(discountMatch[0]) / 100; // Convert to decimal (e.g., 10% -> 0.1)
  
  // Check if fee is a range (e.g., "0.10% to 0.20%")
  if (fee.includes(' to ')) {
    const parts = fee.split(' to ');
    const minFee = extractFeeValue(parts[0]);
    const maxFee = extractFeeValue(parts[1]);
    
    if (minFee !== null && maxFee !== null) {
      const discountedMin = (minFee * (1 - discount)).toFixed(2);
      const discountedMax = (maxFee * (1 - discount)).toFixed(2);
      return `${discountedMin}% to ${discountedMax}%`;
    }
  } else {
    // Single value
    const feeValue = extractFeeValue(fee);
    if (feeValue !== null) {
      const discounted = (feeValue * (1 - discount)).toFixed(2);
      return `${discounted}%`;
    }
  }
  
  return fee; // Return original if we can't parse
};


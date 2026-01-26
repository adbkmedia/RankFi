import { Exchange } from '../types/exchange';

export interface ValidationIssue {
  exchange: string;
  field: string;
  issue: string;
  currentValue: any;
  suggestedValue?: any;
  severity: 'error' | 'warning' | 'info';
}

export interface ValidationResult {
  issues: ValidationIssue[];
  summary: {
    total: number;
    errors: number;
    warnings: number;
    info: number;
  };
}

// Boolean columns that should be consistent
const booleanColumns = [
  'copy_trading',
  'trading_bots',
  'p2p_trading',
  'staking_or_earn',
  'mobile_app',
  '247_support',
  'proof_of_reserves',
  'uses_cold_storage',
  'insurance_policy',
  '2fa',
  'kyc',
  'publicly_traded',
];

// Integer columns
const integerColumns = [
  'coins',
  'number_of_futures',
  'max_leverage',
  'margin_spot',
  'founded',
  'fiat_currencies',
];

// Float columns
const floatColumns = [
  'maker_fee',
  'taker_fee',
  'futures_maker_fee',
  'futures_taker_fee',
];

// Required fields
const requiredFields = ['app_name', 'website'];

// Check if value is a valid boolean format
const isValidBooleanFormat = (value: any): boolean => {
  if (typeof value === 'boolean') return true;
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    return lower === 'yes' || lower === 'no' || lower === 'true' || lower === 'false';
  }
  return false;
};

// Check if value is a valid integer
const isValidInteger = (value: any): boolean => {
  if (typeof value === 'number' && Number.isInteger(value)) return true;
  if (typeof value === 'string') {
    // Allow formats like "300+", "1M", "1B", "1K"
    const match = value.match(/^(\d+)\+?$|^([\d.]+)([MBK])?$/i);
    return match !== null;
  }
  return false;
};

// Check if value is a valid float
const isValidFloat = (value: any): boolean => {
  if (typeof value === 'number') return true;
  if (typeof value === 'string') {
    // Allow formats like "0.10%", "0.10% to 0.20%"
    const match = value.match(/[\d.]+/);
    return match !== null;
  }
  return false;
};

// Normalize boolean value
const normalizeBoolean = (value: any): boolean | string => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    if (lower === 'yes' || lower === 'true' || lower === '1') return true;
    if (lower === 'no' || lower === 'false' || lower === '0') return false;
  }
  return value; // Return original if can't normalize
};

// Validate exchanges data
export const validateExchanges = (exchanges: Exchange[]): ValidationResult => {
  const issues: ValidationIssue[] = [];

  exchanges.forEach((exchange) => {
    const exchangeName = exchange.app_name || 'Unknown';

    // Check required fields
    requiredFields.forEach((field) => {
      const value = exchange[field as keyof Exchange];
      if (value === null || value === undefined || value === '') {
        issues.push({
          exchange: exchangeName,
          field,
          issue: `Missing required field: ${field}`,
          currentValue: value,
          severity: 'error',
        });
      }
    });

    // Check boolean columns
    booleanColumns.forEach((field) => {
      const value = exchange[field as keyof Exchange];
      if (value !== null && value !== undefined && value !== '') {
        if (!isValidBooleanFormat(value)) {
          const normalized = normalizeBoolean(value);
          issues.push({
            exchange: exchangeName,
            field,
            issue: `Invalid boolean format. Expected: true/false or Yes/No`,
            currentValue: value,
            suggestedValue: normalized,
            severity: 'warning',
          });
        }
      }
    });

    // Check integer columns
    integerColumns.forEach((field) => {
      const value = exchange[field as keyof Exchange];
      if (value !== null && value !== undefined && value !== '' && value !== 'N/A') {
        if (!isValidInteger(value)) {
          issues.push({
            exchange: exchangeName,
            field,
            issue: `Invalid integer format. Expected: number, "300+", "1M", "1B", or "1K"`,
            currentValue: value,
            severity: 'warning',
          });
        }
      }
    });

    // Check float columns
    floatColumns.forEach((field) => {
      const value = exchange[field as keyof Exchange];
      if (value !== null && value !== undefined && value !== '' && value !== 'N/A') {
        if (!isValidFloat(value)) {
          issues.push({
            exchange: exchangeName,
            field,
            issue: `Invalid float format. Expected: number or percentage string like "0.10%"`,
            currentValue: value,
            severity: 'warning',
          });
        }
      }
    });
  });

  // Calculate summary
  const errors = issues.filter((i) => i.severity === 'error').length;
  const warnings = issues.filter((i) => i.severity === 'warning').length;
  const info = issues.filter((i) => i.severity === 'info').length;

  return {
    issues,
    summary: {
      total: issues.length,
      errors,
      warnings,
      info,
    },
  };
};

// Log validation results to console
export const logValidationResults = (result: ValidationResult): void => {
  if (result.issues.length === 0) {
    console.log('✅ Data validation passed! No issues found.');
    return;
  }

  console.group('📊 Data Validation Results');
  console.log(`Total Issues: ${result.summary.total}`);
  console.log(`Errors: ${result.summary.errors}`);
  console.log(`Warnings: ${result.summary.warnings}`);
  console.log(`Info: ${result.summary.info}`);

  if (result.summary.errors > 0) {
    console.group('❌ Errors');
    result.issues
      .filter((i) => i.severity === 'error')
      .forEach((issue) => {
        console.error(`${issue.exchange}.${issue.field}: ${issue.issue}`, issue.currentValue);
      });
    console.groupEnd();
  }

  if (result.summary.warnings > 0) {
    console.group('⚠️ Warnings');
    result.issues
      .filter((i) => i.severity === 'warning')
      .forEach((issue) => {
        console.warn(
          `${issue.exchange}.${issue.field}: ${issue.issue}`,
          issue.currentValue,
          issue.suggestedValue ? `→ Suggested: ${issue.suggestedValue}` : ''
        );
      });
    console.groupEnd();
  }

  console.groupEnd();
};

// Get validation report as formatted string
export const getValidationReport = (result: ValidationResult): string => {
  if (result.issues.length === 0) {
    return '✅ Data validation passed! No issues found.';
  }

  let report = `📊 Data Validation Report\n`;
  report += `Total Issues: ${result.summary.total}\n`;
  report += `Errors: ${result.summary.errors}\n`;
  report += `Warnings: ${result.summary.warnings}\n`;
  report += `Info: ${result.summary.info}\n\n`;

  if (result.summary.errors > 0) {
    report += `❌ Errors:\n`;
    result.issues
      .filter((i) => i.severity === 'error')
      .forEach((issue) => {
        report += `  - ${issue.exchange}.${issue.field}: ${issue.issue}\n`;
      });
    report += `\n`;
  }

  if (result.summary.warnings > 0) {
    report += `⚠️ Warnings:\n`;
    result.issues
      .filter((i) => i.severity === 'warning')
      .forEach((issue) => {
        report += `  - ${issue.exchange}.${issue.field}: ${issue.issue}`;
        if (issue.suggestedValue !== undefined) {
          report += ` (Suggested: ${issue.suggestedValue})`;
        }
        report += `\n`;
      });
  }

  return report;
};

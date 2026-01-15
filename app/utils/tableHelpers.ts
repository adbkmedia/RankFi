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


'use client';

interface CheckIconProps {
  value: boolean | string | undefined;
}

/**
 * Simple checkmark/X icon component for Yes/No boolean values.
 * - Green checkmark for "Yes" values
 * - Red X for "No" values
 * Used for feature columns like Copy Trading, Trading Bots, etc.
 */
export default function CheckIcon({ value }: CheckIconProps) {
  // Normalize value to boolean
  const isYes = value === true || value === 'Yes' || value === 'yes';
  const isNo = value === false || value === 'No' || value === 'no';

  // Handle N/A or undefined
  if (!isYes && !isNo) {
    return <span className="text-[13px]">N/A</span>;
  }

  if (isYes) {
    return (
      <div className="flex items-center justify-center">
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  );
}

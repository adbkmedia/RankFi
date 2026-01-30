'use client';

import {
  PreviewLinkCard,
  PreviewLinkCardTrigger,
  PreviewLinkCardContent,
  PreviewLinkCardImage,
} from '@/components/animate-ui/components/radix/preview-link-card';
import { Z_INDEX } from '../constants/zIndex';

interface StatusBadgeProps {
  value: boolean | string | undefined;
  url?: string;
}

/**
 * Badge component for displaying Yes/No status values in the comparison table.
 * - Green pill badge for "Yes" values (bg #E6F7EA, text/dot #267C49)
 * - Red pill badge for "No" values (bg #FDEDED, text/dot #AF2626)
 * - If URL is provided, wraps in PreviewLinkCard for hover preview with underline
 * - If no URL, displays as plain badge with no hover effects
 */
export default function StatusBadge({ value, url }: StatusBadgeProps) {
  // Normalize value to boolean
  const isYes = value === true || value === 'Yes' || value === 'yes';
  const isNo = value === false || value === 'No' || value === 'no';

  // Handle N/A or undefined
  if (!isYes && !isNo) {
    return <span className="text-[13px]">N/A</span>;
  }

  const styles = isYes
    ? {
        color: '#059669',
        dotFill: '#10B981',
        dotRing: '#A7F3D0',
      }
    : {
        color: '#DC2626',
        dotFill: '#EF4444',
        dotRing: '#FECACA',
      };

  const text = isYes ? 'Yes' : 'No';

  const badgeContent = (hasUrl: boolean) => (
    <span
      className={`inline-flex items-center gap-[4px] text-[13px] ${
        hasUrl ? 'hover:underline' : ''
      }`}
      style={{ color: styles.color }}
    >
      {/* Dot with outer ring */}
      <span
        className="shrink-0 rounded-full flex items-center justify-center"
        style={{
          width: '9px',
          height: '9px',
          backgroundColor: styles.dotRing,
        }}
      >
        <span
          className="rounded-full"
          style={{
            width: '6px',
            height: '6px',
            backgroundColor: styles.dotFill,
          }}
        />
      </span>
      {/* Fixed width text for consistent width */}
      <span className="w-[18px] text-center">{text}</span>
    </span>
  );

  // If URL exists, wrap in PreviewLinkCard
  if (url) {
    return (
      <PreviewLinkCard href={url}>
        <PreviewLinkCardTrigger
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          {badgeContent(true)}
        </PreviewLinkCardTrigger>
        <PreviewLinkCardContent
          side="top"
          align="center"
          sideOffset={8}
          className="p-0 bg-white border border-gray-200 shadow-xl max-w-xs overflow-hidden"
          style={{ zIndex: Z_INDEX.previewCard }}
        >
          <div className="relative">
            <PreviewLinkCardImage
              alt="Link preview"
              className="w-full h-auto max-h-32 object-cover"
            />
            <div className="p-3 bg-white border-t border-gray-200">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {new URL(url).hostname.replace('www.', '')}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {url.length > 50 ? `${url.substring(0, 50)}...` : url}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </div>
          </div>
        </PreviewLinkCardContent>
      </PreviewLinkCard>
    );
  }

  // No URL - return plain badge
  return badgeContent(false);
}

'use client';

import {
  PreviewLinkCard,
  PreviewLinkCardTrigger,
  PreviewLinkCardContent,
  PreviewLinkCardImage,
} from '@/components/animate-ui/components/radix/preview-link-card';
import { Z_INDEX } from '../constants/zIndex';

interface IncidentBadgeProps {
  value: string;
  url?: string | string[];
  type: 'hack' | 'incident';
}

/**
 * Badge component for displaying hacks and incidents in the comparison table.
 * - Red badges for hacks (bg-red-100 with text-red-800) - darker red background
 * - Yellow badges for incidents (bg-yellow-100 with text-yellow-800) - darker yellow background
 * - If URL is provided, wraps in PreviewLinkCard for hover preview
 * - If no URL, displays as plain badge (backward compatible)
 * - Multiple values (e.g., "2023, 2025") are split into separate badges
 * - Badges underline on hover when they have URLs
 * - Preview card shows image + domain + truncated URL with external link icon
 */
export default function IncidentBadge({ value, url, type }: IncidentBadgeProps) {
  // Don't render if value is 'No' or empty
  if (!value || value === 'No' || value === 'N/A') {
    return <span className="text-[13px]">No</span>;
  }

  // Split value by comma to handle multiple incidents/hacks
  const values = value.split(',').map(v => v.trim()).filter(v => v.length > 0);
  
  // Determine badge styling based on type - darker colors to match reference
  const badgeClasses =
    type === 'hack'
      ? 'bg-red-100 text-red-800 hover:bg-red-200 hover:underline'
      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:underline';

  // Handle URLs - convert to array if single string
  const urlArray = url ? (Array.isArray(url) ? url : [url]) : [];

  // Helper to extract domain from URL
  const getDomain = (urlString: string) => {
    try {
      return new URL(urlString).hostname.replace('www.', '');
    } catch {
      return urlString;
    }
  };

  // Render each value as a separate badge
  return (
    <div className="flex items-center justify-center gap-1.5 flex-nowrap">
      {values.map((val, index) => {
        const urlForThisBadge = urlArray[index] || urlArray[0] || null;
        
        const badgeContent = (
          <span
            className={`inline-block px-2 py-0.5 rounded text-[13px] font-medium transition-colors ${badgeClasses}`}
          >
            {val}
          </span>
        );

        // If URL exists for this index, wrap in PreviewLinkCard with Variation 2 styling
        if (urlForThisBadge) {
          return (
            <PreviewLinkCardWrapper 
              key={index} 
              href={urlForThisBadge}
              badgeContent={badgeContent}
              urlForThisBadge={urlForThisBadge}
              getDomain={getDomain}
            />
          );
        }

        // No URL - return plain badge
        return <span key={index}>{badgeContent}</span>;
      })}
    </div>
  );
}

// Separate component to handle PreviewLinkCard with logging
function PreviewLinkCardWrapper({ 
  href, 
  badgeContent, 
  urlForThisBadge, 
  getDomain 
}: { 
  href: string; 
  badgeContent: React.ReactNode; 
  urlForThisBadge: string; 
  getDomain: (url: string) => string;
}) {

  return (
    <PreviewLinkCard href={href}>
      <PreviewLinkCardTrigger
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        {badgeContent}
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
            alt="Article preview" 
            className="w-full h-auto max-h-32 object-cover"
          />
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">
                  {getDomain(urlForThisBadge)}
                </p>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {urlForThisBadge.length > 50 ? `${urlForThisBadge.substring(0, 50)}...` : urlForThisBadge}
                </p>
              </div>
              <svg 
                className="w-4 h-4 text-gray-400 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        </div>
      </PreviewLinkCardContent>
    </PreviewLinkCard>
  );
}

'use client';

import {
  PreviewLinkCard,
  PreviewLinkCardTrigger,
  PreviewLinkCardContent,
  PreviewLinkCardImage,
} from '@/components/animate-ui/components/radix/preview-link-card';
import { Z_INDEX } from '../constants/zIndex';

interface LinkPreviewCellProps {
  url: string;
  label: string;
}

/**
 * Reusable cell component that shows a link with hover preview card.
 * Used for Website, Proof of Reserves, and Insurance Policy columns.
 * In the future, this will be replaced for all external links sitewide.
 */
export const LinkPreviewCell = ({ url, label }: LinkPreviewCellProps) => (
  <PreviewLinkCard href={url}>
    <PreviewLinkCardTrigger
      target="_blank"
      rel="noopener noreferrer"
      className="text-rankfi-teal hover:underline"
    >
      {label}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </div>
    </PreviewLinkCardContent>
  </PreviewLinkCard>
);

export default LinkPreviewCell;

'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import Link from 'next/link';

/**
 * Tooltip component for displaying helpful information on hover or tap.
 * 
 * @param variant - Visual style variant: 'default' (dark), 'info' (blue), or 'warning' (amber)
 * @param position - Preferred position: 'top' or 'bottom' (auto-adjusts if would overflow)
 * @param align - Horizontal alignment: 'left', 'right', or 'auto' (defaults to right)
 * @param content - Main tooltip text content
 * @param linkText - Optional link text to display below content
 * @param linkUrl - Optional URL for the link
 * 
 * @remarks
 * - Z-index is set to 50. Increase if tooltips appear behind modals (z-100) or other overlays.
 * - On mobile, tooltip shows on tap and stays visible until tapped again or outside.
 * - Viewport edge detection automatically prevents overflow on all screen sizes.
 */
interface TooltipProps {
  children: ReactNode;
  content: string;
  linkText?: string;
  linkUrl?: string;
  position?: 'top' | 'bottom';
  align?: 'left' | 'right' | 'auto';
  variant?: 'default' | 'info' | 'warning';
  zIndex?: number;
}

const variantStyles = {
  default: {
    bg: 'bg-gray-900',
    text: 'text-white',
    arrow: 'bg-gray-900',
    link: 'text-rankfi-teal hover:underline',
  },
  info: {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    arrow: 'bg-blue-50',
    link: 'text-blue-600 hover:underline',
  },
  warning: {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    arrow: 'bg-amber-50',
    link: 'text-amber-600 hover:underline',
  },
} as const;

// Simplified alignment lookup - replaces getAlignmentClasses function
const alignmentMap = {
  left: { tooltip: 'left-1/2 -translate-x-1/2', arrow: 'left-1/2 -translate-x-1/2' },
  right: { tooltip: 'right-0', arrow: 'right-4' },
  auto: { tooltip: 'right-0', arrow: 'right-4' },
} as const;

export default function Tooltip({
  children,
  content,
  linkText,
  linkUrl,
  position = 'top',
  align = 'auto',
  variant = 'default',
  zIndex = 50,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState<{ top?: number; left?: number; right?: number }>({});
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const styles = variantStyles[variant];
  const alignment = alignmentMap[align] || alignmentMap.auto;

  // Mobile touch support: tap to show, tap again or outside to hide
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsVisible((prev) => !prev);
  };

  // Click outside detection for mobile
  useEffect(() => {
    if (!isVisible) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      };
  }, [isVisible]);

  // Viewport edge detection to prevent overflow
  useEffect(() => {
    if (!isVisible || !tooltipRef.current) {
      setAdjustedPosition({});
      return;
    }

    const adjustPosition = () => {
      if (!tooltipRef.current) return;

      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 8; // Minimum distance from viewport edge

      const adjustments: { top?: number; left?: number; right?: number } = {};

      // Check horizontal overflow
      if (tooltipRect.right > viewportWidth - padding) {
        // Overflowing right - position from right edge
        adjustments.right = padding;
        adjustments.left = undefined;
      } else if (tooltipRect.left < padding) {
        // Overflowing left - position from left edge
        adjustments.left = padding;
        adjustments.right = undefined;
      }

      // Check vertical overflow
      if (tooltipRect.bottom > viewportHeight - padding) {
        // Overflowing bottom - adjust to fit above
        adjustments.top = viewportHeight - tooltipRect.height - padding;
      } else if (tooltipRect.top < padding) {
        // Overflowing top - adjust to fit below
        adjustments.top = padding;
    }

      setAdjustedPosition(adjustments);
    };

    // Small delay to ensure tooltip is rendered
    const timeoutId = setTimeout(adjustPosition, 10);
    
    // Recalculate on resize/scroll
    window.addEventListener('resize', adjustPosition);
    window.addEventListener('scroll', adjustPosition, true);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', adjustPosition);
      window.removeEventListener('scroll', adjustPosition, true);
    };
  }, [isVisible, position, align]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onTouchStart={handleTouchStart}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute ${
            position === 'top' ? 'bottom-full pb-1' : 'top-full pt-1'
          } ${alignment.tooltip} w-64 max-w-[calc(100vw-2rem)] ${styles.bg} ${styles.text} text-xs rounded-lg shadow-xl`}
          style={{
            padding: '12px',
            paddingBottom: '12px',
            zIndex: zIndex,
            ...adjustedPosition,
          }}
        >
          <p className="m-0 leading-normal" style={{ marginBottom: linkText && linkUrl ? '8px' : '0px', paddingBottom: '0px' }}>
            {content}
          </p>
          {linkText && linkUrl && (
            <div 
              className="block"
              style={{ marginTop: '0px', marginBottom: '0px', paddingTop: '0px', paddingBottom: '0px' }}
            >
            <Link
              href={linkUrl}
                className={`${styles.link} font-medium leading-normal`}
                style={{ margin: '0', padding: '0', display: 'inline-block' }}
              onClick={(e) => e.stopPropagation()}
            >
              {linkText} →
            </Link>
            </div>
          )}
          {/* Tooltip Arrow */}
          <div
            className={`absolute ${
              position === 'top' ? '-bottom-1' : '-top-1'
            } ${alignment.arrow} w-2 h-2 ${styles.arrow} rotate-45`}
          />
        </div>
      )}
    </div>
  );
}

'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Z_INDEX } from '../constants/zIndex';

/**
 * TableTooltip component for displaying tooltips inside table cells.
 * Uses Radix UI Tooltip with portal rendering to escape table cell overflow constraints.
 * 
 * @param variant - Visual style variant: 'default' (dark), 'info' (blue), or 'warning' (amber)
 * @param position - Preferred position: 'top' or 'bottom'
 * @param align - Horizontal alignment: 'start' (left), 'center', or 'end' (right)
 * @param content - Main tooltip text content
 * @param linkText - Optional link text to display below content
 * @param linkUrl - Optional URL for the link
 * @param zIndex - Z-index for tooltip (default: Z_INDEX.tooltip to appear above table)
 */
interface TableTooltipProps {
  children: ReactNode;
  content: string;
  linkText?: string;
  linkUrl?: string;
  position?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  variant?: 'default' | 'info' | 'warning';
  zIndex?: number;
}

const variantStyles = {
  default: {
    bg: 'bg-gray-900',
    text: 'text-white',
    arrow: 'fill-gray-900',
    link: 'text-rankfi-teal hover:underline',
  },
  info: {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    arrow: 'fill-blue-50',
    link: 'text-blue-600 hover:underline',
  },
  warning: {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    arrow: 'fill-amber-50',
    link: 'text-amber-600 hover:underline',
  },
} as const;

export default function TableTooltip({
  children,
  content,
  linkText,
  linkUrl,
  position = 'top',
  align = 'center',
  variant = 'default',
  zIndex = Z_INDEX.tooltip,
}: TableTooltipProps) {
  const styles = variantStyles[variant];

  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={position}
            sideOffset={5}
            align={align}
            alignOffset={0}
            collisionPadding={8}
            avoidCollisions={true}
            arrowPadding={8}
            className={`${styles.bg} ${styles.text} text-xs rounded-lg shadow-xl px-3 py-3 max-w-[256px]`}
            style={{ zIndex }}
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
            <TooltipPrimitive.Arrow className={styles.arrow} width={10} height={6} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

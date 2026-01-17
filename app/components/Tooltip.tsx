'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';

interface TooltipProps {
  children: ReactNode;
  content: string;
  linkText?: string;
  linkUrl?: string;
  position?: 'top' | 'bottom';
  align?: 'left' | 'right' | 'auto';
}

export default function Tooltip({
  children,
  content,
  linkText,
  linkUrl,
  position = 'top',
  align = 'auto',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Determine alignment classes
  const getAlignmentClasses = () => {
    if (align === 'left') {
      return {
        tooltip: 'left-1/2 -translate-x-1/2',
        arrow: 'left-1/2 -translate-x-1/2',
      };
    } else if (align === 'right') {
      return {
        tooltip: 'right-0',
        arrow: 'right-4',
      };
    } else {
      // auto defaults to right for backward compatibility
      return {
        tooltip: 'right-0',
        arrow: 'right-4',
      };
    }
  };

  const alignment = getAlignmentClasses();

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute ${
            position === 'top' ? 'bottom-full pb-1' : 'top-full pt-1'
          } ${alignment.tooltip} w-64 max-w-[calc(100vw-2rem)] bg-gray-900 text-white text-xs rounded-lg shadow-xl z-50`}
          style={{ padding: '12px', paddingBottom: '12px' }}
        >
          <p className="m-0 leading-normal" style={{ marginBottom: linkText && linkUrl ? '8px' : '0px', paddingBottom: '0px' }}>{content}</p>
          {linkText && linkUrl && (
            <div 
              className="block"
              style={{ marginTop: '0px', marginBottom: '0px', paddingTop: '0px', paddingBottom: '0px' }}
            >
              <Link
                href={linkUrl}
                className="text-rankfi-teal hover:underline font-medium leading-normal"
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
            } ${alignment.arrow} w-2 h-2 bg-gray-900 rotate-45`}
          />
        </div>
      )}
    </div>
  );
}

'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';
import { Z_INDEX } from '../constants/zIndex';
import { getCurrencyInfo } from '../constants/fiatCurrencies';

interface FiatCurrencyTooltipProps {
  children: ReactNode;
  currencies: string[];
  position?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
}

export default function FiatCurrencyTooltip({
  children,
  currencies,
  position = 'top',
  align = 'center',
}: FiatCurrencyTooltipProps) {
  if (currencies.length === 0) {
    return <>{children}</>;
  }

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
            className="bg-gray-900 text-white text-xs rounded-lg shadow-xl px-3 py-3 max-w-[280px]"
            style={{ zIndex: Z_INDEX.tooltip }}
          >
            {/* Currency Grid */}
            <div className="grid grid-cols-3 gap-x-3 gap-y-1.5">
              {currencies.map((code) => {
                const { flag } = getCurrencyInfo(code);
                return (
                  <div
                    key={code}
                    className="flex items-center gap-1.5 text-white"
                  >
                    <span className="text-sm">{flag}</span>
                    <span className="text-xs font-medium">{code}</span>
                  </div>
                );
              })}
            </div>

            <TooltipPrimitive.Arrow className="fill-gray-900" width={10} height={6} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

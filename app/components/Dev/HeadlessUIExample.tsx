'use client';

import { Menu } from '@headlessui/react';

/**
 * Example component showing how to use Headless UI with Tailwind customization
 * 
 * This demonstrates:
 * - Using Headless UI Menu component
 * - Styling with Tailwind to match RankFi design
 * - Full customization while keeping accessibility
 * 
 * To use in your components:
 * 1. Import: import { Menu } from '@headlessui/react'
 * 2. Style with your Tailwind classes
 * 3. Match your design tokens (rankfi-* colors)
 */
export default function HeadlessUIExample() {
  return (
    <div className="p-8 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Headless UI Example - Customized with Tailwind</h3>
      
      <Menu as="div" className="relative inline-block">
        {/* Button - Styled with RankFi design tokens */}
        <Menu.Button className="bg-rankfi-gray text-white px-5 py-2 rounded-full text-[13px] font-medium hover:bg-[#3a3a3a] transition-colors flex items-center gap-2">
          Options
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Menu.Button>

        {/* Dropdown Menu - Styled with RankFi design tokens */}
        <Menu.Items className="absolute right-0 mt-2 w-56 bg-white border border-rankfi-border rounded-lg shadow-lg z-50">
          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={`${
                    active ? 'bg-rankfi-light-gray text-gray-900' : 'text-gray-700'
                  } flex items-center gap-3 px-4 py-2.5 text-sm transition-colors`}
                >
                  <svg className="w-5 h-5 text-rankfi-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Crypto Exchanges
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={`${
                    active ? 'bg-rankfi-light-gray text-gray-900' : 'text-gray-700'
                  } flex items-center gap-3 px-4 py-2.5 text-sm transition-colors`}
                >
                  <svg className="w-5 h-5 text-rankfi-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Hardware Wallets
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={`${
                    active ? 'bg-rankfi-light-gray text-gray-900' : 'text-gray-700'
                  } flex items-center gap-3 px-4 py-2.5 text-sm transition-colors`}
                >
                  <svg className="w-5 h-5 text-rankfi-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  DEX Platforms
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>

      <div className="mt-6 p-4 bg-white border border-rankfi-border rounded-lg">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Key Points:</strong>
        </p>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Headless UI provides the structure and accessibility</li>
          <li>You style everything with Tailwind classes</li>
          <li>Uses RankFi design tokens (rankfi-gray, rankfi-teal, etc.)</li>
          <li>Matches your existing design system</li>
          <li>Accessible by default (keyboard navigation, ARIA attributes)</li>
        </ul>
      </div>
    </div>
  );
}

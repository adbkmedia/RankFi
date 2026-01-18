'use client';

import { Menu, Dialog, TabGroup, TabList, Tab, TabPanels, TabPanel, Disclosure } from '@headlessui/react';
import { useState } from 'react';
import FilterButton from './FilterButton';

export default function StyleGuide() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
      {/* Header */}
      <div className="border-b pb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">RankFi Style Guide</h1>
        <p className="text-base text-gray-600 max-w-3xl">
          Complete design system reference for RankFi. Use this page to see all available components, 
          colors, typography, and spacing. All components are styled with Tailwind CSS and use RankFi design tokens.
        </p>
      </div>

      {/* Typography Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Typography</h2>
        <div className="space-y-8">
          {/* Headings */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Headings</h3>
            <div className="space-y-4 bg-white p-6 rounded-lg border border-rankfi-border">
              <div>
                <p className="text-xs text-gray-500 mb-2">H1 - Hero Title (text-2xl md:text-3xl lg:text-4xl font-bold)</p>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  Top Crypto Exchanges Compared (2026)
                </h1>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">H2 - Section Title (text-xl font-bold)</p>
                <h2 className="text-xl font-bold text-gray-900">Top Picks</h2>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">H3 - Subsection (text-lg font-semibold)</p>
                <h3 className="text-lg font-semibold text-gray-900">Features Comparison</h3>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">H4 (text-base font-semibold)</p>
                <h4 className="text-base font-semibold text-gray-900">Security Metrics</h4>
              </div>
            </div>
          </div>

          {/* Body Text */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Body Text</h3>
            <div className="space-y-4 bg-white p-6 rounded-lg border border-rankfi-border">
              <div>
                <p className="text-xs text-gray-500 mb-2">Base (text-base / 16px)</p>
                <p className="text-base text-gray-700 leading-relaxed">
                  A summary of the top cryptocurrency exchanges around the world. Analyze 30+ features like supported coins, security metrics, and fee transparency to find your best fit.
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Small (text-sm / 14px)</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  A summary of the top cryptocurrency exchanges around the world. Analyze 30+ features like supported coins, security metrics, and fee transparency to find your best fit.
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Table Body (text-[13px] / 13px)</p>
                <p className="text-[13px] text-gray-700 leading-relaxed">
                  A summary of the top cryptocurrency exchanges around the world. Analyze 30+ features like supported coins, security metrics, and fee transparency to find your best fit.
                </p>
              </div>
            </div>
          </div>

          {/* Font Weights */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Font Weights</h3>
            <div className="space-y-3 bg-white p-6 rounded-lg border border-rankfi-border">
              <p className="text-base font-normal text-gray-700">Normal (400) - Body text</p>
              <p className="text-base font-medium text-gray-700">Medium (500) - Emphasis</p>
              <p className="text-base font-semibold text-gray-700">Semibold (600) - Headers</p>
              <p className="text-base font-bold text-gray-700">Bold (700) - Strong emphasis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Color Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Brand Colors */}
          <div className="bg-white p-6 rounded-lg border border-rankfi-border">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Brand Colors</h3>
            <div className="space-y-3">
              <div>
                <div className="w-full h-16 bg-rankfi-teal rounded mb-2 border border-gray-200"></div>
                <p className="text-sm font-medium text-gray-900">RankFi Teal</p>
                <p className="text-xs text-gray-500">#00a38f</p>
                <p className="text-xs text-gray-500 mt-1">bg-rankfi-teal</p>
              </div>
              <div>
                <div className="w-full h-16 bg-rankfi-dark rounded mb-2 border border-gray-200"></div>
                <p className="text-sm font-medium text-gray-900">RankFi Dark</p>
                <p className="text-xs text-gray-500">#0a0a0a</p>
                <p className="text-xs text-gray-500 mt-1">bg-rankfi-dark</p>
              </div>
              <div>
                <div className="w-full h-16 bg-rankfi-gray rounded mb-2 border border-gray-200"></div>
                <p className="text-sm font-medium text-gray-900">RankFi Gray</p>
                <p className="text-xs text-gray-500">#2d2d2d</p>
                <p className="text-xs text-gray-500 mt-1">bg-rankfi-gray</p>
              </div>
            </div>
          </div>

          {/* Background Colors */}
          <div className="bg-white p-6 rounded-lg border border-rankfi-border">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Background Colors</h3>
            <div className="space-y-3">
              <div>
                <div className="w-full h-16 bg-rankfi-light-gray rounded mb-2 border border-gray-200"></div>
                <p className="text-sm font-medium text-gray-900">Light Gray</p>
                <p className="text-xs text-gray-500">#f0f0f0</p>
                <p className="text-xs text-gray-500 mt-1">bg-rankfi-light-gray</p>
              </div>
              <div>
                <div className="w-full h-16 bg-rankfi-hover-gray rounded mb-2 border border-gray-200"></div>
                <p className="text-sm font-medium text-gray-900">Hover Gray</p>
                <p className="text-xs text-gray-500">#e0e0e0</p>
                <p className="text-xs text-gray-500 mt-1">bg-rankfi-hover-gray</p>
              </div>
              <div>
                <div className="w-full h-16 bg-rankfi-page-bg rounded mb-2 border border-gray-200"></div>
                <p className="text-sm font-medium text-gray-900">Page Background</p>
                <p className="text-xs text-gray-500">#fafafa</p>
                <p className="text-xs text-gray-500 mt-1">bg-rankfi-page-bg</p>
              </div>
            </div>
          </div>

          {/* Text Colors */}
          <div className="bg-white p-6 rounded-lg border border-rankfi-border">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Text Colors</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-rankfi-text-black mb-1">Text Black</p>
                <p className="text-xs text-gray-500">#000000</p>
                <p className="text-xs text-gray-500 mt-1">text-rankfi-text-black</p>
              </div>
              <div>
                <p className="text-sm font-medium text-rankfi-text-dark-gray mb-1">Text Dark Gray</p>
                <p className="text-xs text-gray-500">#333333</p>
                <p className="text-xs text-gray-500 mt-1">text-rankfi-text-dark-gray</p>
              </div>
              <div>
                <p className="text-sm font-medium text-rankfi-text-light-gray mb-1">Text Light Gray</p>
                <p className="text-xs text-gray-500">#666666</p>
                <p className="text-xs text-gray-500 mt-1">text-rankfi-text-light-gray</p>
              </div>
              <div>
                <p className="text-sm font-medium text-rankfi-text-white bg-rankfi-gray px-2 py-1 rounded mb-1 inline-block">Text White</p>
                <p className="text-xs text-gray-500">#ffffff</p>
                <p className="text-xs text-gray-500 mt-1">text-rankfi-text-white</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing Scale */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Spacing Scale</h2>
        <div className="bg-white p-6 rounded-lg border border-rankfi-border">
          <div className="space-y-4">
            {[1, 2, 3, 4, 6, 8, 12, 16, 20, 24].map((size) => (
              <div key={size} className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-600 font-mono">gap-{size}</div>
                <div className="flex-1 flex items-center">
                  <div className="bg-rankfi-teal" style={{ width: `${size * 0.25}rem`, height: '1rem' }}></div>
                  <div className="text-xs text-gray-500 ml-2">{size * 0.25}rem / {size * 4}px</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Buttons</h2>
        <div className="bg-white p-6 rounded-lg border border-rankfi-border space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter Buttons</h3>
            <div className="flex flex-wrap gap-2">
              <FilterButton label="Global" emoji="🌍" />
              <FilterButton label="Futures" emoji="📊" isActive />
              <FilterButton label="No KYC" emoji="🥷" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Action Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2 rounded-full text-sm font-medium bg-rankfi-gray text-white hover:bg-[#3a3a3a] transition-colors">
                Primary Button
              </button>
              <button className="px-5 py-2 rounded-full text-sm font-medium bg-rankfi-light-gray text-gray-900 hover:bg-rankfi-hover-gray transition-colors">
                Secondary Button
              </button>
              <button className="px-5 py-2 rounded-full text-sm font-medium border border-rankfi-border text-gray-900 hover:bg-rankfi-light-gray transition-colors">
                Outline Button
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Headless UI Components */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Headless UI Components</h2>
        <p className="text-sm text-gray-600 mb-6">
          These components provide accessibility and functionality. Style them with Tailwind to match your design.
        </p>

        <div className="space-y-8">
          {/* Menu Example */}
          <div className="bg-white p-6 rounded-lg border border-rankfi-border">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Menu (Dropdown)</h3>
            <p className="text-sm text-gray-600 mb-4">
              Accessible dropdown menu. <a href="https://headlessui.com/react/menu" target="_blank" rel="noopener noreferrer" className="text-rankfi-teal hover:underline">View Docs →</a>
            </p>
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="bg-rankfi-gray text-white px-5 py-2 rounded-full text-[13px] font-medium hover:bg-[#3a3a3a] transition-colors flex items-center gap-2">
                Options
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Menu.Button>
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
                </div>
              </Menu.Items>
            </Menu>
          </div>

          {/* Dialog Example */}
          <div className="bg-white p-6 rounded-lg border border-rankfi-border">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Dialog (Modal)</h3>
            <p className="text-sm text-gray-600 mb-4">
              Accessible modal dialog. <a href="https://headlessui.com/react/dialog" target="_blank" rel="noopener noreferrer" className="text-rankfi-teal hover:underline">View Docs →</a>
            </p>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="px-5 py-2 rounded-full text-sm font-medium bg-rankfi-gray text-white hover:bg-[#3a3a3a] transition-colors"
            >
              Open Dialog
            </button>
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-50">
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-xl">
                  <Dialog.Title className="text-lg font-bold text-gray-900 mb-2">
                    Example Dialog
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-gray-600 mb-4">
                    This is an example of a Headless UI Dialog component, styled with Tailwind to match your design.
                  </Dialog.Description>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsDialogOpen(false)}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-rankfi-gray text-white hover:bg-[#3a3a3a] transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setIsDialogOpen(false)}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-rankfi-light-gray text-gray-900 hover:bg-rankfi-hover-gray transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </Dialog>
          </div>

          {/* Tabs Example */}
          <div className="bg-white p-6 rounded-lg border border-rankfi-border">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Tabs</h3>
            <p className="text-sm text-gray-600 mb-4">
              Accessible tab interface. <a href="https://headlessui.com/react/tabs" target="_blank" rel="noopener noreferrer" className="text-rankfi-teal hover:underline">View Docs →</a>
            </p>
            <TabGroup>
              <TabList className="flex gap-2 border-b border-rankfi-border">
                <Tab className={({ selected }) =>
                  `px-4 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? 'text-rankfi-teal border-b-2 border-rankfi-teal'
                      : 'text-gray-600 hover:text-gray-900'
                  }`
                }>
                  Features
                </Tab>
                <Tab className={({ selected }) =>
                  `px-4 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? 'text-rankfi-teal border-b-2 border-rankfi-teal'
                      : 'text-gray-600 hover:text-gray-900'
                  }`
                }>
                  Security
                </Tab>
                <Tab className={({ selected }) =>
                  `px-4 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? 'text-rankfi-teal border-b-2 border-rankfi-teal'
                      : 'text-gray-600 hover:text-gray-900'
                  }`
                }>
                  Fees
                </Tab>
              </TabList>
              <TabPanels className="mt-4">
                <TabPanel className="text-sm text-gray-700">
                  Compare features across different exchanges including supported coins, trading pairs, and advanced order types.
                </TabPanel>
                <TabPanel className="text-sm text-gray-700">
                  Review security metrics including 2FA support, cold storage, insurance coverage, and regulatory compliance.
                </TabPanel>
                <TabPanel className="text-sm text-gray-700">
                  Analyze trading fees, withdrawal fees, deposit methods, and fee structures to find the most cost-effective option.
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>

          {/* Disclosure Example */}
          <div className="bg-white p-6 rounded-lg border border-rankfi-border">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Disclosure (Accordion)</h3>
            <p className="text-sm text-gray-600 mb-4">
              Expandable content sections. <a href="https://headlessui.com/react/disclosure" target="_blank" rel="noopener noreferrer" className="text-rankfi-teal hover:underline">View Docs →</a>
            </p>
            <div className="space-y-2">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-rankfi-light-gray px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-rankfi-hover-gray transition-colors">
                      <span>What is RankFi?</span>
                      <svg
                        className={`${open ? 'rotate-180' : ''} h-5 w-5 text-gray-500 transition-transform`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-700">
                      RankFi is a comprehensive comparison platform for cryptocurrency exchanges, helping users find the best options based on security, features, and fees.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-rankfi-light-gray px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-rankfi-hover-gray transition-colors">
                      <span>How do you compare exchanges?</span>
                      <svg
                        className={`${open ? 'rotate-180' : ''} h-5 w-5 text-gray-500 transition-transform`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-700">
                      We analyze 30+ data points including security metrics, supported coins, trading fees, withdrawal limits, and user reviews to provide comprehensive comparisons.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">External Resources</h2>
        <div className="bg-white p-6 rounded-lg border border-rankfi-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Headless UI</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://headlessui.com/" target="_blank" rel="noopener noreferrer" className="text-rankfi-teal hover:underline">
                    Documentation →
                  </a>
                </li>
                <li>
                  <a href="https://headlessui.com/react/menu" target="_blank" rel="noopener noreferrer" className="text-rankfi-teal hover:underline">
                    Menu Component →
                  </a>
                </li>
                <li>
                  <a href="https://headlessui.com/react/dialog" target="_blank" rel="noopener noreferrer" className="text-rankfi-teal hover:underline">
                    Dialog Component →
                  </a>
                </li>
                <li>
                  <a href="https://headlessui.com/react/tabs" target="_blank" rel="noopener noreferrer" className="text-rankfi-teal hover:underline">
                    Tabs Component →
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Tailwind UI</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://tailwindui.com/components" target="_blank" rel="noopener noreferrer" className="text-rankfi-teal hover:underline">
                    Component Examples →
                  </a>
                </li>
                <li>
                  <a href="https://tailwindui.com/components/application-ui/navigation" target="_blank" rel="noopener noreferrer" className="text-rankfi-teal hover:underline">
                    Navigation Examples →
                  </a>
                </li>
                <li>
                  <a href="https://tailwindui.com/components/application-ui/overlays" target="_blank" rel="noopener noreferrer" className="text-rankfi-teal hover:underline">
                    Overlay Examples →
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

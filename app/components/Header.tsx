'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [comparisonsOpen, setComparisonsOpen] = useState(false);
  const [rankingsOpen, setRankingsOpen] = useState(false);
  const [globalOpen, setGlobalOpen] = useState(false);

  return (
    <header className="bg-[#0a0a0a] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/images/logos/RankFi-Logo-V2.png" 
              alt="RankFi" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Navigation Links - Right Aligned */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {/* Comparisons Dropdown */}
            <div className="relative"
              onMouseEnter={() => setComparisonsOpen(true)}
              onMouseLeave={() => setComparisonsOpen(false)}
            >
              <button
                className="text-white hover:text-gray-300 transition-colors font-bold flex items-center gap-1 text-sm"
              >
                Comparisons
                <svg className={`w-3 h-3 transition-transform ${comparisonsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {comparisonsOpen && (
                <div 
                  className="absolute top-full right-0 pt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                >
                  <Link href="/best-crypto-exchanges" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                    <svg className="w-5 h-5 text-[#00a38f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Crypto Exchanges</span>
                  </Link>
                  <Link href="/hardware-wallets" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                    <svg className="w-5 h-5 text-[#00a38f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>Hardware Wallets</span>
                  </Link>
                  <Link href="/dex" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                    <svg className="w-5 h-5 text-[#00a38f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>DEX Platforms</span>
                  </Link>
                  <Link href="/crypto-leverage-exchanges" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                    <svg className="w-5 h-5 text-[#00a38f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span>Leverage Exchanges</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Rankings Dropdown */}
            <div className="relative"
              onMouseEnter={() => setRankingsOpen(true)}
              onMouseLeave={() => setRankingsOpen(false)}
            >
              <button
                className="text-white hover:text-gray-300 transition-colors font-bold flex items-center gap-1 text-sm"
              >
                Rankings
                <svg className={`w-3 h-3 transition-transform ${rankingsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {rankingsOpen && (
                <div 
                  className="absolute top-full right-0 pt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                >
                  <Link href="/rankings/top-exchanges" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                    <svg className="w-5 h-5 text-[#00a38f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span>Top Exchanges</span>
                  </Link>
                  <Link href="/rankings/security" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                    <svg className="w-5 h-5 text-[#00a38f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Security Rankings</span>
                  </Link>
                  <Link href="/rankings/fees" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                    <svg className="w-5 h-5 text-[#00a38f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Lowest Fees</span>
                  </Link>
                  <Link href="/rankings/volume" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                    <svg className="w-5 h-5 text-[#00a38f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                    <span>Trading Volume</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/resources"
              className="text-white hover:text-gray-300 transition-colors font-bold text-sm"
            >
              Resources
            </Link>
            <Link
              href="/blog"
              className="text-white hover:text-gray-300 transition-colors font-bold text-sm"
            >
              Blog
            </Link>

            {/* Global Dropdown */}
            <div className="relative"
              onMouseEnter={() => setGlobalOpen(true)}
              onMouseLeave={() => setGlobalOpen(false)}
            >
              <button
                className="text-white hover:text-gray-300 transition-colors font-bold flex items-center gap-1.5 text-sm px-3 py-1.5 rounded border border-gray-600 bg-[#1a1a1a] hover:bg-[#2a2a2a]"
              >
                Global
                <svg className={`w-3 h-3 transition-transform ${globalOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {globalOpen && (
                <div 
                  className="absolute top-full right-0 pt-1 w-48 bg-[#2d2d2d] rounded-lg shadow-xl border border-gray-600 py-2 z-50 overflow-hidden"
                >
                  <button className="flex items-center w-full text-left px-4 py-2.5 text-white hover:bg-[#3a3a3a] transition-colors text-sm bg-[#3a3a3a]">
                    <span>Global</span>
                  </button>
                  <button className="flex items-center w-full text-left px-4 py-2.5 text-white hover:bg-[#3a3a3a] transition-colors text-sm">
                    <span>Canada</span>
                  </button>
                  <button className="flex items-center w-full text-left px-4 py-2.5 text-white hover:bg-[#3a3a3a] transition-colors text-sm">
                    <span>USA</span>
                  </button>
                  <button className="flex items-center w-full text-left px-4 py-2.5 text-white hover:bg-[#3a3a3a] transition-colors text-sm">
                    <span>Australia</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}


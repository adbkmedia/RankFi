'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-[#00a38f] rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">RankFi</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/best-crypto-exchanges"
              className="text-gray-700 hover:text-[#00a38f] transition-colors font-medium"
            >
              Exchanges
            </Link>
            <Link
              href="/hardware-wallets"
              className="text-gray-700 hover:text-[#00a38f] transition-colors font-medium"
            >
              Hardware Wallets
            </Link>
            <Link
              href="/dex"
              className="text-gray-700 hover:text-[#00a38f] transition-colors font-medium"
            >
              DEX
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-[#00a38f] transition-colors font-medium"
            >
              About
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-[#00a38f] transition-colors"
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


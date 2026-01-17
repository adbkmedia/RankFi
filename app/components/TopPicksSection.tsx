'use client';

import Tooltip from './Tooltip';

const topPicks = [
  {
    name: 'Kraken PRO',
    badge: 'PRO',
    description: 'Best fiat on-ramp for most countries.',
    logoColor: 'purple',
  },
  {
    name: 'BINANCE',
    description: 'Best crypto exchange overall.',
    logoColor: 'yellow',
  },
  {
    name: 'BYBIT',
    description: 'Best platform for crypto trading.',
    logoColor: 'blue',
  },
];

export default function TopPicksSection() {
  return (
    <div className="relative py-7">
      {/* Background Image - Full Section */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/logos/BG Green chart.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-md font-normal text-gray-500">Top Picks</h2>
            <Tooltip
              content="Based on 2,450 data points below."
              linkText="See our methodology"
              linkUrl="/methodology"
              position="top"
              align="left"
            >
              <button
                className="w-3.5 h-3.5 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center hover:bg-gray-500 transition-colors cursor-help"
                aria-label="Top Picks information"
              >
                ?
              </button>
            </Tooltip>
          </div>
          <Tooltip
            content="RankFi earns revenue through affiliate partnerships. This does not affect our data or recommendations."
            linkText="View Disclosure Policy"
            linkUrl="/terms-of-service/"
            position="top"
            align="right"
          >
            <a
              href="/terms-of-service/"
              className="text-[#00a38f] hover:underline text-sm"
            >
              Affiliate Disclosure
            </a>
          </Tooltip>
        </div>

        {/* Exchange Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {topPicks.map((exchange, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg transition-shadow relative overflow-hidden"
            >
              {/* Card Content */}
              <div className="relative z-10">
                {/* Top Row: Logo/Name and Arrow Button */}
                <div className="flex items-start justify-between mb-3">
                  {/* Exchange Logo/Name */}
                  <div className="flex items-center flex-1">
                    {exchange.badge ? (
                      <>
                        <span className="text-xl font-bold text-purple-600 lowercase">
                          kraken
                        </span>
                        <span className="ml-2 bg-black text-white text-xs font-semibold px-2 py-0.5 rounded">
                          {exchange.badge}
                        </span>
                      </>
                    ) : exchange.logoColor === 'yellow' ? (
                      <span className="text-xl font-bold text-yellow-500">
                        {exchange.name}
                      </span>
                    ) : (
                      <span className="text-xl font-bold text-gray-900">
                        {exchange.name.split('').map((char, i) => (
                          <span key={i} className={char === 'I' ? 'text-yellow-500' : 'text-gray-900'}>
                            {char}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                  
                  {/* Arrow Button - Top Right */}
                  <button className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors bg-white shrink-0 ml-3">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {exchange.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


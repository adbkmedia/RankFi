'use client';

import TableTooltip from './TableTooltip';

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
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-md font-normal text-gray-500">Top Picks</h2>
            <TableTooltip
              content="Based on 2,450 data points below."
              linkText="See our methodology"
              linkUrl="/methodology"
              position="bottom"
              align="start"
              variant="default"
            >
              <button
                className="w-3.5 h-3.5 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center hover:bg-gray-500 transition-colors cursor-help"
                aria-label="Top Picks information"
              >
                ?
              </button>
            </TableTooltip>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/terms-of-service/"
              className="text-rankfi-teal hover:underline text-sm"
            >
              Affiliate Disclosure
            </a>
            <TableTooltip
              content="RankFi earns revenue through affiliate partnerships. This does not affect our data or recommendations."
              linkText="View Disclosure Policy"
              linkUrl="/terms-of-service/"
              position="bottom"
              align="end"
              variant="default"
            >
              <button
                className="w-3.5 h-3.5 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center hover:bg-gray-500 transition-colors cursor-help"
                aria-label="Affiliate Disclosure information"
              >
                ?
              </button>
          </TableTooltip>
          </div>
        </div>

        {/* Exchange Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {topPicks.map((exchange, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg transition-shadow relative overflow-hidden"
              id={`card-${idx}`}
              style={{
                backgroundImage: 'url(/images/logos/BG-Green-chart.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {/* Card Content */}
              <div className="relative z-10">
                {/* Top Row: Logo/Name */}
                <div className="flex items-center mb-3 pr-12" id={`top-row-${idx}`}>
                  {/* Exchange Logo/Name */}
                  <div className="flex items-center flex-1" id={`logo-container-${idx}`}>
                    {exchange.badge ? (
                      <>
                        <span className="text-xl font-bold text-purple-600 lowercase" id={`logo-text-${idx}`}>
                          kraken
                        </span>
                        <span className="ml-2 bg-black text-white text-xs font-semibold px-2 py-0.5 rounded" id={`badge-${idx}`}>
                          {exchange.badge}
                        </span>
                      </>
                    ) : exchange.logoColor === 'yellow' ? (
                      <span className="text-xl font-bold text-yellow-500" id={`logo-text-${idx}`}>
                        {exchange.name}
                      </span>
                    ) : (
                      <span className="text-xl font-bold text-gray-900" id={`logo-text-${idx}`}>
                        {exchange.name.split('').map((char, i) => (
                          <span key={i} className={char === 'I' ? 'text-yellow-500' : 'text-gray-900'}>
                            {char}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {exchange.description}
                </p>
                  </div>
                  
              {/* Arrow Button - Absolutely positioned, centered in card */}
              <button 
                className="absolute top-1/2 right-5 -translate-y-1/2 w-9 h-9 rounded-full border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors bg-white z-20" 
                id={`arrow-button-${idx}`}
              >
                    <svg
                  className="w-5 h-5 text-gray-300 rotate-315"
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
          ))}
        </div>
      </div>
    </div>
  );
}


'use client';

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
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Top Picks</h2>
          <a
            href="#"
            className="text-blue-600 hover:underline text-sm"
          >
            Affiliate Disclosure
          </a>
        </div>

        {/* Exchange Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {topPicks.map((exchange, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 200 100"
                  preserveAspectRatio="none"
                >
                  <polyline
                    points="0,80 20,60 40,70 60,40 80,50 100,30 120,45 140,25 160,35 180,20 200,40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="relative z-10">
                {/* Logo */}
                <div className="flex items-center mb-4">
                  {exchange.badge ? (
                    <>
                      <span
                        className={`text-2xl font-bold ${
                          exchange.logoColor === 'purple' ? 'text-purple-600' : ''
                        }`}
                      >
                        {exchange.name.split(' ')[0]}
                      </span>
                      <span className="ml-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                        {exchange.badge}
                      </span>
                    </>
                  ) : (
                    <span
                      className={`text-2xl font-bold ${
                        exchange.logoColor === 'yellow'
                          ? 'text-yellow-500'
                          : exchange.logoColor === 'blue'
                          ? 'text-blue-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {exchange.name}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 text-sm">
                  {exchange.description}
                </p>

                {/* Action Button */}
                <button className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-600"
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


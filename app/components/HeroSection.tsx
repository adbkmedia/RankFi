'use client';

export default function HeroSection() {
  const filterButtons = [
    { label: 'Global', icon: '🌍' },
    { label: 'Futures', icon: '📊' },
    { label: 'No KYC', icon: '🚫' },
    { label: 'CEXs', icon: '🏢' },
    { label: 'Perp DEXs', icon: '📈' },
    { label: 'Hardware Wallets', icon: '💼' },
  ];

  return (
    <div className="bg-gradient-to-br from-green-600 to-green-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-white rounded-lg rotate-12"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-white rounded-lg rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Top Crypto Exchanges Compared (2026)
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/90 text-center max-w-3xl mx-auto mb-8">
          A summary of the top cryptocurrency exchanges around the world. Analyze 30+ features like supported coins, security metrics, and fee transparency to find your best fit.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {filterButtons.map((button, idx) => (
            <button
              key={idx}
              className="bg-white text-gray-800 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>{button.icon}</span>
              <span>{button.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


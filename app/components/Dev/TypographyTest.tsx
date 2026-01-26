'use client';

export default function TypographyTest() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Headings */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-800">Headings</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">H1 - Hero Title</p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Top Crypto Exchanges Compared (2026)
            </h1>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">H2 - Section Title</p>
            <h2 className="text-xl font-bold text-gray-900">Top Picks</h2>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">H3 - Subsection</p>
            <h3 className="text-lg font-semibold text-gray-900">Features Comparison</h3>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">H4</p>
            <h4 className="text-base font-semibold text-gray-900">Security Metrics</h4>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">H5</p>
            <h5 className="text-sm font-semibold text-gray-900">Trading Fees</h5>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">H6</p>
            <h6 className="text-xs font-semibold text-gray-900">Additional Info</h6>
          </div>
        </div>
      </section>

      {/* Body Text Sizes */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-800">Body Text Sizes</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">13px (Table Body)</p>
            <p className="text-[13px] text-gray-900">
              A summary of the top cryptocurrency exchanges around the world. Analyze 30+ features like supported coins, security metrics, and fee transparency to find your best fit.
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">14px (Small Text)</p>
            <p className="text-sm text-gray-900">
              A summary of the top cryptocurrency exchanges around the world. Analyze 30+ features like supported coins, security metrics, and fee transparency to find your best fit.
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">16px (Base/Body)</p>
            <p className="text-base text-gray-900">
              A summary of the top cryptocurrency exchanges around the world. Analyze 30+ features like supported coins, security metrics, and fee transparency to find your best fit.
            </p>
          </div>
        </div>
      </section>

      {/* Font Weights */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-800">Font Weights</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Normal (400)</p>
            <p className="text-base font-normal text-gray-900">
              Normal weight text for body content
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Medium (500)</p>
            <p className="text-base font-medium text-gray-900">
              Medium weight text for emphasis
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Semibold (600)</p>
            <p className="text-base font-semibold text-gray-900">
              Semibold weight text for headers
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Bold (700)</p>
            <p className="text-base font-bold text-gray-900">
              Bold weight text for strong emphasis
            </p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-800">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-white text-gray-800 px-4 py-1 rounded-full text-[13px] font-medium hover:bg-[#2d2d2d] hover:text-white transition-colors flex items-center gap-2 shadow-sm">
            <span>🌍</span>
            <span>Global</span>
          </button>
          <button className="bg-[#2d2d2d] text-white px-4 py-1 rounded-full text-[13px] font-medium transition-colors flex items-center gap-2 shadow-sm">
            <span>📊</span>
            <span>Futures</span>
          </button>
          <button className="px-5 py-2 rounded-full text-sm font-medium bg-[#2d2d2d] text-white hover:bg-[#3a3a3a]">
            Compare
          </button>
          <button className="px-5 py-2 rounded-full text-sm font-medium bg-[#f0f0f0] text-black hover:bg-[#e0e0e0]">
            Features
          </button>
        </div>
      </section>

      {/* Links */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-800">Links</h2>
        <div className="space-y-2">
          <div>
            <a href="#" className="text-[#00a38f] hover:underline text-sm">
              Affiliate Disclosure
            </a>
          </div>
          <div>
            <a href="#" className="text-[#00a38f] hover:underline text-base">
              View Disclosure Policy →
            </a>
          </div>
          <div>
            <a href="#" className="text-[#00a38f] hover:underline text-[13px]">
              Visit Exchange →
            </a>
          </div>
        </div>
      </section>

      {/* Table Text */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-800">Table Text</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Table Header (12px)</p>
            <div className="bg-[#2d2d2d] text-white px-2 py-3 text-xs font-semibold">
              Name
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Table Body (13px)</p>
            <div className="bg-white border border-[#eaeaea] px-2 py-1.5 text-[13px] text-gray-900">
              Binance
            </div>
          </div>
        </div>
      </section>

      {/* Component Preview */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-800">Component Preview</h2>
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Top Crypto Exchanges Compared (2026)
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl">
            A summary of the top cryptocurrency exchanges around the world. Analyze 30+ features like supported coins, security metrics, and fee transparency to find your best fit.
          </p>
          <div className="flex flex-wrap gap-2">
            <button className="bg-white text-gray-800 px-4 py-1 rounded-full text-[13px] font-medium hover:bg-[#2d2d2d] hover:text-white transition-colors flex items-center gap-2 shadow-sm">
              <span>🌍</span>
              <span>Global</span>
            </button>
            <button className="bg-white text-gray-800 px-4 py-1 rounded-full text-[13px] font-medium hover:bg-[#2d2d2d] hover:text-white transition-colors flex items-center gap-2 shadow-sm">
              <span>📊</span>
              <span>Futures</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

import ComparisonTable from './components/ComparisonTable';
import HeroSection from './components/HeroSection';
import TopPicksSection from './components/TopPicksSection';
import { filterButtonSets } from './config/filterButtons';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="Global Crypto Exchanges List"
        description="A summary of the top cryptocurrency exchanges around the world. Analyze 30+ features like supported coins, security metrics, and fee transparency to find your best fit."
        buttons={filterButtonSets.cryptoExchanges}
      />
      <TopPicksSection />
      <main className="py-6 pb-64">
        <ComparisonTable />
      </main>
    </div>
  );
}

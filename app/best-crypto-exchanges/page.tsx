import ComparisonTable from '../components/ComparisonTable';
import HeroSection from '../components/HeroSection';
import TopPicksSection from '../components/TopPicksSection';

export default function BestCryptoExchanges() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <TopPicksSection />
      <main className="py-8">
        <ComparisonTable />
      </main>
    </div>
  );
}


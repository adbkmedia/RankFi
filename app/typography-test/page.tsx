import TypographyTest from '../components/TypographyTest';
import HeadlessUIExample from '../components/HeadlessUIExample';

export default function TypographyTestPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-100 border-b py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">Typography Testing</h1>
          <p className="text-sm text-gray-600 mt-2">
            Use this page to test different fonts, sizes, weights, and colors.
            <br />
            Change the font in <code className="bg-gray-200 px-1 rounded">app/layout.tsx</code> and restart the dev server to see changes.
          </p>
        </div>
      </div>
      <TypographyTest />
      
      {/* Headless UI Example Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Headless UI Example</h2>
        <p className="text-sm text-gray-600 mb-4">
          Example showing how to use Headless UI components styled with Tailwind to match your design.
        </p>
        <HeadlessUIExample />
      </div>
    </div>
  );
}

import StyleGuide from '../components/Dev/StyleGuide';
import TypographyTest from '../components/Dev/TypographyTest';
import HeadlessUIExample from '../components/Dev/HeadlessUIExample';

export default function DevPage() {
  return (
    <div className="min-h-screen bg-rankfi-page-bg">
      <div className="bg-gray-100 border-b py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">Development & Testing Tools</h1>
          <p className="text-sm text-gray-600 mt-2">
            This page contains development tools, style guides, and testing components for reference.
          </p>
        </div>
      </div>

      <main className="py-8">
        {/* Style Guide Section */}
        <div className="mb-16">
          <StyleGuide />
        </div>

        {/* Typography Test Section */}
        <div className="mb-16">
          <div className="max-w-7xl mx-auto px-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Typography Testing</h2>
            <p className="text-sm text-gray-600">
              Use this section to test different fonts, sizes, weights, and colors.
              <br />
              Change the font in <code className="bg-gray-200 px-1 rounded">app/layout.tsx</code> and restart the dev server to see changes.
            </p>
          </div>
          <TypographyTest />
        </div>

        {/* Headless UI Example Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Headless UI Example</h2>
          <p className="text-sm text-gray-600 mb-6">
            Example showing how to use Headless UI components styled with Tailwind to match your design.
          </p>
          <HeadlessUIExample />
        </div>
      </main>
    </div>
  );
}

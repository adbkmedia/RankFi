'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center">
            <img 
              src="/images/logos/RankFi-Logo-White.png" 
              alt="RankFi" 
              className="h-6 w-auto"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}


import { redirect } from 'next/navigation';

// Redirect root to best-crypto-exchanges
export default function Home() {
  redirect('/best-crypto-exchanges');
}

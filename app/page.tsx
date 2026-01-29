import { redirect } from 'next/navigation';

/**
 * Home Page
 *
 * Currently redirects to the main comparison page.
 * This will be replaced with a proper landing page in the future.
 */
export default function Home() {
  redirect('/best-crypto-exchanges');
}

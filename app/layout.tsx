import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

// ============================================
// FONT TESTING - Easy Font Switching
// ============================================
// To test different fonts:
// 1. Uncomment the font you want to test below
// 2. Comment out the current font
// 3. Update the variable name and CSS variable
// 4. Restart dev server (npm run dev)
// 5. Visit /typography-test to see all examples
// ============================================

// Current: Inter
import { Inter } from "next/font/google";
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistSans = inter;
const geistMono = inter; // Inter doesn't have mono, use same font

// Previous: Geist (commented out)
// import { Geist, Geist_Mono } from "next/font/google";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// Test: Roboto (uncomment to test)
// import { Roboto } from "next/font/google";
// const roboto = Roboto({
//   variable: "--font-geist-sans",
//   weight: ["300", "400", "500", "700"],
//   subsets: ["latin"],
// });
// const geistSans = roboto;
// const geistMono = roboto;

// Test: Open Sans (uncomment to test)
// import { Open_Sans } from "next/font/google";
// const openSans = Open_Sans({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
// const geistSans = openSans;
// const geistMono = openSans;

// Test: System Font Stack (Arial, Helvetica, etc.)
// No import needed - just use system fonts
// const geistSans = { variable: "--font-geist-sans" };
// const geistMono = { variable: "--font-geist-mono" };
// Then update globals.css to use: font-family: Arial, Helvetica, sans-serif;

export const metadata: Metadata = {
  title: "RankFi - Best Cryptocurrency Exchanges Comparison",
  description: "Compare the top cryptocurrency exchanges by security, features, and fees",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased pt-16">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

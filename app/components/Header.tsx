"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  Menu,
  X,
  FileText,
  Newspaper,
  Check,
  Bitcoin,
  Landmark,
  ShieldOff,
  CandlestickChart,
  ArrowRightLeft,
  HardDrive,
  ArrowRight,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react"
import { Button } from "@/app/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"

const productItems = [
  { href: "/exchanges/crypto", label: "Crypto Exchanges", icon: Bitcoin },
  { href: "/exchanges/canadian", label: "Canadian Exchanges", icon: Landmark },
  { href: "/exchanges/non-kyc", label: "Non KYC Exchanges", icon: ShieldOff },
  { href: "/exchanges/futures", label: "Futures Exchanges", icon: CandlestickChart },
  { href: "/exchanges/perp-dex", label: "Perp DEXs", icon: ArrowRightLeft },
]

const otherProductItems = [
  { href: "/products/hardware-wallets", label: "Hardware Wallets", icon: HardDrive },
  { href: "/products/compare", label: "Compare 2 Products", icon: ArrowRightLeft },
]

const rankingCategoryItems = [
  { href: "/rankings/best-crypto-exchanges", label: "Best Crypto Exchanges", icon: Bitcoin },
  { href: "/rankings/best-altcoin-exchanges", label: "Best Altcoin Exchanges", icon: Sparkles },
  { href: "/rankings/safest-crypto-exchanges", label: "Safest Crypto Exchanges", icon: Shield },
  { href: "/rankings/best-for-beginners", label: "Best for Beginners", icon: Users },
  { href: "/rankings/lowest-fees", label: "Lowest Fee Exchanges", icon: Zap },
]

const rankingCountryItems = [
  { href: "/rankings/global", label: "Global", flag: "🌐" },
  { href: "/rankings/canada", label: "Canada", flag: "🇨🇦" },
]

const resourceItems = [
  { href: "/resources/blog", label: "Blog", icon: Newspaper },
  { href: "/resources/tools", label: "Tools", icon: Zap },
]

const aboutItems = [
  { href: "/about", label: "About Us", icon: Users },
  { href: "/about/how-we-test", label: "How We Test", icon: Shield },
  { href: "/about/contact", label: "Contact", icon: FileText },
]

const countries = [
  { code: "global", label: "Global", flag: "🌐" },
  { code: "ca", label: "Canada", flag: "🇨🇦" },
]

type NavItemProps = {
  children: React.ReactNode
  content: React.ReactNode
  align?: "start" | "center" | "end"
  width?: string
}

// Shared styles for dropdown links
const dropdownLinkClass = "flex items-center gap-3 rounded-lg px-3 py-2 text-black/90 transition-colors hover:bg-black/5 hover:text-black"
const mobileLinkClass = "flex items-center gap-3 rounded-lg px-6 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
const sectionHeaderClass = "text-xs font-semibold uppercase tracking-wider text-black/50"
const mobileSectionHeaderClass = "flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/50"

// Dropdown section header component
function DropdownSectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 px-3 pt-1 pb-4">
      <span className={sectionHeaderClass}>{title}</span>
      <ArrowRight className="h-3 w-3 text-black/50" />
    </div>
  )
}

// Render dropdown links helper
function DropdownLink({ item }: { item: { href: string; label: string; icon: React.ComponentType<{ className?: string }> } }) {
  const Icon = item.icon
  return (
    <Link href={item.href} className={dropdownLinkClass}>
      <Icon className="h-4 w-4" />
      <span className="text-sm">{item.label}</span>
    </Link>
  )
}

// Render mobile links helper
function MobileLink({ 
  item, 
  onClick 
}: { 
  item: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }
  onClick: () => void
}) {
  const Icon = item.icon
  return (
    <Link href={item.href} onClick={onClick} className={mobileLinkClass}>
      <Icon className="h-4 w-4" />
      {item.label}
    </Link>
  )
}

function HoverDropdown({ children, content, align = "start", width = "w-56" }: NavItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-all hover:text-white hover:bg-white/10"
      >
        {children}
      </button>
      <div
        className={`absolute top-full ${align === "start" ? "left-0" : align === "end" ? "right-0" : "left-1/2 -translate-x-1/2"} pt-2 transition-all duration-200 ${
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className={`${width} bg-white border border-black/10 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.15)]`}>
          {content}
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [countryDialogOpen, setCountryDialogOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.3)] border-b border-white/10"
          : "bg-black"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Left side - Logo only */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="/images/logos/RankFi-Logo-White.png" 
              alt="RankFi" 
              className="h-7"
            />
          </Link>
        </div>

        {/* Right side - Nav links + Country selector */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-6">
          {/* Nav links */}
          <div className="flex items-center gap-x-1">
            {/* Products - 2 column layout like Rankings */}
            <HoverDropdown
              align="center"
              width="w-[90vw] max-w-[600px] sm:w-[600px]"
              content={
                <div className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Comparison Tools */}
                    <div>
                      <DropdownSectionHeader title="Comparison Tools" />
                      <div className="space-y-1">
                        {productItems.map((item) => (
                          <DropdownLink key={item.href} item={item} />
                        ))}
                      </div>
                    </div>

                    {/* Other */}
                    <div>
                      <DropdownSectionHeader title="Other" />
                      <div className="space-y-1">
                        {otherProductItems.map((item) => (
                          <DropdownLink key={item.href} item={item} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              Products
            </HoverDropdown>

            {/* Rankings dropdown - 2 column layout */}
            <HoverDropdown
              align="center"
              width="w-[90vw] max-w-[600px] sm:w-[600px]"
              content={
                <div className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Best Exchanges by Category */}
                    <div>
                      <DropdownSectionHeader title="Best Exchanges by Category" />
                      <div className="space-y-1">
                        {rankingCategoryItems.map((item) => (
                          <DropdownLink key={item.href} item={item} />
                        ))}
                      </div>
                      <Link
                        href="/rankings"
                        className="flex items-center gap-2 px-3 pt-4 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        All best rankings
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* Country-specific */}
                    <div>
                      <DropdownSectionHeader title="Country-Specific" />
                      <div>
                        {rankingCountryItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-black/90 transition-colors hover:bg-black/5 hover:text-black"
                          >
                            <span className="text-sm leading-none">{item.flag}</span>
                            <span className="text-sm">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              Rankings
            </HoverDropdown>

            {/* Resources dropdown */}
            <HoverDropdown
              width="w-56"
              content={
                <div className="p-2">
                  {resourceItems.map((item) => (
                    <DropdownLink key={item.href} item={item} />
                  ))}
                </div>
              }
            >
              Resources
            </HoverDropdown>

            {/* About dropdown */}
            <HoverDropdown
              width="w-56"
              content={
                <div className="p-2">
                  {aboutItems.map((item) => (
                    <DropdownLink key={item.href} item={item} />
                  ))}
                </div>
              }
            >
              About
            </HoverDropdown>
          </div>

          {/* Country selector */}
          <Dialog open={countryDialogOpen} onOpenChange={setCountryDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-4 border-white/30 bg-white/5 text-white hover:text-white hover:bg-white/10 hover:border-white/50"
              >
                <span>{selectedCountry.flag}</span>
                <span>{selectedCountry.label}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white border-black/10 text-black">
              <DialogHeader>
                <DialogTitle className="text-black">Select Region</DialogTitle>
              </DialogHeader>
              <div className="grid gap-2 py-4">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      setSelectedCountry(country)
                      setCountryDialogOpen(false)
                    }}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 text-left transition-colors hover:bg-black/5 ${
                      selectedCountry.code === country.code ? "bg-black/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{country.flag}</span>
                      <span className="text-sm font-medium text-black">{country.label}</span>
                    </div>
                    {selectedCountry.code === country.code && (
                      <Check className="h-5 w-5 text-black" />
                    )}
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-full p-2 text-white hover:bg-white/10 transition-colors"
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-6 pb-6 pt-2 bg-black/95 backdrop-blur-xl border-t border-white/15">
          {/* Products section */}
          <div className="py-2">
            <p className={mobileSectionHeaderClass}>Products</p>
            {[...productItems, ...otherProductItems].map((item) => (
              <MobileLink key={item.href} item={item} onClick={() => setMobileMenuOpen(false)} />
            ))}
          </div>

          {/* Rankings section */}
          <div className="py-2">
            <p className={mobileSectionHeaderClass}>Rankings</p>
            {rankingCategoryItems.map((item) => (
              <MobileLink key={item.href} item={item} onClick={() => setMobileMenuOpen(false)} />
            ))}
          </div>

          {/* Resources section */}
          <div className="py-2">
            <p className={mobileSectionHeaderClass}>Resources</p>
            {resourceItems.map((item) => (
              <MobileLink key={item.href} item={item} onClick={() => setMobileMenuOpen(false)} />
            ))}
          </div>

          {/* About section */}
          <div className="py-2">
            <p className={mobileSectionHeaderClass}>About</p>
            {aboutItems.map((item) => (
              <MobileLink key={item.href} item={item} onClick={() => setMobileMenuOpen(false)} />
            ))}
          </div>

          {/* Country selector for mobile */}
          <div className="pt-4 border-t border-white/15 mt-4">
            <p className="px-3 py-2 text-sm font-medium text-white/50">Region</p>
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  setSelectedCountry(country)
                }}
                className={`flex items-center justify-between w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-white/10 ${
                  selectedCountry.code === country.code ? "bg-white/5" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{country.flag}</span>
                  <span className="text-sm text-white/70">{country.label}</span>
                </div>
                {selectedCountry.code === country.code && (
                  <Check className="h-4 w-4 text-white" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

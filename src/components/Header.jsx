import { useState } from 'react'

const topLinks = [
  { label: 'Blog', href: '#' },
  { label: 'Programme Fidelité', href: '#' },
  { label: 'À propos de nous', href: '#' },
  { label: 'Carrière', href: '#' },
  { label: 'Ambassador program', href: '#' },
  { label: 'Contact', href: '#' },
]

const mainNav = [
  { label: 'PRODUITS', href: '#', hasDropdown: true },
  { label: 'VÊTEMENTS', href: '#', hasDropdown: true },
  { label: 'MAGASINS', href: '#', hasDropdown: false },
]

function SearchIcon({ className = 'w-5 h-5' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  )
}

function ProfileIcon({ className = 'w-5 h-5' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  )
}

function CartIcon({ className = 'w-5 h-5' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  )
}

function ChevronDown({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

function ChevronRight({ className = 'w-4 h-4' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  )
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full">
      {/* Top bar - desktop only */}
      <div className="hidden lg:block bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[1140px] mx-auto px-6 flex justify-end items-center h-9">
          <nav className="flex items-center gap-6">
            {topLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-[#6b7a8d] hover:text-[#3d4f5f] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1140px] mx-auto px-4 lg:px-6 flex items-center justify-between h-16 lg:h-[72px]">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 -ml-2 text-[#3d4f5f]"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          </button>

          {/* Logo */}
          <a href="#" className="flex items-center">
            <span className="text-[#3d4f5f] text-xl lg:text-2xl font-bold italic tracking-tight">
              BioTech<span className="font-extrabold">USA</span>
              <sup className="text-[8px] font-normal align-super">®</sup>
            </span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8 ml-10">
            {mainNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-1 text-sm font-bold text-[#3d4f5f] hover:text-[#2a3a47] tracking-wide transition-colors"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown />}
              </a>
            ))}
          </nav>

          {/* Spacer to push icons right on desktop */}
          <div className="hidden lg:block flex-1" />

          {/* Desktop icons */}
          <div className="hidden lg:flex items-center gap-5 text-[#3d4f5f]">
            <button aria-label="Search" className="hover:text-[#2a3a47] transition-colors">
              <SearchIcon className="w-[22px] h-[22px]" />
            </button>
            <button aria-label="Profile" className="hover:text-[#2a3a47] transition-colors">
              <ProfileIcon className="w-[22px] h-[22px]" />
            </button>
            <button aria-label="Cart" className="hover:text-[#2a3a47] transition-colors">
              <CartIcon className="w-[22px] h-[22px]" />
            </button>
          </div>

          {/* Mobile search icon */}
          <button className="lg:hidden p-2 -mr-2 text-[#3d4f5f]" aria-label="Search">
            <SearchIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in panel */}
          <div className="absolute inset-y-0 left-0 w-[280px] sm:w-[320px] bg-white shadow-xl overflow-y-auto">
            {/* Close button */}
            <div className="flex items-center justify-start px-4 h-14">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -ml-2 text-[#3d4f5f]"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main nav items */}
            <nav className="border-b border-gray-200">
              {mainNav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between px-6 py-4 text-sm font-bold text-[#3d4f5f] tracking-wide hover:bg-gray-50 transition-colors"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronRight />}
                </a>
              ))}
              <a href="#" className="flex items-center justify-between px-6 py-4 text-sm font-bold text-[#3d4f5f] tracking-wide hover:bg-gray-50 transition-colors">
                PROFILE
              </a>
              <a href="#" className="flex items-center justify-between px-6 py-4 text-sm font-bold text-[#3d4f5f] tracking-wide hover:bg-gray-50 transition-colors">
                CART
              </a>
            </nav>

            {/* Profile & Cart with icons */}
            <div className="border-b border-gray-200 py-2">
              <a href="#" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-[#3d4f5f] hover:bg-gray-50 transition-colors">
                <ProfileIcon className="w-5 h-5" />
                PROFILE
              </a>
              <a href="#" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-[#3d4f5f] hover:bg-gray-50 transition-colors">
                <CartIcon className="w-5 h-5" />
                CART
              </a>
            </div>

            {/* Secondary links */}
            <nav className="py-2">
              {topLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-6 py-3 text-sm text-[#6b7a8d] hover:text-[#3d4f5f] hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

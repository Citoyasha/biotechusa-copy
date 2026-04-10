import { useState } from 'react'

const topLinks = [
  { label: 'Blog', href: '#' },
  { label: 'Programme Fidelité', href: '#' },
  { label: 'À propos de nous', href: '#' },
  { label: 'Carrière', href: '#' },
  { label: 'Ambassador program', href: '#' },
  { label: 'Contact', href: '#' },
]

const produitsMenu = [
  {
    title: 'Vitalité quotidienne',
    links: [
      { label: 'Protéines', href: '#' },
      { label: 'Vitamines, mineraux', href: '#' },
      { label: 'Produits de collagène', href: '#' },
      { label: 'Beauty line', href: '#' },
      { label: 'Soutien articulaire', href: '#' },
      { label: 'Calculateur de vitamines', href: '#', highlight: true },
    ],
  },
  {
    title: 'Sculpture corporelle',
    links: [
      { label: 'Formules de contrôle du poids', href: '#' },
      { label: 'Acides aminés', href: '#' },
      { label: 'Fibres alimentaires', href: '#' },
      { label: 'Extraits végétaux naturels', href: '#' },
    ],
  },
  {
    title: 'Vitalité et performance',
    links: [
      { label: 'Vitamines issues de sources naturelles', href: '#' },
      { label: "Pour les sports d'endurance", href: '#' },
      { label: 'Créatines', href: '#' },
      { label: 'Gainers', href: '#' },
      { label: 'Énergie et performance', href: '#' },
      { label: 'Optimisez votre taux de testostérone', href: '#' },
    ],
  },
  {
    title: 'Nourriture et snack',
    links: [
      { label: 'Poudres de base pour cuisiner et pâtisser', href: '#' },
      { label: 'Barres', href: '#' },
      { label: 'Crèmes protéinées et snacks', href: '#' },
      { label: 'Édulcorants', href: '#' },
    ],
  },
  {
    title: 'Produits en promotion',
    links: [
      { label: 'Produits en promotion actuels', href: '#' },
      { label: 'Doublez et économisez!', href: '#' },
      { label: 'Offres groupées', href: '#' },
    ],
  },
]

const vetementsMenu = [
  {
    heading: 'FEMME',
    href: '#',
    subcols: [
      {
        title: 'PRODUITS',
        links: [
          { label: 'T-shirts, débardeurs', href: '#' },
          { label: 'Pulls', href: '#' },
          { label: 'Soutien-gorge de sport', href: '#' },
          { label: 'Leggings, pantalons', href: '#' },
        ],
      },
      {
        title: 'OFFRES',
        links: [
          { label: 'Nouveautés', href: '#' },
          { label: 'Seamless', href: '#' },
          { label: 'LAST CHANCE', href: '#' },
          { label: 'Voir tout', href: '#', bold: true },
        ],
      },
    ],
  },
  {
    heading: 'HOMME',
    href: '#',
    subcols: [
      {
        title: 'PRODUITS',
        links: [
          { label: 'T-shirts, débardeurs', href: '#' },
          { label: 'Pulls', href: '#' },
          { label: 'Pantalons', href: '#' },
        ],
      },
      {
        title: 'OFFRES',
        links: [
          { label: 'Nouveautés', href: '#' },
          { label: 'LAST CHANCE', href: '#' },
          { label: 'Voir tout', href: '#', bold: true },
        ],
      },
    ],
  },
  {
    heading: 'ACCESSOIRES',
    href: '#',
    subcols: [
      {
        title: 'PRODUITS',
        links: [
          { label: 'Gants', href: '#' },
          { label: 'Ceintures', href: '#' },
          { label: "Accessoires d'entraînement", href: '#' },
          { label: 'Shakers, bols', href: '#' },
        ],
      },
    ],
  },
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

function ChevronUp({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
  )
}

function ChevronLeft({ className = 'w-4 h-4' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
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

/* ---- Produits Dropdown ---- */
function ProduitsDropdown() {
  return (
    <div className="max-w-[1140px] mx-auto px-6 py-8">
      <div className="grid grid-cols-5 gap-6">
        {produitsMenu.map((col) => (
          <div key={col.title}>
            <h4 className="text-[#3d4f5f] text-sm font-bold italic mb-4">
              {col.title}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`text-sm transition-colors ${
                      link.highlight
                        ? 'text-[#7cb342] font-bold hover:text-[#689f38]'
                        : 'text-[#6b7a8d] hover:text-[#3d4f5f]'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- Vêtements Dropdown ---- */
function VetementsDropdown() {
  return (
    <div className="max-w-[1140px] mx-auto px-6 py-8">
      <div className="grid grid-cols-3 gap-10">
        {vetementsMenu.map((section) => (
          <div key={section.heading}>
            <a
              href={section.href}
              className="text-[#3d4f5f] text-sm font-bold uppercase tracking-wide hover:text-[#1ea7e1] transition-colors"
            >
              {section.heading}
            </a>
            <div className="mt-5 flex gap-8">
              {section.subcols.map((subcol) => (
                <div key={subcol.title}>
                  <h5 className="text-[#3d4f5f] text-xs font-bold uppercase tracking-wide mb-3">
                    {subcol.title}
                  </h5>
                  <ul className="flex flex-col gap-2.5">
                    {subcol.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className={`text-sm text-[#6b7a8d] hover:text-[#3d4f5f] transition-colors ${
                            link.bold ? 'font-bold' : ''
                          }`}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const popularSearches = ['Conserver', 'BCAA', 'Iso whey', 'EAA']

const recentArticles = [
  {
    category: 'ASTUCES ET COMPLÉMENTS...',
    title: 'Curcumine : bienfaits, utilisation et précautions',
    image: 'https://biotechusa.fr/content/uploads/2026/03/BioTechUSA-cover-1400x390-293-150x150.png',
    href: '#',
  },
  {
    category: 'ASTUCES ET COMPLÉMENTS...',
    title: 'Par quoi remplacer la whey : alternatives pour vos...',
    image: 'https://biotechusa.fr/content/uploads/2026/03/BioTechUSA-cover-1400x390-288-150x150.png',
    href: '#',
  },
  {
    category: 'ASTUCES ET COMPLÉMENTS...',
    title: 'Quand prendre la whey pour une prise de masse efficace ...',
    image: 'https://biotechusa.fr/content/uploads/2026/03/BioTechUSA-cover-1400x390-287-150x150.png',
    href: '#',
  },
  {
    category: 'MODE DE VIE',
    title: 'Comment couper la faim rapidement, naturellement ...',
    image: 'https://biotechusa.fr/content/uploads/2026/03/BioTechUSA-cover-1400x390-283-150x150.png',
    href: '#',
  },
]

function CloseIcon({ className = 'w-5 h-5' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}

function ClearIcon({ className = 'w-4 h-4' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
    </svg>
  )
}

function SearchDropdown() {
  return (
    <div className="max-w-[1140px] mx-auto px-6 py-8">
      <div className="flex gap-8">
        {/* Left — popular searches */}
        <div className="w-[280px] flex-shrink-0 border-r border-gray-200 pr-8">
          <p className="text-xs text-[#9aa5b1] uppercase tracking-wide mb-5">
            Recherches les plus courantes
          </p>
          <ul className="flex flex-col gap-4">
            {popularSearches.map((term) => (
              <li key={term}>
                <a
                  href={`#search=${term}`}
                  className="text-sm font-bold text-[#3d4f5f] uppercase hover:text-[#1ea7e1] transition-colors"
                >
                  {term}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — recent articles */}
        <div className="flex-1">
          <p className="text-xs text-[#9aa5b1] uppercase tracking-wide mb-5">
            Articles les plus récents
          </p>
          <div className="grid grid-cols-2 gap-5">
            {recentArticles.map((article) => (
              <a
                key={article.title}
                href={article.href}
                className="flex gap-3 group"
              >
                <div className="w-[100px] h-[70px] flex-shrink-0 overflow-hidden bg-gray-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-[#1ea7e1] uppercase tracking-wide mb-1">
                    {article.category}
                  </p>
                  <p className="text-sm font-bold text-[#3d4f5f] leading-snug group-hover:text-[#1ea7e1] transition-colors line-clamp-2">
                    {article.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [mobileMenuLevel, setMobileMenuLevel] = useState('main') // 'main' | 'produits' | 'vetements' | subcategory key
  const [mobileSubLevel, setMobileSubLevel] = useState(null) // for 3rd level drill-down

  const handleMouseEnter = (label) => {
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <header className="w-full relative z-50">
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

      {/* Main nav bar + dropdown wrapper — single hover zone */}
      <div
        className="relative bg-white border-b border-gray-200"
        onMouseLeave={handleMouseLeave}
      >
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
          <a href="/" className="flex items-center flex-shrink-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/cf/BioTechUSA_logo.png"
              alt="BioTechUSA"
              className="h-6 lg:h-8 w-auto"
            />
          </a>

          {/* Desktop: search bar OR nav links */}
          {searchOpen ? (
            <>
              {/* Search input bar */}
              <div className="hidden lg:flex items-center flex-1 ml-8 mr-4">
                <div className="relative flex items-center w-full">
                  <SearchIcon className="absolute left-4 w-5 h-5 text-[#9aa5b1] pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Chercher..."
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 pl-12 pr-10 bg-[#f0f2f4] rounded-sm text-sm text-[#3d4f5f] placeholder-[#9aa5b1] outline-none focus:ring-2 focus:ring-[#1ea7e1]/30"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 text-[#9aa5b1] hover:text-[#3d4f5f] transition-colors"
                      aria-label="Clear search"
                    >
                      <ClearIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
              {/* Close button */}
              <button
                onClick={() => setSearchOpen(false)}
                className="hidden lg:flex items-center justify-center text-[#3d4f5f] hover:text-[#2a3a47] transition-colors"
                aria-label="Close search"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </>
          ) : (
            <>
              {/* Desktop nav links */}
              <nav className="hidden lg:flex items-center gap-8 ml-10 h-full">
                {[
                  { label: 'PRODUITS', hasDropdown: true },
                  { label: 'VÊTEMENTS', hasDropdown: true },
                  { label: 'MAGASINS', hasDropdown: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="relative h-full flex items-center"
                    onMouseEnter={() =>
                      item.hasDropdown ? handleMouseEnter(item.label) : handleMouseLeave()
                    }
                  >
                    <a
                      href="#"
                      className={`flex items-center gap-1 text-sm font-bold tracking-wide transition-colors h-full border-b-2 ${
                        activeDropdown === item.label
                          ? 'text-[#3d4f5f] border-[#1ea7e1]'
                          : 'text-[#3d4f5f] border-transparent hover:text-[#2a3a47]'
                      }`}
                    >
                      {item.label}
                      {item.hasDropdown && (
                        activeDropdown === item.label
                          ? <ChevronUp />
                          : <ChevronDown />
                      )}
                    </a>
                  </div>
                ))}
              </nav>

              {/* Spacer */}
              <div className="hidden lg:block flex-1" />

              {/* Desktop icons */}
              <div className="hidden lg:flex items-center gap-5 text-[#3d4f5f]">
                <button
                  aria-label="Search"
                  className="hover:text-[#2a3a47] transition-colors"
                  onClick={() => { setSearchOpen(true); setActiveDropdown(null) }}
                >
                  <SearchIcon className="w-[22px] h-[22px]" />
                </button>
                <button aria-label="Profile" className="hover:text-[#2a3a47] transition-colors">
                  <ProfileIcon className="w-[22px] h-[22px]" />
                </button>
                <button aria-label="Cart" className="hover:text-[#2a3a47] transition-colors">
                  <CartIcon className="w-[22px] h-[22px]" />
                </button>
              </div>
            </>
          )}

          {/* Mobile search icon */}
          <button
            className="lg:hidden p-2 -mr-2 text-[#3d4f5f]"
            aria-label="Search"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          >
            {mobileSearchOpen
              ? <CloseIcon className="w-5 h-5" />
              : <SearchIcon className="w-5 h-5" />
            }
          </button>
        </div>

        {/* Desktop dropdown panels — absolute overlay */}
        {activeDropdown && !searchOpen && (
          <div className="hidden lg:block absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-md z-40">
            {activeDropdown === 'PRODUITS' && <ProduitsDropdown />}
            {activeDropdown === 'VÊTEMENTS' && <VetementsDropdown />}
          </div>
        )}

        {/* Search dropdown panel */}
        {searchOpen && (
          <div className="hidden lg:block absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-md z-40">
            <SearchDropdown />
          </div>
        )}
      </div>

      {/* Mobile search bar — slides down below header */}
      {mobileSearchOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-3 w-4 h-4 text-[#9aa5b1] pointer-events-none" />
            <input
              type="text"
              placeholder="Chercher..."
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-9 bg-[#f0f2f4] rounded-sm text-sm text-[#3d4f5f] placeholder-[#9aa5b1] outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-[#9aa5b1]"
                aria-label="Clear search"
              >
                <ClearIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => { setMobileMenuOpen(false); setMobileMenuLevel('main'); setMobileSubLevel(null) }}
          />

          {/* Slide-in panel */}
          <div className="absolute inset-y-0 left-0 w-[280px] sm:w-[320px] bg-white shadow-xl overflow-y-auto">

            {/* === MAIN LEVEL === */}
            {mobileMenuLevel === 'main' && (
              <>
                {/* Close button */}
                <div className="flex items-center px-4 h-14">
                  <button
                    onClick={() => { setMobileMenuOpen(false); setMobileMenuLevel('main'); setMobileSubLevel(null) }}
                    className="p-2 -ml-2 text-[#3d4f5f]"
                    aria-label="Close menu"
                  >
                    <CloseIcon className="w-6 h-6" />
                  </button>
                </div>

                <nav className="border-b border-gray-200">
                  <button
                    onClick={() => setMobileMenuLevel('produits')}
                    className="w-full flex items-center justify-between px-6 py-4 text-sm font-bold text-[#3d4f5f] tracking-wide hover:bg-gray-50"
                  >
                    PRODUITS
                    <ChevronRight />
                  </button>
                  <button
                    onClick={() => setMobileMenuLevel('vetements')}
                    className="w-full flex items-center justify-between px-6 py-4 text-sm font-bold text-[#3d4f5f] tracking-wide hover:bg-gray-50"
                  >
                    VÊTEMENTS
                    <ChevronRight />
                  </button>
                  <a
                    href="#"
                    className="flex items-center justify-between px-6 py-4 text-sm font-bold text-[#3d4f5f] tracking-wide hover:bg-gray-50"
                  >
                    MAGASINS
                  </a>
                </nav>

                <div className="border-b border-gray-200 py-2">
                  <a href="#" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-[#3d4f5f] hover:bg-gray-50">
                    <SearchIcon className="w-5 h-5" />
                    SEARCH
                  </a>
                  <a href="#" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-[#3d4f5f] hover:bg-gray-50">
                    <ProfileIcon className="w-5 h-5" />
                    PROFILE
                  </a>
                  <a href="#" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-[#3d4f5f] hover:bg-gray-50">
                    <CartIcon className="w-5 h-5" />
                    CART
                  </a>
                </div>

                <nav className="py-2">
                  {topLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block px-6 py-3 text-sm text-[#6b7a8d] hover:text-[#3d4f5f] hover:bg-gray-50"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </>
            )}

            {/* === PRODUITS LEVEL === */}
            {mobileMenuLevel === 'produits' && !mobileSubLevel && (
              <>
                <div className="flex items-center gap-3 px-4 h-14 border-b border-gray-200">
                  <button
                    onClick={() => setMobileMenuLevel('main')}
                    className="p-1 text-[#3d4f5f]"
                    aria-label="Back"
                  >
                    <ChevronLeft />
                  </button>
                  <span className="text-sm font-bold text-[#3d4f5f] tracking-wide">PRODUITS</span>
                </div>

                <div className="py-2">
                  <a href="#" className="block px-6 py-4 text-sm font-bold text-[#3d4f5f] hover:bg-gray-50">
                    Accueil du Webshop
                  </a>
                  {produitsMenu.map((cat) => (
                    <button
                      key={cat.title}
                      onClick={() => setMobileSubLevel(cat.title)}
                      className="w-full flex items-center justify-between px-6 py-4 text-sm text-[#3d4f5f] hover:bg-gray-50"
                    >
                      <span className={cat.title === 'Vitalité et performance' ? 'text-[#9aa5b1]' : 'font-bold'}>
                        {cat.title}
                      </span>
                      <ChevronRight />
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* === PRODUITS SUB-LEVEL (e.g. Vitalité quotidienne links) === */}
            {mobileMenuLevel === 'produits' && mobileSubLevel && (
              <>
                <div className="flex items-center gap-3 px-4 h-14 border-b border-gray-200">
                  <button
                    onClick={() => setMobileSubLevel(null)}
                    className="p-1 text-[#3d4f5f]"
                    aria-label="Back"
                  >
                    <ChevronLeft />
                  </button>
                  <span className="text-sm font-bold text-[#3d4f5f] tracking-wide">{mobileSubLevel.toUpperCase()}</span>
                </div>

                <div className="py-2">
                  {produitsMenu
                    .find((cat) => cat.title === mobileSubLevel)
                    ?.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`block px-6 py-4 text-sm hover:bg-gray-50 ${
                          link.highlight
                            ? 'text-[#7cb342] font-bold'
                            : 'text-[#3d4f5f]'
                        }`}
                      >
                        {link.label}
                      </a>
                    ))}
                </div>
              </>
            )}

            {/* === VÊTEMENTS LEVEL === */}
            {mobileMenuLevel === 'vetements' && !mobileSubLevel && (
              <>
                <div className="flex items-center gap-3 px-4 h-14 border-b border-gray-200">
                  <button
                    onClick={() => setMobileMenuLevel('main')}
                    className="p-1 text-[#3d4f5f]"
                    aria-label="Back"
                  >
                    <ChevronLeft />
                  </button>
                  <span className="text-sm font-bold text-[#3d4f5f] tracking-wide">VÊTEMENTS</span>
                </div>

                <div className="py-2">
                  <a href="#" className="block px-6 py-4 text-sm font-bold text-[#3d4f5f] hover:bg-gray-50">
                    Accueil du Webshop
                  </a>
                  {vetementsMenu.map((section) => (
                    <div key={section.heading}>
                      <div className="px-6 pt-5 pb-2 text-sm font-bold text-[#3d4f5f] uppercase">
                        {section.heading}
                      </div>
                      {section.subcols.map((subcol) => (
                        <button
                          key={`${section.heading}-${subcol.title}`}
                          onClick={() => setMobileSubLevel(`${section.heading}::${subcol.title}`)}
                          className="w-full flex items-center justify-between px-6 py-3 text-sm text-[#3d4f5f] hover:bg-gray-50"
                        >
                          {subcol.title}
                          <ChevronRight />
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* === VÊTEMENTS SUB-LEVEL (e.g. FEMME > Produits links) === */}
            {mobileMenuLevel === 'vetements' && mobileSubLevel && (() => {
              const [sectionKey, subcolKey] = mobileSubLevel.split('::')
              const section = vetementsMenu.find((s) => s.heading === sectionKey)
              const subcol = section?.subcols.find((sc) => sc.title === subcolKey)
              if (!subcol) return null
              return (
                <>
                  <div className="flex items-center gap-3 px-4 h-14 border-b border-gray-200">
                    <button
                      onClick={() => setMobileSubLevel(null)}
                      className="p-1 text-[#3d4f5f]"
                      aria-label="Back"
                    >
                      <ChevronLeft />
                    </button>
                    <span className="text-sm font-bold text-[#3d4f5f] tracking-wide">{subcolKey.toUpperCase()}</span>
                  </div>

                  <div className="py-2">
                    {subcol.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`block px-6 py-4 text-sm text-[#3d4f5f] hover:bg-gray-50 ${link.bold ? 'font-bold' : ''}`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </>
              )
            })()}

          </div>
        </div>
      )}
    </header>
  )
}

export default Header

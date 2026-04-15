import { useEffect, useState, useRef } from 'react'

const SORT_OPTIONS = [
  { key: 'default', label: 'Par défaut' },
  { key: 'topSales', label: 'Top des ventes' },
  { key: 'popularity', label: 'Popularité' },
  { key: 'az', label: 'A-Z' },
  { key: 'za', label: 'Z-A' },
  { key: 'priceAsc', label: 'Prix, croissant' },
  { key: 'priceDesc', label: 'Prix, décroissant' },
  { key: 'dateDesc', label: 'Date, décroissant' },
  { key: 'dateAsc', label: 'Date, croissant' },
]

const FILTER_SECTIONS = [
  { key: 'global', title: 'Global' },
  { key: 'proteines', title: 'Proteines' },
  { key: 'parfum', title: 'Parfum' },
  { key: 'forme', title: 'Forme' },
  { key: 'maternite', title: 'Maternité' },
  { key: 'taille', title: 'Taille' },
]

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 flex-shrink-0">
      {open ? (
        <path strokeLinecap="round" d="M5 12h14" />
      ) : (
        <path strokeLinecap="round" d="M12 5v14M5 12h14" />
      )}
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5 flex-shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function formatCategoryLabel(slug) {
  if (!slug) return ''
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function FilterDrawer({ onClose, products, initialSort, initialCategories, onApply }) {
  const [sort, setSort] = useState(initialSort || 'default')
  const [categories, setCategories] = useState(() => new Set(initialCategories || []))
  const [openSections, setOpenSections] = useState(() => new Set(['sort']))
  const closeBtnRef = useRef(null)

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const availableCategories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean).filter((c) => c !== 'all'))
  ).sort()

  const hasActiveFilters = sort !== 'default' || categories.size > 0

  const toggleSection = (key) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleCategory = (cat) => {
    setCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const handleReset = () => {
    setSort('default')
    setCategories(new Set())
  }

  const handleApply = () => {
    onApply({ sort, categories: Array.from(categories) })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Filtrer et trier">
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute top-0 right-0 h-full w-full max-w-[480px] bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#eff1f1] flex-shrink-0">
          <h2
            className="text-xl font-bold text-[#36474e] not-italic mb-0"
            style={{ fontFamily: "'Roboto', sans-serif", textTransform: 'none', letterSpacing: 0 }}
          >
            Filtrer et trier
          </h2>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Fermer"
            className="text-[#36474e] hover:text-[#1ea7e1] transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Active filters bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eff1f1] flex-shrink-0">
          <span className="text-sm font-semibold text-[#36474e]">Filtres actifs</span>
          <button
            onClick={handleReset}
            disabled={!hasActiveFilters}
            className="text-sm text-[#36474e] underline hover:text-[#1ea7e1] disabled:text-[#9aa5b1] disabled:no-underline disabled:cursor-not-allowed transition-colors"
          >
            Supprimer les filtres
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Sort section */}
          <div className="border-b border-[#eff1f1]">
            <button
              onClick={() => toggleSection('sort')}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#f9f9f9] transition-colors"
              aria-expanded={openSections.has('sort')}
            >
              <span
                className="text-base font-bold text-[#36474e] not-italic"
                style={{ fontFamily: "'Roboto', sans-serif", textTransform: 'none', letterSpacing: 0 }}
              >
                Trier
              </span>
              <ChevronIcon open={openSections.has('sort')} />
            </button>
            {openSections.has('sort') && (
              <div role="radiogroup" aria-label="Trier">
                {SORT_OPTIONS.map((opt) => {
                  const selected = sort === opt.key
                  return (
                    <button
                      key={opt.key}
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setSort(opt.key)}
                      className={`w-full flex items-center justify-between px-6 py-3 text-left text-[15px] transition-colors ${
                        selected
                          ? 'bg-[#f9f9f9] text-[#36474e] font-semibold'
                          : 'text-[#6b7a8d] hover:bg-[#f9f9f9]'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {selected && <CheckIcon />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Filter accordions */}
          {FILTER_SECTIONS.map((section) => {
            const isOpen = openSections.has(section.key)
            const isGlobal = section.key === 'global'
            return (
              <div key={section.key} className="border-b border-[#eff1f1]">
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#f9f9f9] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-base font-bold text-[#36474e] not-italic"
                    style={{ fontFamily: "'Roboto', sans-serif", textTransform: 'none', letterSpacing: 0 }}
                  >
                    {section.title}
                  </span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && (
                  <div className="pb-2">
                    {isGlobal && availableCategories.length > 0 ? (
                      availableCategories.map((cat) => {
                        const checked = categories.has(cat)
                        return (
                          <label
                            key={cat}
                            className="flex items-center gap-3 px-6 py-2.5 text-[15px] text-[#6b7a8d] hover:bg-[#f9f9f9] cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleCategory(cat)}
                              className="w-4 h-4 accent-[#1ea7e1] cursor-pointer"
                            />
                            <span>{formatCategoryLabel(cat)}</span>
                          </label>
                        )
                      })
                    ) : (
                      <p className="px-6 py-3 text-sm text-[#9aa5b1] italic">
                        Aucune option disponible
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Sticky CTA */}
        <div className="px-6 py-5 border-t border-[#eff1f1] flex-shrink-0">
          <button
            onClick={handleApply}
            className="w-full py-4 bg-[#36474e] text-white rounded-full font-bold tracking-wide uppercase text-sm hover:bg-[#2a3a47] transition-colors"
          >
            Initier le filtre
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterDrawer

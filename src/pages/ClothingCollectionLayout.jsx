import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/shop/Breadcrumb'

const PRODUCTS_PER_PAGE = 12
const SORT_OPTIONS = [
  { value: 'default', label: 'Par défaut' },
  { value: 'topSales', label: 'Top des ventes' },
  { value: 'az', label: 'A-Z' },
  { value: 'za', label: 'Z-A' },
  { value: 'priceAsc', label: 'Prix, croissant' },
  { value: 'priceDesc', label: 'Prix, décroissant' },
]

function applySort(list, sort) {
  const copy = [...list]
  switch (sort) {
    case 'topSales': return copy.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
    case 'az': return copy.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'fr'))
    case 'za': return copy.sort((a, b) => (b.name || '').localeCompare(a.name || '', 'fr'))
    case 'priceAsc': return copy.sort((a, b) => (a.price || 0) - (b.price || 0))
    case 'priceDesc': return copy.sort((a, b) => (b.price || 0) - (a.price || 0))
    default: return copy
  }
}

function extractFilters(products) {
  const sizes = new Set()
  const colors = new Map()
  const genders = new Set()

  products.forEach((p) => {
    if (p.sizes?.available) p.sizes.available.forEach((s) => sizes.add(s))
    if (p.colorName && p.colorHex) colors.set(p.colorName, p.colorHex)
    if (p.gender) genders.add(p.gender)
  })

  return {
    sizes: [...sizes],
    colors: [...colors.entries()].map(([name, hex]) => ({ name, hex })),
    genders: [...genders],
  }
}

/* ── Sidebar Filter ── */

function FilterSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[#eff1f1] pb-3 mb-3">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-2 text-[13px] font-bold text-[#36474e] uppercase tracking-wide">
        {title}
        <svg className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
      </button>
      {open && <div className="pt-1">{children}</div>}
    </div>
  )
}

function CheckboxFilter({ label, checked, onChange, colorHex }) {
  return (
    <label className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
      <span className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${checked ? 'bg-[#36474e] border-[#36474e]' : 'border-[#798f9c] group-hover:border-[#36474e]'}`}>
        {checked && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        )}
      </span>
      {colorHex && (
        <span className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0" style={{ backgroundColor: colorHex }} />
      )}
      <span className="text-[13px] text-[#36474e]">{label}</span>
    </label>
  )
}

function FilterContent({ filters, selectedGenders, setSelectedGenders, selectedSizes, setSelectedSizes, selectedColors, setSelectedColors, toggleFilter, activeFilterCount, setCurrentPage }) {
  return (
    <>
      {filters.genders.length > 1 && (
        <FilterSection title="Genre" defaultOpen>
          {filters.genders.map((g) => (
            <CheckboxFilter key={g} label={g} checked={selectedGenders.includes(g)} onChange={() => toggleFilter(selectedGenders, setSelectedGenders, g)} />
          ))}
        </FilterSection>
      )}
      {filters.sizes.length > 0 && (
        <FilterSection title="Taille" defaultOpen>
          {filters.sizes.map((s) => (
            <CheckboxFilter key={s} label={s} checked={selectedSizes.includes(s)} onChange={() => toggleFilter(selectedSizes, setSelectedSizes, s)} />
          ))}
        </FilterSection>
      )}
      {filters.colors.length > 1 && (
        <FilterSection title="Couleur" defaultOpen>
          {filters.colors.map((c) => (
            <CheckboxFilter key={c.name} label={c.name} colorHex={c.hex} checked={selectedColors.includes(c.name)} onChange={() => toggleFilter(selectedColors, setSelectedColors, c.name)} />
          ))}
        </FilterSection>
      )}
      {activeFilterCount > 0 && (
        <button
          onClick={() => { setSelectedSizes([]); setSelectedColors([]); setSelectedGenders([]); setCurrentPage(1) }}
          className="text-[12px] text-[#1babf9] font-bold uppercase tracking-wide mt-2"
        >
          Supprimer les filtres
        </button>
      )}
    </>
  )
}

/* ── Product Card (Clothing) ── */

function ClothingProductCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const imgSrc = hovered && product.hoverImage?.src ? product.hoverImage.src : product.image?.src
  const isNew = product.collection === 'rise' || product.badges?.includes?.('new')

  return (
    <div className="group" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[832/964] overflow-hidden bg-[#f5f5f5] rounded-lg">
          <img
            src={imgSrc || ''}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          {/* Size buttons on hover */}
          {product.sizes?.available && (
            <div className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-2.5 flex flex-wrap gap-1.5 transition-all duration-300 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
              {product.sizes.available.map((s) => (
                <span key={s} className="px-3 py-1.5 border border-[#36474e] text-[11px] font-bold text-[#36474e] rounded hover:bg-[#36474e] hover:text-white transition-colors cursor-pointer">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className="mt-3">
        <span className="text-[11px] text-[#798f9c] uppercase tracking-wide">{product.brand}</span>

        {product.colorName && (
          <div className="flex items-center gap-1.5 mt-1">
            {product.colorHex && (
              <span className="w-3.5 h-3.5 rounded-full border border-gray-200" style={{ backgroundColor: product.colorHex }} />
            )}
            <span className="text-[11px] text-[#798f9c]">Couleur: {product.colorName}</span>
          </div>
        )}

        <Link to={`/products/${product.slug}`} className="block mt-1">
          <p className="text-[13px] font-bold text-[#36474e] leading-snug group-hover:text-[#1babf9] transition-colors line-clamp-2">
            {product.name}
          </p>
          <span className="text-[14px] font-bold text-[#36474e] mt-1 block">
            €{product.price?.toFixed(2).replace('.', ',')}
          </span>
        </Link>

        {isNew && (
          <span className="inline-block mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">NOUVEAU</span>
        )}
      </div>
    </div>
  )
}

/* ── Main Layout ── */

export default function ClothingCollectionLayout({ title, fetchFn, breadcrumbHref }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Filter state
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedGenders, setSelectedGenders] = useState([])

  useEffect(() => {
    setLoading(true)
    fetchFn().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [fetchFn])

  const filters = useMemo(() => extractFilters(products), [products])

  const filteredProducts = useMemo(() => {
    let result = products

    if (selectedSizes.length) {
      result = result.filter((p) => p.sizes?.available?.some((s) => selectedSizes.includes(s)))
    }
    if (selectedColors.length) {
      result = result.filter((p) => selectedColors.includes(p.colorName))
    }
    if (selectedGenders.length) {
      result = result.filter((p) => selectedGenders.includes(p.gender))
    }

    return applySort(result, sort)
  }, [products, selectedSizes, selectedColors, selectedGenders, sort])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const toggleFilter = (arr, setArr, val) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val])
    setCurrentPage(1)
  }

  const activeFilterCount = selectedSizes.length + selectedColors.length + selectedGenders.length

  return (
    <>
      <Header />
      <Breadcrumb items={[
        { label: 'Accueil', href: '/' },
        { label: 'Vêtements', href: '/vetements' },
        { label: title },
      ]} />

      <main className="w-full bg-white">
        <div className="w-[95%] mx-auto py-6">
          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[16px] font-bold text-[#36474e]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {title}
            </h1>
            <div className="flex items-center gap-3">
              {/* Filter toggle — visible on all screens */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold uppercase tracking-wide transition-colors ${
                  sidebarOpen
                    ? 'bg-[#36474e] text-white'
                    : 'bg-white text-[#36474e] border border-[#d6dade] hover:border-[#36474e]'
                }`}
              >
                Filtre
                {activeFilterCount > 0 && (
                  <span className={sidebarOpen ? 'text-white/70' : 'text-[#1babf9]'}>({activeFilterCount})</span>
                )}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" /></svg>
              </button>
              {/* Sort dropdown */}
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setCurrentPage(1) }}
                className="px-4 py-2 border border-[#d6dade] rounded-full text-[12px] text-[#36474e] bg-white cursor-pointer hover:border-[#36474e] transition-colors"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar — toggleable on all screens */}
            <aside className={`transition-all duration-300 flex-shrink-0 overflow-hidden ${
              sidebarOpen ? 'w-[220px] opacity-100' : 'w-0 opacity-0'
            } hidden lg:block`}>
              <div className="w-[220px]">

                <FilterContent
                  filters={filters}
                  selectedGenders={selectedGenders} setSelectedGenders={setSelectedGenders}
                  selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes}
                  selectedColors={selectedColors} setSelectedColors={setSelectedColors}
                  toggleFilter={toggleFilter}
                  activeFilterCount={activeFilterCount}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </aside>

            {/* Mobile sidebar drawer */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
                <div className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-xl overflow-y-auto">
                  <div className="flex items-center justify-between p-4 border-b border-[#eff1f1]">
                    <span className="text-[14px] font-bold text-[#36474e]">Filtres</span>
                    <button onClick={() => setSidebarOpen(false)} className="p-1">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <FilterContent
                      filters={filters}
                      selectedGenders={selectedGenders} setSelectedGenders={setSelectedGenders}
                      selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes}
                      selectedColors={selectedColors} setSelectedColors={setSelectedColors}
                      toggleFilter={toggleFilter}
                      activeFilterCount={activeFilterCount}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Product grid */}
            <div className="flex-1 min-w-0">
              {loading ? (
                <div className="py-20 text-center text-[#9aa5b1]">Chargement...</div>
              ) : paginatedProducts.length === 0 ? (
                <div className="py-20 text-center text-[#9aa5b1]">Aucun produit trouvé.</div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                  {paginatedProducts.map((p) => (
                    <ClothingProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="flex items-center justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      className={`w-10 h-10 flex items-center justify-center text-[14px] font-bold rounded transition-colors ${
                        page === currentPage
                          ? 'bg-[#36474e] text-white'
                          : 'border border-[#eff1f1] text-[#36474e] hover:border-[#36474e]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  {currentPage < totalPages && (
                    <button
                      onClick={() => { setCurrentPage(currentPage + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      className="w-10 h-10 flex items-center justify-center border border-[#eff1f1] rounded hover:border-[#36474e]"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                    </button>
                  )}
                </nav>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

import { useMemo, useRef, useState } from 'react'
import ProductCard from '../shop/ProductCard'

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

function ProductCarousel({
  title,
  products = [],
  ctaLabel = 'tout',
  ctaHref = '#',
  showArrows = false,
  variant = 'rise',
}) {
  const scrollerRef = useRef(null)
  // track active variant per card index (for color swatch click → image swap)
  const [activeVariantByCard, setActiveVariantByCard] = useState({})

  const handleScroll = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const displayProducts = useMemo(
    () =>
      products.map((p, i) => {
        const activeHandle = activeVariantByCard[i]
        if (!activeHandle || !p.colorVariants) return p
        // find sibling mapped in colorVariants... sibling product lookup
        // In this implementation, colorVariants already holds siblings w/ handle only — so we need the full sibling product.
        // Page loader passes the full siblings as a separate map if needed. Here, we only swap active flag.
        const withActive = {
          ...p,
          colorVariants: p.colorVariants.map((v) => ({
            ...v,
            active: v.handle === activeHandle,
          })),
        }
        return withActive
      }),
    [products, activeVariantByCard]
  )

  if (!products.length) return null

  return (
    <section className="w-[90vw] max-w-[1600px] mx-auto py-12 lg:py-16">
      <header className="flex items-center justify-between mb-6 lg:mb-10">
        <h2
          className="not-italic"
          style={{
            fontFamily: 'Roboto, system-ui, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(18px, 1.6vw, 22px)',
            letterSpacing: '0.5px',
            color: '#36474e',
            textTransform: 'uppercase',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        {showArrows ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleScroll(-1)}
              aria-label="Précédent"
              className="w-10 h-10 border border-[#36474e] text-[#36474e] flex items-center justify-center hover:bg-[#36474e] hover:text-white transition-colors"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => handleScroll(1)}
              aria-label="Suivant"
              className="w-10 h-10 border border-[#36474e] text-[#36474e] flex items-center justify-center hover:bg-[#36474e] hover:text-white transition-colors"
            >
              <ChevronRight />
            </button>
          </div>
        ) : (
          <a
            href={ctaHref}
            className="hidden md:inline-flex items-center px-6 py-3 text-xs font-bold uppercase tracking-wide border border-[#36474e] text-[#36474e] hover:bg-[#36474e] hover:text-white transition-colors"
          >
            {ctaLabel}
          </a>
        )}
      </header>

      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 lg:mx-0 lg:px-0"
        style={{ scrollbarWidth: 'none' }}
      >
        {displayProducts.map((p, i) => (
          <div
            key={p.id || p.slug || i}
            data-card
            className="flex-shrink-0 snap-start w-[75%] sm:w-[45%] lg:w-[calc((100%-3rem)/3)]"
          >
            <ProductCard
              product={p}
              onVariantChange={(v) =>
                setActiveVariantByCard((prev) => ({ ...prev, [i]: v.handle }))
              }
            />
          </div>
        ))}
      </div>

      {variant === 'rise' && (
        <footer className="mt-8 flex justify-center">
          <a
            href={ctaHref}
            className="inline-flex items-center px-8 py-3 text-xs font-bold uppercase tracking-wide border border-[#36474e] text-[#36474e] hover:bg-[#36474e] hover:text-white transition-colors"
          >
            {ctaLabel}
          </a>
        </footer>
      )}

      {variant === 'lastchance' && (
        <footer className="mt-8 flex justify-center">
          <a
            href={ctaHref}
            className="inline-flex items-center px-8 py-3 text-xs font-bold uppercase tracking-wide bg-[#36474e] text-white hover:bg-[#2a3a47] transition-colors"
          >
            {ctaLabel}
          </a>
        </footer>
      )}
    </section>
  )
}

export default ProductCarousel

import { useState } from 'react'

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  )
}

function ProductGallery({ product }) {
  // PHASE 2: Contentful will return product.images[]; fall back to single image.
  const images = product.images && product.images.length > 0 ? product.images : [product.image]
  const [activeIdx, setActiveIdx] = useState(0)
  const hasMany = images.length > 1

  const prev = () => setActiveIdx((i) => (i - 1 + images.length) % images.length)
  const next = () => setActiveIdx((i) => (i + 1) % images.length)

  return (
    <div className="relative">
      {/* Main image */}
      <div className="relative aspect-square bg-[#f5f5f5] rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={images[activeIdx].src}
          alt={images[activeIdx].alt}
          className="w-full h-full object-contain p-8"
          loading="eager"
        />

        {hasMany && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#eff1f1] flex items-center justify-center text-[#36474e] hover:bg-white transition-colors"
              aria-label="Image précédente"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#eff1f1] flex items-center justify-center text-[#36474e] hover:bg-white transition-colors"
              aria-label="Image suivante"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Scrollbar-style progress indicator */}
      <div className="mt-4 h-1 bg-[#dadada] rounded-full relative overflow-hidden">
        <div
          className="absolute top-0 h-1 bg-[#8a8a8a] rounded-full transition-all duration-300"
          style={{
            width: `${100 / images.length}%`,
            left: `${(activeIdx * 100) / images.length}%`,
          }}
        />
      </div>

      {/* Thumbnails strip — scrollable when many */}
      {hasMany && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`flex-shrink-0 w-20 h-20 bg-[#f5f5f5] rounded-md overflow-hidden border-2 transition-colors ${
                i === activeIdx ? 'border-[#1ea7e1]' : 'border-transparent hover:border-[#dadada]'
              }`}
              aria-label={`Voir image ${i + 1}`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductGallery

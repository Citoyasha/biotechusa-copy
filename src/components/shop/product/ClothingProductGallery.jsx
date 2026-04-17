import { useEffect, useRef, useState } from 'react'

function Lightbox({ images, startIndex, onClose }) {
  const scrollerRef = useRef(null)

  useEffect(() => {
    if (!scrollerRef.current) return
    const target = scrollerRef.current.children[startIndex]
    if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' })
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [startIndex, onClose])

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="fixed top-4 right-4 z-[101] w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#36474e] flex items-center justify-center"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
      <div ref={scrollerRef} className="max-w-[1100px] mx-auto py-10 px-4 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
        {images.map((img, i) => (
          <img key={i} src={img.src} alt={img.alt || ''} className="w-full h-auto object-contain" />
        ))}
      </div>
    </div>
  )
}

export default function ClothingProductGallery({ product }) {
  const images = [product.image, ...(product.galleryImages || [])].filter((x) => x?.src)
  const video = product.video
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })

  if (!images.length && !video) return null

  const openLightbox = (index) => setLightbox({ open: true, index })

  return (
    <>
      {/* Desktop 2x2 grid */}
      <div className="hidden md:grid grid-cols-2 gap-2">
        {images.slice(0, 3).map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openLightbox(i)}
            className="block overflow-hidden bg-[#f5f5f5] aspect-[2/3]"
          >
            <img
              src={img.src}
              alt={img.alt || product.name}
              className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </button>
        ))}
        {video?.src && (
          <div className="overflow-hidden bg-[#f5f5f5] aspect-[2/3]">
            <video
              src={video.src}
              poster={product.videoPoster?.src || images[0]?.src}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover cursor-pointer"
              onClick={(e) => (e.currentTarget.paused ? e.currentTarget.play() : e.currentTarget.pause())}
            />
          </div>
        )}
      </div>

      {/* Mobile slider */}
      <div className="md:hidden -mx-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: 'none' }}>
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => openLightbox(i)}
              className="snap-start flex-shrink-0 w-full aspect-square bg-[#f5f5f5]"
            >
              <img src={img.src} alt={img.alt || product.name} className="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
            </button>
          ))}
          {video?.src && (
            <div className="snap-start flex-shrink-0 w-full aspect-square bg-[#f5f5f5]">
              <video
                src={video.src}
                poster={product.videoPoster?.src || images[0]?.src}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {lightbox.open && (
        <Lightbox images={images} startIndex={lightbox.index} onClose={() => setLightbox({ open: false, index: 0 })} />
      )}
    </>
  )
}

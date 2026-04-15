import { useRef, useState } from 'react'
import StarRating from './StarRating'

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

function formatPrice(n) {
  return `€${Number(n).toFixed(2).replace('.', ',')}`
}

function Badge({ type, label }) {
  const base = 'inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-1 leading-none'
  if (type === 'discount') {
    return <span className={`${base} bg-white text-[#36474e] border border-[#36474e]`}>{label}</span>
  }
  if (type === 'sale' || type === 'loyalty') {
    return <span className={`${base} bg-[#ff4949] text-white`}>{label}</span>
  }
  if (type === 'new') {
    return <span className={`${base} bg-[#00adef] text-white`}>{label}</span>
  }
  return <span className={`${base} bg-[#36474e] text-white`}>{label}</span>
}

function ColorSwatch({ hex, hasBorder, active, onClick, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className="relative w-6 h-6 rounded-full flex-shrink-0"
    >
      <span
        className="block w-full h-full rounded-full"
        style={{
          backgroundColor: hex,
          border: hasBorder ? '1px solid #e0e0e0' : 'none',
        }}
      />
      {active && (
        <span className="absolute inset-[-3px] rounded-full border border-[#36474e]" />
      )}
    </button>
  )
}

function ProductCard({ product, onVariantChange }) {
  const {
    name,
    price,
    originalPrice,
    unitPrice,
    image,
    hoverImage,
    video,
    slug,
    rating,
    reviewCount,
    bgClass,
    brand,
    colorName,
    colorVariants,
    sizes,
    badges,
  } = product

  const [hovered, setHovered] = useState(false)
  const videoRef = useRef(null)

  const handleMouseEnter = () => {
    setHovered(true)
    if (video && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    setHovered(false)
    if (video && videoRef.current) {
      videoRef.current.pause()
    }
  }

  const handleSwatchClick = (variant) => {
    if (onVariantChange) onVariantChange(variant)
  }

  const href = `/products/${slug}`
  const showHoverImage = hovered && hoverImage?.src

  return (
    <div
      className="group flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Media box */}
      <div className={`relative aspect-[5/6] overflow-hidden ${bgClass || 'bg-[#eff1f1]'}`}>
        <a href={href} className="block w-full h-full">
          {video?.src ? (
            <video
              ref={videoRef}
              src={video.src}
              poster={video.poster || image?.src}
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <>
              <img
                src={image?.src}
                alt={image?.alt || name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${showHoverImage ? 'opacity-0' : 'opacity-100'}`}
                loading="lazy"
              />
              {hoverImage?.src && (
                <img
                  src={hoverImage.src}
                  alt={hoverImage.alt || name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${showHoverImage ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                />
              )}
            </>
          )}
        </a>

        {/* Badges (top-left column) */}
        {badges && badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10">
            {badges.map((b, i) => (
              <Badge key={i} type={b.type} label={b.label} />
            ))}
          </div>
        )}

        {/* Size buttons (appear on hover, bottom bar) */}
        {sizes && sizes.length > 0 && (
          <div
            className={`absolute left-0 right-0 bottom-0 bg-white/95 backdrop-blur-sm flex justify-center gap-2 px-3 py-3 transition-all duration-200 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
          >
            {sizes.map((s) => (
              <a
                key={s.value || s.label}
                href={s.available ? `${href}?variant=${s.value}` : undefined}
                onClick={(e) => !s.available && e.preventDefault()}
                className={`min-w-[44px] h-11 px-2 flex items-center justify-center text-xs font-bold border ${
                  s.available
                    ? 'border-[#36474e] text-[#36474e] hover:bg-[#36474e] hover:text-white'
                    : 'border-[#e0e0e0] text-[#c0c7cf] line-through cursor-not-allowed'
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        )}

        {/* Add to cart button — shown only when no sizes (supplements) */}
        {(!sizes || sizes.length === 0) && (
          <button
            className="absolute bottom-3 right-3 flex items-center justify-center w-10 h-10 rounded-full bg-[#36474e] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#2a3a47]"
            aria-label="Ajouter au panier"
          >
            <PlusIcon />
          </button>
        )}
      </div>

      {/* Info */}
      <div className="pt-3 flex flex-col gap-1">
        {brand && (
          <span className="text-xs text-[#9aa5b1] uppercase tracking-wide">{brand}</span>
        )}

        {colorName && (
          <span className="text-xs text-[#6b7a8d]">Couleur: {colorName}</span>
        )}

        {colorVariants && colorVariants.length > 0 && (
          <div className="flex items-center gap-2 py-1">
            {colorVariants.map((v) => (
              <ColorSwatch
                key={v.handle}
                hex={v.hex}
                hasBorder={v.hasBorder}
                active={v.active}
                title={v.name}
                onClick={() => handleSwatchClick(v)}
              />
            ))}
          </div>
        )}

        {rating && reviewCount > 0 && (
          <StarRating rating={rating} count={reviewCount} />
        )}

        <a
          href={href}
          className="text-sm font-bold text-[#36474e] leading-snug hover:underline line-clamp-2"
        >
          {name}
        </a>

        <div className="flex items-baseline gap-2">
          {originalPrice ? (
            <>
              <span className="text-base font-bold text-[#ff4949]">{formatPrice(price)}</span>
              <span className="text-sm text-[#9aa5b1] line-through">{formatPrice(originalPrice)}</span>
            </>
          ) : (
            <span className="text-base font-bold text-[#36474e]">{formatPrice(price)}</span>
          )}
        </div>

        {unitPrice && (
          <span className="text-xs text-[#9aa5b1]">{unitPrice}</span>
        )}
      </div>
    </div>
  )
}

export default ProductCard

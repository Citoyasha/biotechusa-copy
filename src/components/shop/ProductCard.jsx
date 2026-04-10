import StarRating from './StarRating'

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

function ProductCard({ product }) {
  const {
    name,
    price,
    originalPrice,
    unitPrice,
    image,
    slug,
    rating,
    reviewCount,
    bgClass,
  } = product

  return (
    <div className="group flex flex-col">
      {/* Image container */}
      <div className={`relative aspect-square overflow-hidden ${bgClass || 'bg-[#eff1f1]'}`}>
        <a href={`/products/${slug}`} className="block w-full h-full">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </a>
        {/* Add to cart button */}
        <button
          className="absolute bottom-3 right-3 flex items-center justify-center w-10 h-10 rounded-full bg-[#36474e] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#2a3a47]"
          aria-label="Ajouter au panier"
        >
          <PlusIcon />
        </button>
      </div>

      {/* Product info */}
      <div className="pt-3 flex flex-col gap-1">
        {/* Rating */}
        {rating && reviewCount > 0 && (
          <StarRating rating={rating} count={reviewCount} />
        )}

        {/* Title */}
        <a
          href={`/products/${slug}`}
          className="text-sm font-bold text-[#36474e] leading-snug hover:underline line-clamp-2"
        >
          {name}
        </a>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-[#36474e]">
            €{price.toFixed(2).replace('.', ',')}
          </span>
          {originalPrice && (
            <span className="text-sm text-[#9aa5b1] line-through">
              €{originalPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>

        {/* Unit price */}
        {unitPrice && (
          <span className="text-xs text-[#9aa5b1]">{unitPrice}</span>
        )}
      </div>
    </div>
  )
}

export default ProductCard

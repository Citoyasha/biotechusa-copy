import { useState } from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../StarRating'
import BadgeIcon from './BadgeIcon'

function ProductInfo({ product }) {
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id || '')

  const formatPrice = (n) => `€${n.toFixed(2).replace('.', ',')}`

  return (
    <div className="flex flex-col gap-5">
      {/* Title */}
      <h1
        className="text-[28px] lg:text-[32px] font-bold text-[#36474e] leading-tight not-italic mb-0"
        style={{ fontFamily: "'Roboto', sans-serif", textTransform: 'none', letterSpacing: 0 }}
      >
        {product.name}
      </h1>

      {/* Rating */}
      {product.rating > 0 && (
        <StarRating rating={product.rating} count={product.reviewCount} />
      )}

      {/* Short description */}
      <p className="text-base text-[#36474e] leading-relaxed">
        {product.shortDescription}
      </p>

      {/* Badges row */}
      {product.badges && product.badges.length > 0 && (
        <div className="grid grid-cols-3 gap-3 py-2">
          {product.badges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center gap-1.5">
              <BadgeIcon icon={badge.icon} className="w-10 h-10" />
              <span className="text-[11px] text-[#36474e] text-center leading-tight">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Packaging selector */}
      {product.packaging && product.packaging.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-[#36474e]">Conditionnement</span>
            <span className="text-xs text-[#9aa5b1]">{product.packaging.length} options</span>
          </div>
          <div className="flex gap-2">
            {product.packaging.map((pkg) => (
              <Link
                key={pkg.label}
                to={`/products/${pkg.slug}`}
                className={`flex-1 flex flex-col items-center gap-1 p-3 border-2 rounded transition-colors ${
                  pkg.selected
                    ? 'border-[#1ea7e1] bg-[#e8f4fc]'
                    : 'border-[#eff1f1] hover:border-[#1ea7e1]'
                }`}
              >
                <span className="text-sm font-bold text-[#36474e]">{pkg.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Price */}
      <div className="border-t border-b border-[#eff1f1] py-4">
        <div className="text-3xl font-bold text-[#36474e]">
          {formatPrice(product.price)}
        </div>
        {product.unitPrice && (
          <div className="text-sm text-[#9aa5b1] mt-1">{product.unitPrice}</div>
        )}
      </div>

      {/* Variant selector */}
      {product.variants && product.variants.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-[#36474e]">Parfum</span>
            <span className="text-xs text-[#9aa5b1]">{product.variants.length} options</span>
          </div>
          <select
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            className="w-full h-12 px-4 border-2 border-[#eff1f1] text-[#36474e] focus:border-[#1ea7e1] outline-none cursor-pointer"
          >
            {product.variants.map((v) => (
              <option key={v.id} value={v.id} disabled={!v.available}>
                {v.label} {!v.available && '— Épuisé'}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Stock status */}
      <div className="text-sm text-[#6b7a8d]">
        Stock en ligne:{' '}
        <span className={product.inStock ? 'text-[#1ea7e1] font-bold' : 'text-red-500 font-bold'}>
          {product.inStock ? 'En stock' : 'Épuisé'}
        </span>
      </div>
    </div>
  )
}

export default ProductInfo

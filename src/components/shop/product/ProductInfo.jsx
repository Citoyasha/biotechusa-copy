import { useState } from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../StarRating'
import BadgeIcon from './BadgeIcon'

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  )
}

function ProductInfo({ product }) {
  const [qty, setQty] = useState(1)
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

      {/* Loyalty points (placeholder) */}
      <div className="bg-[#f5f5f5] p-4 rounded">
        <div className="text-xs text-[#6b7a8d] mb-1">Points pouvant être gagnés par produit</div>
        <div className="text-base font-bold text-[#36474e]">3 point(s)</div>
      </div>

      {/* Quantity + Add to cart */}
      <div className="flex gap-2">
        <div className="flex items-center border-2 border-[#eff1f1]">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-10 h-12 text-xl text-[#36474e] hover:bg-[#f5f5f5]"
            aria-label="Diminuer"
          >
            −
          </button>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            min="1"
            className="w-12 h-12 text-center text-[#36474e] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            onClick={() => setQty(qty + 1)}
            className="w-10 h-12 text-xl text-[#36474e] hover:bg-[#f5f5f5]"
            aria-label="Augmenter"
          >
            +
          </button>
        </div>
        <button className="flex-1 h-12 bg-[#1ea7e1] hover:bg-[#1893c8] text-white font-bold text-sm uppercase tracking-wider transition-colors">
          Ajouter au panier
        </button>
        <button
          className="w-12 h-12 border-2 border-[#eff1f1] text-[#36474e] hover:border-[#1ea7e1] hover:text-[#1ea7e1] flex items-center justify-center transition-colors"
          aria-label="Ajouter aux favoris"
        >
          <HeartIcon />
        </button>
      </div>

      {/* Free shipping bar (placeholder) */}
      <div className="bg-[#f5f5f5] p-4 rounded text-sm">
        <div className="font-bold text-[#36474e] mb-1">Économisez sur la livraison !</div>
        <div className="text-[#6b7a8d]">
          Si vous dépensez au moins <strong>€80,00</strong>, nous expédierons votre colis gratuitement !
        </div>
        <div className="mt-2 h-1 bg-[#dadada] rounded overflow-hidden">
          <div
            className="h-full bg-[#1ea7e1]"
            style={{ width: `${Math.min(100, (product.price / 80) * 100)}%` }}
          />
        </div>
      </div>

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

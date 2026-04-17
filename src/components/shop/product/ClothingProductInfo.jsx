import { useState } from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../StarRating'
import SizeChartModal from './SizeChartModal'

function formatPrice(n) {
  return `€${Number(n).toFixed(2).replace('.', ',')}`
}

function ColorSwatch({ colorHex, colorHasBorder, active, title, href }) {
  const circle = (
    <span
      className="block w-6 h-6 rounded-full"
      style={{
        backgroundColor: colorHex || '#ccc',
        border: colorHasBorder ? '1px solid #e0e0e0' : 'none',
      }}
    />
  )
  const wrap = (
    <span className="relative inline-block">
      {circle}
      {active && <span className="absolute inset-[-3px] rounded-full border border-[#36474e]" />}
    </span>
  )
  if (active || !href) {
    return <span title={title} aria-label={title}>{wrap}</span>
  }
  return (
    <Link to={href} title={title} aria-label={title}>
      {wrap}
    </Link>
  )
}

export default function ClothingProductInfo({ product }) {
  const [chartOpen, setChartOpen] = useState(false)
  const sizes = Array.isArray(product.sizes?.available) ? product.sizes.available : []

  const allVariants = [
    {
      slug: product.slug,
      colorName: product.colorName,
      colorHex: product.colorHex,
      colorHasBorder: product.colorHasBorder,
      active: true,
    },
    ...(product.linkedVariants || []).map((v) => ({ ...v, active: false })),
  ].filter((v) => v.colorHex)

  return (
    <div className="flex flex-col gap-5">
      {product.brand && (
        <span className="text-xs text-[#9aa5b1] uppercase tracking-wide">{product.brand}</span>
      )}

      <h1
        className="text-[28px] lg:text-[32px] font-bold text-[#36474e] leading-tight not-italic mb-0"
        style={{ fontFamily: "'Roboto', sans-serif", textTransform: 'none', letterSpacing: 0 }}
      >
        {product.name}
      </h1>

      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold text-[#36474e]">{formatPrice(product.price)}</span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="text-base text-[#9aa5b1] line-through">{formatPrice(product.originalPrice)}</span>
        )}
      </div>

      {product.rating > 0 && product.reviewCount > 0 && (
        <StarRating rating={product.rating} count={product.reviewCount} />
      )}

      {product.shortDescription && (
        <p className="text-sm text-[#6b7a8d] leading-relaxed">{product.shortDescription}</p>
      )}

      {allVariants.length > 0 && product.colorName && (
        <div>
          <div className="text-sm text-[#6b7a8d] mb-2">Couleur: <span className="text-[#36474e] font-bold">{product.colorName}</span></div>
          <div className="flex items-center gap-2">
            {allVariants.map((v) => (
              <ColorSwatch
                key={v.slug}
                colorHex={v.colorHex}
                colorHasBorder={v.colorHasBorder}
                active={v.active}
                title={v.colorName}
                href={`/products/${v.slug}`}
              />
            ))}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-[#36474e]">Taille</span>
            {product.sizeChartKey && (
              <button
                type="button"
                onClick={() => setChartOpen(true)}
                className="text-xs text-[#1babf9] hover:underline"
              >
                Tableau des tailles
              </button>
            )}
          </div>
          <select
            defaultValue=""
            className="w-full h-12 px-4 border-2 border-[#eff1f1] text-[#36474e] focus:border-[#1babf9] outline-none cursor-pointer"
          >
            <option value="" disabled>Choisissez votre taille</option>
            {sizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      <div className="text-sm text-[#6b7a8d]">
        Stock en ligne:{' '}
        <span className={product.inStock ? 'text-[#1babf9] font-bold' : 'text-red-500 font-bold'}>
          {product.inStock ? 'En stock' : 'Épuisé'}
        </span>
      </div>

      {product.modelInfo && (
        <p className="text-xs text-[#9aa5b1] italic">{product.modelInfo}</p>
      )}

      {chartOpen && <SizeChartModal chartKey={product.sizeChartKey} onClose={() => setChartOpen(false)} />}
    </div>
  )
}

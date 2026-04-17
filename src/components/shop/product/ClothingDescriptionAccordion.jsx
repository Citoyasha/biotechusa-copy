import { useEffect, useRef } from 'react'

const DEFAULT_USPS = [
  { key: 'breathability', label: 'Breathability', value: 3, color: '#1a4d70', min: 'low', mid: 'moderate', max: 'high' },
  { key: 'fabric', label: 'Fabric', value: 3, color: '#b5d2e6', min: 'soft', mid: 'semisoft', max: 'firm' },
  { key: 'fit', label: 'Fit', value: 3, color: '#568db3', min: 'slim-fit', mid: 'regular', max: 'oversized' },
  { key: 'intensity', label: 'Intensity of training', value: 3, color: '#1a4d70', min: 'low', mid: 'medium', max: 'high' },
  { key: 'sizing', label: 'Sizing', value: 3, color: '#568db3', min: 'smaller', mid: 'true to size', max: 'larger' },
  { key: 'weight', label: 'Weight', value: 3, color: '#b5d2e6', min: 'light', mid: 'medium', max: 'heavy' },
]

const CLOTHING_DESC_CSS = `
.clothing-desc details.cl-accordion {
  border-top: 1px solid #eff1f1;
  padding: 16px 0;
}
.clothing-desc details.cl-accordion:last-of-type {
  border-bottom: 1px solid #eff1f1;
}
.clothing-desc details.cl-accordion summary.cl-accordion__title-bar {
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 0;
  position: relative;
  padding-right: 28px;
}
.clothing-desc details.cl-accordion summary.cl-accordion__title-bar::-webkit-details-marker {
  display: none;
}
.clothing-desc details.cl-accordion summary.cl-accordion__title-bar::after {
  content: '';
  position: absolute;
  right: 4px;
  top: 50%;
  width: 10px;
  height: 10px;
  border-right: 2px solid #36474e;
  border-bottom: 2px solid #36474e;
  transform: translateY(-75%) rotate(45deg);
  transition: transform 0.2s;
}
.clothing-desc details.cl-accordion[open] summary.cl-accordion__title-bar::after {
  transform: translateY(-25%) rotate(-135deg);
}
.clothing-desc .cl-accordion__title {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #36474e;
  margin: 0;
  text-transform: none;
  letter-spacing: 0;
}
.clothing-desc .cl-accordion__title-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-size: 16px;
  color: #36474e;
}
.clothing-desc .cl-accordion__body {
  padding: 12px 0 8px 40px;
  color: #36474e;
  font-size: 14px;
  line-height: 1.6;
}
.clothing-desc .cl-accordion__body p { margin: 0 0 10px; }
.clothing-desc .cl-accordion__body a { color: #1babf9; text-decoration: underline; }
.clothing-desc .cl-accordion__body-icons {
  display: flex;
  gap: 12px;
  margin: 12px 0;
  flex-wrap: wrap;
}
.clothing-desc .cl-accordion__body-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #eff1f1;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  color: #36474e;
}
.clothing-desc .product-description-text-list__b {
  list-style: disc;
  padding-left: 20px;
  margin: 8px 0 0;
}
.clothing-desc .product-description-text-list__b li { margin: 4px 0; }
.clothing-desc .cl-button {
  display: inline-block;
  padding: 10px 24px;
  background: #36474e;
  color: #fff;
  border: none;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-decoration: none;
  font-size: 12px;
  margin-top: 8px;
}
/* Icon glyphs */
.clothing-desc .cl-icon {
  font-style: normal;
  display: inline-block;
}
.clothing-desc .cl-icon.cl-shirt::before { content: '👕'; }
.clothing-desc .cl-icon.cl-material::before { content: '🧵'; }
.clothing-desc .cl-icon.cl-return::before { content: '↩'; font-size: 18px; }
.clothing-desc .cl-icon.cl-wh-washing-30deg-1::before { content: '30°'; font-size: 11px; }
.clothing-desc .cl-icon.cl-wh-drying-tumble-not-allowed-1::before { content: '⊘'; }
.clothing-desc .cl-icon.cl-bleaching-not-allowed-1::before { content: '▽⊘'; font-size: 10px; }
.clothing-desc .cl-icon.cl-wh-iron-low-1::before { content: '•'; font-size: 18px; }
.clothing-desc .cl-icon.cl-wh-drycleaning-not-allowed-1::before { content: 'Ⓟ⊘'; font-size: 10px; }
`

function UspBars({ metrics }) {
  const raw = Array.isArray(metrics?.metrics) ? metrics.metrics : Array.isArray(metrics) ? metrics : null
  const list = raw && raw.length ? raw : DEFAULT_USPS
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-b border-[#eff1f1]">
      {list.map((m) => {
        const total = m.steps || 5
        const value = Math.max(0, Math.min(total, Number(m.value) || 0))
        const color = m.color || '#1babf9'
        return (
          <div key={m.key || m.label} className="flex flex-col gap-2">
            <div className="text-[12px] font-bold text-[#36474e]">{m.label}</div>
            <div className="flex gap-1">
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  className="h-2 flex-1 rounded-sm"
                  style={{ backgroundColor: i < value ? color : '#eff1f1' }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-[#9aa5b1] uppercase">
              <span>{m.min || ''}</span>
              <span>{m.mid || ''}</span>
              <span>{m.max || ''}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function ClothingDescriptionAccordion({ product }) {
  const descRef = useRef(null)

  useEffect(() => {
    if (!descRef.current) return
    descRef.current.querySelectorAll('details').forEach((el) => {
      if (el.querySelector('.cl-return')) el.remove()
    })
  }, [product.descriptionHtml])

  return (
    <div className="mt-8">
      <style>{CLOTHING_DESC_CSS}</style>
      <UspBars metrics={product.uspMetrics} />
      {product.descriptionHtml && (
        <div
          ref={descRef}
          className="clothing-desc"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      )}
    </div>
  )
}

import { useState } from 'react'

const SECTIONS = [
  { key: 'whyOffer', title: 'Pour quelles raisons offrons-nous le produit X?' },
  { key: 'forWhom', title: 'A qui offrons-nous le produit X?' },
  { key: 'biteAnytime', title: "Mords ça n'importe quand!" },
  { key: 'contents', title: 'Que contient une barre de X?' },
  { key: 'consumption', title: 'Quel mode de consommation suggérons-nous?' },
  { key: 'ingredients', title: 'Ingrédients' },
]

function PlusIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 flex-shrink-0">
      {open ? (
        <path strokeLinecap="round" d="M5 12h14" />
      ) : (
        <path strokeLinecap="round" d="M12 5v14M5 12h14" />
      )}
    </svg>
  )
}

function ProductDescriptionAccordion({ product }) {
  // Multiple sections can stay open independently
  const [openKeys, setOpenKeys] = useState(() => new Set(['whyOffer']))
  const productName = product.name?.split(' ').slice(0, 2).join(' ') || 'X'

  const toggle = (key) => {
    setOpenKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className="mt-8 border-t border-[#eff1f1]">
      {SECTIONS.map((section) => {
        const isOpen = openKeys.has(section.key)
        const content = product.description?.[section.key] || ''
        const title = section.title.replace('X', productName)

        return (
          <div key={section.key} className="border-b border-[#eff1f1]">
            <button
              onClick={() => toggle(section.key)}
              className="w-full flex items-center justify-between py-5 text-left hover:bg-[#f9f9f9] px-2 transition-colors"
              aria-expanded={isOpen}
            >
              <h2 className="text-base lg:text-lg font-bold text-[#36474e] not-italic mb-0" style={{ fontFamily: "'Roboto', sans-serif", textTransform: 'none', letterSpacing: 0 }}>
                {title}
              </h2>
              <PlusIcon open={isOpen} />
            </button>
            {isOpen && (
              <div className="px-2 pb-5 text-[#6b7a8d] leading-relaxed text-sm whitespace-pre-line">
                {content || (
                  <em className="text-[#9aa5b1]">
                    [Lorem ipsum — placeholder content for {section.title.toLowerCase()}.
                    Replace via Contentful CMS in PHASE 2.]
                  </em>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ProductDescriptionAccordion

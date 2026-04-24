import { useMemo, useState } from 'react'

const SHOP_DESC_CSS = `
.shop-desc { color: #36474e; font-size: 14px; line-height: 1.6; }
.shop-desc h1, .shop-desc h3, .shop-desc h4 { font-family: 'Roboto', sans-serif; font-weight: 700; color: #36474e; margin: 16px 0 8px; }
.shop-desc h3 { font-size: 16px; }
.shop-desc p { margin: 0 0 10px; }
.shop-desc ul, .shop-desc ol { padding-left: 20px; margin: 8px 0; }
.shop-desc li { margin: 4px 0; }
.shop-desc table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 13px; }
.shop-desc th, .shop-desc td { border: 1px solid #eff1f1; padding: 8px; text-align: left; }
.shop-desc th { background: #f9f9f9; font-weight: 700; color: #36474e; }
.shop-desc a { color: #1babf9; text-decoration: underline; }
.shop-desc img { max-width: 100%; height: auto; }
.shop-desc .accordion--closed { display: block; }
`

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

function parseHtmlIntoSections(html) {
  if (typeof window === 'undefined' || !html) return []
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const h2s = Array.from(doc.querySelectorAll('h2'))
  if (!h2s.length) return [{ title: 'Description du produit', content: html }]
  const sections = []
  for (const h2 of h2s) {
    const title = (h2.textContent || '').trim()
    if (!title) continue
    let content = ''
    let el = h2.nextElementSibling
    while (el && el.tagName !== 'H2') {
      content += el.outerHTML
      el = el.nextElementSibling
    }
    sections.push({ title, content })
  }
  return sections
}

function ProductDescriptionAccordion({ product }) {
  const sections = useMemo(
    () => parseHtmlIntoSections(product.descriptionHtml),
    [product.descriptionHtml],
  )
  const [openIdx, setOpenIdx] = useState(0)

  if (!sections.length) return null

  return (
    <div className="mt-8 border-t border-[#eff1f1]">
      <style>{SHOP_DESC_CSS}</style>
      {sections.map((section, idx) => {
        const isOpen = openIdx === idx
        return (
          <div key={idx} className="border-b border-[#eff1f1]">
            <button
              onClick={() => setOpenIdx(isOpen ? -1 : idx)}
              className="w-full flex items-center justify-between py-5 text-left hover:bg-[#f9f9f9] px-2 transition-colors"
              aria-expanded={isOpen}
            >
              <h2 className="text-base lg:text-lg font-bold text-[#36474e] not-italic mb-0" style={{ fontFamily: "'Roboto', sans-serif", textTransform: 'none', letterSpacing: 0 }}>
                {section.title}
              </h2>
              <PlusIcon open={isOpen} />
            </button>
            {isOpen && (
              <div
                className="shop-desc px-2 pb-5"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ProductDescriptionAccordion

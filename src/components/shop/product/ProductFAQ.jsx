import { useState } from 'react'

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

function ProductFAQ({ product }) {
  const [openIdx, setOpenIdx] = useState(null)
  const faq = product.faq || []

  if (faq.length === 0) return null

  return (
    <section className="mt-16 lg:mt-24 bg-[#f5f5f5] py-12 lg:py-16 -mx-4 lg:-mx-6 px-4 lg:px-6">
      <div className="max-w-[900px] mx-auto">
        <h2
          className="text-center text-[28px] lg:text-[36px] font-bold text-[#36474e] not-italic mb-10"
          style={{ fontFamily: "'Roboto', sans-serif", textTransform: 'none', letterSpacing: 0, lineHeight: 1.2 }}
        >
          Foire Aux Questions
        </h2>

        <div className="bg-white rounded-lg overflow-hidden">
          {faq.map((item, idx) => {
            const isOpen = openIdx === idx
            return (
              <div key={idx} className="border-b border-[#eff1f1] last:border-b-0">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#f9f9f9] transition-colors"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base lg:text-lg font-bold text-[#36474e] not-italic mb-0" style={{ fontFamily: "'Roboto', sans-serif", textTransform: 'none', letterSpacing: 0 }}>
                    {item.question}
                  </h3>
                  <PlusIcon open={isOpen} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-[#6b7a8d] leading-relaxed text-sm">
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProductFAQ

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

const GENERIC_FAQ = [
  {
    question: 'Comment consommer ce produit ?',
    answer:
      "Respectez la dose journalière recommandée indiquée sur l'emballage. Un complément alimentaire ne remplace pas une alimentation variée et équilibrée ni un mode de vie sain.",
  },
  {
    question: 'Ce produit convient-il aux végétariens ou aux végétaliens ?',
    answer:
      "La compatibilité varie selon la formule. Consultez la liste des ingrédients sur l'emballage ou contactez notre service client pour confirmation.",
  },
  {
    question: 'Les compléments BioTechUSA contiennent-ils du gluten, du lactose ou des OGM ?',
    answer:
      "La majorité de nos produits sont sans gluten, à faible teneur en lactose et sans OGM. Les pictogrammes sur la fiche produit précisent les allergènes absents.",
  },
  {
    question: 'Quel est le délai de livraison ?',
    answer:
      "Les commandes sont traitées sous 24 à 48 heures ouvrées. La livraison standard est généralement effectuée sous 3 à 5 jours ouvrés en France métropolitaine.",
  },
  {
    question: 'Puis-je retourner un produit ?',
    answer:
      "Vous disposez de 14 jours à compter de la réception pour retourner un produit non ouvert. Contactez notre service client pour initier la procédure.",
  },
]

function ProductFAQ({ product }) {
  const [openIdx, setOpenIdx] = useState(null)
  const faq = (product.faq && product.faq.length > 0) ? product.faq : GENERIC_FAQ

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

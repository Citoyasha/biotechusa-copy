import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProgressBar from '../components/ProgressBar'

/* ───── static data extracted from shop.biotechusa.fr ───── */

const heroSlides = [
  {
    desktop: 'https://biotechusa.fr/content/uploads/2014/11/FR_B2C_apr_akcios_banner_1920x720_rotator.jpg',
    mobile: 'https://biotechusa.fr/content/uploads/2014/11/FR_B2C_apr_akcios_banner_752x992_rotator.jpg',
    alt: 'Promotion BioTechUSA',
    href: '/collections/all',
  },
  {
    desktop: 'https://biotechusa.fr/content/uploads/2014/11/mobil_app_kampany_FR_1920-x-720.jpg',
    mobile: 'https://biotechusa.fr/content/uploads/2014/11/mobil_app_kampany_FR_752-x-992.jpg',
    alt: 'Application mobile',
    href: '/app',
  },
  {
    desktop: 'https://biotechusa.fr/content/uploads/2014/11/FR_Iso_Whey_Clear_1920x720_hero.jpg',
    mobile: 'https://biotechusa.fr/content/uploads/2014/11/FR_Yuzu-100CM-CE_752x992.jpg',
    alt: 'Iso Whey Clear',
    href: '/collections/proteines',
  },
]

const bestselling = [
  { name: 'Iso Whey Zero poudre de protéine isolat - 454 g', handle: 'iso-whey-zero-poudre-de-proteine-isolat-454-g', price: '44,90', image: 'https://shop.biotechusa.fr/cdn/shop/files/IWZ454g_pineapple_mango_bal_600x600_07365223-9f6c-49e5-b706-ec988a89298e_274x274.png?v=1774313710', rating: 4.9, reviews: '27 943' },
  { name: 'Arthro Forte - 120 comprimés', handle: 'arthro-forte-120-comprimes', price: '41,90', image: 'https://shop.biotechusa.fr/cdn/shop/products/ArthroForte_120tbl_600x600_221220d2-c969-4d2f-9341-67e483325339_274x274.png?v=1762785686', rating: 4.9, reviews: '8 765' },
  { name: '100% Creatine Monohydrate - 300 g non-aromatisé', handle: '100-micronized-creatine-monohydrate-300-g-non-aromatise', price: '29,90', image: 'https://shop.biotechusa.fr/cdn/shop/files/100CreatineMonohydrate_300g_unflavored_1l_600x600_051b36b1-e55e-4d35-84ad-2aa13732bc77_274x274.png?v=1770751570', rating: 4.9, reviews: '4 746' },
  { name: 'Protein Power - 1000 g', handle: 'protein-power-1000-g', price: '40,90', image: 'https://shop.biotechusa.fr/cdn/shop/files/ProteinPower_1000g_StrawberryBanana_bal_600x600_e03da0a1-eb51-4975-b58d-3b536cab523f_274x274.png?v=1772159832', rating: 4.7, reviews: '5 774' },
  { name: 'One-A-Day - 100 comprimés', handle: 'one-a-day-100-comprimes', price: '19,90', image: 'https://shop.biotechusa.fr/cdn/shop/products/OneADay_100tbl_250ml_600x600_f947663c-7dc7-4398-bd19-5808a6ca8e71_274x274.png?v=1762785761', rating: 4.9, reviews: '9 091' },
  { name: '100% Pure Whey - 2270 g', handle: '100-pure-whey-renouvele-2270-g', price: '89,90', image: 'https://shop.biotechusa.fr/cdn/shop/files/100PW_Chocolate_600x600_2270g_274x274.png?v=1764691150', rating: 4.8, reviews: '1 475' },
  { name: 'Marine Collagen boisson en poudre - 240 g', handle: 'marine-collagen-boisson-en-poudre-240-g', price: '47,90', image: 'https://shop.biotechusa.fr/cdn/shop/products/MarineCollagen_240g_lemon_greentea_600x600_29ebe829-68e8-4cf0-bc08-7ade25c2f637_274x274.png?v=1762785533', rating: 4.6, reviews: '30' },
  { name: 'Zero Bar protéine bar - 50 g', handle: 'zero-bar-50-g', price: '3,70', image: 'https://shop.biotechusa.fr/cdn/shop/files/ZeroBar50g_Capuccino_600x600_270e2620-d1ea-4227-863a-7e9b7c1b3ec8_274x274.png?v=1762785951', rating: 4.9, reviews: '2 202' },
]

const promoProducts = [
  { name: 'EAA ZERO - 350 g', handle: 'eaa-zero-350-g', price: '27,90', originalPrice: '37,90', image: 'https://shop.biotechusa.fr/cdn/shop/files/EAAZero_1l_350g_lemon_600x600_a2eceb43-bb25-4c20-82a7-eb6b3b95a73b_274x274.png?v=1764691209', rating: 4.9, reviews: '1 351', badge: 'Accord de fidélité' },
  { name: 'Collagen Liquid - 1000 ml', handle: 'collagen-liquid-1000-ml', price: '36,70', originalPrice: '48,90', image: 'https://shop.biotechusa.fr/cdn/shop/products/Collagen_Liquid_Tropical_1000ml_274x274.png?v=1762785761', rating: 4.9, reviews: '3 885', badge: 'Accord de fidélité' },
  { name: 'Pump Caffeine Free - 330 g', handle: 'poudre-pour-boisson-pump-caffeine-free-330-g', price: '25,50', originalPrice: '33,90', image: 'https://shop.biotechusa.fr/cdn/shop/files/Pump_CaffeineFree_TropicalFruit_330g_1l_600x600_a1785d8d-a6f6-44da-b7ab-4c260fe77392_274x274.png?v=1762785687', rating: 4.8, reviews: '35', badge: 'Accord de fidélité' },
  { name: 'Lifelong 360° - 60 capsules', handle: 'lifelong-360-60-capsule', price: '30,30', originalPrice: '40,90', image: 'https://shop.biotechusa.fr/cdn/shop/files/lifelong_360_600x600_25b80e8e-d7e9-4732-b10f-e9d171cab503_274x274.png?v=1762785284', rating: 5.0, reviews: '15', badge: 'Accord de fidélité' },
  { name: 'Iso Whey Platinum - 908 g', handle: 'iso-whey-platinum-908-g', price: '50,10', originalPrice: '64,90', image: 'https://shop.biotechusa.fr/cdn/shop/files/IsoWheyPlatinum_908g_Chocolate_4l_600x600_55b84a5f-b689-4d6e-b0f4-51f9d475ef20_274x274.png?v=1763033819', rating: 4.9, reviews: '45', badge: 'Accord de fidélité' },
]

const newProducts = [
  { name: '100% Pure Whey - 900 g Strawberry-matcha latte (limited)', handle: '100-pure-whey-900-g-strawberry-matcha-latte-limited', price: '56,90', image: 'https://shop.biotechusa.fr/cdn/shop/files/100PureWhey_900g_StrawberryMatcha_4l_600x600_6be8149d-adbb-4007-ba32-e71c0a5e0119_274x274.png?v=1775640130', rating: 5.0, reviews: '3', isNew: true },
  { name: '100% Creatine Monohydrate - 300 g yuzu', handle: '100-creatine-monohydrate-300-g-yuzu', price: '33,90', image: 'https://shop.biotechusa.fr/cdn/shop/files/100CreatineMonohydrate_300g_yuzu_1l_600x600_5f6d3330-52ab-4982-9b34-1e70e0296aa6_274x274.png?v=1775142489', rating: 5.0, reviews: '3', isNew: true },
  { name: 'Whey Shake - 1000 g', handle: 'whey-shake-1000-g', price: '39,90', image: 'https://shop.biotechusa.fr/cdn/shop/files/WheyShake1000g4lSaltedCaramel_600x600_cecaec91-4e67-4c42-a4d4-cefaeb190476_274x274.png?v=1775888050', rating: 5.0, reviews: '3', isNew: true },
  { name: 'Ashwagandha KSM-66® - 60 gélules', handle: 'ashwagandha-ksm-66%C2%AE-60-gelules', price: '19,90', image: 'https://shop.biotechusa.fr/cdn/shop/files/KSM66_Ashwa_600x600_400c6fb6-1f21-4a05-86f7-7319a3c7b259_274x274.png?v=1775722510', rating: 0, reviews: '', isNew: true },
  { name: 'Iso Whey Clear - 400 g', handle: 'iso-whey-clear-400-g', price: '47,90', image: 'https://shop.biotechusa.fr/cdn/shop/files/IsoWheyClear_400g_cactus_fig_600x600_b03b8125-5437-4c66-a31e-cd068e5d7622_274x274.png?v=1770750851', rating: 4.7, reviews: '73', isNew: true },
]

const goalCards = [
  { image: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_celok_332x460_izomepites.jpg?v=1773236187', caption: 'PRISE DE MUSCLE', description: 'Un engagement constant pour un physique plus musclé, plus athlétique', href: '/collections/prise-de-muscle' },
  { image: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_celok_332x460_ero_teljesitmeny.jpg?v=1773236187', caption: 'GAIN DE FORCE ET DE PERFORMANCES', description: "Quand la performance et l'envie de repousser tes limites te motivent", href: '/collections/gain-de-force-et-de-performances' },
  { image: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_celok_332x460_egeszseg.jpg?v=1773236187', caption: 'SANTÉ', description: 'Pour soutenir la vitalité au quotidien et un bien-être équilibré', href: '/collections/sante' },
  { image: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_celok_332x460_tomegnoveles.jpg?v=1773236187', caption: 'PRISE DE MASSE', description: 'Une préparation engagée pour bâtir un physique plus imposant', href: '/collections/prise-de-masse-1' },
  { image: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_celok_332x460_izomvedelem.jpg?v=1773236188', caption: 'PROTECTION MUSCULAIRE', description: 'Préserver ton physique tout en menant une vie active', href: '/collections/protection-musculaire' },
  { image: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_celok_332x460_beauty.jpg?v=1773236187', caption: 'BEAUTÉ', description: 'Un éclat naturel et une apparence soignée en toutes circonstances', href: '/collections/beaute' },
]

const featuredItems = [
  {
    title: 'Protéines',
    description: "Une source de nutriments pratique, déclinée en différentes versions, pour un quotidien sportif et une alimentation consciente",
    href: '/collections/proteines',
    bgDesktop: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_celok_termekajanlo_desktop_protein_03_680x320_15129370-0a57-4133-9941-a9e5bdd45b51.jpg?v=1773236187',
    bgMobile: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_celok_termekajanlo_mobil_protein_03_267x420_869ec74d-7114-42f1-9d2b-c1f259891bdc.jpg?v=1773236187',
    productImg: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_celok_termekajanlo_desktop_protein_363x300_4cd0286a-302a-418c-afd0-55eeba43cc9e.png?v=1773236187',
    productImgMobile: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_celok_termekajanlo_mobil_protein_267x276_ede9185d-50b3-43e6-878d-2fc5d3378fff.png?v=1773236187',
  },
  {
    title: 'Créatine',
    description: "Ingrédient populaire parmi les produits de nutrition sportive, en différentes versions",
    href: '/collections/creatines',
    bgDesktop: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_celok_termekajanlo_desktop_creatine_03_680x320_1eb6141f-bc8c-455c-ad8d-1563b8cbef8d.jpg?v=1773236187',
    bgMobile: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_celok_termekajanlo_mobil_creatine_03_267x420_0fee5266-72d4-46dc-a934-2d7f31a05e8f.jpg?v=1773236187',
    productImg: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_celok_termekajanlo_desktop_creatine_363x300_97e01c2d-0086-4136-8bb4-d9ffa40e8233.png?v=1773236187',
    productImgMobile: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_celok_termekajanlo_mobil_creatine_267x276_83497818-5285-4c0d-a48a-232c0866c6ff.png?v=1773236187',
  },
]

const athletes = [
  { image: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_influk_barca_332x430_02.jpg?v=1773404740', name: 'FC Barcelona', role: '5x vainqueur de la Ligue des champions', social: '@fcbarcelona' },
  { image: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_influk_uli_332x430_5b11e441-a348-4b04-999b-60fb96f436db.jpg?v=1773236187', name: 'Ulisses', role: 'ambassadeur BioTechUSA', social: '@ulissesworld' },
  { image: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_influk_verena_332x430_94e90a1a-7f72-4742-a0eb-0b14210a74c0.jpg?v=1773404744', name: 'Verena', role: 'ambassadeur BioTechUSA', social: '@verena_katrien' },
  { image: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_influk_ragnar_332x430_7a23df5e-9130-4336-9e2a-6662d32b4c74.jpg?v=1773236187', name: 'Rémi Ragnar', role: 'ambassadeur BioTechUSA', social: '@remi_ragnar' },
  { image: 'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_influk_diego_332x430_d279d7f8-fc2a-4dd9-bfe7-fbb996e90172.jpg?v=1773236187', name: 'Diego Sechi', role: 'ambassadeur BioTechUSA', social: '@diegosechi' },
]

/* ───── tiny helpers ───── */

function StarRow({ rating, count }) {
  if (!rating) return null
  const full = Math.floor(rating)
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-px">
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} className="w-[13px] h-[13px]" viewBox="0 0 20 20" fill={i < full ? '#1babf9' : '#dadada'}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.025 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
          </svg>
        ))}
      </div>
      {count && <span className="text-[10px] text-[#798f9c] font-normal" style={{ fontFamily: 'Roboto, sans-serif' }}>{count} Avis</span>}
    </div>
  )
}

/* ───── carousel hook ───── */

function useCarousel(length, auto = 5000) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (!auto) return
    const id = setInterval(() => setIdx((i) => (i + 1) % length), auto)
    return () => clearInterval(id)
  }, [length, auto])
  return [idx, setIdx]
}

/* ───── horizontal scroll for product rows ───── */

function ScrollRow({ children, gap = 16, scrollRef }) {
  const localRef = useRef(null)
  const ref = scrollRef || localRef
  const scroll = (dir) => {
    if (!ref.current) return
    ref.current.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }
  return (
    <div className="relative group">
      <button onClick={() => scroll(-1)} className="hidden lg:flex absolute -left-5 top-[35%] -translate-y-1/2 z-10 w-11 h-11 items-center justify-center bg-white shadow-lg rounded-full text-[#36474e] opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Précédent">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
      </button>
      <div ref={ref} className="flex overflow-x-auto scroll-smooth snap-x" style={{ gap: `${gap}px`, WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`.scroll-row-hide::-webkit-scrollbar { display: none; }`}</style>
        {children}
      </div>
      <button onClick={() => scroll(1)} className="hidden lg:flex absolute -right-5 top-[35%] -translate-y-1/2 z-10 w-11 h-11 items-center justify-center bg-white shadow-lg rounded-full text-[#36474e] opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Suivant">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
      </button>
    </div>
  )
}

/* ───── product card (shop variant) ───── */

function ShopProductCard({ product }) {
  return (
    <a href={`/products/${product.handle}`} className="snap-start flex-shrink-0 w-[180px] sm:w-[200px] lg:w-[16.5%] group block">
      <div className="relative bg-[#eff1f1] overflow-hidden rounded-xl">
        {product.isNew && (
          <span className="absolute top-2.5 left-2.5 bg-[#00adef] text-white text-[10px] font-bold uppercase px-3 py-[3px] leading-[18px] z-10" style={{ fontFamily: "'Nexa', sans-serif" }}>Nouveau</span>
        )}
        {product.badge && (
          <span className="absolute top-2.5 right-2.5 bg-[#ff4949] text-white text-[10px] font-bold uppercase px-3 py-[3px] leading-[18px] z-10" style={{ fontFamily: "'Nexa', sans-serif" }}>{product.badge}</span>
        )}
        <div className="aspect-square flex items-center justify-center p-3">
          <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        </div>
      </div>
      <div className="pt-3">
        <StarRow rating={product.rating} count={product.reviews} />
        <p className="text-[13px] font-bold text-[#36474e] leading-tight mt-1 line-clamp-2 group-hover:text-[#1babf9] transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>{product.name}</p>
        <div className="mt-1.5">
          {product.originalPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-[15px] font-bold text-[#36474e]" style={{ fontFamily: 'Roboto, sans-serif' }}>{`€${product.price}`}</span>
              <span className="text-[15px] text-[#a5a5a5] line-through font-normal" style={{ fontFamily: 'Roboto, sans-serif' }}>{`€${product.originalPrice}`}</span>
            </div>
          ) : (
            <span className="text-[15px] font-bold text-[#36474e]" style={{ fontFamily: 'Roboto, sans-serif' }}>{`€${product.price}`}</span>
          )}
        </div>
      </div>
    </a>
  )
}

/* ───── products tabs section ───── */

function ProductsTabsSection({ tabs, activeTab, setActiveTab, activeProducts }) {
  const scrollRef = useRef(null)
  const [currentIdx, setCurrentIdx] = useState(0)
  const visibleCount = 6

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentIdx(0)
    if (scrollRef.current) scrollRef.current.scrollLeft = 0
  }, [activeTab])

  const handleProgressClick = (idx) => {
    setCurrentIdx(idx)
    if (!scrollRef.current) return
    const container = scrollRef.current
    const children = container.children
    if (!children[idx]) return
    const targetLeft = children[idx].offsetLeft - container.offsetLeft
    container.scrollTo({ left: targetLeft, behavior: 'smooth' })
  }

  return (
    <section className="w-full bg-white pt-10 pb-8 lg:pt-14 lg:pb-12">
      <div className="w-[95%] mx-auto">
        <h2 className="text-left mb-6" style={{ fontFamily: "'Nexa', sans-serif", fontWeight: 800, fontStyle: 'italic', fontSize: '24px', lineHeight: '32px', textTransform: 'uppercase', color: '#36474e' }}>
          Nos produits
        </h2>
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`whitespace-nowrap px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.08em] rounded-full transition-colors ${
                activeTab === t.key
                  ? 'bg-[#36474e] text-white'
                  : 'bg-white text-[#798f9c] border border-[#d6dade] hover:border-[#36474e] hover:text-[#36474e]'
              }`}
              style={{ fontFamily: "'Nexa', sans-serif" }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <ScrollRow gap={16} scrollRef={scrollRef}>
          {activeProducts.map((p) => (
            <ShopProductCard key={p.handle} product={p} />
          ))}
        </ScrollRow>
        <ProgressBar
          total={activeProducts.length}
          visible={visibleCount}
          current={currentIdx}
          onChange={handleProgressClick}
        />
      </div>
    </section>
  )
}

/* ───── articles data + section ───── */

const articleTabs = [
  'Les plus récents', 'Populaire', 'Actualités', 'Astuces et compléments alimentaires',
  'Mode de vie', "Plans d'entraînement", 'Recettes', 'Régimes alimentaires',
]

const blogArticles = [
  {
    category: 'ASTUCES ET COMPLÉMENTS ALIMENTAIRES',
    title: 'Curcumine : bienfaits, utilisation et précautions',
    image: 'https://biotechusa.fr/content/smush-webp/2026/03/BioTechUSA-cover-1400x390-293-768x214.png.webp',
    href: '/blog/curcumine-bienfaits',
  },
  {
    category: 'ASTUCES ET COMPLÉMENTS ALIMENTAIRES',
    title: 'Par quoi remplacer la whey : alternatives pour vos protéines',
    image: 'https://biotechusa.fr/content/smush-webp/2026/03/BioTechUSA-cover-1400x390-288-768x214.png.webp',
    href: '/blog/remplacer-whey',
  },
  {
    category: 'ASTUCES ET COMPLÉMENTS ALIMENTAIRES',
    title: 'Quand prendre la whey pour une prise de masse efficace : le guide complet',
    image: 'https://biotechusa.fr/content/smush-webp/2026/03/BioTechUSA-cover-1400x390-287-768x214.png.webp',
    href: '/blog/quand-prendre-whey',
  },
]

function ArticlesSection() {
  const [activeArticleTab, setActiveArticleTab] = useState(0)

  return (
    <section className="w-full bg-white py-10 lg:py-14">
      <div className="w-[95%] mx-auto">
        <h4 className="text-left text-[16px] font-medium text-[#36474e] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Nos articles
        </h4>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {articleTabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveArticleTab(i)}
              className={`whitespace-nowrap px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.06em] rounded-full transition-colors ${
                activeArticleTab === i
                  ? 'bg-[#36474e] text-white'
                  : 'bg-white text-[#798f9c] border border-[#d6dade] hover:border-[#36474e] hover:text-[#36474e]'
              }`}
              style={{ fontFamily: "'Nexa', sans-serif" }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Article cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogArticles.map((article) => (
            <a key={article.title} href={article.href} className="group block">
              <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#eff1f1]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="mt-3">
                <p className="text-[10px] font-bold text-[#798f9c] uppercase tracking-wide">{article.category}</p>
                <p className="text-[14px] font-bold text-[#36474e] leading-snug mt-1 group-hover:text-[#1babf9] transition-colors line-clamp-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {article.title}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <a
            href="/blog"
            className="px-8 py-2.5 border border-[#36474e] text-[#36474e] text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-[#36474e] hover:text-white transition-colors"
            style={{ fontFamily: "'Nexa', sans-serif" }}
          >
            Plus d'articles
          </a>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   MAIN PAGE
   ================================================================ */

export default function ShopPage() {
  const [heroIdx, setHeroIdx] = useCarousel(heroSlides.length)
  const [activeTab, setActiveTab] = useState('bestselling')

  const tabs = [
    { key: 'bestselling', label: 'Les plus populaires', data: bestselling },
    { key: 'promo', label: 'Produits en promotion', data: promoProducts },
    { key: 'new', label: 'Nouveaux produits', data: newProducts },
  ]

  const activeProducts = tabs.find((t) => t.key === activeTab)?.data || []

  return (
    <>
      <Header />

      {/* ── HERO CAROUSEL ── */}
      <section className="relative w-full overflow-hidden bg-black select-none">
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${heroIdx * 100}%)` }}>
          {heroSlides.map((s) => (
            <a key={s.desktop} href={s.href} className="relative w-full flex-shrink-0" aria-label={s.alt}>
              <picture>
                <source media="(min-width: 768px)" srcSet={s.desktop} />
                <img src={s.mobile} alt={s.alt} className="w-full h-auto block aspect-[752/992] md:aspect-[1920/560] object-cover" draggable={false} />
              </picture>
            </a>
          ))}
        </div>
        <button onClick={() => setHeroIdx((heroIdx - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-10 text-white/90 hover:text-white" aria-label="Précédent">
          <svg className="w-8 h-8 lg:w-9 lg:h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        </button>
        <button onClick={() => setHeroIdx((heroIdx + 1) % heroSlides.length)} className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-10 text-white/90 hover:text-white" aria-label="Suivant">
          <svg className="w-8 h-8 lg:w-9 lg:h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)} className={`h-2 rounded-full transition-all ${i === heroIdx ? 'w-6 bg-white' : 'w-2 bg-white/50'}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* ── PRODUCTS TABS ── */}
      <ProductsTabsSection tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} activeProducts={activeProducts} />

      {/* ── FULL-WIDTH BANNER ── */}
      <section className="w-full">
        <a href="/collections/all" className="block">
          <picture>
            <source media="(max-width: 480px)" srcSet="https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_barca_480x480_aed39d94-8816-4d31-a647-a56c62bc0560.jpg?v=1773236188" />
            <source media="(min-width: 481px)" srcSet="https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_barca_2560x560_6a82f4b9-e0bf-466b-b421-fd870274f9ec.jpg?v=1773236189" />
            <img src="https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_barca_2560x560_6a82f4b9-e0bf-466b-b421-fd870274f9ec.jpg?v=1773236189" alt="FC Barcelona x BioTechUSA" className="w-full h-auto block" loading="lazy" />
          </picture>
        </a>
      </section>

      {/* ── GOALS SECTION ── */}
      <section className="w-full bg-white py-10 lg:py-14">
        <div className="w-[95%] mx-auto">
          <h4 className="text-left text-[16px] font-medium text-[#36474e] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Nous vous aidons a atteindre vos objectifs
          </h4>
          <ScrollRow gap={12}>
            {goalCards.map((g) => (
              <a key={g.caption} href={g.href} className="snap-start flex-shrink-0 w-[260px] sm:w-[280px] lg:w-[calc((100%-48px)/4)] block group">
                <div className="relative aspect-[332/460] overflow-hidden rounded-xl">
                  <img src={g.image} alt={g.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col">
                    <p className="text-[13px] font-extrabold uppercase text-white tracking-wide leading-tight" style={{ fontFamily: "'Nexa', sans-serif" }}>{g.caption}</p>
                    <p className="text-[12px] text-white/80 mt-1.5 leading-snug">{g.description}</p>
                    <span className="mt-3 self-start px-5 py-2 border border-white text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-[#36474e] transition-colors">
                      VOIR
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </ScrollRow>
          <ProgressBar total={goalCards.length} visible={4} current={0} onChange={() => {}} />
        </div>
      </section>

      {/* ── FEATURED ITEMS (2-col) ── */}
      <section className="w-full bg-white pb-10 lg:pb-14">
        <div className="w-[95%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredItems.map((f) => (
              <div key={f.title} className="relative overflow-hidden min-h-[280px] lg:min-h-[320px] flex rounded-xl" style={{ backgroundImage: `url(${f.bgDesktop})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="relative z-10 flex flex-col justify-center p-6 lg:p-8 max-w-[50%]">
                  <span className="text-[#36474e] text-[18px] lg:text-[22px] font-extrabold uppercase" style={{ fontFamily: "'Nexa', sans-serif" }}>{f.title}</span>
                  <span className="text-[#36474e]/80 text-[12px] mt-2 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>{f.description}</span>
                  <a href={f.href} className="mt-5 self-start px-5 py-2 border border-[#36474e] text-[#36474e] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#36474e] hover:text-white transition-colors" style={{ fontFamily: "'Nexa', sans-serif" }}>
                    VOIR
                  </a>
                </div>
                <picture className="absolute right-0 bottom-0 w-[50%] h-full">
                  <source media="(max-width: 480px)" srcSet={f.productImgMobile} />
                  <img src={f.productImg} alt={f.title} className="w-full h-full object-contain object-right-bottom" loading="lazy" />
                </picture>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTED & TRUSTED (black block) ── */}
      <section className="w-full bg-black py-14 lg:py-20">
        <div className="w-[95%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="py-8 lg:py-10 text-center">
              <h3 className="text-[22px] lg:text-[26px] font-bold text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>Ingredients surs</h3>
              <p className="text-[14px] text-white/50 mt-4 leading-relaxed">
                Processus de fabrication transparent et sur –<br className="hidden sm:block" />
                nous effectuons <span className="font-bold text-white">230.000+</span> analyses en laboratoire par an
              </p>
            </div>
            <div className="py-8 lg:py-10 text-center">
              <h3 className="text-[22px] lg:text-[26px] font-bold text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>Qualite fiable</h3>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-[16px] font-bold text-[#1babf9]">4.9/5</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} className="w-[18px] h-[18px]" viewBox="0 0 20 20" fill="#1babf9">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.025 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-[14px] text-white/50 mt-2">– d'apres pres de <span className="font-bold text-white">250.000</span> avis clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ATHLETES (black bg that ends partway into cards) ── */}
      <section className="w-full relative">
        {/* Black background covers title area + top ~40% of card area */}
        <div className="absolute inset-x-0 top-0 bg-black" style={{ height: '85%' }} />
        <div className="relative w-[95%] mx-auto pt-8 pb-10 lg:pb-14">
          <div className="text-center mb-6">
            <h3 className="text-[20px] font-bold text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>Nos athletes</h3>
            <p className="text-[13px] text-white/50 mt-1">Nous inspirons des performances de haut niveau dans le monde entier</p>
          </div>
          <ScrollRow gap={12}>
            {athletes.map((a) => (
              <div key={a.name} className="snap-start flex-shrink-0 w-[240px] sm:w-[260px] lg:w-[calc((100%-48px)/4)] group">
                <div className="relative aspect-[332/430] overflow-hidden rounded-xl">
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[15px] font-extrabold text-white uppercase tracking-wide" style={{ fontFamily: "'Nexa', sans-serif" }}>{a.name}</p>
                    <p className="text-[11px] text-white/70 mt-0.5 uppercase tracking-wide">{a.role}</p>
                    <p className="text-[11px] text-white/50 mt-0.5">{a.social}</p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* ── ARTICLES SECTION ── */}
      <ArticlesSection />

      {/* ── ABOUT / FOOTER DESCRIPTION (dark) ── */}
      <section className="w-full bg-black py-12 lg:py-16">
        <div className="w-[95%] mx-auto">
          <h4 className="text-left text-[16px] font-medium text-white mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
            C'est BioTechUSA
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.2fr] gap-8">
            {/* Left col — text + thumbnails */}
            <div>
              <p className="text-[13px] text-white/50 leading-relaxed">
                Les produits BioTechUSA sont conçus pour t'aider à dépasser les limites de tes performances et te soutenir dans l'adoption d'un mode de vie sain. Peu importe que tu ailles t'entraîner après de longues heures au bureau, que la musculation professionnelle soit ton métier ou que ton objectif soit de préserver ta santé : avec nos compléments alimentaires développés en interne, tu peux passer au niveau supérieur.
              </p>
              <div className="flex gap-2 mt-5">
                {[
                  'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_footer_05_80x80_b40c3413-e734-421f-9265-3b7f0f593751.jpg?v=1773236186',
                  'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_footer_02_80x80_016aabb7-1f80-4f70-8c7f-9e16ecf9daaa.jpg?v=1773236187',
                  'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_footer_04_80x80_7ecf158f-8698-4120-b8f4-c75172e78278.jpg?v=1773236186',
                  'https://shop.biotechusa.fr/cdn/shop/files/Megujult_fooldal_grafikai_anyagok_footer_03_80x80_0fee0ae9-8634-46e6-8922-d0f3ce00c9b0.jpg?v=1773236186',
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-[60px] h-[60px] rounded-lg object-cover" loading="lazy" />
                ))}
              </div>
            </div>

            {/* Middle col — text */}
            <p className="text-[13px] text-white/50 leading-relaxed">
              Nous ne nous contentons pas de résultats moyens : grâce à des recherches et des développements continus, nous créons de nouvelles gammes de produits afin de rendre les compléments d'un mode de vie sain facilement accessibles à tous. C'est ainsi qu'ont vu le jour des variantes sans lactose et sans gluten, qui offrent une alternative adaptée aux personnes sensibles, ainsi que notre gamme végane composée exclusivement d'ingrédients d'origine végétale.
            </p>

            {/* Right col — YouTube */}
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/ZS7r8Scrogw"
                title="Taste the quality, feel the results | BioTechUSA"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

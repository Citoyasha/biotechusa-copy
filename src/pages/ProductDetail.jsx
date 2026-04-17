import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProductBySlug } from '../data/fetchProducts'
import { fetchProductBreadcrumb } from '../data/fetchNavigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/shop/Breadcrumb'
import ProductGallery from '../components/shop/product/ProductGallery'
import ProductInfo from '../components/shop/product/ProductInfo'
import ProductDescriptionAccordion from '../components/shop/product/ProductDescriptionAccordion'
import ProductFAQ from '../components/shop/product/ProductFAQ'
import ClothingProductDetail from './ClothingProductDetail'

const LOREM_SHORT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const LOREM_LONG = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

const PLACEHOLDER_DESCRIPTION = {
  whyOffer: LOREM_LONG,
  forWhom: LOREM_LONG,
  biteAnytime: LOREM_LONG,
  contents: LOREM_LONG,
  consumption: LOREM_LONG,
  ingredients: LOREM_LONG,
}

const PLACEHOLDER_VARIANTS = [
  { id: 'v1', label: 'Lorem chocolat', available: true },
  { id: 'v2', label: 'Lorem vanille', available: true },
  { id: 'v3', label: 'Lorem fraise', available: false },
]

const PLACEHOLDER_BADGES = [
  { icon: 'aspartame', label: 'Sans aspartame' },
  { icon: 'gluten', label: 'Sans gluten' },
  { icon: 'ogm', label: 'Sans ogm' },
  { icon: 'sugar', label: 'Faible teneur en sucre' },
]

const PLACEHOLDER_FAQ = [
  { question: 'Lorem ipsum dolor sit amet consectetur ?', answer: LOREM_SHORT },
  { question: 'Sed do eiusmod tempor incididunt ?', answer: LOREM_SHORT },
  { question: 'Ut enim ad minim veniam quis nostrud ?', answer: LOREM_SHORT },
  { question: 'Duis aute irure dolor in reprehenderit ?', answer: LOREM_SHORT },
]

/**
 * Apply lorem ipsum fallbacks for any missing fields.
 * Allows ANY product slug to render the template.
 * PHASE 2: Contentful entries will populate these fields, fallbacks become rare.
 */
function withDefaults(product) {
  return {
    ...product,
    shortDescription: product.shortDescription ?? LOREM_SHORT,
    description: { ...PLACEHOLDER_DESCRIPTION, ...(product.description || {}) },
    variants: product.variants ?? PLACEHOLDER_VARIANTS,
    badges: product.badges ?? PLACEHOLDER_BADGES,
    packaging: product.packaging ?? null,
    faq: product.faq ?? PLACEHOLDER_FAQ,
  }
}

function ProductDetail() {
  const { slug } = useParams()
  const [data, setData] = useState({ slug: null, product: null, crumb: null })

  useEffect(() => {
    let cancelled = false
    fetchProductBySlug(slug).then(async (p) => {
      const crumb = p ? await fetchProductBreadcrumb(p) : null
      if (!cancelled) setData({ slug, product: p, crumb })
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  const loading = data.slug !== slug
  const product = loading ? null : data.product
  const crumb = loading ? null : data.crumb

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-[1140px] mx-auto px-4 py-20 text-center text-[#9aa5b1]">
          Chargement...
        </div>
        <Footer />
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="max-w-[1140px] mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-[#36474e] mb-4 not-italic" style={{ fontFamily: "'Roboto', sans-serif", textTransform: 'none', letterSpacing: 0 }}>Produit introuvable</h1>
          <Link to="/collections/all" className="text-[#1ea7e1] hover:underline">
            ← Retour à tous les produits
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  if (product.type === 'clothing') {
    return <ClothingProductDetail product={product} crumb={crumb} />
  }

  const p = withDefaults(product)

  return (
    <>
      <Header />
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          crumb || { label: 'Tous les produits', href: '/collections/all' },
          { label: p.name },
        ]}
      />

      <main className="w-full bg-white">
        <div className="w-full px-4 lg:px-12 py-8 lg:py-12">
          {/* Two-column layout: left scrolls (gallery + description); right is sticky (info) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* LEFT — gallery + description accordion */}
            <div>
              <ProductGallery product={p} />
              <ProductDescriptionAccordion product={p} />
            </div>

            {/* RIGHT — sticky info panel */}
            <div className="lg:sticky lg:top-6 self-start">
              <ProductInfo product={p} />
            </div>
          </div>

          {/* FAQ — full width, below sticky area */}
          <ProductFAQ product={p} />
        </div>
      </main>

      <Footer />
    </>
  )
}

export default ProductDetail

import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/shop/Breadcrumb'
import ClothingProductGallery from '../components/shop/product/ClothingProductGallery'
import ClothingProductInfo from '../components/shop/product/ClothingProductInfo'
import ClothingDescriptionAccordion from '../components/shop/product/ClothingDescriptionAccordion'

export default function ClothingProductDetail({ product, crumb }) {
  return (
    <>
      <Header />
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          crumb || { label: 'Vêtements', href: '/vetements' },
          { label: product.name },
        ]}
      />

      <main className="w-full bg-white">
        <div className="w-[95%] mx-auto py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12 items-start">
            <div>
              <ClothingProductGallery product={product} />
              <ClothingDescriptionAccordion product={product} />
            </div>
            <aside className="lg:sticky lg:top-6 self-start">
              <ClothingProductInfo product={product} />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

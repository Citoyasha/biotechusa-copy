import { useState, useEffect } from 'react'
import { fetchProducts } from '../data/fetchProducts'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/shop/Breadcrumb'
import FilterBar from '../components/shop/FilterBar'
import ProductGrid from '../components/shop/ProductGrid'
import Pagination from '../components/shop/Pagination'

const PRODUCTS_PER_PAGE = 16

function ShopCollections() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Tous les produits', href: '/collections/all' },
        ]}
      />

      {/* Main content */}
      <main className="w-full bg-white">
        <div className="max-w-[1140px] mx-auto px-4 lg:px-6">
          {/* Collection title */}
          <h2 className="text-center pt-12 pb-0 mb-8 not-italic" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '28px', lineHeight: '36px', textTransform: 'none' }}>
            Tous les produits
          </h2>

          {/* Filter bar */}
          <FilterBar
            totalResults={products.length}
            onFilterClick={() => {}}
          />

          {/* Product grid */}
          {loading ? (
            <div className="py-20 text-center text-[#9aa5b1]">
              Chargement...
            </div>
          ) : (
            <ProductGrid products={paginatedProducts} />
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>

      <Footer />
    </>
  )
}

export default ShopCollections

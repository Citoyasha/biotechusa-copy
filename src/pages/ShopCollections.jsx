import { useState, useEffect, useMemo } from 'react'
import { fetchProducts } from '../data/fetchProducts'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/shop/Breadcrumb'
import FilterBar from '../components/shop/FilterBar'
import FilterDrawer from '../components/shop/FilterDrawer'
import ProductGrid from '../components/shop/ProductGrid'
import Pagination from '../components/shop/Pagination'

const PRODUCTS_PER_PAGE = 16

function applySort(list, sort) {
  const copy = [...list]
  switch (sort) {
    case 'topSales':
      return copy.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
    case 'popularity':
      return copy.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    case 'az':
      return copy.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'fr'))
    case 'za':
      return copy.sort((a, b) => (b.name || '').localeCompare(a.name || '', 'fr'))
    case 'priceAsc':
      return copy.sort((a, b) => (a.price || 0) - (b.price || 0))
    case 'priceDesc':
      return copy.sort((a, b) => (b.price || 0) - (a.price || 0))
    case 'dateDesc':
      return copy.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    case 'dateAsc':
      return copy.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0))
    default:
      return copy
  }
}

function ShopCollections({ fetchFn = fetchProducts, title = 'Tous les produits', breadcrumbLabel = 'Tous les produits', breadcrumbHref = '/collections/all' }) {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [sort, setSort] = useState('default')
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    fetchFn().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [fetchFn])

  const filteredProducts = useMemo(() => {
    const filtered = selectedCategories.length
      ? products.filter((p) => selectedCategories.includes(p.category))
      : products
    return applySort(filtered, sort)
  }, [products, selectedCategories, sort])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleApplyFilters = ({ sort: nextSort, categories }) => {
    setSort(nextSort)
    setSelectedCategories(categories)
    setCurrentPage(1)
  }

  return (
    <>
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: breadcrumbLabel, href: breadcrumbHref },
        ]}
      />

      {/* Main content */}
      <main className="w-full bg-white">
        <div className="max-w-[1140px] mx-auto px-4 lg:px-6">
          {/* Collection title */}
          <h2 className="text-center pt-12 pb-0 mb-8 not-italic" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '28px', lineHeight: '36px', textTransform: 'none' }}>
            {title}
          </h2>

          {/* Filter bar */}
          <FilterBar
            totalResults={filteredProducts.length}
            onFilterClick={() => setDrawerOpen(true)}
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

      {drawerOpen && (
        <FilterDrawer
          onClose={() => setDrawerOpen(false)}
          products={products}
          initialSort={sort}
          initialCategories={selectedCategories}
          onApply={handleApplyFilters}
        />
      )}
    </>
  )
}

export default ShopCollections

import ProductCard from './ProductCard'

function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center text-[#9aa5b1]">
        Aucun produit trouvé.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid

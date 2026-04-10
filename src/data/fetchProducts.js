import productsData from './shop-products.json'

/**
 * Fetch products from local JSON.
 * PHASE 2: Replace this with Contentful API call:
 *   const response = await fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/entries?content_type=product&access_token=${TOKEN}`)
 *   return mapContentfulToProducts(await response.json())
 */
export async function fetchProducts() {
  // Simulate async for future API swap
  return productsData
}

export async function fetchProductBySlug(slug) {
  const products = await fetchProducts()
  return products.find((p) => p.slug === slug) || null
}

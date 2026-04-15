import { createClient } from 'contentful'

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
const CONTENT_TYPE = 'shopProduct'

const client = SPACE_ID && TOKEN
  ? createClient({ space: SPACE_ID, accessToken: TOKEN })
  : null

function mapImage(asset, alt) {
  if (!asset?.fields?.file?.url) return { src: '', alt: alt || '' }
  const url = asset.fields.file.url
  return {
    src: url.startsWith('//') ? `https:${url}` : url,
    alt: alt || asset.fields.title || '',
  }
}

function mapEntryToProduct(entry) {
  const f = entry.fields || {}
  return {
    id: entry.sys.id,
    contentfulId: entry.sys.id,
    name: f.name || '',
    slug: f.slug,
    price: Number(f.price) || 0,
    originalPrice: f.originalPrice != null ? Number(f.originalPrice) : null,
    unitPrice: f.unitPrice || null,
    image: mapImage(f.image, f.imageAlt),
    category: f.category || 'all',
    inStock: f.inStock ?? true,
    badge: f.badge || null,
    rating: Number(f.rating) || 0,
    reviewCount: Number(f.reviewCount) || 0,
    bgClass: f.bgClass || null,
    shortDescription: f.shortDescription || null,
    variants: f.variants || null,
    packaging: f.packaging || null,
    badges: f.badges || null,
    faq: f.faq || null,
    description: {
      whyOffer: f.descWhyOffer || null,
      forWhom: f.descForWhom || null,
      biteAnytime: f.descBiteAnytime || null,
      contents: f.descContents || null,
      consumption: f.descConsumption || null,
      ingredients: f.descIngredients || null,
    },
  }
}

export async function fetchProducts() {
  if (!client) {
    console.error('Contentful client not configured: missing VITE_CONTENTFUL_SPACE_ID or VITE_CONTENTFUL_ACCESS_TOKEN')
    return []
  }
  try {
    const res = await client.getEntries({
      content_type: CONTENT_TYPE,
      include: 2,
      limit: 1000,
    })
    return res.items.map(mapEntryToProduct)
  } catch (err) {
    console.error('Contentful fetchProducts failed:', err)
    return []
  }
}

export async function fetchProductBySlug(slug) {
  if (!client) {
    console.error('Contentful client not configured: missing VITE_CONTENTFUL_SPACE_ID or VITE_CONTENTFUL_ACCESS_TOKEN')
    return null
  }
  try {
    const res = await client.getEntries({
      content_type: CONTENT_TYPE,
      'fields.slug': slug,
      include: 2,
      limit: 1,
    })
    return res.items[0] ? mapEntryToProduct(res.items[0]) : null
  } catch (err) {
    console.error('Contentful fetchProductBySlug failed:', err)
    return null
  }
}

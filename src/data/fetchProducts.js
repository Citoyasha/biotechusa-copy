import { createClient } from 'contentful'

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
const CONTENT_TYPE = 'shopProduct'

export const client = SPACE_ID && TOKEN
  ? createClient({ space: SPACE_ID, accessToken: TOKEN })
  : null

export function mapAsset(asset, alt) {
  return mapImage(asset, alt)
}

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
    type: 'shop',
    createdAt: entry.sys.createdAt || null,
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

export async function fetchProducts(filters = {}) {
  if (!client) {
    console.error('Contentful client not configured: missing VITE_CONTENTFUL_SPACE_ID or VITE_CONTENTFUL_ACCESS_TOKEN')
    return []
  }
  try {
    const query = {
      content_type: CONTENT_TYPE,
      include: 2,
      limit: 1000,
    }
    if (filters.category) query['fields.category'] = filters.category
    const res = await client.getEntries(query)
    return res.items.map(mapEntryToProduct)
  } catch (err) {
    console.error('Contentful fetchProducts failed:', err)
    return []
  }
}

export async function fetchClothingProducts(filters = {}) {
  if (!client) {
    console.error('Contentful client not configured')
    return []
  }
  try {
    const query = {
      content_type: 'clothingProduct',
      include: 2,
      limit: 1000,
    }
    if (filters.collection) query['fields.collection'] = filters.collection
    if (filters.category) query['fields.category'] = filters.category
    if (filters.gender) query['fields.gender'] = filters.gender
    const res = await client.getEntries(query)
    return res.items.map(mapClothingEntryToProduct)
  } catch (err) {
    console.error('Contentful fetchClothingProducts failed:', err)
    return []
  }
}

function mapLinkedVariant(ref) {
  const rf = ref?.fields
  if (!rf?.slug) return null
  return {
    slug: rf.slug,
    colorName: rf.colorName || null,
    colorHex: rf.colorHex || null,
    colorHasBorder: !!rf.colorHasBorder,
  }
}

function mapClothingEntryToProduct(entry) {
  const f = entry.fields || {}
  return {
    id: entry.sys.id,
    contentfulId: entry.sys.id,
    type: 'clothing',
    createdAt: entry.sys.createdAt || null,
    name: f.name || '',
    slug: f.slug,
    price: Number(f.price) || 0,
    originalPrice: f.originalPrice != null ? Number(f.originalPrice) : null,
    image: mapImage(f.image, f.name),
    hoverImage: f.hoverImage ? mapImage(f.hoverImage, f.name) : null,
    galleryImages: Array.isArray(f.galleryImages)
      ? f.galleryImages.map((img) => mapImage(img, f.name)).filter((x) => x.src)
      : [],
    video: f.video?.fields?.file?.url
      ? {
          src: f.video.fields.file.url.startsWith('//')
            ? `https:${f.video.fields.file.url}`
            : f.video.fields.file.url,
          contentType: f.video.fields.file.contentType || 'video/mp4',
        }
      : null,
    videoPoster: f.videoPoster ? mapImage(f.videoPoster, f.name) : null,
    linkedVariants: Array.isArray(f.linkedVariants)
      ? f.linkedVariants.map(mapLinkedVariant).filter(Boolean)
      : [],
    category: f.category || '',
    collection: f.collection || null,
    gender: f.gender || null,
    colorName: f.colorName || null,
    colorHex: f.colorHex || null,
    colorHasBorder: !!f.colorHasBorder,
    inStock: f.inStock ?? true,
    rating: Number(f.rating) || 0,
    reviewCount: Number(f.reviewCount) || 0,
    bgClass: f.bgClass || null,
    shortDescription: f.shortDescription || null,
    descriptionHtml: f.descriptionHtml || null,
    materialComposition: f.materialComposition || null,
    washingInstructions: f.washingInstructions || null,
    uspMetrics: f.uspMetrics || null,
    modelInfo: f.modelInfo || null,
    sizes: f.sizes || null,
    sizeChartKey: f.sizeChartKey || null,
    badges: f.badges || null,
    brand: f.brand || 'BiotechUSA Apparel',
  }
}

export async function fetchProductBySlug(slug) {
  if (!client) {
    console.error('Contentful client not configured: missing VITE_CONTENTFUL_SPACE_ID or VITE_CONTENTFUL_ACCESS_TOKEN')
    return null
  }
  try {
    const shopRes = await client.getEntries({
      content_type: CONTENT_TYPE,
      'fields.slug': slug,
      include: 2,
      limit: 1,
    })
    if (shopRes.items[0]) return mapEntryToProduct(shopRes.items[0])

    const clothingRes = await client.getEntries({
      content_type: 'clothingProduct',
      'fields.slug': slug,
      include: 2,
      limit: 1,
    })
    if (clothingRes.items[0]) return mapClothingEntryToProduct(clothingRes.items[0])

    return null
  } catch (err) {
    console.error('Contentful fetchProductBySlug failed:', err)
    return null
  }
}

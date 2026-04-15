import { client, mapAsset } from './fetchProducts'
import { vetementsFallbackData } from './vetementsFallback'

const PAGE_TYPE = 'clothingLandingPage'
const PRODUCT_TYPE = 'clothingProduct'
const PAGE_SLUG = 'vetements'

function mapClothingProduct(entry, { active = true } = {}) {
  if (!entry?.fields) return null
  const f = entry.fields
  return {
    id: entry.sys.id,
    name: f.name || '',
    slug: f.slug || '',
    brand: f.brand || null,
    price: Number(f.price) || 0,
    originalPrice: f.originalPrice != null ? Number(f.originalPrice) : null,
    unitPrice: f.unitPrice || null,
    image: mapAsset(f.image, f.name),
    hoverImage: f.hoverImage ? mapAsset(f.hoverImage, f.name) : null,
    video: f.video?.fields?.file?.url
      ? {
          src: f.video.fields.file.url.startsWith('//')
            ? `https:${f.video.fields.file.url}`
            : f.video.fields.file.url,
          poster: f.videoPoster ? mapAsset(f.videoPoster, f.name).src : null,
        }
      : null,
    colorName: f.colorName || null,
    colorHex: f.colorHex || null,
    colorHasBorder: !!f.colorHasBorder,
    sizes: Array.isArray(f.sizes) ? f.sizes : null,
    badges: Array.isArray(f.badges) ? f.badges : null,
    rating: Number(f.rating) || 0,
    reviewCount: Number(f.reviewCount) || 0,
    bgClass: f.bgClass || null,
    _linkedVariants: Array.isArray(f.linkedVariants) ? f.linkedVariants : [],
    _active: active,
  }
}

function resolveColorVariants(product, allMapped) {
  const siblings = [product, ...(product._linkedVariants || []).map((ref) => {
    const found = allMapped.find((p) => p.id === ref.sys?.id)
    return found || null
  }).filter(Boolean)]

  return siblings
    .filter((p) => p.colorHex)
    .map((p) => ({
      handle: p.slug,
      name: p.colorName || '',
      hex: p.colorHex,
      hasBorder: p.colorHasBorder,
      active: p.id === product.id,
    }))
}

function mapElevateCards(raw) {
  if (!Array.isArray(raw)) return []
  return raw.map((c) => ({
    title: c.title || '',
    image: c.image || '',
    ctaLabel: c.ctaLabel || 'montrez-moi!',
    href: c.href || '#',
  }))
}

function mapHeroSlides(raw) {
  if (!Array.isArray(raw)) return []
  return raw.map((s) => ({
    image: s.image || '',
    imageMobile: s.imageMobile || s.image || '',
    title: s.title || '',
    subtitle: s.subtitle || '',
    ctaLabel: s.ctaLabel || '',
    ctaHref: s.ctaHref || '#',
    align: s.align || 'left',
  }))
}

export async function fetchClothingLandingPage() {
  if (!client) {
    console.warn('Contentful client not configured — using vetements fallback')
    return vetementsFallbackData
  }
  try {
    const res = await client.getEntries({
      content_type: PAGE_TYPE,
      'fields.slug': PAGE_SLUG,
      include: 3,
      limit: 1,
    })
    const pageEntry = res.items[0]
    if (!pageEntry) {
      console.warn(`No ${PAGE_TYPE} found with slug "${PAGE_SLUG}" — using fallback`)
      return vetementsFallbackData
    }
    const f = pageEntry.fields

    const riseRefs = Array.isArray(f.riseProducts) ? f.riseProducts : []
    const lastChanceRefs = Array.isArray(f.lastChanceProducts) ? f.lastChanceProducts : []

    const allProductEntries = [...riseRefs, ...lastChanceRefs].filter(
      (e) => e?.sys?.contentType?.sys?.id === PRODUCT_TYPE
    )
    const allMapped = allProductEntries.map((e) => mapClothingProduct(e))

    const resolve = (refs) =>
      refs
        .map((ref) => allMapped.find((p) => p.id === ref.sys?.id))
        .filter(Boolean)
        .map((p) => ({
          ...p,
          colorVariants: resolveColorVariants(p, allMapped),
        }))

    return {
      heroSlides: mapHeroSlides(f.heroSlides),
      rise: {
        title: f.riseTitle || 'RISE collection',
        products: resolve(riseRefs),
        ctaLabel: f.riseCtaLabel || 'tout',
        ctaHref: f.riseCtaHref || '#',
      },
      leisure: {
        imageDesktop: f.leisureBannerImage ? mapAsset(f.leisureBannerImage).src : '',
        imageMobile: f.leisureBannerImageMobile
          ? mapAsset(f.leisureBannerImageMobile).src
          : f.leisureBannerImage
            ? mapAsset(f.leisureBannerImage).src
            : '',
        href: f.leisureBannerHref || '#',
      },
      lastChance: {
        title: f.lastChanceTitle || 'LAST CHANCE',
        products: resolve(lastChanceRefs),
        ctaLabel: f.lastChanceCtaLabel || 'tout',
        ctaHref: f.lastChanceCtaHref || '#',
      },
      elevate: {
        title: f.elevateTitle || 'Elevate',
        cards: mapElevateCards(f.elevateCards),
      },
      videoEmbedUrl: f.videoEmbedUrl || '',
      essence: {
        title: f.essenceTitle || 'Essence collection',
        text: f.essenceText || '',
        ctaLabel: f.essenceCtaLabel || 'acheter',
        ctaHref: f.essenceCtaHref || '#',
        backgroundImage: f.essenceBackgroundImage
          ? mapAsset(f.essenceBackgroundImage).src
          : '',
      },
    }
  } catch (err) {
    console.error('fetchClothingLandingPage failed:', err)
    return vetementsFallbackData
  }
}

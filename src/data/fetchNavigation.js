import { client } from './fetchProducts'

const VETEMENTS_SECTION_ORDER = [
  'femme-produits', 'femme-offres',
  'homme-produits', 'homme-offres',
  'accessoires',
]

const VETEMENTS_HEADINGS = {
  'femme-produits': { heading: 'FEMME', subcol: 'PRODUITS' },
  'femme-offres':   { heading: 'FEMME', subcol: 'OFFRES' },
  'homme-produits': { heading: 'HOMME', subcol: 'PRODUITS' },
  'homme-offres':   { heading: 'HOMME', subcol: 'OFFRES' },
  'accessoires':    { heading: 'ACCESSOIRES', subcol: 'PRODUITS' },
}

let clothingCache = null
let categoryCache = null

export async function fetchClothingCollections() {
  if (clothingCache) return clothingCache
  if (!client) return []
  try {
    const res = await client.getEntries({
      content_type: 'clothingCollection',
      order: 'fields.menuOrder',
      limit: 100,
    })
    clothingCache = res.items.map((e) => ({
      name: e.fields.name,
      slug: e.fields.slug,
      filterType: e.fields.filterType,
      filterValue: e.fields.filterValue,
      menuSection: e.fields.menuSection,
      menuOrder: e.fields.menuOrder || 0,
    }))
    return clothingCache
  } catch (err) {
    console.error('fetchClothingCollections failed:', err)
    return []
  }
}

export async function fetchProductCategories() {
  if (categoryCache) return categoryCache
  if (!client) return []
  try {
    const res = await client.getEntries({
      content_type: 'productCategory',
      order: 'fields.menuOrder',
      limit: 100,
    })
    categoryCache = res.items.map((e) => ({
      name: e.fields.name,
      slug: e.fields.slug,
      menuSection: e.fields.menuSection,
      menuOrder: e.fields.menuOrder || 0,
      highlight: !!e.fields.highlight,
    }))
    return categoryCache
  } catch (err) {
    console.error('fetchProductCategories failed:', err)
    return []
  }
}

export function buildVetementsMenu(collections) {
  const grouped = {}
  for (const c of collections) {
    if (!grouped[c.menuSection]) grouped[c.menuSection] = []
    grouped[c.menuSection].push(c)
  }

  const sectionMap = {}
  for (const sectionKey of VETEMENTS_SECTION_ORDER) {
    const items = grouped[sectionKey] || []
    const { heading, subcol } = VETEMENTS_HEADINGS[sectionKey]
    if (!sectionMap[heading]) {
      sectionMap[heading] = { heading, href: '/vetements', subcols: [] }
    }
    sectionMap[heading].subcols.push({
      title: subcol,
      links: items.map((c) => ({
        label: c.name,
        href: `/collections/${c.slug}`,
        bold: c.name === 'Voir tout',
      })),
    })
  }

  return Object.values(sectionMap)
}

export function buildProduitsMenu(categories) {
  const grouped = {}
  for (const c of categories) {
    if (!grouped[c.menuSection]) grouped[c.menuSection] = []
    grouped[c.menuSection].push(c)
  }

  return Object.entries(grouped).map(([title, items]) => ({
    title,
    links: items.map((c) => ({
      label: c.name,
      href: `/collections/${c.slug}`,
      highlight: c.highlight,
    })),
  }))
}

export async function fetchCollectionConfig(slug) {
  const collections = await fetchClothingCollections()
  const match = collections.find((c) => c.slug === slug)
  if (match) {
    return {
      title: match.name,
      filterType: match.filterType,
      filterValue: match.filterValue,
    }
  }

  const categories = await fetchProductCategories()
  const catMatch = categories.find((c) => c.slug === slug)
  if (catMatch) {
    return { title: catMatch.name, filterType: null, filterValue: null }
  }

  return null
}

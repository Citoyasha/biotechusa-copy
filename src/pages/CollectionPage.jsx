import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { fetchClothingProducts, fetchProducts } from '../data/fetchProducts'
import { fetchCollectionConfig } from '../data/fetchNavigation'
import ShopCollections from './ShopCollections'
import ClothingCollectionLayout from './ClothingCollectionLayout'
import ComingSoon from './ComingSoon'

const COMING_SOON_SLUGS = {
  'calculateur-vitamines': {
    title: 'Calculateur de vitamines',
    description: 'Un outil personnalisé qui vous recommandera les produits adaptés à vos objectifs et à votre profil corporel. Disponible prochainement.',
  },
}

const emptyFetch = () => Promise.resolve([])

function slugToTitle(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function CollectionPage() {
  const { collectionSlug } = useParams()
  const [config, setConfig] = useState(undefined)
  const comingSoon = COMING_SOON_SLUGS[collectionSlug]

  useEffect(() => {
    if (comingSoon) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConfig(undefined)
    fetchCollectionConfig(collectionSlug).then((c) => setConfig(c || null))
  }, [collectionSlug, comingSoon])

  const fetchFn = useCallback(() => {
    if (!config) return emptyFetch()
    if (config.filterType === 'collection') {
      return fetchClothingProducts({ collection: config.filterValue })
    }
    if (config.filterType === 'category') {
      return fetchClothingProducts({ category: config.filterValue })
    }
    if (config.filterType === 'productCategory') {
      return fetchProducts({ category: config.filterValue })
    }
    return emptyFetch()
  }, [config])

  if (comingSoon) {
    return (
      <ComingSoon
        title={comingSoon.title}
        description={comingSoon.description}
        breadcrumbHref={`/collections/${collectionSlug}`}
      />
    )
  }

  const isClothing = config?.filterType === 'collection' || config?.filterType === 'category'
  const title = config?.title || slugToTitle(collectionSlug)

  // Clothing collections get the clothing layout
  if (isClothing) {
    return (
      <ClothingCollectionLayout
        title={title}
        fetchFn={fetchFn}
        breadcrumbHref={`/collections/${collectionSlug}`}
      />
    )
  }

  // Supplement / unknown collections get the shop layout
  return (
    <ShopCollections
      fetchFn={fetchFn}
      title={title}
      breadcrumbLabel={title}
      breadcrumbHref={`/collections/${collectionSlug}`}
    />
  )
}

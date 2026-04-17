import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { fetchClothingProducts } from '../data/fetchProducts'
import { fetchCollectionConfig } from '../data/fetchNavigation'
import ShopCollections from './ShopCollections'

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

  useEffect(() => {
    setConfig(undefined)
    fetchCollectionConfig(collectionSlug).then((c) => setConfig(c || null))
  }, [collectionSlug])

  const fetchFn = useCallback(() => {
    if (!config) return emptyFetch()
    if (config.filterType === 'collection') {
      return fetchClothingProducts({ collection: config.filterValue })
    }
    if (config.filterType === 'category') {
      return fetchClothingProducts({ category: config.filterValue })
    }
    return emptyFetch()
  }, [config])

  const title = config?.title || slugToTitle(collectionSlug)

  return (
    <ShopCollections
      fetchFn={fetchFn}
      title={title}
      breadcrumbLabel={title}
      breadcrumbHref={`/collections/${collectionSlug}`}
    />
  )
}

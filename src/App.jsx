import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ShopCollections from './pages/ShopCollections'
import CollectionPage from './pages/CollectionPage'
import ProductDetail from './pages/ProductDetail'
import VetementsPage from './pages/VetementsPage'
import ShopPage from './pages/ShopPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/all" element={<ShopCollections />} />
        <Route path="/collections/:collectionSlug" element={<CollectionPage />} />
        <Route path="/vetements" element={<VetementsPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ShopCollections from './pages/ShopCollections'
import ProductDetail from './pages/ProductDetail'
import VetementsPage from './pages/VetementsPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/all" element={<ShopCollections />} />
        <Route path="/vetements" element={<VetementsPage />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

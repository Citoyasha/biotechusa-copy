import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ShopCollections from './pages/ShopCollections'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/all" element={<ShopCollections />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

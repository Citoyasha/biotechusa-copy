import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroCarousel from '../components/clothing/HeroCarousel'
import ProductCarousel from '../components/clothing/ProductCarousel'
import FullWidthBanner from '../components/clothing/FullWidthBanner'
import CategoryCardGrid from '../components/clothing/CategoryCardGrid'
import VideoSection from '../components/clothing/VideoSection'
import EssenceBanner from '../components/clothing/EssenceBanner'
import { fetchClothingLandingPage } from '../data/fetchClothingLandingPage'

function VetementsPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClothingLandingPage().then((d) => {
      setData(d)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex items-center justify-center">
          <div className="text-[#9aa5b1]">Chargement...</div>
        </main>
        <Footer />
      </>
    )
  }

  if (!data) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center text-[#6b7a8d] max-w-md">
            <h1 className="text-2xl font-bold text-[#36474e] mb-3">Contenu indisponible</h1>
            <p>La page vêtements n'est pas encore configurée dans Contentful.</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <HeroCarousel slides={data.heroSlides} autoplay={false} />

      <ProductCarousel
        title={data.rise.title}
        products={data.rise.products}
        ctaLabel={data.rise.ctaLabel}
        ctaHref={data.rise.ctaHref}
        variant="rise"
      />

      <FullWidthBanner
        imageDesktop={data.leisure.imageDesktop}
        imageMobile={data.leisure.imageMobile}
        href={data.leisure.href}
        alt="Leisure Collection"
      />

      <ProductCarousel
        title={data.lastChance.title}
        products={data.lastChance.products}
        ctaLabel={data.lastChance.ctaLabel}
        ctaHref={data.lastChance.ctaHref}
        showArrows
        variant="lastchance"
      />

      <CategoryCardGrid title={data.elevate.title} cards={data.elevate.cards} />

      <VideoSection embedUrl={data.videoEmbedUrl} />

      <EssenceBanner
        title={data.essence.title}
        text={data.essence.text}
        ctaLabel={data.essence.ctaLabel}
        ctaHref={data.essence.ctaHref}
        backgroundImage={data.essence.backgroundImage}
      />

      <Footer />
    </>
  )
}

export default VetementsPage

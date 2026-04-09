import { useState, useEffect, useCallback } from 'react'

const slides = [
  {
    desktop: 'https://biotechusa.fr/content/uploads/2014/11/FR_B2C_apr_akcios_banner_1920x720_rotator.jpg',
    mobile: 'https://biotechusa.fr/content/uploads/2014/11/FR_B2C_apr_akcios_banner_752x992_rotator.jpg',
    alt: 'Promotion BioTechUSA',
    href: '#',
  },
  {
    desktop: 'https://biotechusa.fr/content/uploads/2014/11/mobil_app_kampany_FR_1920-x-720.jpg',
    mobile: 'https://biotechusa.fr/content/uploads/2014/11/mobil_app_kampany_FR_752-x-992.jpg',
    alt: 'Application mobile BioTechUSA',
    href: '#',
  },
  {
    desktop: 'https://biotechusa.fr/content/uploads/2014/11/FR_Iso_Whey_Clear_1920x720_hero.jpg',
    mobile: 'https://biotechusa.fr/content/uploads/2014/11/FR_Yuzu-100CM-CE_752x992.jpg',
    alt: 'BioTechUSA',
    href: '#',
  },
]

function ChevronLeft({ className = 'w-6 h-6' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  )
}

function ChevronRight({ className = 'w-6 h-6' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  )
}

function Hero() {
  const [current, setCurrent] = useState(0)

  const goTo = useCallback((index) => {
    setCurrent((index + slides.length) % slides.length)
  }, [])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-black select-none">
      {/* Slides track */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <a
            key={slide.desktop}
            href={slide.href}
            className="relative w-full flex-shrink-0"
            aria-label={slide.alt}
          >
            <picture>
              <source media="(min-width: 1024px)" srcSet={slide.desktop} />
              <img
                src={slide.mobile}
                alt={slide.alt}
                className="w-full h-auto block aspect-[752/992] lg:aspect-[1920/720] object-cover"
                draggable={false}
              />
            </picture>
          </a>
        ))}
      </div>

      {/* Prev arrow */}
      <button
        onClick={prev}
        aria-label="Slide précédent"
        className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 text-white/90 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9" />
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        aria-label="Slide suivant"
        className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 text-white/90 hover:text-white transition-colors"
      >
        <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Aller au slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero

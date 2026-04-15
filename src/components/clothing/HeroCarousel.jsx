import { useEffect, useState } from 'react'

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

function HeroCarousel({ slides = [], autoplay = false, interval = 5000 }) {
  const [index, setIndex] = useState(0)
  const count = slides.length

  useEffect(() => {
    if (!autoplay || count < 2) return
    const t = setInterval(() => setIndex((i) => (i + 1) % count), interval)
    return () => clearInterval(t)
  }, [autoplay, interval, count])

  if (!count) return null

  const go = (d) => setIndex((i) => (i + d + count) % count)

  return (
    <section className="relative w-full overflow-hidden bg-[#eff1f1]">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <a
            key={i}
            href={s.ctaHref}
            className="relative w-full flex-shrink-0 block"
          >
            <picture>
              <source media="(min-width: 768px)" srcSet={s.image} />
              <img
                src={s.imageMobile || s.image}
                alt={s.title || ''}
                className="w-full h-auto object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </picture>
          </a>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Précédent"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/80 hover:bg-white text-[#36474e] flex items-center justify-center rounded-full shadow"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Suivant"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/80 hover:bg-white text-[#36474e] flex items-center justify-center rounded-full shadow"
          >
            <ChevronRight />
          </button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? 'bg-[#36474e] w-8' : 'bg-white/70 w-2'}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default HeroCarousel

import { useState, useCallback } from 'react'

const videos = [
  {
    id: 'DXql-ne6rI4',
    title: '!Protein Content Revealed!',
  },
  {
    id: 'xBekyN3_nnI',
    title: 'Gym Bros vs. Longevity',
  },
  {
    id: 'f4nCEK5oNfg',
    title: 'Male upper body workout routine',
  },
  {
    id: 'exJjBac294A',
    title: 'Your Fitness Journey Starts here',
  },
]

const youtubeUrl = (id) => `https://www.youtube.com/watch?v=${id}`
const thumbUrl = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

function PlayIcon({ className = 'w-7 h-7' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function ChevronLeft({ className = 'w-4 h-4' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  )
}

function ChevronRight({ className = 'w-4 h-4' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  )
}

function VideoCard({ video }) {
  return (
    <a
      href={youtubeUrl(video.id)}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="relative aspect-video bg-black overflow-hidden">
        <img
          src={thumbUrl(video.id)}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/30 backdrop-blur-sm border-2 border-white/80 text-white group-hover:bg-white/50 group-hover:scale-110 transition-all duration-300">
            <PlayIcon className="w-6 h-6 sm:w-7 sm:h-7 ml-1" />
          </span>
        </div>
      </div>
      <h3 className="mt-3 text-sm sm:text-base font-bold text-[#3d4f5f] group-hover:text-[#1ea7e1] transition-colors leading-snug">
        {video.title}
      </h3>
    </a>
  )
}

function VideosSection() {
  // Mobile carousel: shows 2 cards at a time, slides 1 at a time
  // Pages = videos.length - 1 (so 4 videos -> 3 dots)
  const pageCount = Math.max(videos.length - 1, 1)
  const [page, setPage] = useState(0)

  const goTo = useCallback((p) => {
    setPage(((p % pageCount) + pageCount) % pageCount)
  }, [pageCount])

  const next = useCallback(() => goTo(page + 1), [page, goTo])
  const prev = useCallback(() => goTo(page - 1), [page, goTo])

  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-[1140px] mx-auto px-4 lg:px-6">
        {/* Heading */}
        <h2 className="text-center tracking-tight">
          Vidéos
        </h2>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden -mx-2">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${page * 50}%)` }}
            >
              {videos.map((video) => (
                <div key={video.id} className="w-1/2 flex-shrink-0 px-2">
                  <VideoCard video={video} />
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              aria-label="Précédent"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-[#cdd4dc] text-[#6b7a8d] hover:border-[#1ea7e1] hover:text-[#1ea7e1] transition-colors"
            >
              <ChevronLeft />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Page ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === page
                      ? 'w-3 h-3 bg-[#1ea7e1]'
                      : 'w-3 h-3 border border-[#cdd4dc] bg-white'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Suivant"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-[#cdd4dc] text-[#6b7a8d] hover:border-[#1ea7e1] hover:text-[#1ea7e1] transition-colors"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* CTA button */}
        <div className="mt-10 lg:mt-14 flex justify-center">
          <a
            href="https://www.youtube.com/@BioTechUSAFrance"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 sm:px-16 py-3.5 sm:py-4 border-2 border-[#1ea7e1] text-[#1ea7e1] text-sm font-bold tracking-wider uppercase hover:bg-[#1ea7e1] hover:text-white transition-colors w-full sm:w-auto max-w-md"
          >
            Toutes les vidéos
          </a>
        </div>
      </div>
    </section>
  )
}

export default VideosSection

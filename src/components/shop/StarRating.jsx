function StarRating({ rating, count }) {
  const percentage = (rating / 5) * 100

  return (
    <div className="flex items-center gap-1.5">
      {/* Stars */}
      <div className="relative inline-flex" aria-label={`${rating} sur 5 étoiles`}>
        {/* Empty stars (background) */}
        <div className="flex gap-[2px] text-[#e5e5e5]">
          {[...Array(5)].map((_, i) => (
            <svg key={i} viewBox="0 0 15 14" className="w-[15px] h-[14px]" fill="currentColor">
              <path d="M3.34 13.86c-.48.3-.76.1-.63-.44l1.08-4.56L.26 5.82c-.42-.36-.32-.7.24-.74l4.63-.37L6.92.39c.2-.52.55-.52.76 0l1.8 4.32 4.62.37c.56.05.67.37.24.74l-3.53 3.04 1.08 4.56c.13.54-.14.74-.63.44L7.3 11.43l-3.96 2.43z" />
            </svg>
          ))}
        </div>
        {/* Filled stars (foreground, clipped) */}
        <div
          className="absolute top-0 left-0 flex gap-[2px] text-[#00adef] overflow-hidden"
          style={{ width: `${percentage}%` }}
        >
          {[...Array(5)].map((_, i) => (
            <svg key={i} viewBox="0 0 15 14" className="w-[15px] h-[14px] flex-shrink-0" fill="currentColor">
              <path d="M3.34 13.86c-.48.3-.76.1-.63-.44l1.08-4.56L.26 5.82c-.42-.36-.32-.7.24-.74l4.63-.37L6.92.39c.2-.52.55-.52.76 0l1.8 4.32 4.62.37c.56.05.67.37.24.74l-3.53 3.04 1.08 4.56c.13.54-.14.74-.63.44L7.3 11.43l-3.96 2.43z" />
            </svg>
          ))}
        </div>
      </div>
      {/* Count */}
      <span className="text-sm text-[#3d4f5f]">
        {count.toLocaleString('fr-FR')} Avis
      </span>
    </div>
  )
}

export default StarRating

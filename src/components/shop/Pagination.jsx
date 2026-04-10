function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  )
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="flex items-center justify-center gap-2 pt-10 pb-4" aria-label="Pagination">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex items-center justify-center w-12 h-12 text-base font-bold transition-colors ${
            page === currentPage
              ? 'bg-[#36474e] text-white border border-[#36474e]'
              : 'bg-white text-[#36474e] border border-[#eff1f1] hover:border-[#36474e]'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* Next arrow */}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center justify-center w-12 h-12 bg-white text-[#36474e] border border-[#eff1f1] hover:border-[#36474e] transition-colors"
          aria-label="Page suivante"
        >
          <ChevronRightIcon />
        </button>
      )}
    </nav>
  )
}

export default Pagination

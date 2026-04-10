function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
    </svg>
  )
}

function FilterBar({ totalResults, onFilterClick }) {
  return (
    <div className="flex items-center justify-center gap-6 py-6">
      <span className="text-base text-[#36474e]">
        {totalResults} Résultat
      </span>
      <button
        onClick={onFilterClick}
        className="flex items-center gap-2 px-6 py-3 border border-[#eff1f1] text-base text-[#36474e] hover:border-[#36474e] transition-colors"
      >
        Filtrer et trier
        <FilterIcon />
      </button>
    </div>
  )
}

export default FilterBar

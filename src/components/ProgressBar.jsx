/**
 * Clickable progress bar for carousels / scroll sections.
 * Not a native scrollbar — segments are clickable to jump to that portion.
 *
 * Props:
 *   total     – number of items
 *   visible   – how many items visible at once (default 5)
 *   current   – index of first visible item (0-based)
 *   onChange  – (index) => void — called when user clicks a segment
 *   className – optional extra classes on wrapper
 */
function ProgressBar({ total, visible = 5, current = 0, onChange, className = '' }) {
  const pages = Math.max(1, Math.ceil(total / visible))
  const activePage = Math.min(Math.floor(current / visible), pages - 1)

  return (
    <div className={`flex justify-center pt-6 ${className}`}>
      <div
        className="flex bg-[#e5e5e5] rounded-full overflow-hidden cursor-pointer"
        style={{ width: 300, height: 4 }}
      >
        {Array.from({ length: pages }, (_, i) => (
          <div
            key={i}
            onClick={() => onChange?.(i * visible)}
            className={`h-full transition-colors duration-200 ${
              i === activePage ? 'bg-[#36474e]' : 'hover:bg-[#c4c4c4]'
            }`}
            style={{ flex: 1 }}
            role="button"
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProgressBar

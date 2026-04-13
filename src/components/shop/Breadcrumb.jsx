import { Link } from 'react-router-dom'

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-[#9aa5b1]" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  )
}

function Breadcrumb({ items }) {
  return (
    <nav
      className="w-full bg-[var(--color-heading)] text-white"
      aria-label="breadcrumbs"
    >
      <div className="max-w-[1140px] mx-auto px-4 lg:px-6 py-3">
        <ol className="flex items-center gap-2 text-sm font-bold">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={item.label} className="flex items-center gap-2">
                {index > 0 && <ChevronRight />}
                {isLast ? (
                  <span className="text-white/80">{item.label}</span>
                ) : (
                  <Link to={item.href} className="text-white hover:underline">
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

export default Breadcrumb

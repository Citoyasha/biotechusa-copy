function CategoryCardGrid({ title, cards = [] }) {
  if (!cards.length) return null
  return (
    <section className="w-[90vw] max-w-[1600px] mx-auto py-12 lg:py-16">
      {title && (
        <header className="mb-6 lg:mb-10">
          <h2
            className="not-italic"
            style={{
              fontFamily: 'Roboto, system-ui, sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(18px, 1.6vw, 22px)',
              letterSpacing: '0.5px',
              color: '#36474e',
              textTransform: 'uppercase',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {title}
          </h2>
        </header>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((c, i) => (
          <a
            style={{ height: 'calc(100vw / 2.76)' }}
            key={i}
            href={c.href}
            className="relative block aspect-square overflow-hidden group"
          >
            <img
              src={c.image}
              alt={c.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-start justify-end pb-8 lg:pb-10 pl-6 lg:pl-10 text-left text-white">
              <h3
                className="not-italic mb-4"
                style={{
                  fontFamily: 'Roboto, system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(18px, 1.8vw, 26px)',
                  lineHeight: 1.2,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                }}
              >
                {c.title}
              </h3>
              <span className="inline-flex items-center px-6 py-3 text-[11px] font-bold uppercase tracking-wider bg-white text-[#1b1b1b] rounded-full hover:bg-[#1b1b1b] hover:text-white transition-colors">
                {c.ctaLabel || 'montrez-moi!'}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default CategoryCardGrid

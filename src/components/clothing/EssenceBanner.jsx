function EssenceBanner({ title, text, ctaLabel = 'acheter', ctaHref = '/collections/essence-collection' }) {
  return (
    <section className="w-[90vw] max-w-[1600px] mx-auto py-16 lg:py-24 text-center">
      <h2
        className="not-italic mb-4"
        style={{
          fontFamily: 'Roboto, system-ui, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(32px, 5vw, 64px)',
          lineHeight: 1.1,
          letterSpacing: '-0.5px',
          textTransform: 'uppercase',
          color: '#1b1b1b',
          margin: 0,
        }}
      >
        {title}
      </h2>
      {text && (
        <p className="mt-4 mb-10 text-sm lg:text-base text-[#6b7a8d] max-w-2xl mx-auto">
          {text}
        </p>
      )}
      <a
        href={ctaHref}
        className="inline-flex items-center justify-center px-10 py-4 text-xs font-bold uppercase tracking-wider bg-[#1b1b1b] text-white rounded-full hover:bg-[#36474e] transition-colors"
      >
        {ctaLabel}
      </a>
    </section>
  )
}

export default EssenceBanner

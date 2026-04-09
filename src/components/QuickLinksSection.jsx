const items = [
  {
    title: 'À propos de nous',
    image: 'https://biotechusa.fr/content/uploads/2022/03/about-us_small.webp',
    href: '#',
  },
  {
    title: 'Boutique en ligne',
    image: 'https://biotechusa.fr/content/uploads/2022/03/Products.jpg',
    href: '#',
  },
  {
    title: 'Contact',
    image: 'https://biotechusa.fr/content/uploads/2022/03/kapcsolat_background.webp',
    href: '#',
  },
  {
    title: 'Localisateur de magasin',
    image: 'https://biotechusa.fr/content/uploads/2022/11/store_background.webp',
    href: '#',
  },
]

function ChevronRight({ className = 'w-4 h-4' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  )
}

function QuickLinksSection() {
  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group flex flex-col items-center text-center"
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Cyan accent bar */}
              <div className="w-1/3 h-[5px] bg-[#1ea7e1]" />

              {/* Title */}
              <h3 className="mt-6 text-xl sm:text-2xl lg:text-[26px] font-extrabold italic uppercase text-[#3d4f5f] tracking-tight leading-tight">
                {item.title}
              </h3>

              {/* Link */}
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#3d4f5f] group-hover:text-[#1ea7e1] transition-colors">
                Vérifiez-le
                <ChevronRight className="w-3.5 h-3.5 text-[#1ea7e1]" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuickLinksSection

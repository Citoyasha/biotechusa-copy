const articles = [
  {
    category: 'ASTUCES ET COMPLEMENTS...',
    title: 'Curcumine : bienfaits, utilisation et précautions',
    date: '2026.03.27',
    image: 'https://placehold.co/200x150/d4791f/ffffff?text=Curcumine',
    href: '#',
  },
  {
    category: 'ASTUCES ET COMPLEMENTS...',
    title: 'Par quoi remplacer la whey : alternatives pour vos protéines',
    date: '2026.03.14',
    image: 'https://placehold.co/200x150/4a90a4/ffffff?text=Whey',
    href: '#',
  },
  {
    category: 'ASTUCES ET COMPLEMENTS...',
    title: 'Quand prendre la whey pour une prise de masse efficace : le guide complet',
    date: '2026.03.14',
    image: 'https://placehold.co/200x150/8b5a3c/ffffff?text=Prise+de+masse',
    href: '#',
  },
]

const categories = [
  {
    label: 'ACTUALITÉS',
    image: 'https://biotechusa.fr/content/uploads/2022/03/category-1.webp',
    href: '#',
  },
  {
    label: "PLANS D'ENTRAÎNEMENT",
    image: 'https://biotechusa.fr/content/uploads/2022/03/category-2-min.webp',
    href: '#',
  },
  {
    label: 'RÉGIMES ALIMENTAIRES',
    image: 'https://biotechusa.fr/content/uploads/2022/03/category-3-min.webp',
    href: '#',
  },
  {
    label: 'LOCALISATEUR DE MAGASIN',
    image: 'https://biotechusa.fr/content/uploads/2022/03/category-4-min.webp',
    href: '#',
  },
]

function LifestyleSection() {
  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-[1140px] mx-auto px-4 lg:px-6">
        {/* Section heading — matches original .title-h1 */}
        <h1 className="text-center tracking-tight">
          BioTechUSA – Tout pour un<br className="hidden sm:block" /> mode de vie sain
        </h1>

        {/* Two-column layout — original splits at xl (1200px) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Articles panel */}
          <div className="bg-[#f3f3f3] p-6 lg:p-8">
            <h3 className="text-center text-xl lg:text-2xl font-extrabold italic uppercase text-[#3d4f5f] tracking-tight mb-6 lg:mb-8">
              Nos articles
            </h3>

            <ul className="flex flex-col gap-5">
              {articles.map((article) => (
                <li key={article.title}>
                  <a
                    href={article.href}
                    className="flex gap-4 group items-stretch"
                  >
                    <div className="flex-shrink-0 w-[120px] sm:w-[180px] aspect-[4/3] overflow-hidden bg-gray-200">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <p className="text-[11px] sm:text-xs font-bold tracking-wide text-[#1ea7e1] mb-1.5">
                          {article.category}
                        </p>
                        <h4 className="text-sm sm:text-base font-bold text-[#3d4f5f] leading-snug group-hover:text-[#1ea7e1] transition-colors line-clamp-3">
                          {article.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#9aa5b1] text-right mt-2">
                        {article.date}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories grid */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {categories.map((cat) => (
              <a
                key={cat.label}
                href={cat.href}
                className="relative block aspect-square overflow-hidden group"
                aria-label={cat.label}
              >
                <img
                  src={cat.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                <span className="absolute inset-0 flex items-center justify-center text-center px-4 text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl font-extrabold italic uppercase tracking-tight drop-shadow-lg">
                  {cat.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LifestyleSection

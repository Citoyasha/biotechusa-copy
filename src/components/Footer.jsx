import { useState } from 'react'

const linkColumns = [
  {
    title: 'Boutique en ligne',
    links: [
      { label: 'Vente', href: '#' },
      { label: 'Le plus populaire', href: '#' },
      { label: 'Nouveaux produits', href: '#' },
      { label: 'Tous les produits', href: '#' },
    ],
  },
  {
    title: "Besoin d'aide",
    links: [
      { label: 'Contact', href: '#' },
      { label: 'Devenez Notre Partenaire', href: '#' },
      { label: 'Distributeurs', href: '#' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'À propos de nous', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Carrière', href: '#' },
      { label: 'Lifestyle', href: '#' },
      { label: 'Programme Fidélité', href: '#' },
      { label: 'Impressum', href: '#' },
    ],
  },
]

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12"/></svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608C4.519 2.567 5.786 2.293 7.152 2.231 8.418 2.175 8.798 2.163 12 2.163m0 1.802c-3.142 0-3.514.012-4.755.069-1.022.047-1.578.218-1.948.362-.49.19-.84.418-1.207.785-.367.367-.595.717-.785 1.207-.144.37-.315.926-.362 1.948-.057 1.241-.069 1.613-.069 4.755s.012 3.514.069 4.755c.047 1.022.218 1.578.362 1.948.19.49.418.84.785 1.207.367.367.717.595 1.207.785.37.144.926.315 1.948.362 1.241.057 1.613.069 4.755.069s3.514-.012 4.755-.069c1.022-.047 1.578-.218 1.948-.362.49-.19.84-.418 1.207-.785.367-.367.595-.717.785-1.207.144-.37.315-.926.362-1.948.057-1.241.069-1.613.069-4.755s-.012-3.514-.069-4.755c-.047-1.022-.218-1.578-.362-1.948-.19-.49-.418-.84-.785-1.207-.367-.367-.717-.595-1.207-.785-.37-.144-.926-.315-1.948-.362-1.241-.057-1.613-.069-4.755-.069M12 6.865A5.135 5.135 0 1 0 12 17.135 5.135 5.135 0 0 0 12 6.865m0 8.468A3.333 3.333 0 1 1 12 8.667a3.333 3.333 0 0 1 0 6.666m6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0"/></svg>
  )
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M21.582 7.186a2.506 2.506 0 0 0-1.768-1.768C18.254 5 12 5 12 5s-6.254 0-7.814.418A2.506 2.506 0 0 0 2.418 7.186C2 8.746 2 12 2 12s0 3.254.418 4.814a2.506 2.506 0 0 0 1.768 1.768C5.746 19 12 19 12 19s6.254 0 7.814-.418a2.506 2.506 0 0 0 1.768-1.768C22 15.254 22 12 22 12s0-3.254-.418-4.814M10 15V9l5.196 3z"/></svg>
  )
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05A4.28 4.28 0 0 0 12 9.71c0 .34.04.67.11.99C8.28 10.5 5.11 8.79 3 6.16c-.37.64-.58 1.38-.58 2.17 0 1.49.76 2.81 1.91 3.58-.71 0-1.37-.22-1.95-.54v.03c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.13.15-.27 0-.54-.03-.8-.08.54 1.69 2.11 2.95 4 2.98A8.6 8.6 0 0 1 2 19.54a12.1 12.1 0 0 0 6.56 1.92c7.88 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.13-2.22z"/></svg>
  )
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m4.586 14.424a.624.624 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.624.624 0 0 1-.277-1.215c3.809-.871 7.077-.496 9.712 1.115.295.18.39.569.207.857m1.224-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 1 1-.453-1.493c3.633-1.102 8.147-.568 11.234 1.328a.78.78 0 0 1 .256 1.074m.105-2.835c-3.223-1.914-8.54-2.09-11.617-1.156a.935.935 0 1 1-.542-1.79c3.532-1.072 9.404-.865 13.115 1.338a.935.935 0 0 1-.956 1.608"/></svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.339 18.338v-7.16H5.962v7.16zM7.151 10.097c.764 0 1.382-.62 1.382-1.382a1.38 1.38 0 1 0-2.764 0c0 .763.618 1.382 1.382 1.382m11.187 8.241v-3.926c0-2.06-.446-3.644-2.852-3.644-1.156 0-1.932.634-2.249 1.235h-.032v-1.045h-2.281v7.38h2.374V14.69c0-.964.183-1.898 1.378-1.898 1.179 0 1.194 1.102 1.194 1.96v3.586z"/></svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.83a8.16 8.16 0 0 0 4.77 1.52V6.9a4.85 4.85 0 0 1-1.84-.21"/></svg>
  )
}

function ChevronDown({ className = 'w-4 h-4' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

const socialLinks = [
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'YouTube', href: '#', Icon: YoutubeIcon },
  { label: 'Twitter', href: '#', Icon: TwitterIcon },
  { label: 'Spotify', href: '#', Icon: SpotifyIcon },
  { label: 'LinkedIn', href: '#', Icon: LinkedInIcon },
  { label: 'TikTok', href: '#', Icon: TikTokIcon },
]

function Footer() {
  const [openSection, setOpenSection] = useState(null)

  const toggle = (title) => {
    setOpenSection((current) => (current === title ? null : title))
  }

  return (
    <footer className="w-full bg-[#282828] text-[#9aa5b1]">
      <div className="max-w-[1140px] mx-auto px-6 lg:px-8 pt-16 lg:pt-20 pb-8">
        {/* Newsletter */}
        <div className="text-center">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-[40px] font-extrabold italic uppercase tracking-tight mb-3">
            The Feeling of Success
          </h2>
          <p className="mt-3 text-base text-[#9aa5b1] leading-relaxed">
            Abonnez-vous à notre newsletter pour ne rien rater de notre actualité
            et recevoir nos promotions en priorité!
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-12 sm:px-16 py-4 bg-[#1ea7e1] hover:bg-[#1893c8] text-white text-[15px] font-bold tracking-widest uppercase transition-colors w-full sm:w-auto sm:min-w-[280px]"
            >
              S'inscrire
            </a>
          </div>
        </div>

        {/* Link columns - desktop */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8 mt-20">
          {linkColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-white text-[1.25rem] leading-8 font-light uppercase mb-2 font-[Roboto,sans-serif] not-italic">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-base text-[#9aa5b1] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Magasins column */}
          <div>
            <h3 className="text-white text-[1.25rem] leading-8 font-light uppercase mb-2 font-[Roboto,sans-serif] not-italic">
              Magasins
            </h3>
            <a
              href="#"
              className="inline-flex items-center justify-center whitespace-nowrap px-8 py-3.5 border border-[#1ea7e1] text-white text-sm font-bold tracking-wider uppercase hover:bg-white hover:text-[#343a40] transition-colors"
            >
              Magasin le plus proche
            </a>
          </div>
        </div>

        {/* Link columns - mobile accordion */}
        <div className="lg:hidden mt-12 border-t border-[#4a545e]">
          {linkColumns.map((column) => {
            const isOpen = openSection === column.title
            return (
              <div key={column.title} className="border-b border-[#4a545e]">
                <button
                  onClick={() => toggle(column.title)}
                  className="w-full flex items-center justify-between py-4 text-white text-[1.25rem] leading-8 font-light uppercase font-[Roboto,sans-serif]"
                  aria-expanded={isOpen}
                >
                  {column.title}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <ul className="flex flex-col gap-3.5 pb-5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-base text-[#9aa5b1] hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}

          {/* Magasins accordion */}
          <div className="border-b border-[#4a545e]">
            <button
              onClick={() => toggle('Magasins')}
              className="w-full flex items-center justify-between py-4 text-white text-[1.25rem] leading-8 font-light uppercase font-[Roboto,sans-serif]"
              aria-expanded={openSection === 'Magasins'}
            >
              Magasins
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  openSection === 'Magasins' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openSection === 'Magasins' && (
              <div className="pb-5">
                <a
                  href="#"
                  className="inline-flex items-center justify-center whitespace-nowrap px-8 py-3.5 border border-[#1ea7e1] text-white text-sm font-bold tracking-wider uppercase hover:bg-white hover:text-[#343a40] transition-colors"
                >
                  Magasin le plus proche
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Social icons — original uses 48x48 images */}
        <div className="mt-12 lg:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#d6dade] text-[#343a40] hover:bg-white transition-colors"
            >
              <Icon />
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 lg:mt-12 pt-6 border-t border-[#4a545e] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#9aa5b1]">
          <p className="text-center sm:text-left">
            <a href="#" className="hover:text-white transition-colors">
              Politique de confidentialité
            </a>{' '}
            <span>et</span>{' '}
            <a href="#" className="hover:text-white transition-colors">
              de cookies
            </a>
          </p>
          <a href="#" className="hover:text-white transition-colors">
            Termes et conditions
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/shop/Breadcrumb'

export default function ComingSoon({ title = 'Bientôt disponible', description, breadcrumbHref = '/' }) {
  return (
    <>
      <Header />
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: title, href: breadcrumbHref },
        ]}
      />
      <main className="w-full bg-white">
        <div className="max-w-[720px] mx-auto px-4 py-24 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#1babf9] mb-4">
            Bientôt disponible
          </span>
          <h1
            className="text-[32px] lg:text-[44px] font-bold text-[#36474e] leading-tight mb-6 not-italic"
            style={{ fontFamily: "'Roboto', sans-serif", textTransform: 'none', letterSpacing: 0 }}
          >
            {title}
          </h1>
          {description && (
            <p className="text-base text-[#6b7a8d] leading-relaxed mb-10">{description}</p>
          )}
          <Link
            to="/collections/all"
            className="inline-flex items-center px-8 py-3 text-xs font-bold uppercase tracking-wider bg-[#36474e] text-white hover:bg-[#2a3a47] transition-colors"
          >
            Voir tous les produits
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

// Pixel-perfect fallback mirroring shop.biotechusa.fr/pages/vetements
// Used when Contentful clothingLandingPage entry missing or fetch fails.
// Images point at biotechusa CDN directly.

const CDN = 'https://shop.biotechusa.fr/cdn/shop'

const img = (path) => `${CDN}/${path}`

// --- RISE products ---
const riseProducts = [
  {
    id: 'rise-pant-bleu',
    slug: 'rise-comfort-pantalon-de-survetement-homme-bleu',
    name: 'RISE COMFORT Pantalon de Survêtement Homme',
    brand: 'BiotechUSA Apparel',
    price: 64.9,
    image: { src: img('files/rise_collection_ss26_6802_832x964_crop_top.jpg?v=1775805792'), alt: '' },
    hoverImage: { src: img('files/rise_collection_ss26_6820_832x964_crop_top.jpg?v=1775719053'), alt: '' },
    colorName: 'bleu',
    bgClass: 'bg-[#eff1f1]',
    colorVariants: [
      { handle: 'rise-comfort-pantalon-de-survetement-homme-bleu', name: 'bleu', hex: '#495870', active: true },
      { handle: 'rise-comfort-pantalon-de-survetement-homme-marron', name: 'marron', hex: '#a0938a', active: false },
    ],
    sizes: [
      { label: 'S', value: '58020457021821', available: true },
      { label: 'M', value: '58020457054589', available: true },
      { label: 'L', value: '58020457087357', available: true },
      { label: 'XL', value: '58020457120125', available: true },
      { label: '2XL', value: '58020457152893', available: true },
    ],
  },
  {
    id: 'rise-hoodie-marron',
    slug: 'rise-comfort-sweat-a-capuche-homme-marron',
    name: 'RISE COMFORT Sweat à Capuche Homme',
    brand: 'BiotechUSA Apparel',
    price: 69.9,
    image: { src: img('files/preview_images/2a4f1e379ca14c58abdf41eccfb54d5d.thumbnail.0000000000_832x964.jpg?v=1775718879'), alt: '' },
    video: {
      src: img('videos/c/vp/2a4f1e379ca14c58abdf41eccfb54d5d/2a4f1e379ca14c58abdf41eccfb54d5d.HD-1080p-7.2Mbps-80825942.mp4?v=0'),
      poster: img('files/preview_images/2a4f1e379ca14c58abdf41eccfb54d5d.thumbnail.0000000000_832x964.jpg?v=1775718879'),
    },
    colorName: 'marron',
    bgClass: 'bg-[#eff1f1]',
    colorVariants: [
      { handle: 'rise-comfort-sweat-a-capuche-homme-marron', name: 'marron', hex: '#a0938a', active: true },
      { handle: 'rise-comfort-sweat-a-capuche-homme-bleu', name: 'bleu', hex: '#495870', active: false },
    ],
    sizes: [
      { label: 'S', value: '58020455580029', available: true },
      { label: 'M', value: '58020455612797', available: true },
      { label: 'L', value: '58020455645565', available: true },
      { label: 'XL', value: '58020455678333', available: true },
      { label: '2XL', value: '58020455711101', available: true },
    ],
  },
  {
    id: 'rise-hoodie-bleu',
    slug: 'rise-comfort-sweat-a-capuche-homme-bleu',
    name: 'RISE COMFORT Sweat à Capuche Homme',
    brand: 'BiotechUSA Apparel',
    price: 69.9,
    image: { src: img('files/preview_images/2d80d14ed2414138a7525a33f81e095c.thumbnail.0000000000_832x964.jpg?v=1775718637'), alt: '' },
    video: {
      src: img('videos/c/vp/2d80d14ed2414138a7525a33f81e095c/2d80d14ed2414138a7525a33f81e095c.HD-1080p-7.2Mbps-80825345.mp4?v=0'),
      poster: img('files/preview_images/2d80d14ed2414138a7525a33f81e095c.thumbnail.0000000000_832x964.jpg?v=1775718637'),
    },
    colorName: 'bleu',
    bgClass: 'bg-[#eff1f1]',
    colorVariants: [
      { handle: 'rise-comfort-sweat-a-capuche-homme-marron', name: 'marron', hex: '#a0938a', active: false },
      { handle: 'rise-comfort-sweat-a-capuche-homme-bleu', name: 'bleu', hex: '#495870', active: true },
    ],
    sizes: [
      { label: 'S', value: '58020454531453', available: true },
      { label: 'M', value: '58020454564221', available: true },
      { label: 'L', value: '58020454596989', available: true },
      { label: 'XL', value: '58020454629757', available: true },
      { label: '2XL', value: '58020454662525', available: true },
    ],
  },
]

// --- LAST CHANCE products ---
const saleBadges = [
  { type: 'sale', label: 'Vente de fidélité' },
  { type: 'discount', label: '-60%' },
]

const lastChanceProducts = [
  {
    id: 'lc-curvetech',
    slug: 'curvetech-leggings-style-jogger-pour-femme',
    name: 'CurveTech Leggings style jogger pour femme',
    brand: 'BiotechUSA Apparel',
    price: 15.96,
    originalPrice: 39.9,
    image: { src: img('files/preview_images/c337b1a51cc847a892934df0dcc9bb2e.thumbnail.0000000000_832x964.jpg?v=1759396076'), alt: '' },
    video: {
      src: img('videos/c/vp/c337b1a51cc847a892934df0dcc9bb2e/c337b1a51cc847a892934df0dcc9bb2e.HD-1080p-7.2Mbps-58707916.mp4?v=0'),
      poster: img('files/preview_images/c337b1a51cc847a892934df0dcc9bb2e.thumbnail.0000000000_832x964.jpg?v=1759396076'),
    },
    colorName: 'noir',
    bgClass: 'bg-[#eff1f1]',
    badges: saleBadges,
    colorVariants: [
      { handle: 'curvetech-leggings-style-jogger-pour-femme', name: 'noir', hex: '#000000', active: true },
    ],
    sizes: [
      { label: 'XS', value: '57071460942205', available: true },
      { label: 'S', value: '57071460974973', available: false },
      { label: 'M', value: '57071461007741', available: false },
      { label: 'L', value: '57071461040509', available: false },
      { label: 'XL', value: '57071461073277', available: false },
    ],
  },
  {
    id: 'lc-chaussettes',
    slug: 'chaussettes-unisexes',
    name: 'Chaussettes unisexes (lot de 3)',
    brand: 'Accessoires',
    price: 6.76,
    originalPrice: 16.9,
    image: { src: img('files/IMG_4537_cropped_1_832x964_crop_top.jpg?v=1762785361'), alt: '' },
    hoverImage: { src: img('files/IMG_4522_832x964_crop_top.jpg?v=1749111784'), alt: '' },
    colorName: 'blanc',
    bgClass: 'bg-[#eff1f1]',
    badges: saleBadges,
    colorVariants: [
      { handle: 'chaussettes-unisexes', name: 'blanc', hex: '#ffffff', hasBorder: true, active: true },
    ],
    sizes: [
      { label: '36-38', value: '56168068153725', available: false },
      { label: '39-41', value: '56168068186493', available: false },
      { label: '42-44', value: '56168068219261', available: false },
      { label: '45-47', value: '56168068252029', available: false },
    ],
  },
  {
    id: 'lc-heavyweight-bleu',
    slug: 'heavyweight-oversized-t-shirt-pour-femme-bleu-retro',
    name: 'Heavyweight Oversized T-shirt pour femme',
    brand: 'BiotechUSA Apparel',
    price: 7.96,
    originalPrice: 19.9,
    image: { src: img('files/preview_images/d3ec64efe00e4fa4aa5251a386cb53b2.thumbnail.0000000000_832x964.jpg?v=1746513830'), alt: '' },
    video: {
      src: img('videos/c/vp/d3ec64efe00e4fa4aa5251a386cb53b2/d3ec64efe00e4fa4aa5251a386cb53b2.HD-1080p-4.8Mbps-47074134.mp4?v=0'),
      poster: img('files/preview_images/d3ec64efe00e4fa4aa5251a386cb53b2.thumbnail.0000000000_832x964.jpg?v=1746513830'),
    },
    colorName: 'bleu rétro',
    bgClass: 'bg-[#eff1f1]',
    badges: saleBadges,
    colorVariants: [
      { handle: 'heavyweight-oversized-t-shirt-pour-femme-blanc', name: 'blanc', hex: '#ffffff', hasBorder: true, active: false },
      { handle: 'heavyweight-oversized-t-shirt-pour-femme-bleu-retro', name: 'bleu rétro', hex: '#7ea6b8', active: true },
    ],
    sizes: [
      { label: 'XS', value: '55968754958717', available: true },
      { label: 'S', value: '55968754991485', available: true },
      { label: 'M', value: '55968755024253', available: false },
    ],
  },
  {
    id: 'lc-seamless-long-sleeve',
    slug: 'seamless-long-sleeve-crop-haut-a-manches-longues-femme-marron',
    name: 'SEAMLESS LONG-SLEEVE CROP Haut à manches longues femme',
    brand: 'BiotechUSA Apparel',
    price: 16.36,
    originalPrice: 40.9,
    image: { src: img('files/biotech19500_1_832x964_crop_top.jpg?v=1762785363'), alt: '' },
    hoverImage: { src: img('files/biotech19545_1_832x964_crop_top.jpg?v=1733921818'), alt: '' },
    colorName: 'marron',
    bgClass: 'bg-[#eff1f1]',
    badges: saleBadges,
    colorVariants: [
      { handle: 'seamless-long-sleeve-crop-haut-a-manches-longues-femme-cerise', name: 'cerise', hex: '#532d3a', active: false },
      { handle: 'seamless-long-sleeve-crop-haut-a-manches-longues-femme-marron', name: 'marron', hex: '#b9a193', active: true },
    ],
    sizes: [
      { label: 'XS-S', value: '54944024134013', available: true },
      { label: 'S-M', value: '54944024166781', available: true },
      { label: 'M-L', value: '54944024199549', available: true },
    ],
  },
  {
    id: 'lc-backless-bra',
    slug: 'backless-medium-support-sports-bra-soutien-gorge-de-sport-femme',
    name: 'BACKLESS MEDIUM SUPPORT SPORTS BRA Soutien-gorge de sport femme',
    brand: 'BiotechUSA Apparel',
    price: 11.96,
    originalPrice: 29.9,
    image: { src: img('files/biotech5730_832x964_crop_top.jpg?v=1762785481'), alt: '' },
    hoverImage: { src: img('files/biotech5714_832x964_crop_top.jpg?v=1733831473'), alt: '' },
    colorName: 'noir',
    bgClass: 'bg-[#eff1f1]',
    badges: saleBadges,
    colorVariants: [
      { handle: 'backless-medium-support-sports-bra-soutien-gorge-de-sport-femme', name: 'noir', hex: '#000000', active: true },
    ],
    sizes: [
      { label: 'XS', value: '54944000344445', available: true },
      { label: 'S', value: '54944000377213', available: true },
      { label: 'M', value: '54944000409981', available: false },
      { label: 'L', value: '54944000442749', available: false },
      { label: 'XL', value: '54944000475517', available: false },
    ],
  },
  {
    id: 'lc-ava-top',
    slug: 'ava-haut-pour-femmes-gris',
    name: 'AVA Haut pour femmes',
    brand: 'BiotechUSA Apparel',
    price: 12.8,
    originalPrice: 32.0,
    image: { src: img('files/biotech5635_1_832x964_crop_top.jpg?v=1762785484'), alt: '' },
    hoverImage: { src: img('files/biotech5661_1_832x964_crop_top.jpg?v=1734002150'), alt: '' },
    colorName: 'gris',
    bgClass: 'bg-[#eff1f1]',
    badges: saleBadges,
    colorVariants: [
      { handle: 'ava-haut-pour-femmes-gris', name: 'gris', hex: '#606161', active: true },
    ],
    sizes: [
      { label: 'XS-S', value: '53501211410813', available: true },
      { label: 'S-M', value: '53501211443581', available: true },
      { label: 'M-L', value: '53501211476349', available: true },
    ],
  },
]

// --- Full page data ---
export const vetementsFallbackData = {
  heroSlides: [
    {
      image: 'https://biotechusa.fr/content/uploads/2014/11/FR_RISE_kollekcio_bevezeto_1920x720_HERO_megnezem.jpg',
      imageMobile: 'https://biotechusa.fr/content/uploads/2014/11/FR_RISE_kollekcio_bevezeto_1920x720_HERO_megnezem.jpg',
      title: 'NOUVELLE COLLECTION',
      subtitle: 'RISE',
      ctaLabel: 'Je découvre',
      ctaHref: '/collections/rise-collection',
    },
  ],
  rise: {
    title: 'RISE collection',
    products: riseProducts,
    ctaLabel: 'tout',
    ctaHref: '/collections/rise-collection',
  },
  leisure: {
    imageDesktop: img('files/FR_APPAREL_webshopnagykepesblokk_1920x720_9b3cc87c-baa0-43b3-b9a6-8f6f4cd24b0e_1920x768_crop_center.jpg?v=1726657223'),
    imageMobile: img('files/FR_APPAREL_webshopnagykepesblokk__640x880_2104d098-73f1-4f81-8dfa-26563e8f41c0_768x900_crop_center.jpg?v=1726657224'),
    href: '/collections/nouveaux-vetements-pour-femmes',
  },
  lastChance: {
    title: 'LAST CHANCE',
    products: lastChanceProducts,
    ctaLabel: 'tout',
    ctaHref: '/collections/last-chance',
  },
  elevate: {
    title: 'Elevate',
    cards: [
      {
        title: 'Vêtements pour hommes',
        image: img('collections/A22A0094_1882abc7-c6db-4382-b38f-7ef97824351b-5191972.png?v=1762785191'),
        ctaLabel: 'montrez-moi!',
        href: '/collections/vetements-pour-hommes',
      },
      {
        title: 'Vêtements pour femmes',
        image: img('collections/A22A9640_ab3603a6-5797-4ac4-b0d2-fcdb022c6184-7123520.png?v=1762785185'),
        ctaLabel: 'montrez-moi!',
        href: '/collections/vetements-pour-femmes',
      },
    ],
  },
  videoEmbedUrl: 'https://www.youtube.com/embed/gxYyVneXK7w',
  essence: {
    title: 'Essence collection',
    text: 'Des vêtements de sport que vous ne pourrez plus enlever. Confort. Sport. Mode.',
    ctaLabel: 'acheter',
    ctaHref: '/collections/vetements-pour-hommes',
    backgroundImage: img('files/rise_collection_ss26_68281.jpg?v=1775805792'),
  },
}

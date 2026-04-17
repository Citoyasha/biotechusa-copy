function FullWidthBanner({ imageDesktop, imageMobile, href = '/vetements', alt = '' }) {
  if (!imageDesktop && !imageMobile) return null
  return (
    <section className="w-full my-10 lg:my-16">
      <a href={href} className="block w-full">
        <picture>
          <source media="(min-width: 768px)" srcSet={imageDesktop} />
          <img
            src={imageMobile || imageDesktop}
            alt={alt}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </picture>
      </a>
    </section>
  )
}

export default FullWidthBanner

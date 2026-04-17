function AboutSection() {
  return (
    <section
      className="relative w-full min-h-[688px] bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage:
          "url('https://biotechusa.fr/content/uploads/2022/03/about-us.webp')",
      }}
    >
      {/* Dark blue overlay */}
      <div className="absolute inset-0 bg-[#1a2942]/10" />

      {/* Content — original: container > row with col-md-2 / col-md-8 / col-md-2 */}
      <div className="relative max-w-[1140px] mx-auto px-4 lg:px-6 py-16 sm:py-20 lg:py-28">
        {/* Quote row: 2/8/2 grid at md+ */}
        <div className="grid grid-cols-12 items-start">
          {/* Left quotation mark — col-md-2 */}
          <div className="hidden md:flex col-span-2 justify-center pt-2">
            <span
              aria-hidden="true"
              className="text-white text-7xl lg:text-8xl font-serif leading-none select-none"
            >
              &ldquo;
            </span>
          </div>

          {/* Quote text — col-md-8 */}
          <div className="col-span-12 md:col-span-8 text-center">
            {/* Mobile-only opening quote */}
            <span
              aria-hidden="true"
              className="md:hidden text-white text-5xl font-serif leading-none select-none"
            >
              &ldquo;
            </span>

            <h3 className="text-white text-xl sm:text-2xl lg:text-[40px] leading-[2.5rem] font-bold italic mt-6 mb-2">
              Nous nous efforçons d'aider davantage de personnes dans le monde à
              vivre une vie plus saine et plus épanouie grâce à nos produits et à
              notre expertise.
            </h3>

            {/* Mobile-only closing quote */}
            <span
              aria-hidden="true"
              className="md:hidden text-white text-5xl font-serif leading-none select-none"
            >
              &rdquo;
            </span>
          </div>

          {/* Right quotation mark — col-md-2 */}
          <div className="hidden md:flex col-span-2 justify-center items-end pb-2">
            <span
              aria-hidden="true"
              className="text-white text-7xl lg:text-8xl font-serif leading-none select-none"
            >
              &rdquo;
            </span>
          </div>
        </div>

        {/* CTA button */}
        <div className="mt-12 sm:mt-14 lg:mt-16 flex justify-center px-5">
          <a
            href="/a-propos"
            className="inline-flex items-center justify-center px-8 sm:px-12 py-4 bg-[#1ea7e1] hover:bg-[#1893c8] text-white text-sm font-bold tracking-wider uppercase transition-colors w-full sm:w-auto sm:min-w-[340px]"
          >
            Apprendre a nous connaitre
          </a>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

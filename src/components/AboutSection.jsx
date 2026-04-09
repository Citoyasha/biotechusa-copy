function AboutSection() {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://biotechusa.fr/content/uploads/2022/03/about-us.webp')",
      }}
    >
      {/* Dark blue overlay */}
      <div className="absolute inset-0 bg-[#1a2942]/80" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 py-16 sm:py-20 lg:py-28 text-center">
        <div className="relative">
          {/* Opening quote */}
          <span
            aria-hidden="true"
            className="absolute -top-2 sm:-top-4 left-0 sm:left-2 lg:-left-6 text-white text-6xl sm:text-7xl lg:text-8xl font-serif leading-none select-none"
          >
            &ldquo;
          </span>

          {/* Quote text */}
          <p className="text-white text-xl sm:text-2xl lg:text-[28px] lg:leading-[1.4] font-bold italic px-6 sm:px-12 lg:px-16">
            Nous nous efforçons d'aider davantage de personnes dans le monde à
            vivre une vie plus saine et plus épanouie grâce à nos produits et à
            notre expertise.
          </p>

          {/* Closing quote */}
          <span
            aria-hidden="true"
            className="absolute -bottom-8 sm:-bottom-10 right-0 sm:right-2 lg:-right-6 text-white text-6xl sm:text-7xl lg:text-8xl font-serif leading-none select-none"
          >
            &rdquo;
          </span>
        </div>

        {/* CTA button */}
        <div className="mt-16 sm:mt-16 lg:mt-14 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 sm:px-12 py-4 bg-[#1ea7e1] hover:bg-[#1893c8] text-white text-sm font-bold tracking-wider uppercase transition-colors w-full sm:w-auto sm:min-w-[340px]"
          >
            Apprendre à nous connaitre
          </a>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

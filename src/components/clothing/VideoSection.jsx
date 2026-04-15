function VideoSection({ embedUrl }) {
  if (!embedUrl) return null
  return (
    <section className="w-full my-10 lg:my-16">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={embedUrl}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    </section>
  )
}

export default VideoSection

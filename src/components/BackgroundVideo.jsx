import { useEffect, useRef } from 'react'

export default function BackgroundVideo() {
  const containerRef  = useRef(null)
  const videoRef      = useRef(null)
  const stopTimerRef  = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const video     = videoRef.current
    if (!container || !video) return

    // ── helper: fade container in/out based on hero visibility ────────────────
    const updateOpacity = (scrollY) => {
      const heroH     = window.innerHeight        // hero = 100 vh
      const fadeStart = heroH * 0.6
      const fadeEnd   = heroH * 1.0
      const opacity   =
        scrollY <= fadeStart
          ? 0
          : Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1)
      container.style.opacity = opacity.toFixed(3)
      return opacity
    }

    // ── scroll handler ─────────────────────────────────────────────────────────
    const onScroll = () => {
      const scrollY = window.scrollY
      const opacity = updateOpacity(scrollY)

      // Only play when past the hero section
      if (opacity > 0.05) {
        // Resume playback while scrolling
        if (video.paused) {
          video.play().catch(() => {/* autoplay blocked – silent fail */})
        }
      }

      // Debounce: pause ~180 ms after scrolling stops
      clearTimeout(stopTimerRef.current)
      stopTimerRef.current = setTimeout(() => {
        if (!video.paused) video.pause()
      }, 180)
    }

    // Initial state
    updateOpacity(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(stopTimerRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ opacity: 0, transition: 'opacity 0.35s ease' }}
    >
      {/* Video — plays while scrolling, pauses when still, loops forever */}
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.54) contrast(1.18) saturate(1.25)',
        }}
      >
        <source src="/warrior.mp4" type="video/mp4" />
      </video>

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(3,10,9,0.52) 100%),
            linear-gradient(to bottom,
              rgba(3,10,9,0.50) 0%,
              transparent 15%,
              transparent 82%,
              rgba(3,10,9,0.72) 100%)
          `,
        }}
      />

      {/* Subtle cyber grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, rgba(0,242,254,0.05) 0px, rgba(0,242,254,0.05) 1px, transparent 1px, transparent 80px),
            repeating-linear-gradient(0deg,  rgba(0,242,254,0.05) 0px, rgba(0,242,254,0.05) 1px, transparent 1px, transparent 80px)
          `,
        }}
      />
    </div>
  )
}

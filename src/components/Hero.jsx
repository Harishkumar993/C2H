import { useEffect, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import Hero3DSphere from './Hero3DSphere'
import { ChevronDown } from 'lucide-react'

const STATS = [
  { count: 1000, suffix: '+', label: 'Warriors Trained' },
  { count: 15,   suffix: '+', label: 'Years of Legacy'  },
  { count: 85,   suffix: '+', label: 'Championships'    },
  { count: 12,   suffix: '',  label: 'Expert Masters'   },
]

function useCounter(target, suffix, start) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let current = 0
    const step = target / 80
    const timer = setInterval(() => {
      current += step
      if (current >= target) { setVal(target); clearInterval(timer) }
      else setVal(Math.floor(current))
    }, 20)
    return () => clearInterval(timer)
  }, [start, target])
  return val + suffix
}

function StatItem({ count, suffix, label, started }) {
  const display = useCounter(count, suffix, started)
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-[2.2rem] font-extrabold text-cyber leading-none"
        style={{ textShadow: '0 0 25px rgba(0,242,254,0.6)' }}>
        {display}
      </span>
      <span className="font-heading text-[0.7rem] font-bold text-[#8AB4AE] uppercase tracking-[0.2em] mt-1">{label}</span>
    </div>
  )
}

export default function Hero() {
  const [statsStarted, setStatsStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStatsStarted(true), 2800)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  }
  const item = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030A09]">
      {/* 3D Floating Crystal Sphere Banner */}
      <Suspense fallback={null}>
        <Hero3DSphere />
      </Suspense>

      {/* Radial Gradient Vignette Overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 85%, rgba(3,10,9,0.85) 0%, transparent 60%), radial-gradient(ellipse at 50% 5%, rgba(3,10,9,0.6) 0%, transparent 50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-[5] flex flex-col items-center text-center px-6 pt-28 pb-24 max-w-5xl mx-auto w-full">
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Badge */}
          <motion.div variants={item}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[rgba(0,242,254,0.35)] bg-[rgba(0,242,254,0.06)] mb-8 shadow-[0_0_20px_rgba(0,242,254,0.15)]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyber animate-pulse-cyan shadow-[0_0_10px_#00F2FE]" />
            <span className="font-heading text-[0.75rem] font-bold tracking-[0.2em] uppercase text-cyber">
              Vellore's Premier Martial Academy
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 variants={item} className="mb-6">
            <span className="block font-display font-black text-gradient-cyber leading-none mb-3"
              style={{
                fontSize: 'clamp(3.5rem, 9.5vw, 8rem)',
                filter: 'drop-shadow(0 0 40px rgba(0,242,254,0.4))',
              }}>
              VELLORE
            </span>
            <span className="block font-display font-extrabold text-white tracking-[0.35em]"
              style={{ fontSize: 'clamp(1.4rem, 4vw, 3.2rem)' }}>
              YUDHAKALAM
            </span>
            <span className="block font-heading font-medium text-[#8AB4AE] tracking-[0.3em] mt-3"
              style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)' }}>
              வேலூர் யுத்தகலம்
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={item}
            className="font-body text-[#C2E0DB] text-[1rem] sm:text-[1.2rem] leading-[1.8] max-w-[620px] mx-auto mb-10 font-normal">
            Where Ancient Tamil Warriors Are Born. Master the Silambam. Command the Arena.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-4 justify-center mb-14">
            <button onClick={() => scrollTo('join')} className="btn-primary">
              <span>Begin Your Journey</span>
            </button>
            <button onClick={() => scrollTo('training')} className="btn-ghost">
              <span>Explore Training</span>
              <ChevronDown size={17} className="ml-1 text-cyber" />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item}
            className="flex flex-wrap items-center justify-center gap-0 w-full">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <StatItem {...s} started={statsStarted} />
                {i < STATS.length - 1 && (
                  <div className="w-px h-12 mx-8 sm:mx-12 bg-gradient-to-b from-transparent via-[rgba(0,242,254,0.3)] to-transparent hidden sm:block" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      // {/* Scroll indicator */}
      // <motion.div
      //   initial={{ opacity: 0 }}
      //   animate={{ opacity: 1 }}
      //   transition={{ delay: 3, duration: 1 }}
      //   className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-2 cursor-pointer"
      //   onClick={() => scrollTo('about')}
      >
        <div className="w-7 h-11 rounded-[14px] border-2 border-[rgba(0,242,254,0.35)] flex items-start justify-center pt-2">
          <div className="w-1.5 h-2.5 rounded-full bg-cyber animate-bounce shadow-[0_0_8px_#00F2FE]" />
        </div>
        <span className="font-heading text-[0.65rem] font-bold tracking-[0.25em] uppercase text-[#8AB4AE]">Scroll</span>
      </motion.div>
    </section>
  )
}

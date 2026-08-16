import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PILLARS = [
  { icon: '🔥', label: 'Discipline' },
  { icon: '⚔', label: 'Courage'   },
  { icon: '🏆', label: 'Victory'   },
  { icon: '🌿', label: 'Heritage'  },
]

function Fadein({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const variants = {
    hidden: { opacity: 0, y: direction === 'up' ? 30 : 0, x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0 },
    show:   { opacity: 1, y: 0, x: 0, transition: { duration: 0.8, delay, ease: 'easeOut' } },
  }
  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? 'show' : 'hidden'}>
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(105deg, rgba(3,10,9,0.62) 0%, rgba(3,10,9,0.45) 100%)' }}>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Visual side — floating crystal card */}
          <Fadein direction="left">
            <div className="relative flex items-center justify-center h-[420px]">
              {/* Orbit rings */}
              <div className="absolute w-[320px] h-[320px] rounded-full border border-[rgba(0,242,254,0.12)] animate-spin-slow" />
              <div className="absolute w-[400px] h-[400px] rounded-full border border-[rgba(255,107,53,0.08)] animate-spin-reverse" />

              {/* Floating card */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-[220px] h-[280px] rounded-3xl glass-card flex flex-col items-center justify-center gap-5"
                style={{
                  boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,242,254,0.12), inset 0 1px 0 rgba(0,242,254,0.1), 0 0 60px rgba(0,242,254,0.08)',
                }}
              >
                <div className="text-[3.5rem]" style={{ filter: 'drop-shadow(0 0 20px #00F2FE)' }}>⚔</div>
                <div className="text-center">
                  <div className="font-heading text-[0.6rem] tracking-[0.35em] text-[#8AB4AE] uppercase mb-1">Est. 2010</div>
                  <div className="font-display text-[0.85rem] font-bold text-cyber tracking-[0.12em] leading-5">VELLORE<br/>YUDHAKALAM</div>
                </div>
                <div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(135deg,transparent 40%,rgba(0,242,254,0.04) 50%,transparent 60%)' }} />
              </motion.div>

              {/* Orbit dots */}
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} className="absolute w-[320px] h-[320px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyber shadow-[0_0_12px_#00F2FE]" />
              </motion.div>
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} className="absolute w-[400px] h-[400px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-copper shadow-[0_0_8px_#FF6B35]" />
              </motion.div>
            </div>
          </Fadein>

          {/* Text side */}
          <div className="flex flex-col gap-6">
            <Fadein><span className="section-tag">Heritage &amp; Legacy</span></Fadein>

            <Fadein delay={0.1}>
              <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold leading-[1.25]">
                Ancient Art.<br/>
                <span className="text-gradient-cyber">Modern Champions.</span>
              </h2>
            </Fadein>

            <Fadein delay={0.2}>
              <p className="text-[#C2E0DB] leading-[1.9] text-[0.97rem] font-body">
                Vellore Yudhakalam stands as the torchbearer of Tamil martial tradition in the historic city of Vellore.
                Founded upon the sacred principles of <strong className="text-cyber font-semibold">Silambam Nilal Payirchi</strong>,
                we forge warriors from all walks of life — transforming discipline, courage, and cultural pride
                into living martial excellence.
              </p>
            </Fadein>

            <Fadein delay={0.3}>
              <p className="text-[#C2E0DB] leading-[1.9] text-[0.97rem] font-body">
                Our lineage traces to the royal warrior courts of the Vijayanagara Empire, preserved through
                unbroken generational teaching that now thrives in the heart of Vellore district.
              </p>
            </Fadein>

            <Fadein delay={0.4}>
              <div className="flex flex-wrap gap-3 mt-2">
                {PILLARS.map((p) => (
                  <div key={p.label}
                    className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border border-[rgba(0,242,254,0.15)] bg-[rgba(0,242,254,0.04)] hover:border-cyber hover:bg-[rgba(0,242,254,0.10)] hover:-translate-y-1 transition-all duration-300 cursor-default">
                    <span className="text-3xl">{p.icon}</span>
                    <span className="font-heading text-[0.7rem] tracking-[0.18em] uppercase text-cyber font-bold">{p.label}</span>
                  </div>
                ))}
              </div>
            </Fadein>
          </div>
        </div>
      </div>
    </section>
  )
}

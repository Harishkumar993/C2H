import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PROGRAMS = [
  {
    icon: '🥋', level: 'Beginner', title: 'Silambam Foundations',
    desc: 'Master stance, grip, footwork and the 12 core strikes. A 3-month intensive foundation for all ages.',
    features: ['Basic 12-strike system', 'Balance & footwork drills', 'Cultural heritage sessions', '3 months duration'],
    featured: false,
  },
  {
    icon: '⚔', level: 'Intermediate', title: "Warrior's Path",
    desc: 'Advanced weapon forms including Surul Vaal, Dual Sticks, and Kalaripayattu integration. Compete at district level.',
    features: ['6 weapon forms mastery', 'Combat sequences (Porattam)', 'District championship prep', '6 months program'],
    featured: true, badge: 'Most Popular',
  },
  {
    icon: '🏅', level: 'Advanced', title: "Champion's Forge",
    desc: 'Elite competitive training, state & national prep, and Guru certification for aspiring instructors.',
    features: ['Full weapon arsenal', 'State/National championship', 'Guru certification track', '12 months program'],
    featured: false,
  },
]

export default function Training() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="training" ref={ref} className="py-32 relative"
      style={{ background: 'linear-gradient(105deg, rgba(3,10,9,0.58) 0%, rgba(3,10,9,0.40) 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span initial={{ opacity:0,y:20 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ duration:0.6 }} className="section-tag">Training Programs</motion.span>
          <motion.h2 initial={{ opacity:0,y:20 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ duration:0.6,delay:0.1 }}
            className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold mt-2">
            Forge Your <span className="text-gradient-copper">Inner Warrior</span>
          </motion.h2>
          <motion.p initial={{ opacity:0,y:20 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ duration:0.6,delay:0.2 }}
            className="font-body text-[#C2E0DB] mt-4 max-w-xl mx-auto leading-[1.8]">
            Three paths to mastery — each designed for a different stage of your warrior journey.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PROGRAMS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: p.featured ? -16 : 0, scale: p.featured ? 1.04 : 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }}
              whileHover={{ y: p.featured ? -24 : -8, scale: p.featured ? 1.06 : 1.02 }}
              className="relative rounded-3xl glass-card flex flex-col gap-4 p-8 cursor-default overflow-hidden"
              style={{
                borderColor: p.featured ? 'rgba(0,242,254,0.35)' : 'rgba(0,242,254,0.12)',
                background: p.featured ? 'linear-gradient(180deg,rgba(0,242,254,0.06),rgba(6,20,18,0.85))' : 'rgba(6,20,18,0.78)',
                boxShadow: p.featured ? '0 0 40px rgba(0,242,254,0.15)' : undefined,
              }}
            >
              {p.badge && (
                <div className="absolute top-4 right-4 font-heading text-[0.62rem] font-bold tracking-[0.15em] uppercase bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#030A09] px-3 py-1 rounded-full">
                  {p.badge}
                </div>
              )}

              <div className="text-[2.8rem]" style={{ filter: 'drop-shadow(0 0 15px rgba(0,242,254,0.4))' }}>{p.icon}</div>
              <div className="font-heading text-[0.7rem] font-bold tracking-[0.28em] uppercase text-cyber opacity-80">{p.level}</div>
              <h3 className="font-display text-[1.2rem] font-bold text-white">{p.title}</h3>
              <p className="font-body text-[#C2E0DB] text-[0.88rem] leading-[1.8]">{p.desc}</p>

              <ul className="flex flex-col gap-2 mt-1">
                {p.features.map(f => (
                  <li key={f} className="font-body text-[0.83rem] text-[#C2E0DB] pl-5 relative before:absolute before:left-0 before:content-['→'] before:text-cyber before:text-[0.75rem]">
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-auto pt-4 border-t border-[rgba(0,242,254,0.1)] font-heading text-[0.82rem] font-bold tracking-[0.1em] uppercase text-cyber hover:text-[#4FACFE] hover:pl-2 transition-all text-left"
              >
                Enroll Now →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

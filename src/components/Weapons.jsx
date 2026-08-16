import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const WEAPONS = [
  { icon: '🤢', name: 'Silambam',     tamil: 'சிலம்பம்',    tag: 'Primary Art',   desc: 'The ancient Tamil staff art — spine of our training. Develops speed, coordination and tactical thinking.' },
  { icon: '⚔',  name: 'Surul Vaal',   tamil: 'சுருள் வாள்',  tag: 'Expert Level',  desc: 'The deadly flexible sword — a unique Tamil invention requiring extraordinary wrist control.' },
  { icon: '🗡',  name: 'Val Vittal',   tamil: 'வாள் விட்டல்', tag: 'Intermediate',  desc: 'The broadsword technique combining powerful strikes with elegant defensive forms from warrior lineages.' },
  { icon: '🦌',  name: 'Maan Kombu',   tamil: 'மான் கொம்பு',  tag: 'Master Level',  desc: 'Deer-horn blades — the master-level close-combat art requiring supreme reflexes and fluid body mechanics.' },
  { icon: '🎯',  name: 'Vel Kambu',    tamil: 'வேல் கம்பு',   tag: 'Intermediate',  desc: 'The spear staff combining reach, power, and precise thrusting combat rooted in ancient Tamil warfare.' },
  { icon: '🛡',  name: 'Kalaripayattu', tamil: 'கலரிப்பயட்டு', tag: 'Advanced',      desc: 'The mother of all martial arts — integrated into our advanced curriculum for holistic warrior development.' },
]

export default function Weapons() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(null)

  return (
    <section id="weapons" ref={ref} className="py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(105deg, rgba(3,10,9,0.60) 0%, rgba(3,10,9,0.42) 100%)' }}>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.span initial={{ opacity:0,y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6}} className="section-tag">Arsenal</motion.span>
          <motion.h2 initial={{ opacity:0,y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:0.1}}
            className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold mt-2">
            Ancient <span className="text-gradient-cyber">Weapon Arts</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WEAPONS.map((w, i) => (
            <motion.div
              key={w.name}
              initial={{ opacity:0, y:40 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.6, delay: i*0.1 }}
              whileHover={{ y:-10, scale:1.02 }}
              onHoverStart={() => setActive(w.name)}
              onHoverEnd={() => setActive(null)}
              className="group relative rounded-3xl glass-card p-7 flex flex-col gap-3 cursor-default overflow-hidden"
              style={{ borderColor: active === w.name ? 'rgba(0,242,254,0.45)' : 'rgba(0,242,254,0.12)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F2FE] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#00F2FE]" />
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,242,254,0.04)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />

              <motion.div
                animate={{ rotate: active === w.name ? [0,-8,8,-8,0] : 0 }}
                transition={{ duration:0.5 }}
                className="text-[3rem]"
                style={{ filter: 'drop-shadow(0 0 14px rgba(0,242,254,0.5))', display:'inline-block' }}
              >
                {w.icon}
              </motion.div>

              <div>
                <div className="font-display text-[1.1rem] font-bold text-white">{w.name}</div>
                <div className="font-body text-[0.82rem] text-cyber opacity-70 mt-0.5">{w.tamil}</div>
              </div>

              <p className="font-body text-[#C2E0DB] text-[0.85rem] leading-[1.8] flex-1">{w.desc}</p>

              <span className="inline-block font-heading text-[0.62rem] font-bold tracking-[0.2em] uppercase text-cyber border border-[rgba(0,242,254,0.25)] rounded-full px-3 py-1 bg-[rgba(0,242,254,0.05)] self-start mt-1">
                {w.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

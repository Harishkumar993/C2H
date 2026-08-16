import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MASTERS = [
  {
    initials:'GM', rank:'⭐ Grandmaster', name:'Guru Senthil Murugan',
    title:'Founder & Chief Instructor',
    bio:'40 years of dedicated practice. National Silambam Federation awarded "Thamizh Veerar". Trained over 2,000 students across Tamil Nadu.',
    badges:['National Award','40+ Years'], featured:false,
  },
  {
    initials:'SM', rank:'⭐⭐ Senior Master', name:'Master Arulraj Vel',
    title:'Head of Competition Training',
    bio:'State champion 5 consecutive years. Pioneer of the Vellore Silambam circuit. Currently coaches 3 active national-level competitors.',
    badges:['5× State Champ','National Coach'], featured:true,
  },
  {
    initials:'PD', rank:'⭐ Master', name:'Master Priya Devi',
    title:"Women's Wing Director",
    bio:'Champion advocate for women in martial arts. Leads the Women Empowerment Initiative providing free training, kits, and workshops.',
    badges:["Women's Champion",'Community Leader'], featured:false,
  },
]

export default function Masters() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="masters" ref={ref} className="py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(105deg, rgba(3,10,9,0.58) 0%, rgba(3,10,9,0.40) 100%)' }}>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6}} className="section-tag">The Lineage</motion.span>
          <motion.h2 initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:0.1}}
            className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold mt-2">
            Meet the <span className="text-gradient-copper">Grandmasters</span>
          </motion.h2>
          <motion.p initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:0.2}}
            className="font-body text-[#C2E0DB] mt-4 max-w-lg mx-auto leading-[1.8]">
            Guardians of an unbroken tradition — carrying forward the flame of Tamil warrior heritage.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {MASTERS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity:0, y:50 }}
              animate={inView?{ opacity:1, y: m.featured?-12:0, scale: m.featured?1.03:1 }:{}}
              transition={{ duration:0.7, delay: i*0.15 }}
              whileHover={{ y: m.featured?-20:-8 }}
              className="relative rounded-3xl glass-card p-8 flex flex-col items-center text-center gap-4"
              style={{
                borderColor: m.featured ? 'rgba(0,242,254,0.35)' : 'rgba(0,242,254,0.12)',
                background: m.featured ? 'linear-gradient(180deg,rgba(0,242,254,0.06),rgba(6,20,18,0.85))' : 'rgba(6,20,18,0.78)',
                boxShadow: m.featured ? '0 0 50px rgba(0,242,254,0.12)' : undefined,
              }}
            >
              {/* Avatar */}
              <div className="relative">
                <motion.div
                  animate={{ rotate:360 }}
                  transition={{ duration: m.featured?8:12, repeat:Infinity, ease:'linear' }}
                  className="absolute inset-[-8px] rounded-full border-2"
                  style={{ borderColor: m.featured ? 'rgba(0,242,254,0.5)' : 'rgba(255,107,53,0.4)',
                    boxShadow: m.featured ? '0 0 20px rgba(0,242,254,0.3)' : undefined }}
                />
                <div className="w-20 h-20 rounded-full flex items-center justify-center font-display text-xl font-bold text-cyber"
                  style={{ background:'linear-gradient(135deg,rgba(0,20,18,0.9),rgba(3,10,9,0.9))',
                    border:'1px solid rgba(0,242,254,0.2)' }}>
                  {m.initials}
                </div>
              </div>

              <div className="font-heading text-[0.68rem] tracking-[0.2em] uppercase text-cyber opacity-80">{m.rank}</div>
              <div className="font-display text-[1.1rem] font-bold text-white">{m.name}</div>
              <div className="font-body text-[0.8rem] text-[#8AB4AE]">{m.title}</div>
              <p className="font-body text-[#C2E0DB] text-[0.85rem] leading-[1.8]">{m.bio}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {m.badges.map(b => (
                  <span key={b} className="font-heading text-[0.62rem] font-bold tracking-[0.1em] uppercase text-cyber border border-[rgba(0,242,254,0.25)] rounded-full px-3 py-1 bg-[rgba(0,242,254,0.06)]">{b}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

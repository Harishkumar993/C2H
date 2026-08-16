import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EVENTS = [
  {
    month:'SEP', day:'15', year:'2026', type:'District Championship',
    title:'Vellore District Silambam Open',
    location:'📍 Vellore Municipal Stadium',
    desc:'Open competition across 6 categories. Over 200 participants from 14 academies across the district.',
    side:'left',
  },
  {
    month:'OCT', day:'08', year:'2026', type:'Workshop',
    title:"Women's Self-Defense Intensive",
    location:'📍 Vellore Yudhakalam Arena',
    desc:'Free 2-day workshop for women. No prior experience required. Free silambam kit provided to all participants.',
    side:'right',
  },
  {
    month:'NOV', day:'22', year:'2026', type:'State Championship',
    title:'Tamil Nadu State Silambam Championship',
    location:'📍 Chennai YMCA Grounds',
    desc:'Vellore Yudhakalam fields its strongest team. 8 categories, 32 academies competing for the state title.',
    side:'left',
  },
  {
    month:'DEC', day:'10', year:'2026', type:'Annual Ceremony',
    title:'Annual Grading & Belt Ceremony',
    location:'📍 Vellore Yudhakalam Arena',
    desc:'Year-end grading event. Students demonstrate progress and advance through belt ranks in formal ceremony.',
    side:'right',
  },
]

export default function Events() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="events" ref={ref} className="py-32 relative"
      style={{ background: 'linear-gradient(105deg, rgba(3,10,9,0.60) 0%, rgba(3,10,9,0.42) 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6}} className="section-tag">Upcoming</motion.span>
          <motion.h2 initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:0.1}}
            className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold mt-2">
            Upcoming <span className="text-gradient-cyber">Events & Battles</span>
          </motion.h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ scaleY:0 }} animate={inView?{scaleY:1}:{}} transition={{duration:1.5, ease:'easeInOut'}}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px origin-top hidden md:block"
            style={{ background:'linear-gradient(to bottom,transparent,rgba(0,242,254,0.4) 15%,rgba(0,242,254,0.4) 85%,transparent)' }}
          />

          <div className="flex flex-col gap-10">
            {EVENTS.map((ev, i) => (
              <motion.div
                key={ev.title}
                initial={{ opacity:0, x: ev.side==='left'?-40:40 }}
                animate={inView?{opacity:1,x:0}:{}}
                transition={{ duration:0.7, delay:i*0.15 }}
                className={`relative flex ${ev.side==='right'?'justify-end':''} md:w-1/2 ${
                  ev.side==='right'?'md:ml-auto md:pl-14':'md:pr-14'
                }`}
              >
                {/* Node */}
                <div className="absolute hidden md:block top-6"
                  style={{ [ev.side==='left'?'right':'left']:'-9px' }}>
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-cyber shadow-[0_0_14px_#00F2FE]" />
                    <motion.div
                      animate={{scale:[1,1.8,1],opacity:[0.6,0,0.6]}}
                      transition={{duration:2,repeat:Infinity}}
                      className="absolute inset-[-5px] rounded-full border-2 border-cyber/40"
                    />
                  </div>
                </div>

                {/* Card */}
                <div className="glass-card rounded-3xl p-6 flex gap-5 w-full hover:border-[rgba(0,242,254,0.4)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(0,242,254,0.1)] transition-all duration-300">
                  {/* Date badge */}
                  <div className="flex-shrink-0 w-14 h-[72px] rounded-2xl flex flex-col items-center justify-center gap-0.5 text-white"
                    style={{ background: i%2===0
                      ? 'linear-gradient(135deg,rgba(255,107,53,0.8),rgba(230,81,0,0.6))'
                      : 'linear-gradient(135deg,rgba(0,100,120,0.8),rgba(0,60,80,0.6))',
                      border: i%2===0 ? '1px solid rgba(255,107,53,0.5)' : '1px solid rgba(0,242,254,0.35)' }}>
                    <span className="font-heading text-[0.5rem] tracking-[0.2em] uppercase opacity-80">{ev.month}</span>
                    <span className="font-display text-[1.6rem] font-bold leading-none">{ev.day}</span>
                    <span className="font-heading text-[0.45rem] opacity-60">{ev.year}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-heading text-[0.62rem] tracking-[0.2em] uppercase text-cyber mb-1">{ev.type}</div>
                    <h3 className="font-display text-[0.95rem] font-bold mb-1.5 leading-snug text-white">{ev.title}</h3>
                    <p className="font-body text-[0.75rem] text-copper mb-2">{ev.location}</p>
                    <p className="font-body text-[0.82rem] text-[#C2E0DB] leading-[1.7]">{ev.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

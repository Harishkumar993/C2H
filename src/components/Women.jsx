import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PERKS = [
  'Free enrollment for women',
  'Dedicated women-only batches',
  'Free Silambam kit provided',
  'Monthly self-defense workshops',
  'Certified female instructors',
  'Safe, encouraging environment',
]

export default function Women() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(105deg, rgba(3,10,9,0.58) 0%, rgba(3,10,9,0.40) 100%)',
        borderTop: '1px solid rgba(0,242,254,0.1)',
        borderBottom: '1px solid rgba(0,242,254,0.1)',
      }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <motion.span initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.6}}
              className="inline-block font-heading text-[0.7rem] font-bold tracking-[0.35em] uppercase text-pink-400 border border-pink-400/30 rounded-full px-4 py-1.5 bg-pink-400/05 mb-6">
              Women's Empowerment
            </motion.span>

            <motion.h2 initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7,delay:0.1}}
              className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold leading-[1.25] mb-8">
              She Fights.<br/>She Protects.<br/>
              <span className="text-gradient-copper italic">She Wins.</span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {PERKS.map((p, i) => (
                <motion.div key={p}
                  initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.5,delay:0.2+i*0.08}}
                  className="flex items-center gap-3 font-body text-[0.88rem] text-[#C2E0DB] border-b border-[rgba(255,255,255,0.05)] py-2">
                  <span className="text-green-400 text-[0.9rem]">✅</span>
                  {p}
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:0.7}}
              onClick={() => document.getElementById('join')?.scrollIntoView({behavior:'smooth'})}
              className="inline-flex px-10 py-4 rounded-2xl border border-pink-400/40 bg-pink-400/10 font-heading text-[0.92rem] font-bold tracking-[0.1em] uppercase text-pink-400 hover:bg-pink-400/20 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,105,180,0.3)] transition-all duration-300">
              Register Free Today
            </motion.button>
          </div>

          {/* Animated rings visual */}
          <motion.div
            initial={{opacity:0,scale:0.8}} animate={inView?{opacity:1,scale:1}:{}} transition={{duration:0.8,delay:0.3}}
            className="hidden lg:flex items-center justify-center">
            <div className="relative w-72 h-72 flex items-center justify-center">
              {[160,210,260].map((s, i) => (
                <motion.div key={s}
                  animate={{ rotate: i%2===0 ? 360 : -360 }}
                  transition={{ duration: 10+i*6, repeat:Infinity, ease:'linear' }}
                  className="absolute rounded-full border"
                  style={{ width:s, height:s, borderColor:`rgba(0,242,254,${0.3-i*0.08})` }}
                />
              ))}
              <motion.div
                animate={{ y:[-8,8,-8], scale:[1,1.05,1] }}
                transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
                className="relative z-10 text-center">
                <div className="font-display text-[2rem] font-bold leading-tight text-gradient-cyber"
                  style={{ filter:'drop-shadow(0 0 20px rgba(0,242,254,0.5))' }}>
                  SHE<br/>FIGHTS
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

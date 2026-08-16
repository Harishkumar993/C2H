import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react'

export default function Join() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1800)
  }

  const inputCls = "bg-[rgba(0,242,254,0.04)] border border-[rgba(0,242,254,0.2)] rounded-2xl px-4 py-3.5 font-body text-[0.95rem] text-white placeholder-[#3A5A58] outline-none focus:border-[rgba(0,242,254,0.55)] focus:bg-[rgba(0,242,254,0.07)] focus:shadow-[0_0_0_3px_rgba(0,242,254,0.08)] transition-all"

  return (
    <section id="join" ref={ref} className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(105deg, rgba(3,10,9,0.60) 0%, rgba(3,10,9,0.42) 100%)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse at 50% 40%,rgba(0,242,254,0.04),transparent 60%)' }} />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.span initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} className="section-tag">Begin Your Journey</motion.span>
        <motion.h2 initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.1}}
          className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold mt-3 mb-4">
          Ready to Become a <span className="text-gradient-cyber">Legend?</span>
        </motion.h2>
        <motion.p initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.2}}
          className="font-body text-[#C2E0DB] leading-[1.8] mb-10">
          Join Vellore Yudhakalam today. Basic 3-month training starts every month. Limited seats available.
        </motion.p>

        <motion.div initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.3}}
          className="glass-card rounded-3xl p-8 sm:p-10 text-left">

          {submitted ? (
            <div className="flex flex-col items-center gap-5 py-10">
              <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',damping:12}}>
                <CheckCircle size={64} className="text-cyan-400" style={{ filter:'drop-shadow(0 0 20px rgba(0,242,254,0.8))' }} />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-center text-white">Application Received!</h3>
              <p className="font-body text-[#C2E0DB] text-center">Our team will contact you within 24 hours. Welcome to the warrior family!</p>
              <button onClick={() => setSubmitted(false)} className="btn-ghost mt-2">Submit Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-heading text-[0.72rem] tracking-[0.18em] uppercase text-cyber opacity-80">Full Name</label>
                  <input required type="text" placeholder="Your full name" className={inputCls} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-heading text-[0.72rem] tracking-[0.18em] uppercase text-cyber opacity-80">Mobile Number</label>
                  <input required type="tel" placeholder="+91 XXXXX XXXXX" className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-heading text-[0.72rem] tracking-[0.18em] uppercase text-cyber opacity-80">Age</label>
                  <input required type="number" min="6" max="70" placeholder="Your age" className={inputCls} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-heading text-[0.72rem] tracking-[0.18em] uppercase text-cyber opacity-80">Program</label>
                  <select required className={inputCls + ' appearance-none'}>
                    <option value="">Select program</option>
                    <option>Silambam Foundations (Beginner)</option>
                    <option>Warrior's Path (Intermediate)</option>
                    <option>Champion's Forge (Advanced)</option>
                    <option>Women's Self-Defense</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-heading text-[0.72rem] tracking-[0.18em] uppercase text-cyber opacity-80">Message (Optional)</label>
                <textarea rows={3} placeholder="Tell us about your goals..." className={inputCls + ' resize-none'} />
              </div>
              <button type="submit" disabled={loading}
                className="relative w-full py-5 rounded-2xl font-heading text-[1rem] font-bold tracking-[0.2em] uppercase text-white overflow-hidden transition-all duration-300 disabled:opacity-70"
                style={{ background:'linear-gradient(135deg,#FF6B35,#E65100)', border:'1px solid rgba(255,107,53,0.5)', boxShadow:'0 0 30px rgba(255,107,53,0.4)' }}
                onMouseEnter={e=>e.currentTarget.style.boxShadow='0 15px 40px rgba(255,107,53,0.6),0 0 30px rgba(0,242,254,0.2)'}
                onMouseLeave={e=>e.currentTarget.style.boxShadow='0 0 30px rgba(255,107,53,0.4)'}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </motion.div>

        {/* Contact row */}
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.5}}
          className="flex flex-wrap justify-center gap-8 mt-10">
          {[
            { icon: Phone, text: '+91 98765 43210' },
            { icon: Mail,  text: 'info@vellorekalam.in' },
            { icon: MapPin,text: 'Fort Area, Vellore, TN' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 font-body text-[0.88rem] text-[#C2E0DB]">
              <Icon size={16} className="text-cyber flex-shrink-0" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onDone }) {
  const fillRef = useRef(null)
  const pctRef  = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = 180; canvas.height = 180
    const cx = 90, cy = 90
    let angle = 0, rafId

    function draw() {
      ctx.clearRect(0,0,180,180)
      angle += 0.02
      // Outer rotating cyan dots
      for (let i = 0; i < 8; i++) {
        const a = angle + (i * Math.PI * 2) / 8
        const x = cx + Math.cos(a) * 72
        const y = cy + Math.sin(a) * 72
        const alpha = 0.2 + 0.8 * ((Math.sin(a - angle*2)+1)/2)
        ctx.beginPath()
        ctx.arc(x,y,3.5,0,Math.PI*2)
        ctx.fillStyle = `rgba(0,242,254,${alpha})`
        ctx.shadowBlur = 12; ctx.shadowColor = '#00F2FE'
        ctx.fill(); ctx.shadowBlur = 0
      }
      // Inner copper ring
      for (let i = 0; i < 6; i++) {
        const a = -angle*1.5 + (i*Math.PI*2)/6
        const x = cx + Math.cos(a)*46
        const y = cy + Math.sin(a)*46
        const alpha = 0.15+0.6*((Math.sin(a+angle*3)+1)/2)
        ctx.beginPath()
        ctx.arc(x,y,2.5,0,Math.PI*2)
        ctx.fillStyle = `rgba(255,107,53,${alpha})`
        ctx.fill()
      }
      // Center icon
      ctx.font = 'bold 30px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillStyle = `rgba(0,242,254,${0.7+0.3*Math.sin(angle*3)})`
      ctx.shadowBlur = 18; ctx.shadowColor = '#00F2FE'
      ctx.fillText('⚔', cx, cy); ctx.shadowBlur = 0
      rafId = requestAnimationFrame(draw)
    }
    draw()

    let prog = 0, start = null
    function animProg(ts) {
      if (!start) start = ts
      prog = Math.min((ts - start) / 2000, 1)
      const pct = Math.round(prog * 100)
      if (fillRef.current) fillRef.current.style.width = pct + '%'
      if (pctRef.current) pctRef.current.textContent = pct + '%'
      if (prog < 1) requestAnimationFrame(animProg)
      else setTimeout(() => { cancelAnimationFrame(rafId); onDone() }, 200)
    }
    requestAnimationFrame(animProg)
    return () => cancelAnimationFrame(rafId)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity:1 }} exit={{ opacity:0 }}
      transition={{ duration:0.6 }}
      className="fixed inset-0 z-[10000] bg-[#030A09] flex items-center justify-center flex-col gap-8"
    >
      <canvas ref={canvasRef} className="w-[180px] h-[180px]" />
      <div className="flex flex-col items-center gap-3">
        <div className="font-display text-[0.85rem] tracking-[0.4em] text-cyber uppercase" style={{ textShadow:'0 0 20px rgba(0,242,254,0.5)' }}>Vellore Yudhakalam</div>
        <div className="w-[220px] h-[2px] bg-[rgba(0,242,254,0.1)] rounded-full overflow-hidden">
          <div ref={fillRef} className="h-full bg-gradient-to-r from-[#FF6B35] to-[#00F2FE] rounded-full shadow-[0_0_12px_#00F2FE] preloader-progress" style={{width:'0%'}} />
        </div>
        <div ref={pctRef} className="font-heading text-[0.75rem] text-[#8AB4AE] tracking-[0.2em]">0%</div>
      </div>
    </motion.div>
  )
}

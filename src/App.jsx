import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader  from './components/Preloader'
import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import About      from './components/About'
import Training   from './components/Training'
import Weapons    from './components/Weapons'
import Masters    from './components/Masters'
import Events     from './components/Events'
import Women      from './components/Women'
import Join       from './components/Join'
import Footer     from './components/Footer'

/* Custom cursor */
function Cursor() {
  useEffect(() => {
    const glow = document.getElementById('cursor-glow')
    const dot  = document.getElementById('cursor-dot')
    if (!glow || !dot) return

    let gx = 0, gy = 0, mx = 0, my = 0
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'; dot.style.top = my + 'px'
    }
    document.addEventListener('mousemove', onMove)

    const allHover = () => {
      document.querySelectorAll('a, button, [role=button]').forEach(el => {
        el.addEventListener('mouseenter', () => dot.classList.add('big'))
        el.addEventListener('mouseleave', () => dot.classList.remove('big'))
      })
    }
    allHover()

    let raf
    const loop = () => {
      gx += (mx - gx) * 0.08
      gy += (my - gy) * 0.08
      glow.style.left = gx + 'px'; glow.style.top = gy + 'px'
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])
  return null
}

import BackgroundVideo from './components/BackgroundVideo'

export default function App() {
  const [ready, setReady] = useState(false)
  const handleDone = useCallback(() => setReady(true), [])

  return (
    <>
      {/* Custom cursor elements */}
      <div id="cursor-glow" />
      <div id="cursor-dot" />
      <Cursor />

      {/* Preloader */}
      <AnimatePresence>{!ready && <Preloader onDone={handleDone} />}</AnimatePresence>

      {/* Persistent Background Video */}
      {ready && <BackgroundVideo />}

      {/* Main site */}
      {ready && (
        <div className="relative z-10">
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <About />
            <Training />
            <Weapons />
            <Masters />
            <Events />
            <Women />
            <Join />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}

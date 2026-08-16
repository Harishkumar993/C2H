import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#about',    label: 'About'    },
  { href: '#training', label: 'Training' },
  { href: '#weapons',  label: 'Weapons'  },
  { href: '#masters',  label: 'Masters'  },
  { href: '#events',   label: 'Events'   },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [progress,  setProgress]  = useState(0)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeSection, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const sy  = window.scrollY
      const dh  = document.body.scrollHeight - window.innerHeight
      setScrolled(sy > 50)
      setProgress((sy / dh) * 100)

      // Active section highlight
      const sections = links.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top < 160) {
          setActive(sections[i]); break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-[rgba(3,10,9,0.88)] backdrop-blur-2xl shadow-[0_1px_0_rgba(0,242,254,0.15),0_8px_32px_rgba(0,0,0,0.6)]'
            : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-[76px]">
          {/* Logo */}
          <a onClick={() => handleNav('#hero')} className="flex items-center gap-3 cursor-pointer group">
            <span className="text-3xl animate-pulse" style={{ filter: 'drop-shadow(0 0 12px #00F2FE)' }}>⚔</span>
            <div className="font-heading leading-tight">
              <div className="text-[0.8rem] font-bold tracking-[0.2em] text-cyber uppercase">Vellore</div>
              <div className="text-[0.65rem] font-medium tracking-[0.25em] text-[#8AB4AE] uppercase">Yudhakalam</div>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-2">
            {links.map(({ href, label }) => (
              <li key={href}>
                <button
                  onClick={() => handleNav(href)}
                  className={`relative font-heading text-[0.85rem] font-semibold tracking-[0.14em] uppercase px-4 py-2 rounded-xl transition-colors duration-300 ${
                    activeSection === href.slice(1)
                      ? 'text-cyber'
                      : 'text-[#8AB4AE] hover:text-cyber'
                  }`}
                >
                  {label}
                  {activeSection === href.slice(1) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3/5 h-[2px] bg-gradient-to-r from-transparent via-[#00F2FE] to-transparent shadow-[0_0_8px_#00F2FE]"
                    />
                  )}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleNav('#join')}
                className="btn-primary ml-4 text-[0.82rem] py-[10px] px-6"
              >
                Join Now
              </button>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-[rgba(0,242,254,0.2)] text-[#8AB4AE] hover:text-cyber hover:border-cyber transition-all"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-copper to-cyber shadow-[0_0_10px_#00F2FE] transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[rgba(3,10,9,0.98)] backdrop-blur-3xl flex flex-col items-center justify-center gap-8"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full border border-[rgba(0,242,254,0.25)] flex items-center justify-center text-[#8AB4AE] hover:text-cyber hover:border-cyber transition-all"
            >
              <X size={20} />
            </button>
            <ul className="flex flex-col items-center gap-7">
              {[...links, { href: '#join', label: 'Join Now' }].map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <button
                    onClick={() => handleNav(href)}
                    className="font-display text-2xl tracking-[0.1em] text-[#8AB4AE] hover:text-cyber transition-colors"
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

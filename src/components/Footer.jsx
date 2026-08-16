const LINKS = [
  { href:'#about',    label:'About Us'         },
  { href:'#training', label:'Training Programs' },
  { href:'#weapons',  label:'Weapon Arts'       },
  { href:'#masters',  label:'Our Masters'       },
  { href:'#events',   label:'Events'            },
]

export default function Footer() {
  const nav = (href) => { document.querySelector(href)?.scrollIntoView({ behavior:'smooth' }) }

  return (
    <footer className="relative pt-20 pb-0 overflow-hidden"
      style={{ background:'rgba(2,6,5,0.97)', borderTop:'1px solid rgba(0,242,254,0.12)' }}>
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-px"
        style={{ background:'linear-gradient(90deg,transparent,#00F2FE,transparent)', boxShadow:'0 0 25px rgba(0,242,254,0.4)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl" style={{filter:'drop-shadow(0 0 10px #00F2FE)'}}>⚔</span>
              <div className="font-heading leading-tight">
                <div className="text-[0.8rem] font-bold tracking-[0.2em] text-cyber uppercase">Vellore</div>
                <div className="text-[0.65rem] font-medium tracking-[0.25em] text-[#8AB4AE] uppercase">Yudhakalam</div>
              </div>
            </div>
            <p className="font-body text-[0.87rem] text-[#C2E0DB] leading-[1.8] mb-6 max-w-sm">
              Preserving the ancient Tamil warrior tradition. Forging champions for the modern world from the historic city of Vellore.
            </p>
            <div className="flex gap-3">
              {['f','in','▶'].map(s => (
                <a key={s} href="#" className="w-10 h-10 rounded-full border border-[rgba(0,242,254,0.2)] flex items-center justify-center font-heading text-[0.75rem] font-bold text-[#8AB4AE] hover:text-cyber hover:border-cyber hover:shadow-[0_0_16px_rgba(0,242,254,0.25)] transition-all">{s}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-[0.82rem] font-bold tracking-[0.1em] uppercase text-cyber mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {LINKS.map(({ href, label }) => (
                <li key={href}>
                  <button onClick={() => nav(href)} className="font-body text-[0.87rem] text-[#C2E0DB] hover:text-cyber hover:pl-1.5 transition-all duration-300">{label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-[0.82rem] font-bold tracking-[0.1em] uppercase text-cyber mb-5">Contact</h4>
            <div className="flex flex-col gap-3 font-body text-[0.87rem] text-[#C2E0DB]">
              <p>📍 Fort Area, Vellore,<br/>Tamil Nadu – 632 001</p>
              <p>📞 +91 98765 43210</p>
              <p>📧 info@vellorekalam.in</p>
              <p>🕗 Mon–Sat: 6AM–9AM, 6PM–9PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(0,242,254,0.08)] py-6 text-center font-body text-[0.82rem] text-[#8AB4AE]">
          © 2026 Vellore Yudhakalam. All rights reserved. | Developed by <strong className="text-cyber">CyberCodersHub</strong>
        </div>
      </div>
    </footer>
  )
}

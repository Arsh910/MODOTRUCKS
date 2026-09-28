import { useEffect, useRef, useState } from 'react'
import { Logo } from '../ui/Logo.jsx'
import { NAV_LINKS, AD_LINK, BOOK_LINK } from '../../config/site.js'

export function Nav({ path }) {
  const [open, setOpen] = useState(false)
  const pill = useRef(null)
  useEffect(() => setOpen(false), [path])

  // while the phone menu is open: a tap outside it, or Esc, closes it
  useEffect(() => {
    if (!open) return
    const outside = e => { if (!pill.current.contains(e.target)) setOpen(false) }
    const esc = e => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', esc) }
  }, [open])

  return (
    <header className={`nav ${open ? 'open' : ''}`}>
      <div className="pill" ref={pill}>
        <a href="/" className="nav-logo" aria-label="MODO Visuals home"><Logo compact /></a>
        {/* any link closes the menu, even one to the page you're already on */}
        <nav className="nav-links" onClick={e => e.target.closest('a') && setOpen(false)}>
          {NAV_LINKS.map(([h, t]) => <a key={h} href={h} aria-current={path.startsWith(h) ? 'page' : undefined}>{t}</a>)}
          <a href={AD_LINK} className="nav-ad-menu">Don’t have an ad?</a>
        </nav>
        <a href={AD_LINK} className="nav-ghost">Don’t have an ad?</a>
        <a href={BOOK_LINK} className="nav-btn">Book Now</a>
        <button className="nav-menu" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}><i /><i /></button>
      </div>
    </header>
  )
}

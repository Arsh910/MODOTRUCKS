import { useEffect, useState } from 'react'
import { Logo } from '../ui/Logo.jsx'
import { Talk } from '../mc/Blocks.jsx'
import { NAV_LINKS } from '../../config/site.js'

// Logo, page links, "Let's talk". Slides away while scrolling down, comes back on the way up.
export function Nav({ path }) {
  const [away, setAway] = useState(false)
  useEffect(() => {
    let last = scrollY
    const onScroll = () => { const y = scrollY; setAway(y > 200 && y > last); last = y }
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setAway(false), [path])
  return (
    <header className={`nav ${away ? 'away' : ''}`}>
      <div className="wrap nav-in">
        <a href="/" className="nav-logo" aria-label="MODO Visuals home"><Logo compact /></a>
        <nav className="nav-links">
          {NAV_LINKS.map(([h, t]) => <a key={h} href={h} aria-current={path.startsWith(h) ? 'page' : undefined}>{t}</a>)}
        </nav>
        <Talk />
      </div>
    </header>
  )
}

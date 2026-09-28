import { useEffect, useState } from 'react'
import { Logo } from './art.jsx'
import Hero from './hero/Hero.jsx'
import { PLANS, PlanPage } from './plans.jsx'
import { ScreenPage, HowPage, PlansPage, RoutesPage, ContactPage, NextLinks, PAGES } from './pages.jsx'

const PHONE = '+91 90560 05271'
const LINKS = [...PAGES.map(([h, t]) => [h, t]), ['/contact', 'Contact']]
const ROUTES = { '/screen': ScreenPage, '/how-it-works': HowPage, '/plans': PlansPage, '/routes': RoutesPage, '/contact': ContactPage }

// Fade elements with data-reveal in the first time they scroll into view (re-run per page).
function useReveal(path) {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.dataset.in = '' /* an attribute, not a class: React rewrites className on re-render */; io.unobserve(e.target) } }), { rootMargin: '0px 0px -8% 0px' })
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [path])
}

// Tiny router: same-origin links change the page without a reload.
function usePath() {
  const [path, setPath] = useState(location.pathname)
  useEffect(() => {
    const onClick = e => {
      const a = e.target.closest('a[href]')
      if (!a || a.target || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const u = new URL(a.href)
      if (u.origin !== location.origin) return
      e.preventDefault()
      if (u.pathname === location.pathname) {
        if (u.hash) { history.replaceState(null, '', u.hash); document.querySelector(u.hash)?.scrollIntoView({ behavior: 'smooth' }) }
        return
      }
      history.pushState(null, '', u.pathname + u.hash)
      setPath(u.pathname)
    }
    const onPop = () => setPath(location.pathname)
    document.addEventListener('click', onClick); addEventListener('popstate', onPop)
    return () => { document.removeEventListener('click', onClick); removeEventListener('popstate', onPop) }
  }, [])
  // new page: jump to its #section if the link had one, else to the top
  useEffect(() => { const el = location.hash && document.querySelector(location.hash); el ? el.scrollIntoView() : scrollTo(0, 0) }, [path])
  return path
}

const FACTS = [['5 hrs', 'a day on the phone'], ['51%', 'of ad spend is digital'], ['14.27 lakh', 'vehicles in Chandigarh'], ['104', 'new vehicles a day']]
const CARDS = [
  { img: '/img/seen-cars.jpg', t: 'Seen live, not scrolled past', d: 'The truck drives past people waiting at signals and stuck in traffic.' },
  { img: '/img/route-avenue.jpg', t: 'You pick the route', d: 'Tell us the sectors and markets that matter, and we plan the day around them.' },
  { img: '/img/proof-night.jpg', t: 'Proof after every run', d: 'GPS log, photos and video of your ad on the road after every booking.' },
]

function Nav({ path }) {
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [path])
  return (
    <header className={`nav ${open ? 'open' : ''}`}>
      <div className="pill">
        <a href="/" className="nav-logo" aria-label="MODO Visuals home"><Logo compact /></a>
        <nav className="nav-links">{LINKS.map(([h, t]) => <a key={h} href={h} aria-current={path.startsWith(h) ? 'page' : undefined}>{t}</a>)}</nav>
        <a href="/contact" className="nav-btn">Book Now</a>
        <button className="nav-menu" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}><i /><i /></button>
      </div>
    </header>
  )
}

function Home() {
  const [card, setCard] = useState(1)
  return (
    <>
      <Hero />
      <section className="warm intro">
        <div className="wrap">
          <h2 className="center" data-reveal>Imagine your brand on the one screen nobody can scroll past, at every signal in the Tricity.</h2>
          <div className="tiles">
            {FACTS.map(([v, l], i) => <div key={v} className="tile" data-reveal style={{ '--d': i }}><b>{v}</b><span>{l}</span></div>)}
          </div>
          <div className="two-col">
            <h2 data-reveal>We put your brand in front of every car at every stop.</h2>
            <p data-reveal>A seamless L-shaped 3D LED screen on a truck, driving your ad along the route you pick, seen live by people with nothing to scroll and nothing to skip.</p>
          </div>
          <div className="cards">
            {CARDS.map((c, i) => (
              <article key={c.t} className={`card ${card === i ? 'on' : ''}`} onMouseEnter={() => setCard(i)} onClick={() => setCard(i)} data-reveal style={{ '--d': i }}>
                <img src={c.img} alt="" loading="lazy" />
                <div><h3>{c.t}</h3><p>{c.d}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="quote">
        <img src="/img/bg-expressway.jpg" alt="" loading="lazy" />
        <blockquote data-reveal>
          <p>“Nobody scrolls past a truck. At a red light, your ad is the most interesting thing on the road.”</p>
          <footer><b>MODO Visuals</b><span>Screen Truck, Tricity</span></footer>
        </blockquote>
      </section>
      <NextLinks title="Everything about the truck" />
    </>
  )
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <Logo compact className="foot-logo" />
            <p className="foot-line">Your customers are on the road. Reaching them isn’t hard. Talk to the MODO team anytime.</p>
            <a className="orange-btn" href="tel:+919056005271">Call {PHONE}</a>
          </div>
          <nav className="foot-links">
            {LINKS.map(([h, t]) => <a key={h} href={h}>{t}</a>)}
            {Object.entries(PLANS).map(([k, p]) => <a key={k} href={`/plans/${k}`}>{p.name}</a>)}
            <a href="mailto:modovisuals@gmail.com">modovisuals@gmail.com</a>
          </nav>
        </div>
        <p className="foot-base">© {new Date().getFullYear()} MODO Visuals. 3rd Floor, D-231, Phase 8B, Sector 91, Mohali.</p>
        <p className="foot-credits">Photos: <a href="https://commons.wikimedia.org/wiki/File:City_Traffic_(239845887).jpeg">City Traffic</a>, Timur Venkov, CC BY · <a href="https://commons.wikimedia.org/wiki/File:Sunset_view_at_Sukhna_lake_Chandigarh,_India.JPG">Sukhna Lake</a>, Harvinder Chandigarh, CC BY-SA · <a href="https://commons.wikimedia.org/wiki/File:Himalayan_Expressway,_Village_Tipra,_Panchkula,_Haryana.jpeg">Himalayan Expressway</a>, Manojkhurana, CC BY-SA · others via Unsplash.</p>
      </div>
    </footer>
  )
}

export default function App() {
  const path = usePath().replace(/\/+$/, '') || '/'
  useReveal(path)
  const plan = path.match(/^\/plans\/(\w+)$/)?.[1]
  const Page = ROUTES[path] || Home
  useEffect(() => {
    const name = PLANS[plan]?.name || LINKS.find(([h]) => h === path)?.[1]
    document.title = name ? `${name} | MODO Screen Truck` : 'MODO Screen Truck | LED advertising truck in the Tricity'
  }, [path, plan])
  return (
    <>
      <Nav path={path} />
      <main key={path}>{PLANS[plan] ? <PlanPage id={plan} /> : <Page />}</main>
      <Footer />
    </>
  )
}

import { Logo } from '../ui/Logo.jsx'
import { NAV_LINKS, PHONE, PHONE_HREF, EMAIL, ADDRESS, BOOK_LINK } from '../../config/site.js'
import { PLANS } from '../../data/plans.js'
import { ScrollText } from '../motion/ScrollText.jsx'

export function Footer() {
  return (
    <footer className="foot">
      {/* closing line, then the links in columns */}
      <div className="wrap closing">
        <ScrollText as="h2" className="statement" text="Your customers are on the road. Reaching them isn’t hard." />
        <div className="closing-row" data-reveal>
          <p>Talk to the MODO team anytime</p>
          <div className="btns"><a className="orange-btn" href={BOOK_LINK}>Book Now</a><a className="box-btn" href={PHONE_HREF}>Call {PHONE}</a></div>
        </div>
      </div>
      <div className="wrap foot-grid">
        <Logo compact className="foot-logo" />
        <nav className="foot-links">{NAV_LINKS.map(([h, t]) => <a key={h} href={h}>{t}</a>)}</nav>
        <nav className="foot-links">{Object.entries(PLANS).map(([k, p]) => <a key={k} href={`/plans/${k}`}>{p.name}</a>)}</nav>
        <div className="foot-links"><a href={`mailto:${EMAIL}`}>{EMAIL}</a><a href={PHONE_HREF}>{PHONE}</a><span>{ADDRESS}</span></div>
      </div>
      <div className="wrap">
        <p className="foot-base">© {new Date().getFullYear()} MODO Visuals</p>
        <p className="foot-credits">Photos: <a href="https://commons.wikimedia.org/wiki/File:City_Traffic_(239845887).jpeg">City Traffic</a>, Timur Venkov, CC BY · <a href="https://commons.wikimedia.org/wiki/File:Sunset_view_at_Sukhna_lake_Chandigarh,_India.JPG">Sukhna Lake</a>, Harvinder Chandigarh, CC BY-SA · <a href="https://commons.wikimedia.org/wiki/File:Himalayan_Expressway,_Village_Tipra,_Panchkula,_Haryana.jpeg">Himalayan Expressway</a>, Manojkhurana, CC BY-SA · others via Unsplash.</p>
      </div>
    </footer>
  )
}

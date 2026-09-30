import { NAV_LINKS, PHONE, PHONE_HREF, EMAIL, ADDRESS } from '../../config/site.js'
import { PLANS } from '../../data/plans.js'

// Lime footer: a line to call us, the links, the giant wordmark.
export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <h2 data-reveal>We’d love to hear from you.</h2>
          <a className="foot-mail" href={PHONE_HREF} data-reveal>{PHONE}<i aria-hidden="true">→</i></a>
        </div>
        <nav className="foot-links">
          {NAV_LINKS.map(([h, t]) => <a key={h} href={h}>{t}</a>)}
          {Object.entries(PLANS).map(([k, p]) => <a key={k} href={`/plans/${k}`}>{p.name}</a>)}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </nav>
        <span className="wordmark foot-mark" aria-hidden="true">MODO VISUALS</span>
        <div className="foot-base">
          <span>© {new Date().getFullYear()} MODO Visuals</span>
          <span>{ADDRESS}</span>
          <span>Chandigarh, Mohali, Zirakpur, Panchkula &amp; beyond.</span>
        </div>
        <p className="foot-credits">Photos: <a href="https://commons.wikimedia.org/wiki/File:City_Traffic_(239845887).jpeg">City Traffic</a>, Timur Venkov, CC BY · <a href="https://commons.wikimedia.org/wiki/File:Sunset_view_at_Sukhna_lake_Chandigarh,_India.JPG">Sukhna Lake</a>, Harvinder Chandigarh, CC BY-SA · <a href="https://commons.wikimedia.org/wiki/File:Himalayan_Expressway,_Village_Tipra,_Panchkula,_Haryana.jpeg">Himalayan Expressway</a>, Manojkhurana, CC BY-SA · others via Unsplash.</p>
        <p style={{ height: 24 }} />
      </div>
    </footer>
  )
}

import { Logo } from '../ui/Logo.jsx'
import { NAV_LINKS, PHONE, PHONE_HREF, EMAIL, ADDRESS } from '../../config/site.js'
import { PLANS } from '../../data/plans.js'

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <Logo compact className="foot-logo" />
            <p className="foot-line">Your customers are on the road. Reaching them isn’t hard. Talk to the MODO team anytime.</p>
            <a className="orange-btn" href={PHONE_HREF}>Call {PHONE}</a>
          </div>
          <nav className="foot-links">
            {NAV_LINKS.map(([h, t]) => <a key={h} href={h}>{t}</a>)}
            {Object.entries(PLANS).map(([k, p]) => <a key={k} href={`/plans/${k}`}>{p.name}</a>)}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </nav>
        </div>
        <p className="foot-base">© {new Date().getFullYear()} MODO Visuals. {ADDRESS}.</p>
        <p className="foot-credits">Photos: <a href="https://commons.wikimedia.org/wiki/File:City_Traffic_(239845887).jpeg">City Traffic</a>, Timur Venkov, CC BY · <a href="https://commons.wikimedia.org/wiki/File:Sunset_view_at_Sukhna_lake_Chandigarh,_India.JPG">Sukhna Lake</a>, Harvinder Chandigarh, CC BY-SA · <a href="https://commons.wikimedia.org/wiki/File:Himalayan_Expressway,_Village_Tipra,_Panchkula,_Haryana.jpeg">Himalayan Expressway</a>, Manojkhurana, CC BY-SA · others via Unsplash.</p>
      </div>
    </footer>
  )
}

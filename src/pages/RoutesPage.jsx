import { PageHero } from '../components/ui/PageHero.jsx'
import { NextLinks } from '../components/explore/NextLinks.jsx'
import { AreaMap } from '../components/routes/AreaMap.jsx'
import { ROUTE_NOTES } from '../data/routes.js'

export default function RoutesPage() {
  return (
    <>
      <PageHero img="/img/bg-sukhna.jpg" label="Routes" title="Seen across every sector of the Tricity." lead="Chandigarh, Mohali, Zirakpur and Panchkula. Tell us the areas that matter and we plan the route with you." />
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title" data-reveal>Popular areas</h2>
            <p data-reveal>These are the spots brands ask for most. Anywhere else in the Tricity works too.</p>
          </div>
          <AreaMap />
        </div>
      </section>
      <section className="sec tight">
        <div className="wrap">
          <div className="sec-head"><h2 className="sec-title" data-reveal>How the route is planned</h2></div>
          <div className="ncards stack" style={{ '--n': 3 }}>
            {ROUTE_NOTES.map(([h, p], i) => (
              <div key={h} className="ncard" data-reveal style={{ '--d': i }}>
                <span className="dot-label">{h}</span>
                <div className="ncard-mid"><h3>{p}</h3></div>
                <small>{String(i + 1).padStart(2, '0')}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
      <NextLinks skip="/routes" />
    </>
  )
}

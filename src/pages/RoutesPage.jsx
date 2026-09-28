import { PageHero } from '../components/ui/PageHero.jsx'
import { NextLinks } from '../components/explore/NextLinks.jsx'
import { AreaMap } from '../components/routes/AreaMap.jsx'
import { ROUTE_NOTES } from '../data/routes.js'

export default function RoutesPage() {
  return (
    <>
      <PageHero img="/img/bg-sukhna.jpg" label="Routes" title="Seen across every sector of the Tricity." lead="Chandigarh, Mohali, Zirakpur and Panchkula. Tell us the areas that matter and we plan the route with you." />
      <section className="warm page-sec">
        <div className="wrap">
          <div className="two-col first">
            <h2 data-reveal>Popular areas</h2>
            <p data-reveal>These are the spots brands ask for most. Anywhere else in the Tricity works too.</p>
          </div>
          <AreaMap />
        </div>
      </section>
      <section className="brown value">
        <div className="wrap">
          <h2 data-reveal>How the route is planned</h2>
          <ul className="route-notes">{ROUTE_NOTES.map(([h, p], i) => <li key={h} data-reveal style={{ '--d': i }}><h3>{h}</h3><p>{p}</p></li>)}</ul>
        </div>
      </section>
      <NextLinks skip="/routes" />
    </>
  )
}

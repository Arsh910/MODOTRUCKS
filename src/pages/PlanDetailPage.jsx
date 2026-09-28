import { PlanHero } from '../components/plans/PlanHero.jsx'
import { PlanDiagram } from '../components/plans/PlanDiagram.jsx'
import { PlanCards } from '../components/plans/PlanCards.jsx'
import { PLANS } from '../data/plans.js'

// One page per plan: /plans/whole, /plans/shared, /plans/event
export default function PlanDetailPage({ id }) {
  const p = PLANS[id]
  const others = Object.entries(PLANS).filter(([k]) => k !== id)
  return (
    <>
      <PlanHero id={id} plan={p} />

      <section className="warm plan-what">
        <div className="wrap">
          <div className="two-col">
            <h2 data-reveal>{p.what[0]}</h2>
            <p data-reveal>{p.what[1]}</p>
          </div>
          <div data-reveal><PlanDiagram id={id} /></div>
          <div className="gallery">
            {p.gallery.map(([src, t, d], i) => (
              <figure key={t} data-reveal style={{ '--d': i }}>
                <img src={src} alt="" loading="lazy" />
                <figcaption><b>{t}</b><span>{d}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="brown plan-details">
        <div className="wrap">
          <h2 data-reveal>The details</h2>
          <dl>{p.details.map(([k, v], i) => <div key={k} data-reveal style={{ '--d': i % 2 }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          <div className="plan-faq">
            {p.faq.map(([q, a]) => <details key={q} data-reveal><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="warm cta">
        <div className="wrap">
          <h2 className="center" data-reveal>Other ways to use the screen</h2>
          <PlanCards items={others} />
        </div>
      </section>
    </>
  )
}

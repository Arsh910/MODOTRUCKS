import { CREATIVE, AD_PERKS } from '../../data/how.js'
import './ad-options.css'

// "Your ad: bring it, or we make it": the three options as panels (a swipe row on phones), then four small cards.
// The "Don't have an ad?" buttons link here (#your-ad).
export function AdOptions() {
  return (
    <section className="sec ao" id="your-ad">
      <div className="wrap sec-head">
        <h2 className="sec-title" data-reveal>Your ad: bring it, or we make it</h2>
      </div>
      <p className="swipe-hint">Swipe</p>
      <ol className="panels ao-panels" style={{ '--n': 3 }}>
        {CREATIVE.map((c, i) => (
          <li key={c.t} className="panel" data-reveal style={{ '--d': i }}>
            <span className="dot-label">{c.card.tag}</span>
            <div className="panel-art">
              <ul className="rows ao-rows">
                {c.card.rows.map(([k, v]) => <li key={k}><b>{k}</b><span>{v}</span></li>)}
              </ul>
            </div>
            <div className="panel-bar"><div><small>{String(i + 1).padStart(2, '0')}</small><b>{c.t}</b></div></div>
            <p className="ao-d">{c.d}</p>
          </li>
        ))}
      </ol>
      <div className="wrap">
        <ul className="ncards short ao-perks" style={{ '--n': 4 }}>
          {AD_PERKS.map(([t, d], i) => (
            <li key={t} className="ncard" data-reveal style={{ '--d': i }}>
              <span className="dot-label">Included</span>
              <div className="ncard-mid"><h3>{t}</h3><p>{d}</p></div>
              <small>{String(i + 1).padStart(2, '0')}</small>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

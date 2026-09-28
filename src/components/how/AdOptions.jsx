import { CREATIVE, AD_PERKS } from '../../data/how.js'
import './ad-options.css'

const Icon = ({ d }) => <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>

// "Your ad: bring it, or we make it". The "Don't have an ad?" buttons link here (#your-ad).
// Desktop: photo with a floating card; hovering an option swaps the card. Phones: every option shows its details inline.
// "Your ad: bring it, or we make it" as three stepped discs, each fed by a bar from the left.
// The "Don't have an ad?" buttons link here (#your-ad).
const TONES = ['#E8622C', '#C9562A', '#8E3F22'] // the three logo rings

export function AdOptions() {
  return (
    <section className="warm ao" id="your-ad">
      <div className="wrap">
        <h2 className="ao-title" data-reveal>Your ad: bring it, or we make it</h2>
        <ol className="ao-steps">
          {CREATIVE.map((c, i) => (
            <li key={c.t} className={i === 1 ? 'shift' : ''} style={{ '--c': TONES[i], '--d': i }} data-reveal>
              <span className="ao-bar" aria-hidden="true" />
              <span className="ao-disc" aria-hidden="true"><span className="ao-ring" /><i><Icon d={c.icon} /></i></span>
              <b className="ao-num">{i + 1}</b>
              <div className="ao-txt">
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                <p className="ao-pills">{c.card.rows.map(([k, v]) => <em key={k}>{k}{v !== '✓' && <> · <strong>{v}</strong></>}</em>)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="ao-perks-band">
        <ul className="wrap ao-perks">
          {AD_PERKS.map(([t, d, icon], i) => (
            <li key={t} data-reveal style={{ '--d': i }}>
              <i><Icon d={icon} /></i>
              <span><b>{t}</b><small>{d}</small></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

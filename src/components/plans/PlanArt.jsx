import './plans.css'

// Small drawings of how each plan uses the screen, built from the site's own UI pieces.
function WholeArt() {
  return (
    <div className="ps-art">
      <div className="ps-screen"><b>YOUR BRAND</b><span>Only your ad, all shift</span></div>
      <div className="ps-shift">
        <span>8 AM</span>
        <i><em>Nonstop</em></i>
        <span>1 PM</span>
      </div>
    </div>
  )
}

function SharedArt() {
  const rows = [['Your brand', 'Plays 30–60 s, then again', '#E8622C'], ['Brand 2', 'Next in the loop', '#1E4FD8'], ['Brand 3', 'Then this one', '#FFC531']]
  return (
    <div className="ps-art">
      <div className="ps-rows">
        {rows.map(([t, d, c], i) => (
          <div key={t} className="ps-row" style={{ '--i': i }}>
            <i style={{ background: c }} />
            <div><b>{t}</b><span>{d}</span></div>
            <em aria-hidden="true">›</em>
          </div>
        ))}
      </div>
      <div className="ps-pips" aria-label="3 of 6 brands joined">
        {[1, 1, 1, 0, 0, 0].map((on, i) => <i key={i} className={on ? 'on' : ''} />)}
        <span>3 of 6 joined, the shift goes ahead</span>
      </div>
    </div>
  )
}

function EventArt() {
  return (
    <div className="ps-art">
      <div className="ps-chart">
        {[['4 h', .4], ['8 h', .8], ['10 h', 1]].map(([l, h], i) => (
          <div key={l} className={i === 1 ? 'ps-bar pick' : 'ps-bar'} style={{ '--h': h }}>
            {i === 1 && <em>8 hours</em>}
            <i /><span>{l}</span>
          </div>
        ))}
      </div>
      <p className="ps-chip">+ Live filming on the screen</p>
    </div>
  )
}

// Drawing for each plan, by id.
export const PLAN_ART = { whole: WholeArt, shared: SharedArt, event: EventArt }

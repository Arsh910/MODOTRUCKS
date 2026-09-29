import { BOOK_LINK } from '../../config/site.js'
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

const CARDS = [
  { id: 'whole', t: 'Whole screen', d: 'Your ad is the only thing on screen, nonstop, on the route you pick.', from: 'From one shift', Art: WholeArt },
  { id: 'shared', t: 'Share the screen', d: 'Up to six brands take turns on one loop. The most affordable way to start.', from: 'Reserve free', Art: SharedArt },
  { id: 'event', t: 'Parked at your event', d: 'Openings, weddings and exhibitions, with the screen on at your venue.', from: '4, 8 or 10 hours', Art: EventArt },
]

// The three plans as panels (a swipe row on phones): drawing in the middle, name + Learn more | Book at the bottom.
export function PlanCarousel({ title = 'Then pick your plan' }) {
  return (
    <section className="sec ps-cards" id="plans">
      <div className="wrap sec-head"><h2 className="sec-title" data-reveal>{title}</h2></div>
      <p className="swipe-hint">Swipe</p>
      <div className="panels" style={{ '--n': 3 }}>
        {CARDS.map(({ id, t, d, from, Art }, i) => (
          <article key={id} className="panel ps-card" data-reveal style={{ '--d': i }}>
            <span className="dot-label">{d}</span>
            <div className="panel-art"><Art /></div>
            <div className="panel-bar">
              <div><small>{t}</small><b>{from}</b></div>
              <div className="btns">
                <a className="box-btn" href={`/plans/${id}`}>Learn more</a>
                <a className="orange-btn" href={BOOK_LINK}>Book</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

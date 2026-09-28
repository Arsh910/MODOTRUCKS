import { useEffect, useRef, useState } from 'react'
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
  { id: 'whole', t: 'Whole screen', d: 'Your ad is the only thing on screen, nonstop, on the route you pick.', Art: WholeArt },
  { id: 'shared', t: 'Share the screen', d: 'Up to six brands take turns on one loop. The most affordable way to start.', Art: SharedArt },
  { id: 'event', t: 'Parked at your event', d: 'Openings, weddings and exhibitions, with the screen on at your venue.', Art: EventArt },
]

// On phones the cards are a swipe carousel that curves: each card tilts and drops by how far it is
// from the centre, so they travel along an arc. Native scroll does the swiping; we only set --o per card.
function useArcCarousel(ref) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const track = ref.current, mq = matchMedia('(max-width: 640px)')
    let raf = 0
    const update = () => {
      raf = 0
      const mid = track.scrollLeft + track.clientWidth / 2
      let best = 0, bestDist = Infinity
      ;[...track.children].forEach((card, i) => {
        const o = (card.offsetLeft + card.offsetWidth / 2 - mid) / card.offsetWidth
        card.style.setProperty('--o', mq.matches ? o.toFixed(3) : 0)
        card.style.setProperty('--a', mq.matches ? Math.min(1, Math.abs(o)).toFixed(3) : 0) // 0 at centre, 1 one card away
        if (Math.abs(o) < bestDist) { bestDist = Math.abs(o); best = i }
      })
      setActive(best)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    track.addEventListener('scroll', onScroll, { passive: true })
    mq.addEventListener('change', update)
    addEventListener('resize', onScroll)
    return () => { track.removeEventListener('scroll', onScroll); mq.removeEventListener('change', update); removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [ref])
  const go = i => { const c = ref.current.children[i]; ref.current.scrollTo({ left: c.offsetLeft - (ref.current.clientWidth - c.offsetWidth) / 2, behavior: 'smooth' }) }
  return [active, go]
}

// The three plan cards.
export function PlanCarousel() {
  const track = useRef(null)
  const [active, go] = useArcCarousel(track)
  return (
    <section className="warm ps ps-cards" id="plans">
      <div className="wrap">
        <p className="ps-step" data-reveal>Then pick your plan</p>
      </div>
      <div className="ps-track" ref={track}>
        {CARDS.map(({ id, t, d, Art }, i) => (
          // the slot snaps and is measured; only the card inside tilts (a tilted snap target would snap off-centre)
          <div key={id} className="ps-slot">
            <a href={`/plans/${id}`} className="ps-card" data-reveal style={{ '--d': i }}>
              <h3>{t}</h3>
              <p>{d}</p>
              <Art />
              <span className="ps-more">View plan <span aria-hidden="true">→</span></span>
            </a>
          </div>
        ))}
      </div>
      <div className="ps-dots" role="tablist" aria-label="Plans">
        {CARDS.map((c, i) => <button key={c.id} role="tab" aria-selected={i === active} aria-label={c.t} onClick={() => go(i)} />)}
      </div>
    </section>
  )
}

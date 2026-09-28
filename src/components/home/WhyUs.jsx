import { useEffect, useRef, useState } from 'react'
import { REASONS } from '../../data/whyUs.js'
import { BOOK_LINK } from '../../config/site.js'
import './why-us.css'

// Why us: reasons on either side of one picture. Hover or tap a reason and the picture
// swaps to it, with the longer explanation laid over it. On its own it cycles through them,
// pausing while the pointer is over the reasons.

function Reason({ r, i, on, pick }) {
  return (
    <button type="button" className={`wu-reason ${on ? 'on' : ''}`} aria-pressed={on}
      onMouseEnter={() => pick(i)} onClick={() => pick(i)} data-reveal style={{ '--d': i % 3 }}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d={r.icon} /></svg>
      <h3>{r.t}</h3>
      <p>{r.s}</p>
    </button>
  )
}

export function WhyUs() {
  const [on, setOn] = useState(0)
  const pic = useRef(null)
  const held = useRef(false)
  // next reason every few seconds; any change (auto or picked) restarts the wait
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => { if (!held.current && !document.hidden) setOn(x => (x + 1) % REASONS.length) }, 4500)
    return () => clearInterval(t)
  }, [on])
  // on a phone the picture sits above the list; if a tap happens with it off-screen, bring it back
  const pick = i => {
    setOn(i)
    const r = pic.current.getBoundingClientRect()
    if (r.top < 60) pic.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const side = list => list.map(i => <Reason key={i} r={REASONS[i]} i={i} on={on === i} pick={pick} />)
  const r = REASONS[on]
  return (
    <section className="warm wu">
      <div className="wrap">
        <div className="wu-head">
          <h2 data-reveal>Why choose <em>us?</em></h2>
          <p data-reveal>The one ad in the Tricity nobody can scroll past, planned, made and proven by one team.</p>
        </div>
        <div className="wu-body" onMouseEnter={() => { held.current = true }} onMouseLeave={() => { held.current = false }}>
          <div className="wu-col left">{side([0, 1, 2])}</div>
          <figure className="wu-pic" ref={pic} data-reveal>
            <div className="wu-frame">
              {REASONS.map((x, i) => <img key={x.img} src={x.img} alt={i === on ? x.t : ''} loading="lazy" className={`${i === on ? 'on' : ''} ${x.contain ? 'contain' : ''}`} />)}
              <figcaption key={on}><b>{r.t}</b><span>{r.d}</span></figcaption>
            </div>
          </figure>
          <div className="wu-col right">{side([3, 4, 5])}</div>
        </div>
        <div className="wu-cta"><a className="orange-btn" href={BOOK_LINK}>Book Now</a></div>
      </div>
    </section>
  )
}

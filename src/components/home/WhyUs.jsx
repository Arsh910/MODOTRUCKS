import { useEffect, useRef, useState } from 'react'
import { REASONS } from '../../data/whyUs.js'
import { BOOK_LINK } from '../../config/site.js'
import './why-us.css'

// Why us: the reasons as rows on the left, one picture on the right. Hover or tap a reason and the picture
// swaps to it, with the longer explanation under it. On its own it cycles through them,
// pausing while the pointer is over the reasons.

function Reason({ r, i, on, pick }) {
  return (
    <li className={on ? 'on' : ''} data-reveal style={{ '--d': i }}>
      <button type="button" aria-pressed={on} onMouseEnter={() => pick(i)} onClick={() => pick(i)}>
        <b>{r.t}</b><span>{String(i + 1).padStart(2, '0')}</span><p>{r.s}</p>
      </button>
    </li>
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
  const r = REASONS[on]
  return (
    <section className="sec wu">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title" data-reveal>Why choose us?</h2>
          <div>
            <p data-reveal>The one ad in the Tricity nobody can scroll past, planned, made and proven by one team.</p>
            <div className="btns" data-reveal><a className="orange-btn" href={BOOK_LINK}>Book Now</a></div>
          </div>
        </div>
        <div className="wu-body" onMouseEnter={() => { held.current = true }} onMouseLeave={() => { held.current = false }}>
          <ol className="rows wu-list">{REASONS.map((x, i) => <Reason key={x.t} r={x} i={i} on={on === i} pick={pick} />)}</ol>
          <figure className="wu-pic" ref={pic} data-reveal>
            {REASONS.map((x, i) => <img key={x.img} src={x.img} alt={i === on ? x.t : ''} loading="lazy" className={`${i === on ? 'on' : ''} ${x.contain ? 'contain' : ''}`} />)}
            <figcaption key={on}><span className="dot-label">{r.t}</span><p>{r.d}</p></figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

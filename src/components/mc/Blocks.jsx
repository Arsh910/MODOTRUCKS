import { useEffect, useRef, useState } from 'react'
import { BOOK_LINK, AD_LINK } from '../../config/site.js'

// Shared page blocks, after missioncontrol.co.

// Round button with an arrow: "Let's talk →"
export function Talk({ href = BOOK_LINK, children = 'Let’s talk', tone = '' }) {
  return <a className={`talk ${tone}`} href={href}>{children}<i aria-hidden="true">→</i></a>
}

// Top of a page: big headline, grey line, buttons, then a rounded media card.
export function Top({ title, sub, children, media, buttons = true }) {
  return (
    <section className="top wrap">
      <h1 data-reveal>{title}</h1>
      {sub && <p className="top-sub" data-reveal style={{ '--d': 1 }}>{sub}</p>}
      {buttons && (
        <div className="top-btns" data-reveal style={{ '--d': 2 }}>
          <Talk tone="solid">Book Now</Talk>
          <Talk href={AD_LINK}>Don’t have an ad?</Talk>
        </div>
      )}
      {children}
      {media && <div className="top-media" data-reveal="media">{media}</div>}
    </section>
  )
}

// A numbered section: small label on the left third, content on the right.
// `aside` fills the left column under the label (a picture or drawing).
export function Row({ n, label, title, lead, cols, link, children, id, aside }) {
  return (
    <section className="sec" id={id}>
      <div className="wrap row">
        <div className="row-side">
          <p className="label" data-reveal><i>{n}</i>{label}</p>
          {aside && <div className="row-aside" data-reveal="media">{aside}</div>}
        </div>
        <div className="row-body">
          {title && <h2 data-reveal>{title}</h2>}
          {lead && <p className="lead" data-reveal>{lead}</p>}
          {cols && <div className="cols">{cols.map((c, i) => <p key={i} data-reveal style={{ '--d': i }}>{c}</p>)}</div>}
          {link && <div data-reveal><a className="arrow-link" href={link[0]}><span>{link[1]}</span></a></div>}
          {children}
        </div>
      </div>
    </section>
  )
}

// Grid of titles with grey text under a hairline. items: [title, text, small?, link?]
export function Caps({ items, n = 3 }) {
  return (
    <ul className="caps" style={{ '--n': n }}>
      {items.map(([t, d, small, link], i) => (
        <li key={t} data-reveal style={{ '--d': i % n }}>
          {small && <small>{small}</small>}
          <h3>{t}</h3>
          <p>{d}</p>
          {link && <a className="arrow-link" href={link}><span>Learn more</span></a>}
        </li>
      ))}
    </ul>
  )
}

// Heading + sideways row of tall rounded cards with prev / next buttons. cards: { img, title, text, tag, contain }
export function Rail({ title, sub, cards }) {
  const rail = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })
  useEffect(() => {
    const r = rail.current
    const onScroll = () => setEdge({ start: r.scrollLeft < 4, end: r.scrollLeft + r.clientWidth > r.scrollWidth - 4 })
    onScroll()
    r.addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => { r.removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll) }
  }, [])
  const step = dir => { const r = rail.current; r.scrollBy({ left: dir * (r.firstElementChild.offsetWidth + 20) }) }
  return (
    <section className="sec">
      <div className="wrap head">
        <div>
          <h2 data-reveal>{title}</h2>
          {sub && <p data-reveal>{sub}</p>}
        </div>
        <div className="rail-nav" data-reveal>
          <button type="button" aria-label="Previous" disabled={edge.start} onClick={() => step(-1)}>‹</button>
          <button type="button" aria-label="Next" disabled={edge.end} onClick={() => step(1)}>›</button>
        </div>
      </div>
      <div className="rail" ref={rail}>
        {cards.map((c, i) => (
          <article key={c.title} className="rail-card" tabIndex={0} data-reveal style={{ '--d': i % 4 }}>
            <img src={c.img} alt="" loading="lazy" className={c.contain ? 'contain' : ''} />
            {c.tag && <small>{c.tag}</small>}
            <div><h3>{c.title}</h3>{c.text && <p>{c.text}</p>}</div>
          </article>
        ))}
      </div>
    </section>
  )
}

// Pastel cards pinned one over the next as you scroll. The covered card sinks back a little (--sink 0 → 1).
export function Stack({ title, sub, children }) {
  const box = useRef(null)
  useEffect(() => {
    const cards = [...box.current.children]
    let raf = 0
    const update = () => {
      raf = 0
      cards.forEach((c, i) => {
        const next = cards[i + 1]
        if (!next) return
        const a = c.getBoundingClientRect(), b = next.getBoundingClientRect()
        // how far the next card has slid over this one, 0 → 1
        c.style.setProperty('--sink', Math.max(0, Math.min(1, (a.bottom - b.top) / a.height)).toFixed(3))
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])
  return (
    <section className="sec">
      <div className="wrap">
        {title && <div className="head"><div><h2 data-reveal>{title}</h2>{sub && <p data-reveal>{sub}</p>}</div></div>}
        <div className="stack" ref={box}>{children}</div>
      </div>
    </section>
  )
}

// One pastel card: text on the left, a big figure or a drawing on the right.
export function StackCard({ i, tag, title, text, right, children }) {
  return (
    <article className="stack-card" style={{ '--i': i }}>
      <div className="stack-l">
        <small>{tag}</small>
        <h3>{title}</h3>
        {text && <p>{text}</p>}
        {children}
      </div>
      <div className="stack-r">{right}</div>
    </article>
  )
}

// Questions with a chevron.
export function Faq({ items }) {
  return <div className="faq">{items.map(([q, a]) => <details key={q} data-reveal><summary>{q}</summary><p>{a}</p></details>)}</div>
}

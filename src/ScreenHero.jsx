import { useEffect, useState } from 'react'
import './screen-hero.css'

// Example ads for made-up brands. Each one fills the whole 700 x 300 strip, so it wraps the corner.
const ADS = [
  { bg: '#1F3D2B', a: 'CHAI & CO.', b: 'FRESH BREW · SECTOR 17', fa: '#F3E3C3', fb: '#E8A33D' },
  { bg: '#E8622C', a: 'VOLTA MOTORS', b: 'TEST DRIVE THE NEW EV', fa: '#fff', fb: '#fff' },
  { bg: '#FFC531', a: 'PIZZA PRONTO', b: '2 FOR 1 EVERY TUESDAY', fa: '#1c120d', fb: '#B3261E' },
  { bg: '#1E4FD8', a: 'NOVA FITNESS', b: 'FIRST MONTH FREE · MOHALI', fa: '#fff', fb: '#BFD3FF' },
  { bg: '#F6EEE6', a: 'LUMEN OPTICALS', b: 'GRAND OPENING · ELANTE', fa: '#C9562A', fb: '#1c120d' },
]
const FONT = { fontFamily: 'Archivo, Arial, sans-serif', fontWeight: 700, style: { fontStretch: '125%' } }

// One ad. `enter` sweeps in from the right with a light edge, then its lines and words land;
// `leave` drifts left and darkens underneath it. Keys change on every swap, so the CSS animations restart.
function Ad({ ad, mode }) {
  return (
    <g className={`sh-ad ${mode}`}>
      <rect width="700" height="300" fill={ad.bg} />
      <rect className="sh-line" x="40" y="62" width="620" height="3" fill={ad.fb} opacity=".8" />
      <rect className="sh-line" x="40" y="235" width="620" height="3" fill={ad.fb} opacity=".8" />
      <text className="sh-t1" x="350" y="160" textAnchor="middle" fontSize="72" fill={ad.fa} textLength={ad.a.length > 11 ? 600 : undefined} lengthAdjust="spacingAndGlyphs" {...FONT}>{ad.a}</text>
      <text className="sh-t2" x="350" y="205" textAnchor="middle" fontSize="20" letterSpacing="5" fill={ad.fb} {...FONT}>{ad.b}</text>
      <rect className="sh-shade" width="700" height="300" />
      <rect className="sh-edge" x="-10" width="10" height="300" />
    </g>
  )
}

// Top of the Screen page: headline + short pitch, then the L-shaped screen drawn to scale with its dimensions.
// Geometry: 50 units = 1 ft. Rear face is 300 x 300 (6 x 6 ft), side face 400 x 300 (8 x 6 ft).
const REAR = 'matrix(0.6,0.16667,0,1,80,140)'
const SIDE = 'matrix(1,-0.18,0,1,260,190)'

// one ad on a 700 x 300 strip: 0-300 wraps the back, 300-700 runs down the side
function Strip({ now, prev }) {
  return (
    <>
      {prev >= 0 && <Ad key={`out${prev}-${now}`} ad={ADS[prev]} mode="leave" />}
      <Ad key={`in${now}`} ad={ADS[now]} mode={prev >= 0 ? 'enter' : ''} />
      <rect className="sh-sheen" width="700" height="300" fill="url(#sh-sheen)" />
      <rect width="700" height="300" fill="url(#sh-led)" />
    </>
  )
}

function ScreenDiagram({ now, prev }) {
  return (
    <svg className="sh-svg" viewBox="-50 30 810 530" role="img" aria-label="The MODO screen: a 6 by 6 foot rear screen and an 8 by 6 foot side screen, joined at the corner with no gap">
      <defs>
        <clipPath id="sh-rear"><rect width="300" height="300" /></clipPath>
        <clipPath id="sh-side"><rect width="400" height="300" /></clipPath>
        <pattern id="sh-led" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0,4.5H5M4.5,0V5" stroke="#000" strokeOpacity=".16" /></pattern>
        <linearGradient id="sh-sheen" x1="0" x2="1"><stop offset=".4" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".22" /><stop offset=".6" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>

      {/* box: roof, the two screens as one strip, white frame, base */}
      <path d="M74,136 L260,186 L666,114 L480,64 Z" fill="#fbf7f3" stroke="#e2d9d0" strokeWidth="2" />
      {/* the strip is drawn on each face (not <use>d): animations don't run inside <use> copies */}
      <g transform={REAR}><g clipPath="url(#sh-rear)"><Strip now={now} prev={prev} /></g></g>
      <g transform={SIDE}><g clipPath="url(#sh-side)"><g transform="translate(-300,0)"><Strip now={now} prev={prev} /></g></g></g>
      {/* MODO Visuals on the roof, laid flat on the roof plane (400 x 300 local units) */}
      <g transform="matrix(1.015,-0.18,0.62,0.1667,74,136)">
        <g transform="translate(96,150)" fill="none">
          <circle r="22" stroke="#E8622C" strokeWidth="6" /><circle r="33" stroke="#C9562A" strokeWidth="4.5" /><circle r="43" stroke="#8E3F22" strokeWidth="3" />
        </g>
        <text x="152" y="152" fontSize="58" fill="#2a1c16" {...FONT}>MODO</text>
        <text x="154" y="196" fontSize="34" letterSpacing="4" fill="#2a1c16" {...FONT}>VISUALS</text>
      </g>
      <path d="M80,140 L260,190 L660,118 L660,418 L260,490 L80,440 Z" fill="none" stroke="#fbf7f3" strokeWidth="8" strokeLinejoin="round" />
      <path d="M80,440 L260,490 L660,418 L660,434 L260,508 L80,456 Z" fill="#e8e1da" />

      {/* dimensions */}
      <g className="sh-dim">
        <g transform={SIDE}><path d="M0,350 H400 M0,336 V364 M400,336 V364" /></g>
        <g transform={REAR}><path d="M0,350 H300 M0,336 V364 M300,336 V364" /></g>
        <path d="M44,140 V440 M32,140 H56 M32,440 H56" />
      </g>
      <g className="sh-label">
        <text x="460" y="522" transform="rotate(-10.2 460 522)">Side · 8 ft</text>
        <text x="152" y="530" transform="rotate(15.5 152 530)">Rear · 6 ft</text>
        <text x="30" y="296" textAnchor="end">6 ft</text>
        <text x="30" y="316" textAnchor="end" className="sub">tall</text>
      </g>
    </svg>
  )
}

export function ScreenHero() {
  const [ad, setAd] = useState({ now: 0, prev: -1 })
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => !document.hidden && setAd(a => ({ now: (a.now + 1) % ADS.length, prev: a.now })), 3500)
    return () => clearInterval(t)
  }, [])
  return (
    <section className="warm sh">
      <div className="wrap sh-head">
        <h1 data-reveal>One screen, wrapped around the corner</h1>
        <div className="sh-side">
          <p data-reveal>The back and the side of the truck are a single LED screen with no gap between them. Your ad flows round the corner in one piece.</p>
          <a className="dark-btn" href="/contact" data-reveal>Book Now</a>
        </div>
      </div>
      <div className="sh-art" data-reveal><ScreenDiagram now={ad.now} prev={ad.prev} /></div>
    </section>
  )
}

// "The specs": centred title, then a 2x2 grid split by a fading cross with a diamond at its centre.
export function Specs({ items }) {
  return (
    <section className="warm sp">
      <div className="wrap">
        <p className="sp-label" data-reveal>The specs</p>
        <h2 className="sp-title" data-reveal>Built to be looked at, from every side of the road</h2>
        <ul className="sp-grid">
          {items.map(([t, d, icon], i) => (
            <li key={t} data-reveal style={{ '--d': i }}>
              <i><svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon} /></svg></i>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// The numbers: four cards, icon at the top, the figure and its meaning at the bottom.
// One card is lit at a time; hovering or tapping a card lights it. Phones swipe sideways.
export function NumberCards({ items }) {
  const [on, setOn] = useState(1)
  return (
    <section className="brown nc">
      <div className="wrap">
        <ul className="nc-row">
          {items.map(([v, t, d, icon], i) => (
            <li key={t} className={i === on ? 'on' : ''} onMouseEnter={() => setOn(i)} onClick={() => setOn(i)} data-reveal style={{ '--d': i }}>
              <i><svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon} /></svg></i>
              <div><b>{v}</b><h3>{t}</h3><p>{d}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

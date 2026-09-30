import { useEffect, useState } from 'react'
import './screen.css'

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
function Strip({ now, prev, ads }) {
  return (
    <>
      {prev >= 0 && <Ad key={`out${prev}-${now}`} ad={ads[prev]} mode="leave" />}
      <Ad key={`in${now}`} ad={ads[now]} mode={prev >= 0 ? 'enter' : ''} />
      <rect className="sh-sheen" width="700" height="300" fill="url(#sh-sheen)" />
      <rect width="700" height="300" fill="url(#sh-led)" />
    </>
  )
}

// The cab, chassis and wheels around the screen box, drawn in the same two planes (for plan pages).
function TruckBody({ front }) {
  const wheel = (x, y) => (
    <g key={x} transform={`translate(${x},${y})`}>
      <circle r="46" fill="#17181a" /><circle r="26" fill="#b9bdc2" /><circle r="9" fill="#6f747a" />
    </g>
  )
  if (!front) return (
    <>
      <ellipse cx="470" cy="518" rx="440" ry="30" fill="#000" opacity=".12" />
      <path d="M670,236 L800,213 L620,163 L490,186 Z" fill="#e9e4de" stroke="#d3cdc6" strokeWidth="2" />
      <g fill="#17181a"><circle cx="196" cy="462" r="44" /><circle cx="626" cy="434" r="44" /></g>
    </>
  )
  return (
    <g transform={SIDE}>
      <path d="M-10,300 H610 V326 H-10 Z" fill="#2a2b2e" />
      <path d="M410,120 L540,120 Q568,120 578,150 L610,230 L610,326 L410,326 Z" fill="#fbf8f4" stroke="#d3cdc6" strokeWidth="2" strokeLinejoin="round" />
      <path d="M428,136 L535,136 Q552,136 558,156 L574,206 L428,206 Z" fill="#2c3440" />
      <path d="M470,136 H494 L456,206 H432 Z" fill="#fff" opacity=".1" />
      <path d="M410,252 H610" stroke="#E8622C" strokeWidth="7" />
      <path d="M500,214 V318" stroke="#d3cdc6" strokeWidth="2" />
      <g transform="translate(455,280)" fill="none"><circle r="7" stroke="#E8622C" strokeWidth="2.4" /><circle r="11" stroke="#C9562A" strokeWidth="1.8" /><circle r="14.5" stroke="#8E3F22" strokeWidth="1.2" /></g>
      {wheel(110, 338)}{wheel(530, 338)}
    </g>
  )
}

// `dims` shows the orange measurement lines and labels (the Screen page); `truck` draws the whole truck around the box.
export function ScreenDiagram({ now, prev, ads = ADS, dims = true, truck = false }) {
  return (
    <svg className="sh-svg" viewBox={dims ? '-50 30 810 530' : truck ? '40 50 850 480' : '40 40 650 490'} role="img" aria-label="The MODO screen: a 6 by 6 foot rear screen and an 8 by 6 foot side screen, joined at the corner with no gap">
      <defs>
        <clipPath id="sh-rear"><rect width="300" height="300" /></clipPath>
        <clipPath id="sh-side"><rect width="400" height="300" /></clipPath>
        <pattern id="sh-led" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0,4.5H5M4.5,0V5" stroke="#000" strokeOpacity=".16" /></pattern>
        <linearGradient id="sh-sheen" x1="0" x2="1"><stop offset=".4" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".22" /><stop offset=".6" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      {truck && <TruckBody />}

      {/* box: roof, the two screens as one strip, white frame, base */}
      <path d="M74,136 L260,186 L666,114 L480,64 Z" fill="#fbf7f3" stroke="#e2d9d0" strokeWidth="2" />
      {/* the strip is drawn on each face (not <use>d): animations don't run inside <use> copies */}
      <g transform={REAR}><g clipPath="url(#sh-rear)"><Strip now={now} prev={prev} ads={ads} /></g></g>
      <g transform={SIDE}><g clipPath="url(#sh-side)"><g transform="translate(-300,0)"><Strip now={now} prev={prev} ads={ads} /></g></g></g>
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
      {truck && <TruckBody front />}

      {dims && <>
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
      </>}
    </svg>
  )
}

// The drawing with its example ads changing every few seconds (Screen page top).
// `truck` draws the whole truck around the screen instead of the measured screen on its own.
export function ScreenShow({ truck = false }) {
  const [ad, setAd] = useState({ now: 0, prev: -1 })
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => !document.hidden && setAd(a => ({ now: (a.now + 1) % ADS.length, prev: a.now })), 3500)
    return () => clearInterval(t)
  }, [])
  return <div className="sh-art"><ScreenDiagram now={ad.now} prev={ad.prev} dims={!truck} truck={truck} /></div>
}

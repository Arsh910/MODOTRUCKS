import { useEffect, useRef } from 'react'

// Ads on the side screen (548 x 196 units). The screen runs flush to the rear edge,
// where it wraps round onto the back screen, so there is no bezel on that side.
export const ADS = [
  { bg: '#E8622C', glow: '#E8622C', a: 'YOUR BRAND', b: 'LIVE ON THE ROAD', fa: '#fff', fb: '#fff' },
  { bg: '#140b08', glow: '#E8622C', a: '3D THAT POPS', b: 'ANAMORPHIC CONTENT', fa: '#fff', fb: '#E8622C', rings: true },
  { bg: '#F6EEE6', glow: '#F6D9C4', a: 'GRAND OPENING', b: 'THIS SATURDAY · SECTOR 17', fa: '#C9562A', fb: '#1c120d' },
  { bg: '#1E4FD8', glow: '#3d6bff', a: 'NEW SHOWROOM', b: 'NOW OPEN IN ZIRAKPUR', fa: '#fff', fb: '#fff' },
  { bg: '#FFC531', glow: '#FFC531', a: 'FESTIVE SALE', b: 'THIS WEEKEND ONLY', fa: '#1c120d', fb: '#1c120d' },
]
const SW = 548, SH = 196
const FONT = { fontFamily: 'Archivo, Arial, sans-serif', fontWeight: 700, style: { fontStretch: '125%' } }

// Shrink a headline to fit its box. Archivo is drawn at 125% width, which canvas can't do, so pad the measurement.
const measure = document.createElement('canvas').getContext('2d')
function fitText(el) {
  const base = +(el.dataset.base ||= el.getAttribute('font-size'))
  measure.font = `700 ${base}px Archivo, Arial, sans-serif`
  const w = measure.measureText(el.textContent).width * 1.2 + (+el.getAttribute('letter-spacing') || 0) * el.textContent.length
  el.setAttribute('font-size', w > el.dataset.max ? (base * el.dataset.max / w).toFixed(1) : base)
}

function Ad({ ad, state }) {
  return (
    <g className={`scene ${state}`}>
      <rect width={SW} height={SH} fill={ad.bg} />
      {ad.rings
        ? <g fill="none">{[30, 55, 80, 105].map((r, j) => <circle key={r} cx={SW / 2} cy={SH / 2} r={r} stroke="#E8622C" strokeOpacity={.9 - j * .2} strokeWidth={6 - j} />)}</g>
        : <g fill={ad.fb} opacity=".85"><rect x="34" y="28" width={SW - 68} height="2" /><rect x="34" y={SH - 30} width={SW - 68} height="2" /></g>}
      <text data-max={SW - 80} x={SW / 2} y={SH / 2 + 12} textAnchor="middle" fontSize="54" fill={ad.fa} {...FONT}>{ad.a}</text>
      <text data-max={SW - 120} x={SW / 2} y={SH / 2 + 46} textAnchor="middle" fontSize="15" letterSpacing="4" fill={ad.fb} {...FONT}>{ad.b}</text>
    </g>
  )
}

// Wheels live outside the body SVG so spinning them never repaints the truck.
function Wheel({ x }) {
  return (
    <div className="wheel" style={{ '--cx': `${x / 9}%` }}>
      <svg viewBox="-44 -44 88 88" aria-hidden="true">
        <circle r="44" fill="#17181a" />
        <circle r="40" fill="none" stroke="#2c2e31" strokeWidth="3" />
        <circle r="27" fill="url(#h-rim)" />
        {[0, 72, 144, 216, 288].map(a => <rect key={a} x="-3.5" y="-25" width="7" height="18" rx="3" fill="#9da2a8" transform={`rotate(${a})`} />)}
        <circle r="8" fill="#6f747a" />
      </svg>
    </div>
  )
}

// White box truck, side view, facing left. `ads` is the list on the screen (default: the landing page set);
// `ad` is the one showing, `prev` the one sliding out.
export function Truck({ ad, prev, ads = ADS }) {
  const ref = useRef(null)
  useEffect(() => {
    const fit = () => ref.current.querySelectorAll('text[data-max]').forEach(fitText)
    fit()
    document.fonts?.ready.then(fit)
  }, [])

  return (
    <div className="truck-wrap">
      <div className="rig">
        <svg ref={ref} className="truck" viewBox="0 0 900 390" role="img" aria-label="The white MODO screen truck driving through the city, its side screen cycling through sample ads">
          <defs>
            <clipPath id="scr"><path d={`M3,0H${SW}V${SH}H3Q0,${SH} 0,${SH - 3}V3Q0,0 3,0Z`} /></clipPath>
            <pattern id="led" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0,3.5H4M3.5,0V4" stroke="#000" strokeOpacity=".22" strokeWidth="1" /></pattern>
            <linearGradient id="wrap" x1="0" x2="1"><stop offset="0" stopOpacity="0" /><stop offset="1" stopOpacity=".35" /></linearGradient>
            <radialGradient id="beam" gradientUnits="userSpaceOnUse" cx="40" cy="250" r="330"><stop offset="0" stopColor="#fff4dc" stopOpacity=".16" /><stop offset="1" stopColor="#fff4dc" stopOpacity="0" /></radialGradient>
            <radialGradient id="shadow"><stop offset="0" stopOpacity=".55" /><stop offset="1" stopOpacity="0" /></radialGradient>
            <linearGradient id="h-body" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset=".7" stopColor="#f1efec" /><stop offset="1" stopColor="#dedad5" /></linearGradient>
            <linearGradient id="h-glass" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#3a4452" /><stop offset="1" stopColor="#121820" /></linearGradient>
            <radialGradient id="h-rim" cx=".4" cy=".35"><stop offset="0" stopColor="#e6e9ec" /><stop offset="1" stopColor="#8b9096" /></radialGradient>
          </defs>

          <ellipse cx="450" cy="358" rx="440" ry="24" fill="url(#shadow)" />
          <path d="M40,244 L-280,190 L-280,340 Z" fill="url(#beam)" />

          {/* chassis, rear bumper */}
          <rect x="286" y="288" width="566" height="20" rx="3" fill="#2a2b2e" />
          <rect x="842" y="292" width="22" height="30" rx="4" fill="#2a2b2e" />

          {/* box, with the screen set into it */}
          <rect x="296" y="38" width="564" height="252" rx="10" fill="url(#h-body)" stroke="#d9d4ce" strokeWidth="1.5" />
          <path d="M311,48H860V256H311Q306,256 306,251V53Q306,48 311,48Z" fill="#141414" />
          <g transform="translate(312,54)" clipPath="url(#scr)" style={{ '--sw': `${SW}px` }}>
            {ads.map((a, i) => <Ad key={i} ad={a} state={i === ad ? 'on' : i === prev ? 'off' : ''} />)}
            <rect width={SW} height={SH} fill="url(#led)" />
            <path d={`M${SW * .55},0 H${SW * .72} L${SW * .5},${SH} H${SW * .33} Z`} fill="#fff" opacity=".05" />
            <rect x={SW - 12} width="12" height={SH} fill="url(#wrap)" />
          </g>
          <path d="M300,274 H856" stroke="#e3dfda" strokeWidth="2" />
          <rect x="848" y="297" width="14" height="9" rx="2" fill="#ff3b1f" />

          {/* cab */}
          <path d="M302,104 H138 Q100,104 86,138 L56,222 Q44,232 42,252 V298 Q42,312 58,312 H302 Z" fill="url(#h-body)" stroke="#d9d4ce" strokeWidth="1.5" />
          <path d="M236,118 H142 Q118,118 108,142 L86,202 H236 Z" fill="url(#h-glass)" />
          <path d="M170,118 H196 L150,202 H124 Z" fill="#fff" opacity=".08" />
          <path d="M248,118 H288 V202 H248 Z" fill="url(#h-glass)" />
          <path d="M242,112 V300" stroke="#d3cdc6" strokeWidth="2" />
          <rect x="220" y="216" width="18" height="5" rx="2.5" fill="#bdb6ae" />
          <g transform="translate(140,236)" fill="none">
            <circle r="6" stroke="#E8622C" strokeWidth="2" /><circle r="9.5" stroke="#C9562A" strokeWidth="1.5" /><circle r="12.5" stroke="#8E3F22" strokeWidth="1" />
          </g>
          <text x="156" y="241" fontSize="12" letterSpacing="1.5" fill="#3a2b24" {...FONT}>MODO</text>
          <path d="M92,168 L66,166" stroke="#2a2b2e" strokeWidth="4" strokeLinecap="round" />
          <rect x="54" y="146" width="13" height="36" rx="5" fill="#2a2b2e" />
          <rect x="38" y="280" width="66" height="30" rx="9" fill="#e4e0db" stroke="#d3cdc6" />
          <rect x="44" y="236" width="26" height="16" rx="5" fill="#fffaf0" stroke="#cbc4bc" />
          <rect x="44" y="258" width="14" height="6" rx="3" fill="#f0a24a" />
          <path d="M58,292 H300" stroke="#E8622C" strokeWidth="4" />

          {/* wheel arches */}
          <path d="M116,316 A56,56 0 0 1 228,316 Z M648,316 A56,56 0 0 1 760,316 Z" fill="#26282b" />
        </svg>
      </div>
      <Wheel x={172} /><Wheel x={704} />
    </div>
  )
}

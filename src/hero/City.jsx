import { useEffect, useRef } from 'react'

// The city behind the road, generated once from fixed seeds so it looks the same on every load.
// Each layer is one tile repeated a few times in a single SVG; CSS slides it right by one tile, forever.

const rng = seed => { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647 }
const circle = (cx, cy, r) => `M${(cx - r).toFixed(1)},${cy.toFixed(1)}a${r.toFixed(1)},${r.toFixed(1)} 0 1,0 ${(2 * r).toFixed(1)},0a${r.toFixed(1)},${r.toFixed(1)} 0 1,0 ${(-2 * r).toFixed(1)},0Z`
const TILE = 1600

// Curved buildings: pill towers, arched and domed roofs, sweeping facades, rounded blocks.
function buildings(seed, minH, maxH, detail) {
  const r = rng(seed), B = 300
  let d = ''
  const windows = [], antennas = []
  for (let x = 0; x < TILE;) {
    const w = Math.round(52 + r() * 88)
    const h = Math.round(Math.min(minH + r() * (maxH - minH), w * 1.8)) // no needle-thin towers
    const top = B - h, kind = r(), corner = Math.min(w / 2, 10 + r() * 22)
    let winTop = top + 12
    if (kind < .22) {
      const rr = w / 2
      d += `M${x},${B}V${top + rr}A${rr},${rr} 0 0 1 ${x + w},${top + rr}V${B}Z`
      winTop = top + rr
    } else if (kind < .42) {
      const q = 14 + r() * 22
      d += `M${x},${B}V${top + q}Q${x + w / 2},${top - q} ${x + w},${top + q}V${B}Z`
      winTop = top + q + 6
    } else if (kind < .58) {
      d += r() < .5
        ? `M${x},${B}V${top}H${x + w * .45}Q${x + w},${top} ${x + w},${top + h * .45}V${B}Z`
        : `M${x},${B}V${top + h * .45}Q${x},${top} ${x + w * .55},${top}H${x + w}V${B}Z`
      winTop = top + 14
    } else if (kind < .7 && detail) {
      const dr = w * .32, cx = x + w / 2
      d += `M${x},${B}V${top}h${w}V${B}ZM${cx - dr},${top}A${dr},${dr * .8} 0 0 1 ${cx + dr},${top}ZM${cx - 1},${top - dr * .8}v-14h2v14Z`
    } else {
      d += `M${x},${B}V${top + corner}Q${x},${top} ${x + corner},${top}H${x + w - corner}Q${x + w},${top} ${x + w},${top + corner}V${B}Z`
      winTop = top + corner * .6 + 8
    }
    if (detail) {
      if (kind >= .7 && r() < .45) { // water tank on legs
        const tx = Math.round(x + 10 + r() * (w - 34))
        d += `M${tx},${top}v-6h2v6ZM${tx + 12},${top}v-6h2v6ZM${tx - 1},${top - 6}h16v-9a8,4 0 0 0 -16,0Z`
      }
      if (r() < .25) { // antenna with a red light
        const ax = Math.round(x + w / 2), ah = Math.round(16 + r() * 26), at = kind < .22 ? top : top - 2
        d += `M${ax - 1},${at + 2}v-${ah}h2v${ah}Z`
        antennas.push([ax, at - ah])
      }
      const lit = .08 + r() * .26, cool = r() < .22
      for (let wy = Math.round(winTop); wy < B - 10; wy += 13) {
        const wholeFloor = r() < .08
        for (let wx = x + 7; wx < x + w - 10; wx += 11) if (r() < (wholeFloor ? .8 : lit)) windows.push([wx, wy, cool])
      }
    }
    x += w + (r() < .45 ? Math.round(20 + r() * 80) : 6)
  }
  return { d, windows, antennas }
}

// Trees along the far pavement, with the occasional hoarding.
function trees(seed) {
  const r = rng(seed), B = 180
  let d = ''
  const boards = []
  for (let x = 0; x < TILE - 40;) {
    if (r() < .05) {
      const bw = Math.round(110 + r() * 40), by = Math.round(38 + r() * 26)
      d += `M${x + Math.round(bw * .28)},${B}V${by + 46}h5V${B}ZM${x + Math.round(bw * .68)},${B}V${by + 46}h5V${B}Z`
      boards.push([x, by, bw])
      x += bw + 30
      continue
    }
    const cx = x + 30 + r() * 20, cy = 104 + r() * 34, R = 22 + r() * 20
    d += `M${(cx - 3).toFixed(1)},${B}V${cy.toFixed(1)}h6V${B}Z`
    for (let k = 0; k < 5; k++) d += circle(cx + (r() - .5) * R * 1.5, cy + (r() - .5) * R * .9, R * (.55 + r() * .5))
    x += R * 1.5 + 50 + r() * 130
  }
  return { d, boards }
}

const FAR = buildings(7, 70, 230, false)
const MID = buildings(42, 50, 200, true)
const NEAR = trees(11)

// Speed of the lane dashes (see .road .dash in hero.css: 400px every 1.25s). Things on the road plane move at this speed.
export const ROAD_SPEED = 320 // px per second

// `copies` tiles side by side; the strip slides by one tile, so it needs (copies - 1) tiles to cover the screen.
// With `speed` (px/s) the slide is timed from the tile's on-screen width, so it keeps pace at any screen size.
function Pan({ id, className, tile = TILE, h, copies = 3, speed, children }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!speed) return
    const svg = ref.current
    const ro = new ResizeObserver(() => { svg.style.animationDuration = `${svg.clientWidth / copies / speed}s` })
    ro.observe(svg)
    return () => ro.disconnect()
  }, [speed, copies])
  const w = tile * copies
  return (
    <div className={`pan ${className}`} aria-hidden="true">
      <svg ref={ref} viewBox={`0 0 ${w} ${h}`} style={{ aspectRatio: `${w} / ${h}`, '--shift': `${-100 / copies}%` }}>
        <defs><g id={id}>{children}</g></defs>
        {Array.from({ length: copies }, (_, i) => <use key={i} href={`#${id}`} x={i * tile} />)}
      </svg>
    </div>
  )
}

export function City() {
  return (
    <>
      <Pan id="city-far" className="far" h="300"><path d={FAR.d} /></Pan>
      <div className="haze" aria-hidden="true" />
      <Pan id="city-mid" className="mid" h="300">
        <path d={MID.d} />
        {MID.windows.map(([x, y, cool], i) => <rect key={i} x={x} y={y} width="5" height="7" className={cool ? 'win cool' : 'win'} />)}
        {MID.antennas.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.2" fill="#ff3b2a" />)}
      </Pan>
      <Pan id="city-near" className="near" h="180">
        <path d={NEAR.d} />
        {NEAR.boards.map(([x, y, w], i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height="46" rx="2" fill="#d9bfa6" />
            <rect x={x + 6} y={y + 6} width={w * .45} height="34" fill={['#e8622c', '#1e4fd8', '#1c120d'][i % 3]} />
            <rect x={x + 6 + w * .5} y={y + 14} width={w * .38} height="5" fill="#7a5a47" />
            <rect x={x + 6 + w * .5} y={y + 24} width={w * .26} height="4" fill="#7a5a47" />
          </g>
        ))}
      </Pan>
    </>
  )
}

// Street lamps stand on the far pavement, so they pass at road speed.
export function Lamps() {
  return (
    <Pan id="lamp" className="lamps" tile={520} h="300" copies={8} speed={ROAD_SPEED}>
      <path d="M40 300V26h34" fill="none" stroke="#0b0b0d" strokeWidth="5" />
      <rect x="66" y="22" width="26" height="7" rx="3" fill="#0b0b0d" />
      <circle cx="80" cy="32" r="22" fill="#ffc48a" opacity=".16" />
      <circle cx="80" cy="31" r="4" fill="#ffe3c2" />
    </Pan>
  )
}

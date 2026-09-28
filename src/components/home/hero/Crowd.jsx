// Onlookers filming the truck. Each flash fires on its own rhythm (t = period, d = delay, seconds).
const POSES = {
  a: { arm: 'M44,54 Q60,58 62,34', phone: [59, 22, 7, 12], flash: [62, 24] },            // phone at eye level
  b: { arm: 'M44,52 Q58,30 56,4', phone: [53, -8, 7, 12], flash: [56, -6] },             // phone held up high
  c: { arm: 'M44,54 Q58,50 60,32', arm2: 'M24,56 Q42,60 56,36', phone: [54, 22, 16, 11], flash: [68, 22] }, // camera, both hands
}

// Near pavement, in front of the truck.
export const NEAR_PEOPLE = [
  { x: 2, s: 1, p: 'a', t: 3.1, d: .4 }, { x: 8.5, s: .9, p: 'b', hair: 1, t: 4.3, d: 1.7 }, { x: 14.5, s: .78, p: 'c', t: 3.7, d: 2.6 },
  { x: 78, s: .82, p: 'b', flip: 1, t: 4.9, d: .9 }, { x: 85, s: .95, p: 'c', flip: 1, hair: 1, t: 3.4, d: 2.2 }, { x: 92, s: 1.04, p: 'a', flip: 1, t: 4.1, d: 3.3 },
]
// Far pavement by the street lights, at the edges only.
export const FAR_PEOPLE = [
  { x: 3, s: .9, p: 'b', t: 5.2, d: 1.1 }, { x: 10, s: 1, p: 'a', hair: 1, t: 4.4, d: 3 }, { x: 17, s: .95, p: 'c', t: 3.8, d: .3 },
  { x: 80, s: .92, p: 'c', flip: 1, t: 5, d: .8 }, { x: 87, s: 1, p: 'a', flip: 1, t: 3.9, d: 2.2 }, { x: 94, s: .95, p: 'b', flip: 1, hair: 1, t: 4.2, d: 2.9 },
]

const VB = { x: 0, y: -24, w: 80, h: 204 }
const limb = { fill: 'none', stroke: 'currentColor', strokeWidth: 8, strokeLinecap: 'round' }

function Person({ m }) {
  const P = POSES[m.p], [px, py, pw, ph] = P.phone
  return (
    <div className={m.flip ? 'person flip' : 'person'} style={{ left: `${m.x}%`, '--s': m.s }}>
      <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} aria-hidden="true">
        {m.hair && <path d="M21,26 Q20,8 34,11 Q48,8 47,28 L46,48 L22,48 Z" />}
        <circle cx="34" cy="26" r="12" />
        <path d="M20,48 Q34,40 48,48 L50,110 L18,110 Z" />
        <path d="M20,108 L18,176 L29,176 L34,122 L39,176 L50,176 L48,108 Z" />
        {m.p !== 'c' && <path d="M24,52 Q16,80 22,102" {...limb} />}
        <path d={P.arm} {...limb} />
        {P.arm2 && <path d={P.arm2} {...limb} />}
        <rect x={px} y={py} width={pw} height={ph} rx="2" />
        <rect className="lit" x={px + 1} y={py + 1.5} width={pw - 2} height={ph - 3} rx="1" />
      </svg>
      {/* an HTML element, so the flash animates on the GPU without repainting the figure */}
      <i className="flash" style={{
        left: `${(P.flash[0] - VB.x) / VB.w * 100}%`, top: `${(P.flash[1] - VB.y) / VB.h * 100}%`,
        animationDuration: `${m.t}s`, animationDelay: `${m.d}s`,
      }} />
    </div>
  )
}

export function Crowd({ people, far }) {
  return (
    <div className={far ? 'crowd far' : 'crowd'} aria-hidden="true">
      {people.map((m, i) => <Person key={i} m={m} />)}
    </div>
  )
}

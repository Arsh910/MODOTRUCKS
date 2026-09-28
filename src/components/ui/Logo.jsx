import { useId } from 'react'

// MODO Visuals mark: three rings, the wordmark overlapping them on the right.
// The rings are masked out around the letters, like the original logo.
export function Logo({ compact = false, className = '', title = 'MODO Visuals' }) {
  const id = 'lg' + useId().replace(/[^a-z0-9]/gi, '')
  const g = compact
    // horizontal lockup for the nav: smaller rings, larger type
    ? { vb: '-54 -54 232 108', c: [0, 0], r: [30, 41, 51], w: [4.2, 3, 2], t: [[-4, 11, 39, 'MODO'], [-4, 38, 26.5, 'VISUALS']] }
    : { vb: '60 25 650 620', c: [378, 336], r: [168, 238, 302], w: [11, 7, 4.5], t: [[258, 353, 122, 'MODO'], [292, 422, 83, 'VISUALS']] }
  const text = (extra = {}) => g.t.map(([x, y, s, w]) => (
    <text key={w} x={x} y={y} fontSize={s} fontWeight="700" style={{ fontStretch: '125%', letterSpacing: s * .045 }} {...extra}>{w}</text>
  ))
  return (
    <svg className={`logo ${className}`} viewBox={g.vb} role="img" aria-label={title}>
      <mask id={id}>
        <rect x="-2000" y="-2000" width="4000" height="4000" fill="#fff" />
        {text({ fill: '#000', stroke: '#000', strokeWidth: compact ? 7 : 22, strokeLinejoin: 'round' })}
      </mask>
      <g mask={`url(#${id})`} fill="none">
        {g.r.map((r, i) => <circle key={r} className={`ring r${i}`} cx={g.c[0]} cy={g.c[1]} r={r} strokeWidth={g.w[i]} />)}
      </g>
      <g className="logo-type">{text()}</g>
    </svg>
  )
}

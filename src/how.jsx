const STEPS = [
  ['Send a request', 'Pick a plan, a shift and your dates. It takes two minutes.'],
  ['Get your quote', 'We confirm availability and send your quote the same day.'],
  ['Approve your ad', 'Send your ad or let us make one. Approve it 48 hours before.'],
  ['On the road', 'The truck runs your route. GPS log, photos and video after.'],
]

// Clean white small truck, side profile, facing left.
function WhiteTruck() {
  const wheel = x => (
    <g transform={`translate(${x},316)`}>
      <path d="M-56,0 A56,56 0 0 1 56,0 Z" fill="#26282b" />
      <g className="wheel">
        <circle r="44" fill="#17181a" />
        <circle r="40" fill="none" stroke="#2c2e31" strokeWidth="3" />
        <circle r="27" fill="url(#rim)" />
        {[0, 72, 144, 216, 288].map(a => <rect key={a} x="-3.5" y="-25" width="7" height="18" rx="3" fill="#9da2a8" transform={`rotate(${a})`} />)}
        <circle r="8" fill="#6f747a" />
      </g>
    </g>
  )
  return (
    <svg className="white-truck" viewBox="0 0 900 390" role="img" aria-label="A clean white MODO truck, side view">
      <defs>
        <linearGradient id="wt-body" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".7" stopColor="#f1efec" /><stop offset="1" stopColor="#dedad5" /></linearGradient>
        <linearGradient id="wt-glass" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#3a4452" /><stop offset="1" stopColor="#121820" /></linearGradient>
        <radialGradient id="rim" cx=".4" cy=".35"><stop offset="0" stopColor="#e6e9ec" /><stop offset="1" stopColor="#8b9096" /></radialGradient>
        <filter id="wt-blur"><feGaussianBlur stdDeviation="10" /></filter>
      </defs>
      <ellipse cx="450" cy="362" rx="420" ry="14" fill="#000" opacity=".28" filter="url(#wt-blur)" />

      {/* chassis and rear */}
      <rect x="286" y="288" width="566" height="20" rx="3" fill="#2a2b2e" />
      <rect x="842" y="292" width="22" height="30" rx="4" fill="#2a2b2e" />
      {/* box */}
      <rect x="296" y="38" width="564" height="252" rx="10" fill="url(#wt-body)" stroke="#d9d4ce" strokeWidth="1.5" />
      <path d="M300,54 H856 M300,274 H856" stroke="#e3dfda" strokeWidth="2" />
      <rect x="853" y="236" width="9" height="30" rx="3" fill="#d8412a" />
      <g transform="translate(760,240)" fill="none">
        <circle r="7" stroke="#E8622C" strokeWidth="2.2" /><circle r="11" stroke="#C9562A" strokeWidth="1.6" /><circle r="14.5" stroke="#8E3F22" strokeWidth="1.1" />
      </g>
      <text x="780" y="245" fontFamily="Archivo, Arial, sans-serif" fontWeight="700" fontSize="13" letterSpacing="1.5" fill="#3a2b24" style={{ fontStretch: '125%' }}>MODO</text>

      {/* cab */}
      <path d="M302,104 H138 Q100,104 86,138 L56,222 Q44,232 42,252 V298 Q42,312 58,312 H302 Z" fill="url(#wt-body)" stroke="#d9d4ce" strokeWidth="1.5" />
      <path d="M236,118 H142 Q118,118 108,142 L86,202 H236 Z" fill="url(#wt-glass)" />
      <path d="M170,118 H196 L150,202 H124 Z" fill="#fff" opacity=".08" />
      <path d="M248,118 H288 V202 H248 Z" fill="url(#wt-glass)" />
      <path d="M242,112 V300" stroke="#d3cdc6" strokeWidth="2" />
      <rect x="220" y="216" width="18" height="5" rx="2.5" fill="#bdb6ae" />
      <path d="M92,168 L66,166" stroke="#2a2b2e" strokeWidth="4" strokeLinecap="round" />
      <rect x="54" y="146" width="13" height="36" rx="5" fill="#2a2b2e" />
      <rect x="38" y="280" width="66" height="30" rx="9" fill="#e4e0db" stroke="#d3cdc6" />
      <rect x="44" y="236" width="26" height="16" rx="5" fill="#fbfaf8" stroke="#cbc4bc" />
      <rect x="44" y="258" width="14" height="6" rx="3" fill="#f0a24a" />
      <path d="M58,292 H300" stroke="#E8622C" strokeWidth="4" />

      {wheel(172)}{wheel(704)}
    </svg>
  )
}

export default function How() {
  return (
    <section className="how" id="how">
      <div className="wrap">
        <div className="how-top">
          <div className="how-copy">
            <p className="how-label" data-reveal>How It Works</p>
            <h2 data-reveal>Four steps to put your ad on the road</h2>
            <p className="how-text" data-reveal>Pick a plan and your dates, send your ad, and the truck does the rest. Most requests are confirmed the same day.</p>
            <a className="how-btn" href="/contact" data-reveal>Book Now <i aria-hidden="true">→</i></a>
          </div>
          <div className="how-truck" data-reveal><WhiteTruck /></div>
        </div>
        <ol className="how-steps">
          {STEPS.map(([h, p], i) => (
            <li key={h} data-reveal style={{ '--d': i }}>
              <span className="how-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

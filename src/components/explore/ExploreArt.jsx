// Small drawings for the "Plan your campaign" cards, one per page, so each picture says what the card says.

const STEP_LABELS = ['Request', 'Quote', 'Approve', 'On the road']
const PLAN_ROWS = [['Whole screen', 'One brand, all shift'], ['Share the screen', 'Up to 6 brands'], ['At your event', '4, 8 or 10 hours']]

export const EXPLORE_ART = {
  // the truck's corner screen
  '/screen': () => <div className="xa xa-screen"><img src="/img/truck-rear.svg" alt="" loading="lazy" /></div>,

  // four steps on a line, the first one done
  '/how-it-works': () => (
    <div className="xa xa-steps">
      <ol>{STEP_LABELS.map((s, i) => <li key={s} className={i === 0 ? 'done' : ''}><i>{String(i + 1).padStart(2, '0')}</i><span>{s}</span></li>)}</ol>
    </div>
  ),

  // the three plans as rows, the middle one picked
  '/plans': () => (
    <div className="xa xa-plans">
      {PLAN_ROWS.map(([t, d], i) => <div key={t} className={i === 1 ? 'pick' : ''}><b>{t}</b><span>{d}</span></div>)}
    </div>
  ),

  // a real map with a planned route drawn on it
  '/routes': () => (
    <div className="xa xa-map">
      <img src="/img/tricity-osm.jpg" alt="" loading="lazy" />
      <svg viewBox="0 0 1040 630" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M268,330 C330,300 380,250 470,210 S620,170 700,150 C760,190 690,280 650,300 S560,360 600,440" />
        <circle cx="268" cy="330" r="12" /><circle cx="700" cy="150" r="12" /><circle cx="600" cy="440" r="12" />
      </svg>
      <small>© OpenStreetMap contributors</small>
    </div>
  ),

  // a WhatsApp-style exchange
  '/contact': () => (
    <div className="xa xa-chat">
      <p className="them">Hi! Evening shift on Saturday, Sector 17 and Elante?</p>
      <p className="us">Yes, it’s open. Sending your quote now.</p>
    </div>
  ),
}

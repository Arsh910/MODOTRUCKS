// Picture of how each plan uses the screen over a shift.
export function PlanDiagram({ id }) {
  if (id === 'whole') return (
    <div className="dia">
      <div className="dia-head"><span>8 AM</span><span>Morning shift</span><span>1 PM</span></div>
      <div className="dia-bar solo"><span>Your ad · nonstop</span><i className="playhead" /></div>
      <p className="dia-note">Nobody else on the screen. Every minute of the shift is yours.</p>
    </div>
  )
  if (id === 'shared') return (
    <div className="dia">
      <div className="dia-head"><span>One loop</span><span>about 3–6 minutes</span><span>then again</span></div>
      <div className="dia-bar loop">{['You', 'Brand 2', 'Brand 3', 'Brand 4', 'Brand 5', 'Brand 6'].map((b, i) => <span key={b} className={i ? '' : 'you'} style={{ '--i': i }}>{b}</span>)}</div>
      <div className="dia-pips"><span className="on" /><span className="on" /><span className="on" /><span /><span /><span /><em>Goes ahead at 3 brands</em></div>
    </div>
  )
  return (
    <div className="dia">
      {[4, 8, 10].map(h => (
        <div key={h} className="dia-row"><span>{h} hours</span><div className="dia-bar hours" style={{ '--w': h / 10 }}><span /></div></div>
      ))}
      <p className="dia-note">Add live filming and the screen shows your event as it happens.</p>
    </div>
  )
}

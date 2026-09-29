// A band of words that slides sideways forever (two copies side by side, so the loop is seamless).
export function Marquee({ items, tone = '' }) {
  const row = <div className="mq-row" aria-hidden="true">{items.map(t => <span key={t}>{t}</span>)}</div>
  return (
    <div className={`mq ${tone}`} role="presentation">
      <div className="mq-track">{row}{row}</div>
    </div>
  )
}

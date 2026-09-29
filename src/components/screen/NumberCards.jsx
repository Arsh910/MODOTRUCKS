import './screen.css'

// The numbers, as rows: what it is on the left, the figure on the right, the detail underneath.
export function NumberCards({ items }) {
  return (
    <section className="sec tight">
      <div className="wrap list2">
        <div className="list2-l"><h2 data-reveal>The truck in numbers</h2></div>
        <ul className="rows">
          {items.map(([v, t, d], i) => (
            <li key={t} data-reveal style={{ '--d': i }}><b>{t}</b><span>{v}</span><p>{d}</p></li>
          ))}
        </ul>
      </div>
    </section>
  )
}

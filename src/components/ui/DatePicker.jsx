import { useState } from 'react'
import './date-picker.css'

const pad = n => String(n).padStart(2, '0')
export const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const fmtDay = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) }

// Month calendar for picking one or more days. `value` is an array of 'YYYY-MM-DD'.
// Days before `min` and weekdays in `closed` (0 = Sun … 6 = Sat) can't be picked.
export function DatePicker({ value, onChange, min = new Date(), closed = [1], months = 4 }) {
  const first = new Date(min.getFullYear(), min.getMonth(), 1)
  const [month, setMonth] = useState(first)
  const y = month.getFullYear(), mo = month.getMonth()
  const lead = (new Date(y, mo, 1).getDay() + 6) % 7 // Monday-first grid
  const days = new Date(y, mo + 1, 0).getDate()
  const floor = new Date(min.getFullYear(), min.getMonth(), min.getDate())
  const last = new Date(first.getFullYear(), first.getMonth() + months - 1, 1)
  const toggle = d => onChange(value.includes(d) ? value.filter(x => x !== d) : [...value, d].sort())

  return (
    <div className="dp">
      <div className="dp-head">
        <button type="button" aria-label="Previous month" disabled={month <= first} onClick={() => setMonth(new Date(y, mo - 1, 1))}>‹</button>
        <b>{month.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</b>
        <button type="button" aria-label="Next month" disabled={month >= last} onClick={() => setMonth(new Date(y, mo + 1, 1))}>›</button>
      </div>
      <div className="dp-grid">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} className="dp-dow">{d}</span>)}
        {Array.from({ length: lead }, (_, i) => <span key={'b' + i} />)}
        {Array.from({ length: days }, (_, i) => {
          const date = new Date(y, mo, i + 1), d = iso(date)
          const off = date < floor || closed.includes(date.getDay())
          const on = value.includes(d)
          return (
            <button key={d} type="button" className="dp-day" disabled={off} aria-pressed={on} aria-label={fmtDay(d)} onClick={() => toggle(d)}>
              {i + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}

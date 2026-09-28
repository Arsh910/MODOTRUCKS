// Booking rules and calendar maths. Same rules as supabase/schema.sql; the database re-checks them on insert.

export const SHARE_SLOTS = 6, SHARE_MIN = 3, QUOTE_OVER = 7
export const SHIFT = { morning: { label: 'Morning', time: '8 AM – 1 PM', startH: 8, d: 'Office and school traffic, markets opening.' }, evening: { label: 'Evening', time: '5 PM – 10 PM', startH: 17, d: 'Home time, then markets. The screen glows after dark.' }, full: { label: 'Full day', time: 'Both shifts', startH: 8, d: 'Morning and evening, 10 hours on the road.' } }
export const BOOKING_PLANS = { whole: { t: 'Whole screen', d: 'Only your ad, all shift. You pick the route.' }, shared: { t: 'Share the screen', d: 'Up to 6 brands take turns, 30–60 s each, on repeat.' }, event: { t: 'Parked at your event', d: 'Openings, weddings, exhibitions, screenings.' } }
export const EVENT_HOURS = [4, 8, 10]
export const CREATIVE = { own: { t: "I'll send my ad", d: "We'll share the screen specs." }, modo: { t: 'MODO makes it', d: 'Our production team quotes it separately.' } }

export const pad = n => String(n).padStart(2, '0')
export const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const fromIso = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d) }
export const fmtShort = s => fromIso(s).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
export const inr = n => '₹' + Math.round(n).toLocaleString('en-IN')
const today = new Date(); today.setHours(0, 0, 0, 0)
export const firstBookable = new Date(today); firstBookable.setDate(today.getDate() + 2)
export const lastBookable = new Date(today); lastBookable.setDate(today.getDate() + 120)
export const refId = () => 'MODO-' + Math.random().toString(36).slice(2, 7).toUpperCase()

function covers(b) {
  if (b.status === 'cancelled') return []
  return (b.dates || []).flatMap(d => b.plan === 'event' || b.shift === 'full' ? [d + '|morning', d + '|evening'] : [d + '|' + b.shift])
}
export function slotMap(bookings) {
  const m = {}
  for (const b of bookings) for (const k of covers(b)) {
    m[k] ??= { exclusive: false, brands: [] }
    if (b.plan === 'shared') m[k].brands.push(b); else m[k].exclusive = true
  }
  return m
}
export function dayStatus(di, map, plan, shift) {
  const d = fromIso(di)
  if (d.getDay() === 1) return { ok: false, cls: 'closed', st: 'Closed' }
  if (d < firstBookable || d > lastBookable) return { ok: false, cls: 'past', st: '' }
  if (plan === 'shared') {
    const s = map[di + '|' + shift] || { exclusive: false, brands: [] }
    if (s.exclusive) return { ok: false, cls: 'taken', st: 'Booked' }
    const n = s.brands.length
    if (n >= SHARE_SLOTS) return { ok: false, cls: 'taken', st: 'Full', n }
    return { ok: true, cls: '', st: n >= SHARE_MIN ? 'Running' : n ? `${SHARE_MIN - n} to go` : 'Open', n }
  }
  for (const sh of plan === 'event' || shift === 'full' ? ['morning', 'evening'] : [shift]) {
    const s = map[di + '|' + sh]
    if (s && (s.exclusive || s.brands.length)) return { ok: false, cls: 'taken', st: s.exclusive ? 'Booked' : 'Shared' }
  }
  return { ok: true, cls: '', st: 'Open' }
}

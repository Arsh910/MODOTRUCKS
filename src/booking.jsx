import { useEffect, useMemo, useState, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

// Same rules as supabase/schema.sql. The database re-checks all of them on insert.
const SHARE_SLOTS = 6, SHARE_MIN = 3, QUOTE_OVER = 7
export const AREAS = { Chandigarh: ['Sector 17', 'Sector 35', 'Madhya Marg', 'Elante', 'Sukhna Lake'], Mohali: ['Phase 3B2', 'Sector 70', 'Airport Road', 'Aerocity', 'Kharar Road'], Zirakpur: ['VIP Road', 'Patiala Highway', 'Dhakoli'], Panchkula: ['Sector 5', 'Sector 20', 'MDC'] }
const SHIFT = { morning: { label: 'Morning', time: '8 AM – 1 PM', startH: 8, d: 'Office and school traffic, markets opening.' }, evening: { label: 'Evening', time: '5 PM – 10 PM', startH: 17, d: 'Home time, then markets. The screen glows after dark.' }, full: { label: 'Full day', time: 'Both shifts', startH: 8, d: 'Morning and evening, 10 hours on the road.' } }
export const PLANS = { whole: { t: 'Whole screen', d: 'Only your ad, all shift. You pick the route.' }, shared: { t: 'Share the screen', d: 'Up to 6 brands take turns, 30–60 s each, on repeat.' }, event: { t: 'Parked at your event', d: 'Openings, weddings, exhibitions, screenings.' } }
const EVENT_HOURS = [4, 8, 10]
const CREATIVE = { own: { t: "I'll send my ad", d: "We'll share the screen specs." }, modo: { t: 'MODO makes it', d: 'Our production team quotes it separately.' } }

const url = import.meta.env.VITE_SUPABASE_URL, key = import.meta.env.VITE_SUPABASE_ANON_KEY
const sb = url && key ? createClient(url, key) : null

const pad = n => String(n).padStart(2, '0')
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const fromIso = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d) }
const fmtShort = s => fromIso(s).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
const inr = n => '₹' + Math.round(n).toLocaleString('en-IN')
const today = new Date(); today.setHours(0, 0, 0, 0)
const firstBookable = new Date(today); firstBookable.setDate(today.getDate() + 2)
const lastBookable = new Date(today); lastBookable.setDate(today.getDate() + 120)
const refId = () => 'MODO-' + Math.random().toString(36).slice(2, 7).toUpperCase()

function covers(b) {
  if (b.status === 'cancelled') return []
  return (b.dates || []).flatMap(d => b.plan === 'event' || b.shift === 'full' ? [d + '|morning', d + '|evening'] : [d + '|' + b.shift])
}
function slotMap(bookings) {
  const m = {}
  for (const b of bookings) for (const k of covers(b)) {
    m[k] ??= { exclusive: false, brands: [] }
    if (b.plan === 'shared') m[k].brands.push(b); else m[k].exclusive = true
  }
  return m
}
function dayStatus(di, map, plan, shift) {
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

const toRow = r => ({ id: r.ref, plan: r.plan, shift: r.shift, hours: r.hours, live_film: r.liveFilm, dates: r.dates, outside_tricity: r.outsideTricity, creative: r.creative, business: r.business, contact: r.contact, phone: r.phone, email: r.email, areas: r.areas, notes: r.notes, status: r.status })
const fromRow = r => ({ id: r.id, ref: r.id, plan: r.plan, shift: r.shift, hours: r.hours, dates: r.dates || [], outsideTricity: r.outside_tricity, creative: r.creative, business: r.business, contact: r.contact, phone: r.phone, email: r.email, estTotal: r.est_total, listRate: r.list_rate, customQuote: r.custom_quote, status: r.status, createdAt: r.created_at })

// Bookings data + admin session, shared by the public form and the owner view.
export function useBookings() {
  const [bookings, setBookings] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const load = useCallback(async (admin = isAdmin) => {
    if (!sb) return
    if (admin) {
      const { data, error } = await sb.from('bookings').select('*').order('created_at', { ascending: false })
      if (!error) setBookings(data.map(fromRow))
    } else {
      // public visitors only get anonymous slot usage, never names or phones
      const { data, error } = await sb.rpc('get_slot_usage')
      if (!error) setBookings(data.map(r => ({ plan: r.plan, shift: r.shift, dates: [r.day], status: r.status })))
    }
  }, [isAdmin])
  useEffect(() => {
    if (!sb) return
    const check = async () => {
      const { data: { session } } = await sb.auth.getSession()
      let admin = false
      if (session) { const { data } = await sb.rpc('is_admin'); admin = !!data }
      setIsAdmin(admin); load(admin)
    }
    check()
    // defer: awaiting supabase calls inside this callback can deadlock the auth client
    const { data: sub } = sb.auth.onAuthStateChange(() => setTimeout(check, 0))
    return () => sub.subscription.unsubscribe()
  }, []) // eslint-disable-line
  useEffect(() => { const t = setInterval(() => load(), 60000); return () => clearInterval(t) }, [load])
  return { bookings, isAdmin, load, connected: !!sb }
}

export function Booking({ plan, setPlan, data }) {
  const { bookings, load, connected } = data
  const [shift, setShift] = useState('evening')
  const [hours, setHours] = useState(4)
  const [live, setLive] = useState(false)
  const [creative, setCreative] = useState('own')
  const [dates, setDates] = useState(() => new Set())
  const [areas, setAreas] = useState(() => new Set())
  const [month, setMonth] = useState(() => new Date(firstBookable.getFullYear(), firstBookable.getMonth(), 1))
  const [f, setF] = useState({ biz: '', name: '', phone: '', email: '', notes: '', outside: false })
  const [touched, setTouched] = useState(false)
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null)

  const map = useMemo(() => slotMap(bookings), [bookings])
  const status = useCallback(di => dayStatus(di, map, plan, shift), [map, plan, shift])
  const effShift = plan !== 'whole' && shift === 'full' ? 'evening' : shift
  useEffect(() => { if (effShift !== shift) setShift(effShift) }, [effShift, shift])
  // drop dates that stopped being bookable after a plan/shift change or a refresh
  useEffect(() => {
    setDates(prev => {
      let next = new Set([...prev].filter(d => status(d).ok))
      if (plan === 'event' && next.size > 1) next = new Set([[...next].sort()[0]])
      return next.size === prev.size ? prev : next
    })
  }, [status, plan])

  const toggle = (set, setter, v) => { const n = new Set(set); n.has(v) ? n.delete(v) : n.add(v); setter(n) }
  const pickDate = d => plan === 'event' ? setDates(dates.has(d) ? new Set() : new Set([d])) : toggle(dates, setDates, d)
  const quickPick = n => {
    const s = new Set(), d = new Date(firstBookable)
    while (s.size < n && d <= lastBookable) { const di = iso(d); if (status(di).ok) s.add(di); d.setDate(d.getDate() + 1) }
    setDates(s); setMonth(new Date(firstBookable.getFullYear(), firstBookable.getMonth(), 1))
  }
  const errors = []
  if (!dates.size) errors.push('Pick at least one date.')
  if (!f.biz.trim()) errors.push('Add your business name.')
  if (f.phone.replace(/\D/g, '').length < 10) errors.push('Add a phone number we can reach you on.')

  async function submit() {
    setTouched(true); setMsg('')
    if (errors.length || busy) return
    const bad = [...dates].filter(d => !status(d).ok)
    if (bad.length) { setMsg(`${bad.length} date${bad.length > 1 ? 's were' : ' was'} just taken. Check your dates and try again.`); return }
    const rec = { ref: refId(), plan, shift: plan === 'event' ? 'full' : shift, hours: plan === 'event' ? hours : null, liveFilm: plan === 'event' && live, dates: [...dates].sort(), outsideTricity: f.outside, creative, business: f.biz.trim(), contact: f.name.trim(), phone: f.phone.trim(), email: f.email.trim(), areas: plan === 'whole' ? [...areas] : [], notes: f.notes.trim(), status: plan === 'shared' ? 'pending' : 'new_request' }
    setBusy(true)
    try {
      if (!sb) throw { code: 'offline' }
      const { error } = await sb.from('bookings').insert(toRow(rec))
      if (error) throw error
      load(); setDone(rec); setDates(new Set()); setTouched(false); setF({ biz: '', name: '', phone: '', email: '', notes: '', outside: false })
      setTimeout(() => document.querySelector('.done')?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
    } catch (err) {
      const taken = /slot_taken|closed_day|too_soon/.test(err?.message || '')
      if (taken) load()
      setMsg(taken ? 'One of your dates was just taken or isn’t bookable. Pick again.' : err?.code === 'offline' ? 'Online booking isn’t connected yet. Call or WhatsApp +91 90560 05271.' : 'The request did not save. Check your connection and try again.')
    }
    setBusy(false)
  }

  if (done) {
    const steps = done.plan === 'shared'
      ? ['Your spot is reserved. Nothing is charged yet.', 'Each date runs once 3 brands have joined. We message you when it confirms, with your share.', 'If a date hasn’t reached 3 brands 48 hours before, it’s cancelled and you pay nothing.', done.creative === 'modo' ? 'Our production team will get in touch about your ad.' : 'Send your 30–60 second ad; we’ll share the screen specs.']
      : ['We confirm availability and send your quote the same day.', 'A 50% advance locks your dates.', done.creative === 'modo' ? 'Our production team will get in touch about your ad, quoted separately.' : 'Send your ad; we’ll check it on the screen.', 'Approve the final ad at least 48 hours before.', 'After the run you get the GPS log, photos and video.']
    return (
      <div className="done">
        <p className="label">{done.plan === 'shared' ? 'Spot reserved' : 'Request received'}</p>
        <h3>Thanks, {done.business}.</h3>
        <p className="ref">{done.ref}</p>
        <ol>{steps.map(s => <li key={s}>{s}</li>)}</ol>
        <button type="button" className="btn ghost" onClick={() => setDone(null)}>Make another request</button>
      </div>
    )
  }

  const y = month.getFullYear(), mo = month.getMonth()
  const lead = (new Date(y, mo, 1).getDay() + 6) % 7, days = new Date(y, mo + 1, 0).getDate()
  const sorted = [...dates].sort()
  const shifts = plan === 'whole' ? ['morning', 'evening', 'full'] : ['morning', 'evening']

  return (
    <div className="book-grid">
      <div className="book-steps">
        {!connected && <p className="offline">Online booking goes live soon. Until then, call or WhatsApp <a href="tel:+919056005271">+91 90560 05271</a>.</p>}

        <fieldset className="bstep">
          <legend><span>01</span>How do you want the screen?</legend>
          <div className="choices c3">
            {Object.entries(PLANS).map(([k, p]) => (
              <button key={k} type="button" className="choice" aria-pressed={plan === k} onClick={() => setPlan(k)}>
                <b>{p.t}</b><span>{p.d}</span>
              </button>
            ))}
          </div>
          {plan === 'shared' && <p className="fine">Reserving is free. A shared shift runs once 3 of 6 brands join; its cost is split between them. Not confirmed 48 hours before? It’s cancelled and you owe nothing.</p>}
        </fieldset>

        <fieldset className="bstep">
          <legend><span>02</span>{plan === 'event' ? 'How long at your event?' : 'Pick your shift'}</legend>
          <div className="choices c3">
            {plan === 'event'
              ? EVENT_HOURS.map(h => <button key={h} type="button" className="choice" aria-pressed={hours === h} onClick={() => setHours(h)}><b>{h} hours</b><span>Parked at your venue, screen on throughout.</span></button>)
              : shifts.map(k => <button key={k} type="button" className="choice" aria-pressed={shift === k} onClick={() => setShift(k)}><b>{SHIFT[k].label}</b><span className="mono">{SHIFT[k].time}</span><span>{SHIFT[k].d}</span></button>)}
          </div>
          {plan === 'event' && <label className="check"><input type="checkbox" checked={live} onChange={e => setLive(e.target.checked)} /> Add live filming: we film your event and show it on the screen as it happens.</label>}
        </fieldset>

        <fieldset className="bstep">
          <legend><span>03</span>Pick your dates</legend>
          <p className="fine">{plan === 'event' ? 'Pick one date for your event.' : plan === 'shared' ? 'Tap as many dates as you like. The ticks show how many brands have joined each shift.' : 'Tap as many dates as you like. Crossed-out dates are taken.'}</p>
          {plan !== 'event' && <div className="quick">
            <button type="button" onClick={() => quickPick(6)}>Next 6 open days</button>
            <button type="button" onClick={() => quickPick(26)}>Next 26 open days</button>
            <button type="button" onClick={() => setDates(new Set())}>Clear</button>
          </div>}
          <div className="cal-h">
            <h4>{month.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</h4>
            <div>
              <button type="button" aria-label="Previous month" disabled={new Date(y, mo, 1) <= new Date(firstBookable.getFullYear(), firstBookable.getMonth(), 1)} onClick={() => setMonth(new Date(y, mo - 1, 1))}>←</button>
              <button type="button" aria-label="Next month" disabled={new Date(y, mo + 1, 1) > lastBookable} onClick={() => setMonth(new Date(y, mo + 1, 1))}>→</button>
            </div>
          </div>
          <div className="cal">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <div key={i} className="dow">{d}</div>)}
            {Array.from({ length: lead }, (_, i) => <div key={'b' + i} />)}
            {Array.from({ length: days }, (_, i) => {
              const di = iso(new Date(y, mo, i + 1)), st = status(di), sel = dates.has(di)
              const n = st.n !== undefined ? st.n + (sel ? 1 : 0) : null
              return (
                <button key={di} type="button" className={`day ${st.cls} ${sel ? 'sel' : ''}`} disabled={!st.ok && !sel} aria-pressed={sel}
                  aria-label={`${fmtShort(di)}, ${st.st || 'unavailable'}`} onClick={() => pickDate(di)}>
                  <span className="dn">{i + 1}</span>
                  {plan === 'shared' && n !== null && <span className="ticks" aria-hidden="true">{Array.from({ length: 6 }, (_, j) => <i key={j} className={j < n ? 'on' : ''} />)}</span>}
                  <span className="st">{st.st}</span>
                </button>
              )
            })}
          </div>
          <p className="fine">Closed Mondays. The earliest date is 2 days out, so your ad can be approved in time.</p>
        </fieldset>

        <fieldset className="bstep">
          <legend><span>04</span>Your details</legend>
          <div className="fields">
            {[['biz', 'Business name', 'organization', 'text'], ['name', 'Your name', 'name', 'text'], ['phone', 'Phone or WhatsApp', 'tel', 'tel'], ['email', 'Email', 'email', 'email']].map(([k, l, ac, type]) => (
              <label key={k} className="field"><span>{l}</span>
                <input type={type} autoComplete={ac} inputMode={type === 'tel' ? 'tel' : undefined} value={f[k]} onChange={e => setF({ ...f, [k]: e.target.value })} aria-invalid={touched && ((k === 'biz' && !f.biz.trim()) || (k === 'phone' && f.phone.replace(/\D/g, '').length < 10))} />
              </label>
            ))}
          </div>
          <div className="field"><span>{plan === 'whole' ? 'Where should the truck go? Pick any' : plan === 'shared' ? 'Route' : 'Event location'}</span>
            {plan === 'whole'
              ? <div className="area-grid">{Object.entries(AREAS).map(([c, l]) => (
                  <div key={c}><p className="mono">{c}</p><div className="quick">{l.map(a => <button key={a} type="button" aria-pressed={areas.has(c + ': ' + a)} onClick={() => toggle(areas, setAreas, c + ': ' + a)}>{a}</button>)}</div></div>
                ))}</div>
              : <p className="fine">{plan === 'shared' ? 'Shared shifts run a set route through busy areas, since six brands share the truck.' : 'Add the venue address in the notes below.'}</p>}
          </div>
          <label className="check"><input type="checkbox" checked={f.outside} onChange={e => setF({ ...f, outside: e.target.checked })} /> Going outside the Tricity. Travel is quoted separately; add the place in the notes.</label>
          <div className="field"><span>Your ad</span>
            <div className="choices c2">{Object.entries(CREATIVE).map(([k, c]) => <button key={k} type="button" className="choice" aria-pressed={creative === k} onClick={() => setCreative(k)}><b>{c.t}</b><span>{c.d}</span></button>)}</div>
          </div>
          <label className="field"><span>Anything else? Your offer, launch date, event address or destination</span><textarea rows="3" value={f.notes} onChange={e => setF({ ...f, notes: e.target.value })} /></label>
        </fieldset>
      </div>

      <aside className="summary" aria-label="Booking summary">
        <p className="label">Your request</p>
        <dl>
          <div><dt>Plan</dt><dd>{PLANS[plan].t}</dd></div>
          <div><dt>{plan === 'event' ? 'Duration' : 'Shift'}</dt><dd>{plan === 'event' ? `${hours} hours${live ? ' + live filming' : ''}` : `${SHIFT[shift].label}, ${SHIFT[shift].time}`}</dd></div>
          <div><dt>Dates</dt><dd>{sorted.length || '—'}</dd></div>
          <div><dt>Your ad</dt><dd>{CREATIVE[creative].t}</dd></div>
        </dl>
        {sorted.length > 0 && <p className="datelist">{sorted.slice(0, 8).map(fmtShort).join(', ')}{sorted.length > 8 ? ` and ${sorted.length - 8} more` : ''}</p>}
        <p className="next">{!sorted.length ? 'Pick dates on the calendar to continue.' : plan !== 'event' && sorted.length > QUOTE_OVER ? 'More than 7 days, so you’ll get a custom quote for your run.' : plan === 'shared' ? 'Reserve free. We send your share once 3 brands confirm the shift.' : 'We confirm availability and send your quote the same day.'}</p>
        {touched && errors.map(e => <p key={e} className="err">{e}</p>)}
        {msg && <p className="err">{msg}</p>}
        <button type="button" className="btn solid block" disabled={!sorted.length || busy} onClick={submit}>{busy ? 'Sending…' : plan === 'shared' ? 'Reserve my spot' : 'Send booking request'} <span aria-hidden="true">→</span></button>
        <p className="fine">You get a reference number straight away. We reply on WhatsApp and email the same day.</p>
      </aside>
    </div>
  )
}

export function Admin({ data }) {
  const { bookings, isAdmin, load } = data
  const [email, setEmail] = useState(''), [note, setNote] = useState(''), [armed, setArmed] = useState(null)
  if (!sb) return <div className="admin"><h2>Bookings</h2><p>Supabase isn’t configured. Add the keys to <code>.env</code>.</p><a className="btn ghost" href="/">Back to site</a></div>
  if (!isAdmin) return (
    <div className="admin narrow">
      <h2>Owner sign in</h2>
      <p className="fine">We email you a one-time sign-in link.</p>
      <label className="field"><span>Email</span><input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></label>
      <button className="btn solid" onClick={async () => {
        if (!email.trim()) return
        const { error } = await sb.auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: location.origin + '/admin' } })
        setNote(error ? 'Couldn’t send the link. Check the email and try again.' : 'Check your inbox for the sign-in link.')
      }}>Send sign-in link</button>
      {note && <p className="fine">{note}</p>}
      <a className="link" href="/">Back to site</a>
    </div>
  )
  const act = async (fn) => { await fn; load() }
  const map = slotMap(bookings), now = new Date()
  const pools = Object.entries(map).filter(([, s]) => s.brands.length).map(([k, s]) => {
    const [date, shift] = k.split('|'), n = s.brands.length
    const start = fromIso(date); start.setHours(SHIFT[shift].startH)
    const cutoff = new Date(start - 48 * 3600e3)
    const rate = s.brands[0].listRate || 0
    return { k, date, shift, n, cutoff, st: n >= SHARE_MIN ? 'Running' : now > cutoff ? 'Missed cut-off' : `Needs ${SHARE_MIN - n} more`, share: rate * SHARE_SLOTS / Math.max(n, SHARE_MIN), brands: s.brands.map(b => b.business).join(', ') }
  }).sort((a, b) => a.k.localeCompare(b.k))
  const active = bookings.filter(b => b.status !== 'cancelled')
  const label = { pending: 'Waiting for brands', new_request: 'Send quote', awaiting_payment: 'Awaiting payment', confirmed: 'Confirmed', cancelled: 'Cancelled' }
  return (
    <div className="admin">
      <div className="admin-h"><h2>Truck bookings</h2><div><a className="link" href="/">Back to site</a> <button className="link" onClick={() => sb.auth.signOut()}>Sign out</button></div></div>
      <div className="kpis">
        <div><b>{active.length}</b><span>Requests</span></div>
        <div><b>{inr(active.reduce((a, b) => a + (b.estTotal || 0), 0))}</b><span>Estimated value incl. GST</span></div>
        <div><b>{pools.filter(p => p.n >= SHARE_MIN).length}/{pools.length}</b><span>Shared shifts running</span></div>
        <div><b>{active.filter(b => b.creative === 'modo').length}</b><span>Want MODO to make the ad</span></div>
      </div>
      <h3>Shared shifts</h3>
      <div className="tbl"><table><thead><tr><th>Date</th><th>Shift</th><th>Brands</th><th>Status</th><th className="r">Each pays</th><th>Cut-off</th></tr></thead><tbody>
        {pools.length ? pools.map(p => <tr key={p.k}><td>{fmtShort(p.date)}</td><td>{SHIFT[p.shift].label}</td><td><b>{p.n}/6</b> <span className="muted">{p.brands}</span></td><td>{p.st}</td><td className="r">{inr(p.share)}</td><td className="muted">{p.cutoff.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })}</td></tr>)
          : <tr><td colSpan="6" className="muted">No shared bookings yet.</td></tr>}
      </tbody></table></div>
      <h3>All requests</h3>
      <div className="tbl"><table><thead><tr><th>Ref</th><th>Business</th><th>Plan</th><th>Dates</th><th>Status</th><th className="r">Estimate</th><th /></tr></thead><tbody>
        {bookings.length ? bookings.map(b => (
          <tr key={b.id}>
            <td className="mono">{b.ref}</td>
            <td><b>{b.business}</b><br /><span className="muted">{b.contact} {b.phone}</span>{b.creative === 'modo' && <><br /><span className="muted">MODO makes the ad</span></>}{b.outsideTricity && <><br /><span className="muted">Outside Tricity</span></>}{b.customQuote && <><br /><span className="muted">Custom quote, 7+ days</span></>}</td>
            <td>{PLANS[b.plan]?.t || b.plan}<br /><span className="muted">{b.plan === 'event' ? b.hours + ' hours' : SHIFT[b.shift]?.label}</span></td>
            <td className="muted">{b.dates.length} · {b.dates.slice(0, 3).map(fmtShort).join(', ')}{b.dates.length > 3 ? '…' : ''}</td>
            <td>{label[b.status] || b.status}</td>
            <td className="r">{inr(b.estTotal || 0)}</td>
            <td className="acts">
              {b.status !== 'confirmed' && b.status !== 'cancelled' && <button className="link" onClick={() => act(sb.from('bookings').update({ status: 'confirmed' }).eq('id', b.id))}>Confirm</button>}
              {b.status !== 'cancelled' && <button className="link" onClick={() => act(sb.from('bookings').update({ status: 'cancelled' }).eq('id', b.id))}>Cancel</button>}
              <button className="link bad" onClick={() => armed === b.id ? act(sb.from('bookings').delete().eq('id', b.id)) : setArmed(b.id)}>{armed === b.id ? 'Tap again to delete' : 'Delete'}</button>
            </td>
          </tr>
        )) : <tr><td colSpan="7" className="muted">No requests yet.</td></tr>}
      </tbody></table></div>
    </div>
  )
}

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createBooking } from '../../services/bookings.js'
import { AREAS } from '../../data/routes.js'
import { QUOTE_OVER, SHIFT, BOOKING_PLANS, EVENT_HOURS, CREATIVE, iso, fmtShort, firstBookable, lastBookable, refId, slotMap, dayStatus } from './rules.js'

// The booking request form: plan, shift, dates on a live calendar, details. Not mounted on a page yet.
export function BookingForm({ plan, setPlan, data }) {
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

  const toggle = (set, setter, v) => { const n = new Set(set); if (n.has(v)) n.delete(v); else n.add(v); setter(n) }
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
      await createBooking(rec)
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
            {Object.entries(BOOKING_PLANS).map(([k, p]) => (
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
          <div><dt>Plan</dt><dd>{BOOKING_PLANS[plan].t}</dd></div>
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

import { useState } from 'react'
import { isConnected, sendSignInLink, signOut, setBookingStatus, deleteBooking } from '../../services/bookings.js'
import { SHARE_SLOTS, SHARE_MIN, SHIFT, BOOKING_PLANS, fromIso, fmtShort, inr, slotMap } from './rules.js'

// Owner view: sign in with a magic link, then see and manage every request.
export function AdminPanel({ data }) {
  const { bookings, isAdmin, load } = data
  const [email, setEmail] = useState(''), [note, setNote] = useState(''), [armed, setArmed] = useState(null)
  if (!isConnected()) return <div className="admin"><h2>Bookings</h2><p>Supabase isn’t configured. Add the keys to <code>.env</code>.</p><a className="btn ghost" href="/">Back to site</a></div>
  if (!isAdmin) return (
    <div className="admin narrow">
      <h2>Owner sign in</h2>
      <p className="fine">We email you a one-time sign-in link.</p>
      <label className="field"><span>Email</span><input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></label>
      <button className="btn solid" onClick={async () => {
        if (!email.trim()) return
        const { error } = await sendSignInLink(email.trim())
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
      <div className="admin-h"><h2>Truck bookings</h2><div><a className="link" href="/">Back to site</a> <button className="link" onClick={signOut}>Sign out</button></div></div>
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
            <td>{BOOKING_PLANS[b.plan]?.t || b.plan}<br /><span className="muted">{b.plan === 'event' ? b.hours + ' hours' : SHIFT[b.shift]?.label}</span></td>
            <td className="muted">{b.dates.length} · {b.dates.slice(0, 3).map(fmtShort).join(', ')}{b.dates.length > 3 ? '…' : ''}</td>
            <td>{label[b.status] || b.status}</td>
            <td className="r">{inr(b.estTotal || 0)}</td>
            <td className="acts">
              {b.status !== 'confirmed' && b.status !== 'cancelled' && <button className="link" onClick={() => act(setBookingStatus(b.id, 'confirmed'))}>Confirm</button>}
              {b.status !== 'cancelled' && <button className="link" onClick={() => act(setBookingStatus(b.id, 'cancelled'))}>Cancel</button>}
              <button className="link bad" onClick={() => armed === b.id ? act(deleteBooking(b.id)) : setArmed(b.id)}>{armed === b.id ? 'Tap again to delete' : 'Delete'}</button>
            </td>
          </tr>
        )) : <tr><td colSpan="7" className="muted">No requests yet.</td></tr>}
      </tbody></table></div>
    </div>
  )
}

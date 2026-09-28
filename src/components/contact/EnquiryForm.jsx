import { useRef, useState } from 'react'
import { sendEnquiry, whatsappLink } from '../../services/enquiries.js'
import { PHONE } from '../../config/site.js'
import { DatePicker, fmtDay } from '../ui/DatePicker.jsx'
import { Modal } from '../ui/Modal.jsx'

const PLAN_OPTIONS = [['whole', 'Whole screen', 'Only your ad, all shift'], ['shared', 'Share the screen', 'Up to 6 brands take turns'], ['event', 'Parked at your event', '4, 8 or 10 hours'], ['', 'Not sure yet', 'We’ll help you pick']]
const EMPTY = { name: '', business: '', phone: '', email: '', plan: '', dates: [], time: '', message: '' }
const STEPS = ['About you', 'What you need', 'Anything else']

// Start times offered in the time picker: every 30 min within each shift.
const halfHours = (from, to) => Array.from({ length: (to - from) * 2 }, (_, i) => `${String(from + (i >> 1)).padStart(2, '0')}:${i % 2 ? '30' : '00'}`)
const SLOTS = [['Morning shift · 8 AM – 1 PM', halfHours(8, 13)], ['Evening shift · 5 PM – 10 PM', halfHours(17, 22)]]
const to12 = t => { const [h, m] = t.split(':').map(Number); return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}` }

// Which fields each step checks before moving on.
const check = (f, step) => ({
  ...(step === 0 && {
    name: !f.name.trim() && 'Add your name.',
    phone: f.phone.replace(/\D/g, '').length < 10 && 'Add a phone number we can reach you on.',
    email: f.email && !/^\S+@\S+\.\S+$/.test(f.email) && 'Check the email address.',
  }),
})

// "Prefer to write?" as a 3-step wizard. Sends to the API; with no API configured it hands over to WhatsApp.
export function EnquiryForm() {
  const [f, setF] = useState(EMPTY)
  const [step, setStep] = useState(0)
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const [tried, setTried] = useState(false)
  const [picker, setPicker] = useState(null) // 'dates' | 'time' | null
  const box = useRef(null)
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const errors = check(f, step)
  const stepOk = !Object.values(errors).some(Boolean)

  const go = n => {
    setTried(false); setStep(n)
    requestAnimationFrame(() => box.current?.querySelector('input, textarea, button.ef-plan')?.focus({ preventScroll: true }))
  }
  const next = () => { setTried(true); if (stepOk) go(step + 1) }

  async function submit(e) {
    e.preventDefault()
    if (step < STEPS.length - 1) return next()
    if (state === 'sending') return
    const data = Object.fromEntries(Object.entries(f).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]))
    setState('sending')
    try {
      await sendEnquiry(data)
      setState('sent'); setF(EMPTY); setStep(0)
    } catch (err) {
      if (err?.code === 'no_api') { window.open(whatsappLink(data), '_blank', 'noopener'); setState('idle'); return }
      setState('error')
    }
  }

  if (state === 'sent') return (
    <div className="ef-done" role="status">
      <h3>Thanks, we’ve got it.</h3>
      <p>We reply on WhatsApp or email the same day.</p>
      <button type="button" className="dark-btn" onClick={() => setState('idle')}>Send another</button>
    </div>
  )

  const field = (k, label, props = {}) => (
    <label className="ef-field">
      <span>{label}</span>
      <input value={f[k]} onChange={set(k)} aria-invalid={tried && !!errors[k]} {...props} />
      {tried && errors[k] && <em>{errors[k]}</em>}
    </label>
  )
  const planName = PLAN_OPTIONS.find(([v]) => v === f.plan)?.[1]

  return (
    <form className="ef" onSubmit={submit} noValidate>
      <ol className="ef-steps" aria-label="Steps">
        {STEPS.map((s, i) => (
          <li key={s} className={i === step ? 'on' : i < step ? 'done' : ''} aria-current={i === step ? 'step' : undefined}>
            <button type="button" disabled={i > step} onClick={() => go(i)}><i>{i < step ? '✓' : i + 1}</i><span>{s}</span></button>
          </li>
        ))}
      </ol>

      <div className="ef-body" key={step} ref={box}>
        {step === 0 && (
          <div className="ef-grid">
            {field('name', 'Your name *', { autoComplete: 'name' })}
            {field('business', 'Business', { autoComplete: 'organization' })}
            {field('phone', 'Phone or WhatsApp *', { type: 'tel', inputMode: 'tel', autoComplete: 'tel' })}
            {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
          </div>
        )}
        {step === 1 && (
          <div className="ef-grid">
            <div className="ef-field wide">
              <span>Which plan?</span>
              <div className="ef-plans" role="radiogroup">
                {PLAN_OPTIONS.map(([v, t, d]) => (
                  <button key={t} type="button" role="radio" aria-checked={f.plan === v} className="ef-plan" onClick={() => setF({ ...f, plan: v })}>
                    <b>{t}</b><small>{d}</small>
                  </button>
                ))}
              </div>
            </div>
            <div className="ef-field">
              <span>Dates</span>
              <button type="button" className="ef-pick" onClick={() => setPicker('dates')}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v14H4ZM4 10h16M8 3v5M16 3v5" /></svg>
                {f.dates.length ? (f.dates.length > 2 ? `${f.dates.length} days picked` : f.dates.map(fmtDay).join(', ')) : 'Pick dates'}
              </button>
            </div>
            <div className="ef-field">
              <span>Start time</span>
              <button type="button" className="ef-pick" onClick={() => setPicker('time')}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3.5 2" /></svg>
                {f.time ? to12(f.time) : 'Pick a time'}
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="ef-grid">
            <label className="ef-field wide">
              <span>Message</span>
              <textarea rows="4" value={f.message} onChange={set('message')} placeholder="Areas, your offer, launch date, event venue…" />
            </label>
            <dl className="ef-sum wide">
              <div><dt>Name</dt><dd>{f.name}{f.business && `, ${f.business}`}</dd></div>
              <div><dt>Contact</dt><dd>{f.phone}{f.email && ` · ${f.email}`}</dd></div>
              <div><dt>Plan</dt><dd>{planName || 'Not sure yet'}</dd></div>
              <div><dt>Dates</dt><dd>{f.dates.length ? f.dates.map(fmtDay).join(', ') : '—'}{f.time && ` · from ${to12(f.time)}`}</dd></div>
            </dl>
          </div>
        )}
      </div>

      <Modal open={picker === 'dates'} onClose={() => setPicker(null)} title="Pick your dates">
        <DatePicker value={f.dates} onChange={dates => setF({ ...f, dates })} />
        <div className="modal-foot"><small>Tap one or more · closed Mondays</small><button type="button" className="orange-btn" onClick={() => setPicker(null)}>Done</button></div>
      </Modal>
      <Modal open={picker === 'time'} onClose={() => setPicker(null)} title="Pick a start time">
        <div className="ts">
          {SLOTS.map(([label, times]) => (
            <div key={label}>
              <h4>{label}</h4>
              <div className="ts-grid">{times.map(t => <button key={t} type="button" aria-pressed={f.time === t} onClick={() => { setF({ ...f, time: t }); setPicker(null) }}>{to12(t)}</button>)}</div>
            </div>
          ))}
        </div>
      </Modal>

      <div className="ef-foot">
        {state === 'error' && <p className="ef-err">That didn’t send. Try again, or call {PHONE}.</p>}
        {step > 0 && <button type="button" className="ef-back" onClick={() => go(step - 1)}>← Back</button>}
        <button type="submit" className="orange-btn" disabled={state === 'sending'}>
          {step < STEPS.length - 1 ? 'Next →' : state === 'sending' ? 'Sending…' : 'Send enquiry'}
        </button>
      </div>
    </form>
  )
}

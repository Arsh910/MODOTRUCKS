import { post } from './api.js'
import { WHATSAPP } from '../config/site.js'

// Contact form -> POST /enquiries  { name, business, phone, email, plan, dates: ['YYYY-MM-DD', ...], time: 'HH:MM', message }
export const sendEnquiry = data => post('/enquiries', data)

// Fallback when there's no API yet: the same details as a ready-to-send WhatsApp message.
const PLAN_NAMES = { whole: 'Whole screen', shared: 'Share the screen', event: 'Parked at your event' }

export function whatsappLink(d) {
  const lines = [`Hi MODO, I'm ${d.name}${d.business ? ` from ${d.business}` : ''}.`, d.plan && `Plan: ${PLAN_NAMES[d.plan] || d.plan}`, d.dates?.length && `Dates: ${d.dates.join(', ')}`, d.time && `Start time: ${d.time}`, d.message, `Phone: ${d.phone}`, d.email && `Email: ${d.email}`]
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.filter(Boolean).join('\n'))}`
}

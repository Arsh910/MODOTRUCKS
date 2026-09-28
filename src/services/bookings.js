import { supabase as sb } from './supabase.js'

// Every call the site makes to the bookings backend lives here, so the UI never talks to Supabase directly.
// Column names follow supabase/schema.sql.

const toRow = r => ({ id: r.ref, plan: r.plan, shift: r.shift, hours: r.hours, live_film: r.liveFilm, dates: r.dates, outside_tricity: r.outsideTricity, creative: r.creative, business: r.business, contact: r.contact, phone: r.phone, email: r.email, areas: r.areas, notes: r.notes, status: r.status })
const fromRow = r => ({ id: r.id, ref: r.id, plan: r.plan, shift: r.shift, hours: r.hours, dates: r.dates || [], outsideTricity: r.outside_tricity, creative: r.creative, business: r.business, contact: r.contact, phone: r.phone, email: r.email, estTotal: r.est_total, listRate: r.list_rate, customQuote: r.custom_quote, status: r.status, createdAt: r.created_at })

export const isConnected = () => !!sb

// Public visitors only get anonymous slot usage, never names or phones.
export async function fetchSlotUsage() {
  const { data, error } = await sb.rpc('get_slot_usage')
  if (error) throw error
  return data.map(r => ({ plan: r.plan, shift: r.shift, dates: [r.day], status: r.status }))
}

// Admins get every booking.
export async function fetchAllBookings() {
  const { data, error } = await sb.from('bookings').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data.map(fromRow)
}

export async function createBooking(rec) {
  if (!sb) throw { code: 'offline' }
  const { error } = await sb.from('bookings').insert(toRow(rec))
  if (error) throw error
}

export const setBookingStatus = (id, status) => sb.from('bookings').update({ status }).eq('id', id)
export const deleteBooking = id => sb.from('bookings').delete().eq('id', id)

// Admin auth (magic link).
export async function checkIsAdmin() {
  const { data: { session } } = await sb.auth.getSession()
  if (!session) return false
  const { data } = await sb.rpc('is_admin')
  return !!data
}
export const onAuthChange = cb => sb.auth.onAuthStateChange(() => setTimeout(cb, 0)).data.subscription // defer: awaiting inside can deadlock the client
export const sendSignInLink = email => sb.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + '/admin' } })
export const signOut = () => sb.auth.signOut()

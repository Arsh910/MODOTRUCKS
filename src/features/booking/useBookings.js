import { useCallback, useEffect, useState } from 'react'
import { isConnected, fetchSlotUsage, fetchAllBookings, checkIsAdmin, onAuthChange } from '../../services/bookings.js'

// Bookings data + admin session, shared by the public form and the owner view.
export function useBookings() {
  const [bookings, setBookings] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const load = useCallback(async (admin = isAdmin) => {
    if (!isConnected()) return
    try { setBookings(admin ? await fetchAllBookings() : await fetchSlotUsage()) } catch { /* keep the last good data */ }
  }, [isAdmin])
  useEffect(() => {
    if (!isConnected()) return
    const check = async () => { const admin = await checkIsAdmin(); setIsAdmin(admin); load(admin) }
    check()
    const sub = onAuthChange(check)
    return () => sub.unsubscribe()
  }, []) // eslint-disable-line
  useEffect(() => { const t = setInterval(() => load(), 60000); return () => clearInterval(t) }, [load])
  return { bookings, isAdmin, load, connected: isConnected() }
}

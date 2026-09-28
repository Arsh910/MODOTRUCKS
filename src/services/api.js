// Thin wrapper for the backend API. Set VITE_API_URL in .env (see .env.example).
const BASE = import.meta.env.VITE_API_URL?.replace(/\/+$/, '')

export const hasApi = () => !!BASE

export async function post(path, body) {
  if (!BASE) throw { code: 'no_api' }
  const res = await fetch(BASE + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  if (!res.ok) throw { code: 'http', status: res.status }
  return res.status === 204 ? null : res.json().catch(() => null)
}

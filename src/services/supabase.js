import { createClient } from '@supabase/supabase-js'

// One Supabase client for the whole app, or null when the keys aren't set (see .env.example).
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = url && key ? createClient(url, key) : null

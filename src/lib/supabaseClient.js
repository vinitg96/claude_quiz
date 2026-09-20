import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't throw here: this module is imported (transitively, via the page
  // components) from App.jsx's static route table, so throwing at import time
  // would break every page — including Home, which needs no Supabase data —
  // whenever .env isn't set up yet. Log instead and let the actual failed
  // requests surface through each page's existing error state.
  console.error(
    'Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY em um arquivo .env (veja .env.example).',
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
)

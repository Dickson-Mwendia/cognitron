import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      `Supabase not configured. NEXT_PUBLIC_SUPABASE_URL=${url ? 'set' : 'MISSING'}, NEXT_PUBLIC_SUPABASE_ANON_KEY=${key ? 'set' : 'MISSING'}. Restart your dev server after editing .env.local.`
    )
  }

  return createBrowserClient<Database>(url, key)
}

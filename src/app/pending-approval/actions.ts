'use server'

import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/types'

export async function checkApprovalStatus(): Promise<{ approved: boolean }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { approved: false }
  }

  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { approved: false }

    const { data } = await supabase
      .from('profiles')
      .select('approved')
      .eq('user_id', user.id)
      .single()

    const profile = data as Pick<Profile, 'approved'> | null
    return { approved: profile?.approved ?? false }
  } catch {
    return { approved: false }
  }
}

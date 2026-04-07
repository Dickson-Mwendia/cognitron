'use server'

import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']

/** Shape returned to the client for each pending user. */
export type PendingUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  signedUpAt: string
}

/**
 * Verify the caller is an authenticated admin. Returns the admin's profile
 * or throws/returns null if not authorized.
 */
async function getAdminProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const profile = data as Profile | null
  if (!profile || profile.role !== 'admin') return null
  return profile
}

/**
 * Get a Supabase admin client using the service role key.
 * Returns null if env vars are missing (dev mode).
 */
function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) return null

  return createServiceClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

/**
 * Fetch all unapproved profiles from Supabase.
 * Uses the service-role client so RLS doesn't block the query.
 */
export async function getPendingUsers(): Promise<PendingUser[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return []

  const adminProfile = await getAdminProfile()
  if (!adminProfile) return []

  const adminClient = getAdminClient()
  if (!adminClient) return []

  const { data, error } = await adminClient
    .from('profiles')
    .select('id, first_name, last_name, role, created_at, user_id')
    .eq('approved', false)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getPendingUsers error:', error.message)
    return []
  }

  if (!data || data.length === 0) return []

  // Batch-fetch emails from auth.users via the admin API
  const users: PendingUser[] = []
  for (const row of data) {
    let email = ''
    try {
      const { data: authUser } = await adminClient.auth.admin.getUserById(row.user_id)
      email = authUser?.user?.email ?? ''
    } catch {
      // If we can't get the email, still show the user
    }

    users.push({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email,
      role: row.role,
      signedUpAt: new Date(row.created_at).toISOString().split('T')[0],
    })
  }

  return users
}

export async function approveUser(userId: string) {
  // Dev mode fallback — no Supabase configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn('[dev] approveUser called without Supabase — returning mock success')
    return { success: true }
  }

  // Auth check: caller must be an admin
  const adminProfile = await getAdminProfile()
  if (!adminProfile) {
    return { success: false, error: 'Unauthorized. Admin access required.' }
  }

  const adminClient = getAdminClient()
  if (!adminClient) {
    return { success: false, error: 'Server configuration error.' }
  }

  const { error } = await adminClient
    .from('profiles')
    .update({
      approved: true,
      approved_at: new Date().toISOString(),
      approved_by: adminProfile.id,
    })
    .eq('id', userId)

  if (error) {
    console.error('approveUser error:', error.message)
    return { success: false, error: 'Failed to approve user. Please try again.' }
  }

  return { success: true }
}

export async function rejectUser(userId: string) {
  // Dev mode fallback — no Supabase configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn('[dev] rejectUser called without Supabase — returning mock success')
    return { success: true }
  }

  // Auth check: caller must be an admin
  const adminProfile = await getAdminProfile()
  if (!adminProfile) {
    return { success: false, error: 'Unauthorized. Admin access required.' }
  }

  const adminClient = getAdminClient()
  if (!adminClient) {
    return { success: false, error: 'Server configuration error.' }
  }

  // Look up the user_id from the profile so we can delete from auth.users
  const { data: targetProfile, error: lookupError } = await adminClient
    .from('profiles')
    .select('user_id')
    .eq('id', userId)
    .single()

  if (lookupError || !targetProfile) {
    return { success: false, error: 'User not found.' }
  }

  // Delete from auth.users — this cascades to profiles
  const { error } = await adminClient.auth.admin.deleteUser(
    targetProfile.user_id,
  )

  if (error) {
    console.error('rejectUser error:', error.message)
    return { success: false, error: 'Failed to reject user. Please try again.' }
  }

  return { success: true }
}

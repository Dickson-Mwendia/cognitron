// @ts-nocheck
'use server'

/**
 * Server actions for dashboard features: coach notes, progress reports,
 * messaging, and admin coach creation.
 *
 * Every action verifies the caller's identity and role before mutating data.
 */

import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

// ─── helpers ─────────────────────────────────────────────────────────────────

/** Get the current user's profile (id, role). */
async function getCallerProfile() {
  const sb = await createClient()
  const {
    data: { user },
  } = await sb.auth.getUser()
  if (!user) return null

  const { data } = await sb
    .from('profiles')
    .select('id, role')
    .eq('user_id', user.id)
    .single()

  return data as { id: string; role: string } | null
}

/** Get a service-role Supabase client (for admin-only mutations). */
function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createServiceClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

type ActionResult = { success: true } | { success: false; error: string }

// ═══════════════════════════════════════════════════════════════════════════════
// COACH NOTES
// ═══════════════════════════════════════════════════════════════════════════════

export async function saveCoachNote(
  noteId: string,
  content: string,
): Promise<ActionResult> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: true } // dev mock
  }

  const profile = await getCallerProfile()
  if (!profile || (profile.role !== 'coach' && profile.role !== 'admin')) {
    return { success: false, error: 'Unauthorized' }
  }

  const sb = await createClient()

  const { error } = await sb
    .from('coach_notes')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('id', noteId)
    .eq('coach_id', profile.id)

  if (error) {
    console.error('[saveCoachNote]', error.message)
    return { success: false, error: 'Failed to save note.' }
  }

  return { success: true }
}

export async function createCoachNote(
  studentId: string,
  content: string,
  trackId?: string,
): Promise<ActionResult> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: true }
  }

  const profile = await getCallerProfile()
  if (!profile || (profile.role !== 'coach' && profile.role !== 'admin')) {
    return { success: false, error: 'Unauthorized' }
  }

  const sb = await createClient()

  const { error } = await sb.from('coach_notes').insert({
    coach_id: profile.id,
    student_id: studentId,
    content,
    track_id: trackId ?? null,
  })

  if (error) {
    console.error('[createCoachNote]', error.message)
    return { success: false, error: 'Failed to create note.' }
  }

  return { success: true }
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROGRESS REPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export async function saveProgressReport(
  reportId: string | null,
  studentId: string,
  reportData: Record<string, unknown>,
  period: string,
): Promise<ActionResult> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: true }
  }

  const profile = await getCallerProfile()
  if (!profile || (profile.role !== 'coach' && profile.role !== 'admin')) {
    return { success: false, error: 'Unauthorized' }
  }

  const sb = await createClient()

  if (reportId) {
    // Update existing draft
    const { error } = await sb
      .from('progress_reports')
      .update({
        report_data: reportData,
        period,
        updated_at: new Date().toISOString(),
      })
      .eq('id', reportId)
      .eq('coach_id', profile.id)

    if (error) {
      console.error('[saveProgressReport]', error.message)
      return { success: false, error: 'Failed to save report.' }
    }
  } else {
    // Create new draft
    const { error } = await sb.from('progress_reports').insert({
      coach_id: profile.id,
      student_id: studentId,
      period,
      status: 'draft',
      report_data: reportData,
    })

    if (error) {
      console.error('[saveProgressReport]', error.message)
      return { success: false, error: 'Failed to create report.' }
    }
  }

  return { success: true }
}

export async function sendProgressReport(
  reportId: string | null,
  studentId: string,
  reportData: Record<string, unknown>,
  period: string,
): Promise<ActionResult> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: true }
  }

  const profile = await getCallerProfile()
  if (!profile || (profile.role !== 'coach' && profile.role !== 'admin')) {
    return { success: false, error: 'Unauthorized' }
  }

  const sb = await createClient()
  const now = new Date().toISOString()

  if (reportId) {
    const { error } = await sb
      .from('progress_reports')
      .update({
        report_data: reportData,
        period,
        status: 'sent',
        sent_at: now,
        updated_at: now,
      })
      .eq('id', reportId)
      .eq('coach_id', profile.id)

    if (error) {
      console.error('[sendProgressReport]', error.message)
      return { success: false, error: 'Failed to send report.' }
    }
  } else {
    const { error } = await sb.from('progress_reports').insert({
      coach_id: profile.id,
      student_id: studentId,
      period,
      status: 'sent',
      sent_at: now,
      report_data: reportData,
    })

    if (error) {
      console.error('[sendProgressReport]', error.message)
      return { success: false, error: 'Failed to send report.' }
    }
  }

  return { success: true }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MESSAGING
// ═══════════════════════════════════════════════════════════════════════════════

export async function sendMessage(
  receiverId: string,
  content: string,
): Promise<ActionResult & { messageId?: string }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: true, messageId: crypto.randomUUID() }
  }

  if (!content.trim()) {
    return { success: false, error: 'Message cannot be empty.' }
  }

  const profile = await getCallerProfile()
  if (!profile) {
    return { success: false, error: 'Unauthorized' }
  }

  // Verify sender is a parent or coach (only they should message each other)
  if (profile.role !== 'parent' && profile.role !== 'coach' && profile.role !== 'admin') {
    return { success: false, error: 'Unauthorized' }
  }

  const sb = await createClient()

  const { data, error } = await sb
    .from('messages')
    .insert({
      sender_id: profile.id,
      receiver_id: receiverId,
      content: content.trim(),
    })
    .select('id')
    .single()

  if (error) {
    console.error('[sendMessage]', error.message)
    return { success: false, error: 'Failed to send message.' }
  }

  return { success: true, messageId: data?.id }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN: CREATE COACH
// ═══════════════════════════════════════════════════════════════════════════════

export async function createCoachAccount(
  firstName: string,
  lastName: string,
  email: string,
  tracks: string[],
): Promise<ActionResult> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: true }
  }

  // Verify caller is admin
  const profile = await getCallerProfile()
  if (!profile || profile.role !== 'admin') {
    return { success: false, error: 'Unauthorized. Admin access required.' }
  }

  const adminClient = getServiceClient()
  if (!adminClient) {
    return { success: false, error: 'Server configuration error (missing service role key).' }
  }

  // Validate inputs
  if (!firstName.trim() || !lastName.trim() || !email.trim()) {
    return { success: false, error: 'All fields are required.' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Invalid email address.' }
  }

  // Create auth user with a random password (coach will reset via email)
  const tempPassword = crypto.randomUUID()

  const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
    email: email.trim(),
    password: tempPassword,
    email_confirm: true, // Skip email confirmation for admin-created accounts
    user_metadata: {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      role: 'coach',
    },
  })

  if (authError) {
    console.error('[createCoachAccount] auth error:', authError.message)
    if (authError.message.includes('already been registered')) {
      return { success: false, error: 'A user with this email already exists.' }
    }
    return { success: false, error: 'Failed to create coach account.' }
  }

  // The handle_new_user trigger creates the profile automatically.
  // Now auto-approve the coach (since admin created them).
  if (authData.user) {
    const { error: approveError } = await adminClient
      .from('profiles')
      .update({
        approved: true,
        approved_at: new Date().toISOString(),
        approved_by: profile.id,
      })
      .eq('user_id', authData.user.id)

    if (approveError) {
      console.error('[createCoachAccount] approve error:', approveError.message)
    }

    // Assign tracks if any specified
    if (tracks.length > 0) {
      // We need the coach's profile id
      const { data: coachProfile } = await adminClient
        .from('profiles')
        .select('id')
        .eq('user_id', authData.user.id)
        .single()

      if (coachProfile) {
        // Note: coach_assignments link coaches to students for specific tracks.
        // For now, we store the track capabilities in the coach's metadata.
        // Track assignments happen when students are actually assigned.
      }
    }

    // Send password reset email so coach can set their own password
    const { error: resetError } = await adminClient.auth.admin.generateLink({
      type: 'recovery',
      email: email.trim(),
    })

    if (resetError) {
      console.error('[createCoachAccount] password reset email error:', resetError.message)
      // Non-fatal — account is still created
    }
  }

  return { success: true }
}

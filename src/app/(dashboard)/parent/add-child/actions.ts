'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { rateLimit } from '@/lib/rate-limit'
import type { Database } from '@/types/database'
import crypto from 'crypto'

type Profile = Database['public']['Tables']['profiles']['Row']

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const addChildSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(50, 'First name is too long'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((val) => {
      const date = new Date(val)
      return !isNaN(date.getTime()) && date < new Date()
    }, 'Date of birth must be a valid past date'),
  email: z
    .string()
    .email('Please provide a valid email')
    .optional()
    .or(z.literal('')),
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function calculateAgeTier(
  dob: string,
): '5-8' | '9-12' | '13-17' | null {
  const birth = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--

  if (age >= 5 && age <= 8) return '5-8'
  if (age >= 9 && age <= 12) return '9-12'
  if (age >= 13 && age <= 17) return '13-17'
  return null
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AddChildResult {
  success: boolean
  message: string
}

// ---------------------------------------------------------------------------
// Server Action
// ---------------------------------------------------------------------------

export async function addChild(
  formData: FormData,
): Promise<AddChildResult> {
  // --- Rate limiting ---
  try {
    const headersList = await headers()
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      headersList.get('x-real-ip') ??
      'unknown'
    const limiter = rateLimit(`add-child:${ip}`, {
      windowSeconds: 60,
      maxRequests: 10,
    })
    if (!limiter.success) {
      return {
        success: false,
        message: 'Too many requests. Please wait a minute and try again.',
      }
    }
  } catch {
    // Skip in tests
  }

  // --- Validate parent is authenticated ---
  const supabase = await createClient()
  const {
    data: { user: parentUser },
  } = await supabase.auth.getUser()

  if (!parentUser) {
    redirect('/login')
  }

  // Confirm the user is actually a parent
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', parentUser.id)
    .single()

  const parentProfile = data as Profile | null

  if (!parentProfile || parentProfile.role !== 'parent') {
    return {
      success: false,
      message: 'Only parent accounts can add children.',
    }
  }

  // --- Parse & validate input ---
  const raw = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    dateOfBirth: formData.get('dateOfBirth') as string,
    email: (formData.get('email') as string) || '',
  }

  const parsed = addChildSchema.safeParse(raw)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Invalid input.'
    return { success: false, message: firstError }
  }

  const { firstName, lastName, dateOfBirth, email } = parsed.data
  const ageTier = calculateAgeTier(dateOfBirth)

  // --- Create the child user via service role client ---
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      success: false,
      message:
        'Server configuration error. Please contact support.',
    }
  }

  const adminClient = createServiceClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // Generate a secure random password — the child will use password
  // reset or parent-managed access
  const generatedPassword =
    crypto.randomBytes(24).toString('base64url') + '!Aa1'

  const childEmail =
    email || `child+${crypto.randomUUID().slice(0, 8)}@cognitron.tech`

  const { data: newUser, error: createError } =
    await adminClient.auth.admin.createUser({
      email: childEmail,
      password: generatedPassword,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        role: 'student',
        date_of_birth: dateOfBirth,
      },
    })

  if (createError || !newUser.user) {
    return {
      success: false,
      message: createError?.message ?? 'Failed to create child account.',
    }
  }

  // --- Create profile ---
  const { error: profileError } = await adminClient
    .from('profiles')
    .insert({
      user_id: newUser.user.id,
      role: 'student' as const,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      age_tier: ageTier,
    })

  if (profileError) {
    // Attempt cleanup
    await adminClient.auth.admin.deleteUser(newUser.user.id)
    return {
      success: false,
      message: 'Failed to create child profile. Please try again.',
    }
  }

  // --- Link parent to child ---
  const { error: linkError } = await adminClient
    .from('parent_student_links')
    .insert({
      parent_id: parentProfile.id,
      student_id: newUser.user.id,
    })

  if (linkError) {
    return {
      success: false,
      message:
        'Child account created but linking failed. Please contact support.',
    }
  }

  return {
    success: true,
    message: `${firstName} has been added to your account!`,
  }
}

'use server'

export async function approveUser(userId: string) {
  // TODO: Update profiles.approved = true, approved_at = now(), approved_by = current admin
  // For now, just return success
  console.log('Approve user:', userId)
  return { success: true }
}

export async function rejectUser(userId: string) {
  // TODO: Delete user from auth.users (cascades to profiles)
  console.log('Reject user:', userId)
  return { success: true }
}

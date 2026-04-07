'use client'

import { useState } from 'react'
import { UserCheck, UserX, Clock, Search, CheckCircle2 } from 'lucide-react'
import { approveUser, rejectUser, type PendingUser } from './actions'

interface ApprovalsClientProps {
  initialUsers: PendingUser[]
}

export default function ApprovalsClient({ initialUsers }: ApprovalsClientProps) {
  const [users, setUsers] = useState<PendingUser[]>(initialUsers)
  const [search, setSearch] = useState('')
  const [processing, setProcessing] = useState<string | null>(null)
  const [flash, setFlash] = useState<{ type: 'approve' | 'reject'; name: string } | null>(null)

  const filtered = users.filter((u) => {
    const q = search.toLowerCase()
    return (
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    )
  })

  async function handleApprove(user: PendingUser) {
    setProcessing(user.id)
    const result = await approveUser(user.id)
    if (result.success) {
      setUsers((prev) => prev.filter((u) => u.id !== user.id))
      setFlash({ type: 'approve', name: `${user.firstName} ${user.lastName}` })
      setTimeout(() => setFlash(null), 3000)
    }
    setProcessing(null)
  }

  async function handleReject(user: PendingUser) {
    setProcessing(user.id)
    const result = await rejectUser(user.id)
    if (result.success) {
      setUsers((prev) => prev.filter((u) => u.id !== user.id))
      setFlash({ type: 'reject', name: `${user.firstName} ${user.lastName}` })
      setTimeout(() => setFlash(null), 3000)
    }
    setProcessing(null)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Approvals</h1>
          <p className="text-slate text-sm mt-1">
            Review and approve new account signups
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate">
          <Clock className="w-4 h-4" />
          {users.length} pending
        </div>
      </div>

      {/* Flash message */}
      {flash && (
        <div
          className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
            flash.type === 'approve'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {flash.type === 'approve'
            ? `${flash.name} has been approved.`
            : `${flash.name} has been rejected.`}
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-navy placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold bg-white"
        />
      </div>

      {/* Table / Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="font-heading text-lg font-bold text-navy mb-2">
            All caught up!
          </h2>
          <p className="text-slate text-sm">
            {users.length === 0
              ? 'No pending account approvals right now.'
              : 'No results match your search.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* Desktop header */}
          <div className="hidden md:grid grid-cols-[2fr_2fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-slate-100 text-xs font-medium text-slate uppercase tracking-wide">
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Signed Up</span>
            <span className="text-right">Actions</span>
          </div>

          {filtered.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_1fr_auto] gap-2 md:gap-4 px-6 py-4 border-b border-slate-50 last:border-b-0 items-center hover:bg-slate-50/50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-navy">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate">{user.email}</p>
              </div>
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy/5 text-navy capitalize">
                  {user.role}
                </span>
              </div>
              <div>
                <p className="text-xs text-slate">{user.signedUpAt}</p>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => handleApprove(user)}
                  disabled={processing === user.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Approve
                </button>
                <button
                  onClick={() => handleReject(user)}
                  disabled={processing === user.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  <UserX className="w-3.5 h-3.5" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

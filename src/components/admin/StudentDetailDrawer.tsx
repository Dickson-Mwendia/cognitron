'use client'

import { X } from 'lucide-react'
import type { AdminStudentRow } from '@/types'

const trackIcons: Record<string, string> = {
  coding: '💻',
  ai: '🤖',
  chess: '♟️',
}

const statusStyles: Record<string, { bg: string; text: string }> = {
  active: { bg: 'bg-[#2a9d8f]/10', text: 'text-[#2a9d8f]' },
  trial: { bg: 'bg-[#d4a843]/10', text: 'text-[#d4a843]' },
  churned: { bg: 'bg-[#e8614d]/10', text: 'text-[#e8614d]' },
  paused: { bg: 'bg-gray-100', text: 'text-gray-500' },
}

interface StudentDetailDrawerProps {
  student: AdminStudentRow | null
  onClose: () => void
}

export function StudentDetailDrawer({ student, onClose }: StudentDetailDrawerProps) {
  if (!student) return null

  const style = statusStyles[student.status] ?? statusStyles.active

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
          <h2 className="font-heading text-lg font-bold text-[#0c1b33]">Student Detail</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#0c1b33]/40 hover:text-[#0c1b33] hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Identity */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0c1b33] text-lg font-bold text-white">
              {student.firstName[0]}{student.lastName[0]}
            </div>
            <div>
              <p className="font-heading text-xl font-bold text-[#0c1b33]">
                {student.firstName} {student.lastName}
              </p>
              <p className="text-sm text-[#0c1b33]/50">{student.email}</p>
            </div>
          </div>

          {/* Status & meta */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-gray-100 p-3">
              <p className="text-xs text-[#0c1b33]/40 mb-1">Status</p>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.bg} ${style.text}`}>
                {student.status}
              </span>
            </div>
            <div className="rounded-xl border border-gray-100 p-3">
              <p className="text-xs text-[#0c1b33]/40 mb-1">Age Tier</p>
              <p className="text-sm font-semibold text-[#0c1b33]">{student.ageTier ?? 'N/A'}</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-3">
              <p className="text-xs text-[#0c1b33]/40 mb-1">Enrolled</p>
              <p className="text-sm font-semibold text-[#0c1b33]">
                {new Date(student.enrollmentDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 p-3">
              <p className="text-xs text-[#0c1b33]/40 mb-1">Last Active</p>
              <p className="text-sm font-semibold text-[#0c1b33]">{student.lastActive}</p>
            </div>
          </div>

          {/* XP */}
          <div className="rounded-xl border border-[#d4a843]/20 bg-[#d4a843]/5 p-4 text-center">
            <p className="text-3xl font-bold text-[#d4a843]">{student.totalXp.toLocaleString()}</p>
            <p className="text-xs text-[#0c1b33]/50 mt-1">Total XP</p>
          </div>

          {/* Tracks */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/40 mb-2">Enrolled Tracks</p>
            <div className="flex flex-wrap gap-2">
              {student.tracks.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-full bg-[#0c1b33]/5 px-3 py-1 text-sm font-medium text-[#0c1b33]">
                  {trackIcons[t]} {t}
                </span>
              ))}
            </div>
          </div>

          {/* Coach */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/40 mb-2">Assigned Coach</p>
            <p className="text-sm font-medium text-[#0c1b33]">{student.coachName}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 rounded-lg bg-[#0c1b33] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#162d50]"
            >
              View Full Dashboard
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-[#0c1b33] transition-colors hover:bg-gray-50"
            >
              Send Notification
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

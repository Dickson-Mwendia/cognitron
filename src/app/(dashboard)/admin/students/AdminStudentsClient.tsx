'use client'

import { useState, useCallback } from 'react'
import type { AdminStudentRow, TrackName } from '@/types'
import { DataTable } from '@/components/admin/DataTable'
import { ExportButton, downloadCSV } from '@/components/admin/ExportButton'
import { StudentDetailDrawer } from '@/components/admin/StudentDetailDrawer'

const trackIcons: Record<string, string> = { coding: '💻', ai: '🤖', chess: '♟️' }

const statusStyles: Record<string, { bg: string; text: string }> = {
  active: { bg: 'bg-[#2a9d8f]/10', text: 'text-[#2a9d8f]' },
  trial: { bg: 'bg-[#d4a843]/10', text: 'text-[#d4a843]' },
  churned: { bg: 'bg-[#e8614d]/10', text: 'text-[#e8614d]' },
  paused: { bg: 'bg-gray-100', text: 'text-gray-500' },
}

const allStatuses = ['all', 'active', 'trial', 'paused', 'churned'] as const
const allTracks = ['all', 'coding', 'ai', 'chess'] as const

interface Props {
  students: AdminStudentRow[]
}

export default function AdminStudentsClient({ students }: Props) {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [trackFilter, setTrackFilter] = useState<string>('all')
  const [selectedStudent, setSelectedStudent] = useState<AdminStudentRow | null>(null)

  const filtered = students.filter((s) => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false
    if (trackFilter !== 'all' && !s.tracks.includes(trackFilter as TrackName)) return false
    return true
  })

  const handleExport = useCallback(() => {
    const headers = ['Name', 'Email', 'Age', 'Tracks', 'Status', 'Coach', 'XP', 'Enrolled', 'Last Active']
    const rows = filtered.map((s) => [
      `${s.firstName} ${s.lastName}`, s.email, s.ageTier ?? '', s.tracks.join(', '),
      s.status, s.coachName, String(s.totalXp), s.enrollmentDate, s.lastActive,
    ])
    downloadCSV(headers, rows, 'cognitron-students.csv')
  }, [filtered])

  const columns = [
    {
      key: 'name',
      label: 'Student',
      render: (row: AdminStudentRow) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0c1b33] text-xs font-bold text-white flex-shrink-0">
            {row.firstName[0]}{row.lastName[0]}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#0c1b33] truncate">{row.firstName} {row.lastName}</p>
            <p className="text-xs text-[#0c1b33]/40">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'ageTier', label: 'Age', render: (row: AdminStudentRow) => <span className="text-sm">{row.ageTier ?? '—'}</span> },
    {
      key: 'tracks',
      label: 'Tracks',
      sortable: false,
      render: (row: AdminStudentRow) => (
        <div className="flex gap-1">
          {row.tracks.map((t) => (
            <span key={t} className="text-sm" title={t}>{trackIcons[t]}</span>
          ))}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row: AdminStudentRow) => {
        const s = statusStyles[row.status]
        return (
          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${s.bg} ${s.text}`}>
            {row.status}
          </span>
        )
      },
    },
    { key: 'coachName', label: 'Coach' },
    {
      key: 'totalXp',
      label: 'XP',
      render: (row: AdminStudentRow) => (
        <span className="text-sm font-semibold text-[#d4a843]">{row.totalXp.toLocaleString()}</span>
      ),
    },
    { key: 'lastActive', label: 'Last Active' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33]">Students</h1>
        <ExportButton label="Export Students" onClick={handleExport} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2">
          <span className="self-center text-xs font-medium text-[#0c1b33]/40">Status:</span>
          {allStatuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                statusFilter === s ? 'bg-[#0c1b33] text-white' : 'bg-[#0c1b33]/5 text-[#0c1b33]/60 hover:bg-[#0c1b33]/10'
              }`}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <span className="self-center text-xs font-medium text-[#0c1b33]/40">Track:</span>
          {allTracks.map((t) => (
            <button
              key={t}
              onClick={() => setTrackFilter(t)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                trackFilter === t ? 'bg-[#0c1b33] text-white' : 'bg-[#0c1b33]/5 text-[#0c1b33]/60 hover:bg-[#0c1b33]/10'
              }`}
            >
              {t === 'all' ? 'All' : `${trackIcons[t]} ${t}`}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        keyField="id"
        pageSize={10}
        searchPlaceholder="Search students by name or email…"
        onRowClick={setSelectedStudent}
        filterFn={(row, search) => {
          const q = search.toLowerCase()
          return (
            `${row.firstName} ${row.lastName}`.toLowerCase().includes(q) ||
            row.email.toLowerCase().includes(q) ||
            row.coachName.toLowerCase().includes(q)
          )
        }}
      />

      <StudentDetailDrawer student={selectedStudent} onClose={() => setSelectedStudent(null)} />
    </div>
  )
}

'use client'

import { useState } from 'react'
import type { AdminSessionRow, TrackName } from '@/types'
import { DataTable } from '@/components/admin/DataTable'
import { Plus, MapPin, Monitor } from 'lucide-react'

const trackIcons: Record<string, string> = { coding: '💻', ai: '🤖', chess: '♟️' }

const sessionStatusStyles: Record<string, { bg: string; text: string }> = {
  scheduled: { bg: 'bg-[#2a9d8f]/10', text: 'text-[#2a9d8f]' },
  completed: { bg: 'bg-[#0c1b33]/10', text: 'text-[#0c1b33]' },
  cancelled: { bg: 'bg-gray-100', text: 'text-gray-500' },
  no_show: { bg: 'bg-[#e8614d]/10', text: 'text-[#e8614d]' },
}

const allStatuses = ['all', 'scheduled', 'completed', 'cancelled', 'no_show'] as const
const allTracks = ['all', 'coding', 'ai', 'chess'] as const

interface Props {
  sessions: AdminSessionRow[]
}

export default function AdminSessionsClient({ sessions }: Props) {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [trackFilter, setTrackFilter] = useState<string>('all')

  const filtered = sessions.filter((s) => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false
    if (trackFilter !== 'all' && s.trackName !== trackFilter) return false
    return true
  })

  const summaryStats = {
    total: sessions.length,
    scheduled: sessions.filter((s) => s.status === 'scheduled').length,
    completed: sessions.filter((s) => s.status === 'completed').length,
    noShow: sessions.filter((s) => s.status === 'no_show').length,
  }

  const columns = [
    {
      key: 'scheduledAt',
      label: 'Date & Time',
      render: (row: AdminSessionRow) => {
        const d = new Date(row.scheduledAt)
        return (
          <div>
            <p className="text-sm font-medium text-[#0c1b33]">
              {d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
            </p>
            <p className="text-xs text-[#0c1b33]/40">
              {d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} · {row.durationMinutes}min
            </p>
          </div>
        )
      },
    },
    {
      key: 'trackName',
      label: 'Track',
      render: (row: AdminSessionRow) => (
        <span className="text-sm">{trackIcons[row.trackName]} {row.trackName}</span>
      ),
    },
    { key: 'lessonName', label: 'Lesson' },
    { key: 'coachName', label: 'Coach' },
    {
      key: 'studentNames',
      label: 'Students',
      sortable: false,
      render: (row: AdminSessionRow) => (
        <span className="text-sm">{row.studentNames.join(', ')}</span>
      ),
    },
    {
      key: 'locationType',
      label: 'Location',
      render: (row: AdminSessionRow) => (
        <span className="inline-flex items-center gap-1 text-xs">
          {row.locationType === 'home' ? <MapPin className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
          {row.locationType}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row: AdminSessionRow) => {
        const s = sessionStatusStyles[row.status]
        return (
          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${s.bg} ${s.text}`}>
            {row.status.replace('_', ' ')}
          </span>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33]">Sessions</h1>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-[#0c1b33] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#162d50]"
        >
          <Plus className="w-4 h-4" />
          New Session
        </button>
      </div>

      {/* Summary */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-[#0c1b33]">{summaryStats.total}</p>
          <p className="text-xs text-[#0c1b33]/50">Total</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-[#2a9d8f]">{summaryStats.scheduled}</p>
          <p className="text-xs text-[#0c1b33]/50">Upcoming</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-[#0c1b33]">{summaryStats.completed}</p>
          <p className="text-xs text-[#0c1b33]/50">Completed</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-[#e8614d]">{summaryStats.noShow}</p>
          <p className="text-xs text-[#0c1b33]/50">No-shows</p>
        </div>
      </section>

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
              {s === 'all' ? 'All' : s.replace('_', ' ')}
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
        searchPlaceholder="Search sessions by coach, lesson, or student…"
        filterFn={(row, search) => {
          const q = search.toLowerCase()
          return (
            row.coachName.toLowerCase().includes(q) ||
            row.lessonName.toLowerCase().includes(q) ||
            row.studentNames.some((n) => n.toLowerCase().includes(q))
          )
        }}
      />
    </div>
  )
}

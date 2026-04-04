'use client'

import { useState } from 'react'
import type { AdminCoachRow } from '@/types'
import { DataTable } from '@/components/admin/DataTable'
import { CreateCoachModal } from '@/components/admin/CreateCoachModal'
import { UserPlus, Star } from 'lucide-react'

const trackIcons: Record<string, string> = { coding: '💻', ai: '🤖', chess: '♟️' }

interface Props {
  coaches: AdminCoachRow[]
}

export default function AdminCoachesClient({ coaches }: Props) {
  const [showModal, setShowModal] = useState(false)

  const columns = [
    {
      key: 'name',
      label: 'Coach',
      render: (row: AdminCoachRow) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2a9d8f] text-xs font-bold text-white flex-shrink-0">
            {row.firstName[0]}{row.lastName[0]}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#0c1b33] truncate">{row.firstName} {row.lastName}</p>
            <p className="text-xs text-[#0c1b33]/40">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'tracks',
      label: 'Tracks',
      sortable: false,
      render: (row: AdminCoachRow) => (
        <div className="flex gap-1">
          {row.tracks.map((t) => (
            <span key={t} className="text-sm" title={t}>{trackIcons[t]}</span>
          ))}
        </div>
      ),
    },
    {
      key: 'studentCount',
      label: 'Students',
      render: (row: AdminCoachRow) => (
        <span className="text-sm font-semibold text-[#0c1b33]">{row.studentCount}</span>
      ),
    },
    {
      key: 'sessionsThisWeek',
      label: 'Sessions/Wk',
      render: (row: AdminCoachRow) => (
        <span className="text-sm">{row.sessionsThisWeek}</span>
      ),
    },
    {
      key: 'avgRating',
      label: 'Rating',
      render: (row: AdminCoachRow) => (
        <span className="inline-flex items-center gap-1 text-sm">
          <Star className="w-3.5 h-3.5 text-[#d4a843] fill-[#d4a843]" />
          {row.avgRating.toFixed(1)}
        </span>
      ),
    },
    {
      key: 'utilization',
      label: 'Utilization',
      render: (row: AdminCoachRow) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-16 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#2a9d8f]"
              style={{ width: `${row.utilization}%` }}
            />
          </div>
          <span className="text-xs text-[#0c1b33]/50">{row.utilization}%</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row: AdminCoachRow) => (
        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
          row.status === 'active' ? 'bg-[#2a9d8f]/10 text-[#2a9d8f]' : 'bg-gray-100 text-gray-500'
        }`}>
          {row.status}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33]">Coaches</h1>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#0c1b33] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#162d50]"
        >
          <UserPlus className="w-4 h-4" />
          New Coach
        </button>
      </div>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-[#0c1b33]">{coaches.length}</p>
          <p className="text-xs text-[#0c1b33]/50">Total Coaches</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-[#2a9d8f]">
            {coaches.filter((c) => c.status === 'active').length}
          </p>
          <p className="text-xs text-[#0c1b33]/50">Active</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-[#d4a843]">
            {coaches.reduce((sum, c) => sum + c.studentCount, 0)}
          </p>
          <p className="text-xs text-[#0c1b33]/50">Total Students Assigned</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-[#e8614d]">
            {(coaches.reduce((sum, c) => sum + c.avgRating, 0) / coaches.length).toFixed(1)}
          </p>
          <p className="text-xs text-[#0c1b33]/50">Avg Rating</p>
        </div>
      </section>

      <DataTable
        columns={columns}
        data={coaches}
        keyField="id"
        pageSize={10}
        searchPlaceholder="Search coaches…"
        filterFn={(row, search) => {
          const q = search.toLowerCase()
          return (
            `${row.firstName} ${row.lastName}`.toLowerCase().includes(q) ||
            row.email.toLowerCase().includes(q)
          )
        }}
      />

      <CreateCoachModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}

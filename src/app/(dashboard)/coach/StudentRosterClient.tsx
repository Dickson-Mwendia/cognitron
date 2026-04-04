'use client'

import { useState } from 'react'
import Link from 'next/link'

interface RosterStudent {
  id: string
  firstName: string
  lastName: string
  avatarUrl: string | null
  ageTier: string
  tracks: readonly string[]
  totalXp: number
  streak: number
  currentLevel: number
  lastActive: string
}

const trackIcons: Record<string, string> = {
  coding: '💻',
  ai: '🤖',
  chess: '♟️',
}

const allTracks = ['all', 'coding', 'ai', 'chess'] as const

export default function StudentRosterClient({
  students,
}: {
  students: RosterStudent[]
}) {
  const [search, setSearch] = useState('')
  const [trackFilter, setTrackFilter] = useState<string>('all')

  const filtered = students.filter((s) => {
    const matchesSearch = `${s.firstName} ${s.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchesTrack =
      trackFilter === 'all' || s.tracks.includes(trackFilter)
    return matchesSearch && matchesTrack
  })

  return (
    <section>
      <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
        Student Roster
      </h2>

      {/* Search & filter controls */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#0c1b33]/40">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search students…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-[#0c1b33] placeholder:text-[#0c1b33]/40 outline-none focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/20 transition-colors"
          />
        </div>

        <div className="flex gap-2">
          {allTracks.map((t) => (
            <button
              key={t}
              onClick={() => setTrackFilter(t)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                trackFilter === t
                  ? 'bg-[#0c1b33] text-white'
                  : 'bg-[#0c1b33]/5 text-[#0c1b33]/60 hover:bg-[#0c1b33]/10'
              }`}
            >
              {t === 'all' ? 'All' : `${trackIcons[t]} ${t}`}
            </button>
          ))}
        </div>
      </div>

      {/* Student grid */}
      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-sm text-[#0c1b33]/40">
          No students match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((student) => (
            <Link
              key={student.id}
              href={`/coach/students/${student.id}`}
              className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Header */}
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0c1b33] text-sm font-semibold text-white">
                  {student.firstName[0]}
                  {student.lastName[0]}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-heading font-bold text-[#0c1b33]">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-xs text-[#0c1b33]/50">
                    Age {student.ageTier} · Active {student.lastActive}
                  </p>
                </div>
              </div>

              {/* Track badges */}
              <div className="mb-3 flex flex-wrap gap-1.5">
                {student.tracks.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[#0c1b33]/5 px-2 py-0.5 text-[10px] font-medium text-[#0c1b33]/70"
                  >
                    {trackIcons[t] ?? '📚'} {t}
                  </span>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-[#d4a843]/10 py-1.5">
                  <p className="text-sm font-bold text-[#d4a843]">
                    {student.totalXp.toLocaleString()}
                  </p>
                  <p className="text-[9px] uppercase text-[#0c1b33]/40">XP</p>
                </div>
                <div className="rounded-lg bg-[#e8614d]/10 py-1.5">
                  <p className="text-sm font-bold text-[#e8614d]">
                    {student.streak}
                  </p>
                  <p className="text-[9px] uppercase text-[#0c1b33]/40">
                    Streak
                  </p>
                </div>
                <div className="rounded-lg bg-[#2a9d8f]/10 py-1.5">
                  <p className="text-sm font-bold text-[#2a9d8f]">
                    Lv {student.currentLevel}
                  </p>
                  <p className="text-[9px] uppercase text-[#0c1b33]/40">
                    Level
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

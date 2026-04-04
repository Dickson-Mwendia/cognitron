'use client'

import Link from 'next/link'
import type { AdminKPI, AdminAlert, SparklinePoint, AdminStudentRow } from '@/types'
import { KPICard } from '@/components/admin/KPICard'
import { SparklineChart } from '@/components/admin/SparklineChart'
import { AlertFeed } from '@/components/admin/AlertFeed'
import { UserPlus, Users } from 'lucide-react'

interface Props {
  kpis: AdminKPI[]
  alerts: AdminAlert[]
  enrollmentSparkline: SparklinePoint[]
  revenueSparkline: SparklinePoint[]
  engagementSparkline: SparklinePoint[]
  recentSignups: AdminStudentRow[]
}

export default function AdminOverviewClient({
  kpis,
  alerts,
  enrollmentSparkline,
  revenueSparkline,
  engagementSparkline,
  recentSignups,
}: Props) {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
          Admin Dashboard
        </h1>
        <div className="flex gap-2">
          <Link
            href="/admin/coaches"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0c1b33] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#162d50]"
          >
            <UserPlus className="w-4 h-4" />
            Add Coach
          </Link>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </section>

      {/* ── Trend Sparklines ── */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: 'Enrollments (30d)', data: enrollmentSparkline, color: '#2a9d8f' },
          { label: 'Revenue (30d)', data: revenueSparkline, color: '#d4a843' },
          { label: 'Engagement (30d)', data: engagementSparkline, color: '#e8614d' },
        ].map((chart) => (
          <div key={chart.label} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-[#0c1b33]/50 mb-2">{chart.label}</p>
            <SparklineChart data={chart.data} color={chart.color} width={280} height={50} />
          </div>
        ))}
      </section>

      {/* ── Alerts + Quick Actions ── */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AlertFeed alerts={alerts} maxItems={5} />
        </div>

        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-[#0c1b33]">Quick Actions</h3>

          <Link
            href="/admin/coaches"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a9d8f]/10">
              <UserPlus className="w-5 h-5 text-[#2a9d8f]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0c1b33]">Create Coach Account</p>
              <p className="text-xs text-[#0c1b33]/50">Add a new coach to the platform</p>
            </div>
          </Link>

          <Link
            href="/admin/students"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4a843]/10">
              <Users className="w-5 h-5 text-[#d4a843]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0c1b33]">View Recent Signups</p>
              <p className="text-xs text-[#0c1b33]/50">{recentSignups.length} trial students</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Recent Signups ── */}
      {recentSignups.length > 0 && (
        <section>
          <h3 className="font-heading text-lg font-bold text-[#0c1b33] mb-3">Recent Signups</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recentSignups.map((s) => (
              <div key={s.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0c1b33] text-xs font-bold text-white">
                    {s.firstName[0]}{s.lastName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0c1b33]">{s.firstName} {s.lastName}</p>
                    <p className="text-xs text-[#0c1b33]/50">Age {s.ageTier} · {s.tracks.join(', ')}</p>
                  </div>
                </div>
                <span className="inline-flex rounded-full bg-[#d4a843]/10 px-2.5 py-0.5 text-xs font-semibold text-[#d4a843]">
                  trial
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

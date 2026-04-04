'use client'

import { useCallback } from 'react'
import type { AdminRevenueByTrack, SparklinePoint, AdminInvoiceRow, AdminKPI } from '@/types'
import { KPICard } from '@/components/admin/KPICard'
import { DataTable } from '@/components/admin/DataTable'
import { ExportButton, downloadCSV } from '@/components/admin/ExportButton'

const trackColors: Record<string, string> = {
  coding: '#2a9d8f',
  ai: '#d4a843',
  chess: '#e8614d',
  bundle: '#0c1b33',
}

const trackIcons: Record<string, string> = { coding: '💻', ai: '🤖', chess: '♟️', bundle: '📦' }

const invoiceStatusStyles: Record<string, { bg: string; text: string }> = {
  paid: { bg: 'bg-[#2a9d8f]/10', text: 'text-[#2a9d8f]' },
  sent: { bg: 'bg-[#d4a843]/10', text: 'text-[#d4a843]' },
  overdue: { bg: 'bg-[#e8614d]/10', text: 'text-[#e8614d]' },
  draft: { bg: 'bg-gray-100', text: 'text-gray-500' },
  cancelled: { bg: 'bg-gray-100', text: 'text-gray-400' },
}

interface Props {
  revenueByTrack: AdminRevenueByTrack[]
  monthlyRevenue: SparklinePoint[]
  invoices: AdminInvoiceRow[]
  mrrKpi: AdminKPI
}

export default function AdminRevenueClient({
  revenueByTrack,
  monthlyRevenue,
  invoices,
  mrrKpi,
}: Props) {
  const totalMrr = revenueByTrack.reduce((sum, t) => sum + t.mrr, 0)
  const arr = totalMrr * 12

  const handleExport = useCallback(() => {
    const headers = ['Invoice #', 'Parent', 'Amount (KES)', 'Status', 'Due Date', 'Paid At']
    const rows = invoices.map((inv) => [
      inv.invoiceNumber, inv.parentName, String(inv.amountKes),
      inv.status, inv.dueDate, inv.paidAt ?? '',
    ])
    downloadCSV(headers, rows, 'cognitron-invoices.csv')
  }, [invoices])

  // Revenue bar chart (SVG)
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value))
  const barWidth = 40
  const barGap = 16
  const chartHeight = 160
  const chartWidth = monthlyRevenue.length * (barWidth + barGap)

  const invoiceColumns = [
    { key: 'invoiceNumber', label: 'Invoice #' },
    { key: 'parentName', label: 'Parent' },
    {
      key: 'amountKes',
      label: 'Amount',
      render: (row: AdminInvoiceRow) => (
        <span className="font-semibold">KES {row.amountKes.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row: AdminInvoiceRow) => {
        const s = invoiceStatusStyles[row.status]
        return (
          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${s.bg} ${s.text}`}>
            {row.status}
          </span>
        )
      },
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      render: (row: AdminInvoiceRow) => (
        <span className="text-sm">{new Date(row.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33]">Revenue</h1>
        <ExportButton label="Export Invoices" onClick={handleExport} />
      </div>

      {/* MRR / ARR cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPICard {...mrrKpi} />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-[#0c1b33]/50 mb-1">ARR (Projected)</p>
          <p className="text-2xl font-heading font-bold text-[#0c1b33]">
            KES {arr.toLocaleString()}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-[#0c1b33]/50 mb-1">Payment Status</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs"><span className="inline-block w-2 h-2 rounded-full bg-[#2a9d8f] mr-1" />{invoices.filter((i) => i.status === 'paid').length} paid</span>
            <span className="text-xs"><span className="inline-block w-2 h-2 rounded-full bg-[#d4a843] mr-1" />{invoices.filter((i) => i.status === 'sent').length} pending</span>
            <span className="text-xs"><span className="inline-block w-2 h-2 rounded-full bg-[#e8614d] mr-1" />{invoices.filter((i) => i.status === 'overdue').length} overdue</span>
          </div>
        </div>
      </section>

      {/* Revenue by track */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="font-heading text-lg font-bold text-[#0c1b33] mb-4">Revenue by Track</h3>
          <div className="space-y-3">
            {revenueByTrack.map((t) => (
              <div key={t.track} className="flex items-center gap-3">
                <span className="text-lg w-6 text-center">{trackIcons[t.track]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[#0c1b33] capitalize">{t.track}</span>
                    <span className="text-sm font-semibold text-[#0c1b33]">KES {t.mrr.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${t.percentage}%`, backgroundColor: trackColors[t.track] }}
                    />
                  </div>
                </div>
                <span className="text-xs text-[#0c1b33]/40 w-10 text-right">{t.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly revenue chart */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="font-heading text-lg font-bold text-[#0c1b33] mb-4">Monthly Revenue Trend</h3>
          <div className="overflow-x-auto">
            <svg width={chartWidth} height={chartHeight + 30} viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`}>
              {monthlyRevenue.map((m, i) => {
                const barHeight = (m.value / maxRevenue) * chartHeight
                const x = i * (barWidth + barGap)
                return (
                  <g key={m.label}>
                    <rect
                      x={x}
                      y={chartHeight - barHeight}
                      width={barWidth}
                      height={barHeight}
                      rx={6}
                      fill="#0c1b33"
                      fillOpacity={0.8}
                    />
                    <text
                      x={x + barWidth / 2}
                      y={chartHeight + 16}
                      textAnchor="middle"
                      className="text-[10px] fill-[#0c1b33]/40"
                    >
                      {m.label}
                    </text>
                    <text
                      x={x + barWidth / 2}
                      y={chartHeight - barHeight - 6}
                      textAnchor="middle"
                      className="text-[9px] fill-[#0c1b33]/60 font-semibold"
                    >
                      {(m.value / 1000).toFixed(0)}K
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
      </section>

      {/* Invoices table */}
      <section>
        <h3 className="font-heading text-lg font-bold text-[#0c1b33] mb-3">Recent Invoices</h3>
        <DataTable
          columns={invoiceColumns}
          data={invoices}
          keyField="id"
          pageSize={10}
          searchPlaceholder="Search invoices…"
        />
      </section>
    </div>
  )
}

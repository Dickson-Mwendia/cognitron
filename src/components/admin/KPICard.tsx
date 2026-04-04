'use client'

import type { AdminKPI } from '@/types'

const trendArrow: Record<AdminKPI['trend'], string> = {
  up: '↑',
  down: '↓',
  flat: '→',
}

export function KPICard({ label, value, change, changeLabel, trend, trendIsPositive }: AdminKPI) {
  const changeColor = trendIsPositive ? 'text-[#2a9d8f]' : 'text-[#e8614d]'
  const changeBg = trendIsPositive ? 'bg-[#2a9d8f]/10' : 'bg-[#e8614d]/10'

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-[#0c1b33]/50 mb-1">{label}</p>
      <p className="text-2xl font-heading font-bold text-[#0c1b33] mb-2">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${changeBg} ${changeColor}`}>
          {trendArrow[trend]} {Math.abs(change)}%
        </span>
        <span className="text-xs text-[#0c1b33]/40">{changeLabel}</span>
      </div>
    </div>
  )
}

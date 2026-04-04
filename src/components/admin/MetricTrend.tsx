'use client'

interface MetricTrendProps {
  label: string
  value: string | number
  change: number
  trendIsPositive: boolean
}

export function MetricTrend({ label, value, change, trendIsPositive }: MetricTrendProps) {
  const arrow = change > 0 ? '↑' : change < 0 ? '↓' : '→'
  const color = trendIsPositive ? 'text-[#2a9d8f]' : 'text-[#e8614d]'

  return (
    <div className="flex items-center gap-3">
      <div>
        <p className="text-xs text-[#0c1b33]/50">{label}</p>
        <p className="text-lg font-bold text-[#0c1b33]">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
      <span className={`text-xs font-semibold ${color}`}>
        {arrow} {Math.abs(change)}%
      </span>
    </div>
  )
}

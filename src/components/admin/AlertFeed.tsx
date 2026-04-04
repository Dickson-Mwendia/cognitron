'use client'

import type { AdminAlert } from '@/types'

const severityStyles: Record<AdminAlert['severity'], { bg: string; dot: string; border: string }> = {
  critical: { bg: 'bg-[#e8614d]/5', dot: 'bg-[#e8614d]', border: 'border-[#e8614d]/20' },
  warning: { bg: 'bg-[#d4a843]/5', dot: 'bg-[#d4a843]', border: 'border-[#d4a843]/20' },
  info: { bg: 'bg-[#2a9d8f]/5', dot: 'bg-[#2a9d8f]', border: 'border-[#2a9d8f]/20' },
}

const typeIcons: Record<AdminAlert['type'], string> = {
  churn_risk: '⚠️',
  payment_failed: '💳',
  low_engagement: '📉',
  no_show: '🚫',
  system: 'ℹ️',
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

interface AlertFeedProps {
  alerts: AdminAlert[]
  maxItems?: number
}

export function AlertFeed({ alerts, maxItems = 5 }: AlertFeedProps) {
  const displayed = alerts.slice(0, maxItems)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-[#0c1b33]">Alerts</h3>
        <span className="rounded-full bg-[#e8614d]/10 px-2.5 py-0.5 text-xs font-semibold text-[#e8614d]">
          {alerts.filter((a) => !a.isRead).length} new
        </span>
      </div>
      <ul className="space-y-2">
        {displayed.map((alert) => {
          const style = severityStyles[alert.severity]
          return (
            <li
              key={alert.id}
              className={`rounded-xl border p-3 ${style.bg} ${style.border} ${!alert.isRead ? 'ring-1 ring-inset ring-[#0c1b33]/5' : ''}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">{typeIcons[alert.type]}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`h-2 w-2 rounded-full ${style.dot} flex-shrink-0`} />
                    <p className="text-sm font-semibold text-[#0c1b33] truncate">{alert.title}</p>
                  </div>
                  <p className="text-xs text-[#0c1b33]/60 line-clamp-2">{alert.description}</p>
                  <p className="text-xs text-[#0c1b33]/40 mt-1">{timeAgo(alert.createdAt)}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

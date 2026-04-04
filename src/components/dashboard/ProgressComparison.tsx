'use client'

interface ChildData {
  id: string
  firstName: string
  totalXp: number
  streak: number
  currentLevel: number
}

interface ProgressComparisonProps {
  children: ChildData[]
}

const colors = [
  'bg-[#0c1b33]',
  'bg-[#2a9d8f]',
  'bg-[#e8614d]',
  'bg-[#d4a843]',
  'bg-[#6366f1]',
]

const textColors = [
  'text-[#0c1b33]',
  'text-[#2a9d8f]',
  'text-[#e8614d]',
  'text-[#d4a843]',
  'text-[#6366f1]',
]

interface MetricConfig {
  label: string
  key: keyof Pick<ChildData, 'totalXp' | 'streak' | 'currentLevel'>
  barColor: string
  format: (v: number) => string
}

const metrics: MetricConfig[] = [
  {
    label: 'XP',
    key: 'totalXp',
    barColor: 'bg-[#d4a843]',
    format: (v) => v.toLocaleString(),
  },
  {
    label: 'Streak',
    key: 'streak',
    barColor: 'bg-[#e8614d]',
    format: (v) => `${v} days`,
  },
  {
    label: 'Level',
    key: 'currentLevel',
    barColor: 'bg-[#2a9d8f]',
    format: (v) => `Lv ${v}`,
  },
]

export function ProgressComparison({ children }: ProgressComparisonProps) {
  if (children.length < 2) return null

  return (
    <section>
      <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
        Progress Comparison
      </h2>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-6">
          {children.map((child, i) => (
            <div key={child.id} className="flex items-center gap-2">
              <span
                className={`inline-block h-3 w-3 rounded-full ${colors[i % colors.length]}`}
              />
              <span className="text-sm font-medium text-[#0c1b33]">
                {child.firstName}
              </span>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="space-y-6">
          {metrics.map((metric) => {
            const maxVal = Math.max(
              ...children.map((c) => c[metric.key] as number),
              1,
            )

            return (
              <div key={metric.key}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50 mb-2">
                  {metric.label}
                </h3>
                <div className="space-y-2">
                  {children.map((child, i) => {
                    const value = child[metric.key] as number
                    const pct = Math.round((value / maxVal) * 100)

                    return (
                      <div key={child.id} className="flex items-center gap-3">
                        <span
                          className={`w-16 shrink-0 text-xs font-medium truncate ${textColors[i % textColors.length]}`}
                        >
                          {child.firstName}
                        </span>
                        <div className="relative flex-1 h-6 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className={`absolute inset-y-0 left-0 rounded-full ${metric.barColor} transition-all duration-500`}
                            style={{ width: `${Math.max(pct, 4)}%` }}
                          />
                        </div>
                        <span className="w-16 shrink-0 text-right text-xs font-semibold text-[#0c1b33]">
                          {metric.format(value)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

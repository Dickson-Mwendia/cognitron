'use client'

import { useState, useMemo } from 'react'
import { AchievementBadge } from './AchievementBadge'
import { BadgeDetailModal } from './BadgeDetailModal'

type BadgeData = {
  id: string
  name: string
  description: string
  icon: string
  category: string
  trackName: string | null
  earned: boolean
  earnedAt?: string | null
  progress?: { current: number; total: number } | null
}

type FilterCategory = 'all' | 'coding' | 'ai' | 'chess' | 'streak' | 'special'

const FILTER_CHIPS: { key: FilterCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'coding', label: 'Coding' },
  { key: 'ai', label: 'AI' },
  { key: 'chess', label: 'Chess' },
  { key: 'streak', label: 'Streak' },
  { key: 'special', label: 'Special' },
]

function getBadgeFilterCategory(badge: BadgeData): FilterCategory {
  if (badge.trackName === 'coding') return 'coding'
  if (badge.trackName === 'ai') return 'ai'
  if (badge.trackName === 'chess') return 'chess'
  if (badge.category === 'streak') return 'streak'
  return 'special'
}

interface AchievementsClientProps {
  achievements: BadgeData[]
}

export function AchievementsClient({ achievements }: AchievementsClientProps) {
  const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null)
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return achievements
    return achievements.filter((a) => getBadgeFilterCategory(a) === activeFilter)
  }, [achievements, activeFilter])

  const earned = filtered.filter((a) => a.earned)
  const locked = filtered.filter((a) => !a.earned)

  return (
    <>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter badges by category">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip.key}
            onClick={() => setActiveFilter(chip.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              activeFilter === chip.key
                ? 'bg-[#d4a843] text-[#0c1b33] shadow-sm'
                : 'bg-white border border-gray-200 text-[#0c1b33]/70 hover:border-[#d4a843]/30'
            }`}
            aria-pressed={activeFilter === chip.key}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Earned badges */}
      <section className="mb-6 md:mb-8">
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
          🏆 Earned ({earned.length})
        </h2>
        {earned.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6">
            {earned.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelectedBadge(a)}
                className="text-left w-full"
                aria-label={`View details for ${a.name} badge`}
              >
                <AchievementBadge
                  name={a.name}
                  description={a.description}
                  icon={a.icon}
                  earned={a.earned}
                  earnedAt={a.earnedAt}
                  onClick={() => setSelectedBadge(a)}
                />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#0c1b33]/50 py-4">
            No earned badges in this category yet.
          </p>
        )}
      </section>

      {/* Locked badges */}
      <section className="mb-6 md:mb-8">
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
          🔒 Locked ({locked.length})
        </h2>
        {locked.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6">
            {locked.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelectedBadge(a)}
                className="text-left w-full"
                aria-label={`View details for locked badge`}
              >
                <AchievementBadge
                  name={a.name}
                  description={a.description}
                  icon={a.icon}
                  earned={a.earned}
                  earnedAt={a.earnedAt}
                  progress={a.progress ?? null}
                  onClick={() => setSelectedBadge(a)}
                />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#0c1b33]/50 py-4">
            No locked badges in this category.
          </p>
        )}
      </section>

      {/* Badge detail modal */}
      <BadgeDetailModal
        badge={selectedBadge}
        onClose={() => setSelectedBadge(null)}
      />
    </>
  )
}

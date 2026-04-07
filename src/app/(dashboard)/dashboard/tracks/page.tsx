import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { getTrackInfo } from '@/lib/queries'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Browse All Tracks | Cognitron',
}

export default async function TracksPage() {
  const user = await requireRole(['student'])
  const trackInfo = await getTrackInfo(user.id)

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
          Browse All Tracks
        </h1>
        <p className="mt-1 text-sm text-[#0c1b33]/60">
          Explore available coding, AI, and chess tracks tailored to your skill level.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trackInfo.map((track) => (
          <Link
            key={track.id}
            href={`/dashboard/${track.name}`}
            className="group block"
          >
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:border-gray-300 hover:scale-[1.02] overflow-hidden">
              {/* Track Header */}
              <div
                className="p-6 relative overflow-hidden"
                style={{ backgroundColor: `${track.accentColor}10` }}
              >
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 pointer-events-none"
                  style={{ background: track.accentColor }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{track.icon}</span>
                    {track.enrolled && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        ✓ Enrolled
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#0c1b33] mt-3 group-hover:text-[#2a9d8f] transition-colors">
                    {track.title}
                  </h3>
                </div>
              </div>

              {/* Track Details */}
              <div className="p-6 pt-4 space-y-4">
                <p className="text-sm leading-relaxed text-[#0c1b33]/70">
                  {track.description}
                </p>

                {/* Tiers */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50 mb-2">
                    Tiers
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {track.tiers.map((tier) => (
                      <span
                        key={tier}
                        className="rounded-full px-2.5 py-1 text-[10px] font-medium bg-[#0c1b33]/5 text-[#0c1b33]/70"
                      >
                        {tier}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-[#0c1b33]/50">
                    {track.moduleCount} modules
                  </span>
                  <span
                    className="text-xs font-semibold transition-colors"
                    style={{ color: track.accentColor }}
                  >
                    Explore →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

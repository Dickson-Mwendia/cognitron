import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { getParentReports } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Progress Reports | Cognitron',
}

const ratingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? 'text-[#d4a843]' : 'text-gray-200'}>★</span>
  ))
}

export default async function ReportsPage() {
  const user = await requireRole(['parent'])
  const reports = await getParentReports(user.id)

  // Group reports by child
  const childGroups = reports.reduce<Record<string, typeof reports>>((acc, report) => {
    if (!acc[report.childName]) acc[report.childName] = []
    acc[report.childName].push(report)
    return acc
  }, {})

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
          Progress Reports
        </h1>
        <p className="mt-1 text-sm text-[#0c1b33]/60">
          Detailed reports on your children&apos;s learning progress and achievements.
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-[#0c1b33]/15 bg-white p-8 md:p-12 text-center">
          <span className="text-5xl mb-4 block">📊</span>
          <h2 className="font-heading text-2xl font-bold text-[#0c1b33] mb-3">
            No reports yet
          </h2>
          <p className="text-[#0c1b33]/60 text-sm max-w-md mx-auto">
            Progress reports are generated at the end of each term. Check back after your child&apos;s first term.
          </p>
        </div>
      ) : (
        Object.entries(childGroups).map(([childName, reports]) => (
          <section key={childName}>
            <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
              {childName}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-gold/30"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-heading font-bold text-[#0c1b33]">{report.period}</h3>
                      <p className="text-xs text-[#0c1b33]/40 mt-0.5">
                        Generated {new Date(report.dateGenerated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex text-lg">{ratingStars(report.overallRating)}</div>
                  </div>
                  <p className="text-sm leading-relaxed text-[#0c1b33]/70 mb-4">
                    {report.summary}
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0c1b33] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-navy-light hover:shadow-md active:scale-[0.97]"
                  >
                    View Full Report →
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}

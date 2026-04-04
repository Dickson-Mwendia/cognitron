import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

interface ViewingAsBannerProps {
  studentName: string
  backHref: string
  backLabel: string
  reportHref: string
}

export function ViewingAsBanner({
  studentName,
  backHref,
  backLabel,
  reportHref,
}: ViewingAsBannerProps) {
  return (
    <div className="rounded-2xl border border-[#d4a843]/30 bg-gradient-to-r from-[#d4a843]/10 to-[#d4a843]/5 px-5 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0c1b33]/60 hover:text-[#0c1b33] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </Link>
        <span className="text-[#0c1b33]/30">|</span>
        <p className="text-sm font-semibold text-[#0c1b33]">
          Viewing as <span className="text-[#d4a843]">{studentName}</span>
        </p>
      </div>
      <Link
        href={reportHref}
        className="inline-flex items-center gap-2 rounded-full bg-[#0c1b33] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#162d50]"
      >
        <FileText className="w-4 h-4" />
        Generate Progress Report
      </Link>
    </div>
  )
}

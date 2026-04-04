import Link from 'next/link'
import { Clock, type LucideIcon } from 'lucide-react'

interface ComingSoonProps {
  title: string
  description: string
  icon: LucideIcon
  backHref: string
  backLabel: string
}

export function ComingSoon({ title, description, icon: Icon, backHref, backLabel }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-gold" />
      </div>
      <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#0c1b33] mb-3">
        {title}
      </h1>
      <p className="text-[#0c1b33]/60 text-sm md:text-base max-w-md mb-2">
        {description}
      </p>
      <div className="flex items-center gap-2 text-xs text-[#0c1b33]/40 mb-8">
        <Clock className="w-3.5 h-3.5" />
        <span>Coming soon</span>
      </div>
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-navy-dark hover:shadow-md active:scale-[0.98]"
      >
        ← {backLabel}
      </Link>
    </div>
  )
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className ?? ''}`} />
)

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      {/* Hero card — "Your Next Move" */}
      <Skeleton className="h-48 rounded-2xl" />

      {/* XP bar area */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Track cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-52 rounded-2xl" />
        <Skeleton className="h-52 rounded-2xl" />
        <Skeleton className="h-52 rounded-2xl" />
      </div>

      {/* Streak counter */}
      <div className="flex items-center gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-full" />
        ))}
      </div>

      {/* Activity feed */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
      </div>
    </div>
  )
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className ?? ''}`} />
)

export default function AchievementsLoading() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Profile header */}
      <div className="flex items-center gap-4 md:gap-6">
        <Skeleton className="h-16 w-16 rounded-full md:h-20 md:w-20 shrink-0" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* XP ring + level progress */}
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 md:flex-row md:p-8">
        <Skeleton className="h-[200px] w-[200px] rounded-full" />
        <div className="flex-1 w-full space-y-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-56" />
        </div>
      </div>

      {/* Badge grid */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-36" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

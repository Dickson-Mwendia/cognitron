const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className ?? ''}`} />
)

export default function TrackLoading() {
  return (
    <div className="space-y-8">
      {/* Track header */}
      <div className="rounded-2xl overflow-hidden">
        <Skeleton className="h-40 rounded-2xl" />
      </div>

      {/* Progress ring area */}
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 md:flex-row md:p-8">
        <Skeleton className="h-48 w-48 rounded-full" />
        <div className="flex-1 w-full space-y-3">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      {/* Curriculum map — list of level nodes */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-36" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-64" />
            </div>
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

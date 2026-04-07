import { Skeleton } from "@/components/Skeleton";

export default function ScheduleLoading() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <Skeleton variant="text" className="h-8 w-44" />
        <Skeleton variant="bar" className="h-10 w-32 rounded-full" />
      </div>

      {/* Calendar skeleton */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} variant="text" className="h-4 mx-auto w-10" />
          ))}
        </div>
        {/* Calendar grid */}
        {Array.from({ length: 5 }).map((_, row) => (
          <div key={row} className="grid grid-cols-7 gap-2 mb-2">
            {Array.from({ length: 7 }).map((_, col) => (
              <Skeleton key={col} variant="card" className="h-16 rounded-lg" />
            ))}
          </div>
        ))}
      </div>

      {/* Upcoming sessions */}
      <div className="space-y-4">
        <Skeleton variant="text" className="h-6 w-44" />
        <Skeleton variant="card" className="h-20 rounded-2xl" />
        <Skeleton variant="card" className="h-20 rounded-2xl" />
        <Skeleton variant="card" className="h-20 rounded-2xl" />
      </div>
    </div>
  );
}

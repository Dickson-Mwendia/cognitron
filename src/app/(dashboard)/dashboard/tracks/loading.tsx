import { Skeleton } from "@/components/Skeleton";

export default function TracksLoading() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page header */}
      <Skeleton variant="text" className="h-8 w-40" />
      <Skeleton variant="text" className="h-4 w-72" />

      {/* Track cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4"
          >
            <Skeleton variant="card" className="h-8 w-8 rounded-xl" />
            <Skeleton variant="text" className="h-6 w-40" />
            <Skeleton variant="bar" className="h-3 rounded-full" />
            <Skeleton variant="text" className="h-4 w-24" />
            <div className="space-y-2 pt-2">
              <Skeleton variant="text" className="h-3 w-full" />
              <Skeleton variant="text" className="h-3 w-5/6" />
              <Skeleton variant="text" className="h-3 w-4/6" />
            </div>
            <Skeleton variant="bar" className="h-10 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

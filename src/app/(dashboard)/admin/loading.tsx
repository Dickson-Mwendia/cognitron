import { Skeleton } from "@/components/Skeleton";

export default function AdminLoading() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page header */}
      <Skeleton variant="text" className="h-8 w-48" />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Skeleton variant="card" className="h-28 rounded-2xl" />
        <Skeleton variant="card" className="h-28 rounded-2xl" />
        <Skeleton variant="card" className="h-28 rounded-2xl" />
        <Skeleton variant="card" className="h-28 rounded-2xl" />
      </div>

      {/* Pending approvals */}
      <div className="space-y-4">
        <Skeleton variant="text" className="h-6 w-44" />
        <Skeleton variant="card" className="h-20 rounded-2xl" />
        <Skeleton variant="card" className="h-20 rounded-2xl" />
        <Skeleton variant="card" className="h-20 rounded-2xl" />
      </div>

      {/* Recent activity */}
      <div className="space-y-4">
        <Skeleton variant="text" className="h-6 w-36" />
        <Skeleton variant="card" className="h-64 rounded-2xl" />
      </div>
    </div>
  );
}

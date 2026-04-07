import { Skeleton } from "@/components/Skeleton";

export default function ProfileLoading() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Avatar + name */}
      <div className="flex items-center gap-4 md:gap-6">
        <Skeleton variant="circle" className="h-20 w-20 shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" className="h-7 w-48" />
          <Skeleton variant="text" className="h-4 w-32" />
        </div>
      </div>

      {/* Profile form card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 space-y-6">
        <Skeleton variant="text" className="h-6 w-36" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Skeleton variant="bar" className="h-10 rounded-lg" />
          <Skeleton variant="bar" className="h-10 rounded-lg" />
          <Skeleton variant="bar" className="h-10 rounded-lg" />
          <Skeleton variant="bar" className="h-10 rounded-lg" />
        </div>
        <Skeleton variant="bar" className="h-10 w-32 rounded-full" />
      </div>

      {/* Security section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 space-y-4">
        <Skeleton variant="text" className="h-6 w-44" />
        <Skeleton variant="bar" className="h-10 rounded-lg" />
        <Skeleton variant="bar" className="h-10 rounded-lg" />
      </div>
    </div>
  );
}

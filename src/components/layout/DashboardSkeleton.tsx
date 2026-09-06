import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-50" />
          <Skeleton className="h-4 w-75" />
        </div>
        <Skeleton className="h-10 w-30" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card flex flex-col gap-2 rounded-xl border p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-25" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="mt-2 h-8 w-30" />
            <Skeleton className="mt-1 h-3 w-20" />
          </div>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Large Chart/Table Area */}
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <Skeleton className="mb-4 h-6 w-37.5" />
          <Skeleton className="h-75 w-full rounded-md" />
        </div>

        {/* Secondary Area */}
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <Skeleton className="mb-4 h-6 w-37.5" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-30" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-4 w-15" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

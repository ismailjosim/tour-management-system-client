import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left Sidebar Skeleton */}
        <div className="col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <Skeleton className="mb-4 h-24 w-24 rounded-full" />
              <Skeleton className="mb-2 h-6 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="mt-6 space-y-4 border-t pt-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content Skeleton */}
        <div className="col-span-1 space-y-6 md:col-span-2">
          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <Skeleton className="mb-6 h-7 w-40" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <Skeleton className="mb-6 h-7 w-48" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2 rounded-lg border p-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

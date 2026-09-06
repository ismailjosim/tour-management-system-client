import { Skeleton } from '@/components/ui/skeleton';

export default function ModalSkeleton() {
  return (
    <div className="space-y-6">
      {/* Tour Info Skeleton */}
      <div className="flex items-start gap-4">
        <Skeleton className="h-20 w-20 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* User Info Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Grid Details Skeleton */}
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>

      {/* Additional Info Skeleton */}
      <div className="space-y-2 pt-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="mt-2 h-8 w-32" />
      </div>
    </div>
  );
}

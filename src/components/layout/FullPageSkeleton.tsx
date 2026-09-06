import { Skeleton } from '@/components/ui/skeleton';
import { useLocation } from 'react-router';

export default function FullPageSkeleton() {
  const location = useLocation();
  const isDashboard =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/user') ||
    location.pathname.startsWith('/guide');

  if (isDashboard) {
    return (
      <div className="bg-background flex h-screen w-full overflow-hidden">
        {/* Sidebar Skeleton */}
        <div className="bg-sidebar hidden w-62.5 flex-col border-r p-4 md:flex">
          <Skeleton className="mb-8 h-8 w-32" />
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col">
          {/* Header Skeleton */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="ml-auto h-8 w-8 rounded-full" />
          </header>

          {/* Content Skeleton */}
          <div className="flex-1 p-6">
            <Skeleton className="mb-6 h-8 w-48" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Skeleton className="h-50 w-full rounded-xl" />
              <Skeleton className="h-50 w-full rounded-xl" />
              <Skeleton className="h-50 w-full rounded-xl" />
            </div>
            <Skeleton className="mt-6 h-100 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Standard Page Skeleton
  return (
    <div className="flex h-screen w-full flex-col">
      <header className="flex h-16 items-center border-b px-6">
        <Skeleton className="h-8 w-32" />
        <div className="ml-auto flex gap-4">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </header>
      <div className="flex-1 p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="pt-8">
            <Skeleton className="h-100 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

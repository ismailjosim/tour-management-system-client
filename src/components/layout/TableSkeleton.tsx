import { Skeleton } from '@/components/ui/skeleton';

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
}

export default function TableSkeleton({ columns = 5, rows = 6 }: TableSkeletonProps) {
  return (
    <div className="border-muted w-full overflow-hidden rounded-md border">
      <div className="bg-muted/50 flex border-b px-4 py-3">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={`header-${i}`} className="flex-1">
            <Skeleton className="h-5 w-24" />
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="hover:bg-muted/50 flex border-b px-4 py-4 last:border-0"
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={`cell-${rowIndex}-${colIndex}`} className="flex-1 pr-4">
                <div className="flex flex-col gap-2">
                  <Skeleton
                    className={`h-4 ${colIndex === 0 ? 'w-37.5' : colIndex === columns - 1 ? 'w-20' : 'w-30'}`}
                  />
                  {colIndex === 0 && <Skeleton className="h-3 w-25" />}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

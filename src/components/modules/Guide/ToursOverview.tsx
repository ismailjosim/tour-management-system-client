import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { GuideTourSummary } from '@/types/guide';
import { Link } from 'react-router';

const statusConfig = {
  upcoming: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  completed: 'bg-primary/10 text-primary border-primary/20',
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
};

type ToursOverviewProps = {
  tours?: GuideTourSummary[];
  isLoading?: boolean;
};

export function ToursOverview({ tours = [], isLoading = false }: ToursOverviewProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-foreground text-base font-semibold">My Tours Overview</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link
            to="/guide/my-tours"
            className="text-muted-foreground hover:text-foreground hover:bg-muted h-7 gap-1 px-2 text-xs"
          >
            Manage <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {isLoading && <p className="text-muted-foreground text-sm">Loading assigned tours...</p>}
        {!isLoading && tours.length === 0 && (
          <p className="text-muted-foreground text-sm">No tours have been assigned yet.</p>
        )}
        {!isLoading &&
          tours.slice(0, 6).map((tour) => {
            const startDate = tour.tour?.startDate ? new Date(tour.tour.startDate) : null;
            const status =
              tour.completedBookings === tour.bookingCount
                ? 'completed'
                : startDate && startDate >= new Date()
                  ? 'upcoming'
                  : 'pending';

            return (
              <div
                key={tour.tour?._id ?? tour.tour?.slug}
                className="bg-muted/50 hover:bg-muted hover:border-border flex cursor-pointer items-center justify-between rounded-lg border border-transparent p-3 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-foreground truncate text-sm font-medium">
                    {tour.tour?.title ?? 'Assigned tour'}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    {tour.bookingCount} bookings · ৳{tour.earnings.toLocaleString()}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    'ml-3 shrink-0 px-2 py-0.5 text-[10px] font-medium capitalize',
                    statusConfig[status]
                  )}
                >
                  {status}
                </Badge>
              </div>
            );
          })}

        <Button variant="outline" className="mt-2 h-9 w-full gap-1 bg-transparent text-xs" asChild>
          <Link to="/guide/schedule">
            View all bookings <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

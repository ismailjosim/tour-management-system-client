import { ArrowUpRight, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { GuideBooking } from '@/types/guide';
import { format, isToday, isTomorrow } from 'date-fns';
import { Link } from 'react-router';

const statusConfig = {
  COMPLETE: {
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    label: 'Complete',
  },
  PENDING: {
    dot: 'bg-amber-500',
    badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    label: 'Pending',
  },
  CANCEL: {
    dot: 'bg-red-500',
    badge: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    label: 'Cancelled',
  },
  FAILED: {
    dot: 'bg-red-500',
    badge: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    label: 'Failed',
  },
};

const formatTourDate = (date?: string) => {
  if (!date) return 'Date not set';
  const parsedDate = new Date(date);

  if (isToday(parsedDate)) return 'Today';
  if (isTomorrow(parsedDate)) return 'Tomorrow';

  return format(parsedDate, 'MMM dd');
};

type UpcomingToursProps = {
  bookings?: GuideBooking[];
  isLoading?: boolean;
};

export function UpcomingTours({ bookings = [], isLoading = false }: UpcomingToursProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-foreground text-base font-semibold">Upcoming Tours</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link
            to="/guide/schedule"
            className="text-muted-foreground hover:text-foreground hover:bg-muted h-7 gap-1 px-2 text-xs"
          >
            See all <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading && <p className="text-muted-foreground text-sm">Loading assigned schedule...</p>}
        {!isLoading && bookings.length === 0 && (
          <p className="text-muted-foreground text-sm">No upcoming assigned tours yet.</p>
        )}
        {!isLoading &&
          bookings.slice(0, 5).map((booking) => {
            const status = booking.status as keyof typeof statusConfig;
            const config = statusConfig[status] ?? statusConfig.PENDING;
            const startDate = booking.tour?.startDate;
            return (
              <div
                key={booking._id}
                className="bg-muted/50 hover:bg-muted hover:border-border flex cursor-pointer items-center gap-3 rounded-lg border border-transparent p-3 transition-colors duration-150"
              >
                <div className={cn('h-2 w-2 flex-shrink-0 rounded-full', config.dot)} />
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-sm font-medium">
                    {booking.tour?.title ?? 'Assigned tour'}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">
                      {formatTourDate(startDate)}
                      {startDate ? ` · ${format(new Date(startDate), 'p')}` : ''}
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1 text-xs">
                      <Users className="h-3 w-3" />
                      {booking.guestCount ?? 0}
                    </span>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn('shrink-0 px-2 py-0.5 text-[10px] font-medium', config.badge)}
                >
                  {config.label}
                </Badge>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
}

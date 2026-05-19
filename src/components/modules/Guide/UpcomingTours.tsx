import { ArrowUpRight, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Tour {
  id: string;
  name: string;
  date: string;
  time: string;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const upcomingTours: Tour[] = [
  {
    id: '1',
    name: 'Sundarbans boat trek',
    date: 'Today',
    time: '8:00 AM',
    guests: 4,
    status: 'confirmed',
  },
  {
    id: '2',
    name: 'Old Dhaka heritage walk',
    date: 'Tomorrow',
    time: '9:30 AM',
    guests: 6,
    status: 'pending',
  },
  {
    id: '3',
    name: "Cox's Bazar sunset cruise",
    date: 'Apr 20',
    time: '4:00 PM',
    guests: 3,
    status: 'confirmed',
  },
  {
    id: '4',
    name: 'Rangamati hill trail',
    date: 'Apr 22',
    time: '7:00 AM',
    guests: 8,
    status: 'confirmed',
  },
];

// Updated config to use Tailwind classes that play nice with light/dark variables
const statusConfig = {
  confirmed: {
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    label: 'Confirmed',
  },
  pending: {
    dot: 'bg-amber-500',
    badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    label: 'Pending',
  },
  cancelled: {
    dot: 'bg-red-500',
    badge: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    label: 'Cancelled',
  },
};

export function UpcomingTours() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-foreground text-base font-semibold">Upcoming Tours</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-muted h-7 gap-1 px-2 text-xs"
        >
          See all <ArrowUpRight className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingTours.map((tour) => {
          const config = statusConfig[tour.status];
          return (
            <div
              key={tour.id}
              className="bg-muted/50 hover:bg-muted hover:border-border flex cursor-pointer items-center gap-3 rounded-lg border border-transparent p-3 transition-colors duration-150"
            >
              <div className={cn('h-2 w-2 flex-shrink-0 rounded-full', config.dot)} />
              <div className="min-w-0 flex-1">
                <p className="text-foreground truncate text-sm font-medium">{tour.name}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">
                    {tour.date} · {tour.time}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1 text-xs">
                    <Users className="h-3 w-3" />
                    {tour.guests}
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

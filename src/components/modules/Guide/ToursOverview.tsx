import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TourOverview {
  id: string;
  name: string;
  bookings: number;
  earnings: string;
  status: 'live' | 'draft' | 'paused';
}

const tours: TourOverview[] = [
  {
    id: '1',
    name: 'Sundarbans boat trek',
    bookings: 32,
    earnings: '৳58,200',
    status: 'live',
  },
  {
    id: '2',
    name: 'Old Dhaka heritage walk',
    bookings: 27,
    earnings: '৳43,100',
    status: 'live',
  },
  {
    id: '3',
    name: 'Rangamati hill trail',
    bookings: 18,
    earnings: '৳37,800',
    status: 'draft',
  },
  {
    id: '4',
    name: "Cox's Bazar sunset cruise",
    bookings: 61,
    earnings: '৳45,400',
    status: 'paused',
  },
  {
    id: '5',
    name: 'Rangamati hill trail',
    bookings: 18,
    earnings: '৳37,800',
    status: 'draft',
  },
  {
    id: '6',
    name: "Cox's Bazar sunset cruise",
    bookings: 61,
    earnings: '৳45,400',
    status: 'paused',
  },
];

// Updated config to support light mode readability
const statusConfig = {
  live: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  draft: 'bg-muted text-muted-foreground border-border',
  paused: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
};

export function ToursOverview() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-foreground text-base font-semibold">My Tours Overview</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-muted h-7 gap-1 px-2 text-xs"
        >
          Manage <ArrowUpRight className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="bg-muted/50 hover:bg-muted hover:border-border flex cursor-pointer items-center justify-between rounded-lg border border-transparent p-3 transition-colors"
          >
            <div className="min-w-0">
              <p className="text-foreground truncate text-sm font-medium">{tour.name}</p>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {tour.bookings} bookings · {tour.earnings}
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn(
                'ml-3 shrink-0 px-2 py-0.5 text-[10px] font-medium capitalize',
                statusConfig[tour.status]
              )}
            >
              {tour.status}
            </Badge>
          </div>
        ))}

        <Button
          variant="outline"
          className="border-border text-muted-foreground hover:text-foreground hover:bg-muted mt-2 h-9 w-full gap-1 bg-transparent text-xs transition-all"
        >
          View all bookings <ArrowUpRight className="h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
}

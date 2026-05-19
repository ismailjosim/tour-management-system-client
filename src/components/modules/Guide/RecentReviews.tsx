import { ArrowUpRight, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  tour: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Tasnim Hossain',
    rating: 5,
    comment: 'Incredible experience — Rafiq knew every hidden spot.',
    tour: 'Sundarbans boat trek',
    date: 'Apr 14',
  },
  {
    id: '2',
    name: 'Mehedi Hasan',
    rating: 4,
    comment: 'Very knowledgeable guide. The heritage walk was worth it.',
    tour: 'Old Dhaka heritage walk',
    date: 'Apr 11',
  },
  {
    id: '3',
    name: 'Priya Chakraborty',
    rating: 5,
    comment: "Best tour experience I've had in Bangladesh. Highly recommend!",
    tour: "Cox's Bazar sunset cruise",
    date: 'Apr 8',
  },
];

const ratingDistribution = [
  { star: 5, count: 72, pct: 77 },
  { star: 4, count: 16, pct: 17 },
  { star: 3, count: 4, pct: 4 },
  { star: 2, count: 1, pct: 1 },
  { star: 1, count: 1, pct: 1 },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex justify-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < count ? 'fill-secondary text-secondary' : 'fill-muted text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}

export function RecentReviews() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-foreground text-base font-semibold">Recent Reviews</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-muted h-7 gap-1 px-2 text-xs"
        >
          See all <ArrowUpRight className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent>
        {/* Rating summary */}
        <div className="bg-muted/50 border-border/50 mb-4 flex gap-6 rounded-lg border p-4">
          <div className="text-center">
            <p className="text-foreground text-4xl font-bold">4.8</p>
            <StarRow count={5} />
            <p className="text-muted-foreground mt-1 text-xs">94 reviews</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {ratingDistribution.map(({ star, pct }) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-muted-foreground w-3 text-xs">{star}</span>
                <div className="bg-background h-1.5 flex-1 overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual reviews */}
        <div className="space-y-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-muted/30 hover:bg-muted/50 hover:border-border rounded-lg border border-transparent p-3 transition-colors"
            >
              <div className="mb-1 flex items-center justify-between">
                <p className="text-foreground text-sm font-semibold">{review.name}</p>
                <StarRow count={review.rating} />
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">{review.comment}</p>
              <p className="text-muted-foreground/60 mt-2 text-[10px] font-medium tracking-wider uppercase">
                {review.tour} • {review.date}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

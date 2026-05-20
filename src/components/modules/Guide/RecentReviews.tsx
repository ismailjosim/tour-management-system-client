import { ArrowUpRight, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { GuideReviews } from '@/types/guide';
import { format } from 'date-fns';

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

type RecentReviewsProps = {
  reviews?: GuideReviews;
  isLoading?: boolean;
};

export function RecentReviews({ reviews, isLoading = false }: RecentReviewsProps) {
  const ratingDistribution = reviews?.ratingDistribution ?? [];
  const totalReviews = reviews?.totalReviews ?? 0;

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
            <p className="text-foreground text-4xl font-bold">
              {reviews?.averageRating?.toFixed(1) ?? '0.0'}
            </p>
            <StarRow count={Math.round(reviews?.averageRating ?? 0)} />
            <p className="text-muted-foreground mt-1 text-xs">{totalReviews} reviews</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {ratingDistribution.map(({ rating, count }) => {
              const pct = totalReviews ? Math.round((count / totalReviews) * 100) : 0;

              return (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-muted-foreground w-3 text-xs">{rating}</span>
                  <div className="bg-background h-1.5 flex-1 overflow-hidden rounded-full">
                    <div
                      className="h-full rounded-full bg-amber-400 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Individual reviews */}
        <div className="space-y-3">
          {isLoading && <p className="text-muted-foreground text-sm">Loading reviews...</p>}
          {!isLoading && (reviews?.reviews ?? []).length === 0 && (
            <p className="text-muted-foreground text-sm">No reviews for assigned tours yet.</p>
          )}
          {!isLoading &&
            (reviews?.reviews ?? []).slice(0, 3).map((review) => (
              <div
                key={review._id}
                className="bg-muted/30 hover:bg-muted/50 hover:border-border rounded-lg border border-transparent p-3 transition-colors"
              >
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-foreground text-sm font-semibold">
                    {review.user?.name ?? 'Traveler'}
                  </p>
                  <StarRow count={review.rating} />
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{review.comments}</p>
                <p className="text-muted-foreground/60 mt-2 text-[10px] font-medium tracking-wider uppercase">
                  {review.tour?.title ?? 'Tour'} •{' '}
                  {review.createdAt ? format(new Date(review.createdAt), 'MMM dd') : 'Recent'}
                </p>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

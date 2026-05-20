// import { DashboardHeader } from '@/components/modules/Guide/DashboardHeader'
import { EarningsChart } from '@/components/modules/Guide/EarningsChart';
import { RecentReviews } from '@/components/modules/Guide/RecentReviews';
import { StatsCard } from '@/components/modules/Guide/StatsCard';
import { ToursOverview } from '@/components/modules/Guide/ToursOverview';
import { UpcomingTours } from '@/components/modules/Guide/UpcomingTours';
import { DollarSign, Calendar, Star, MapPinned } from 'lucide-react';
import { useGetGuideStatsQuery } from '@/redux/features/Stats/stats.api';
import {
  useGetMyGuideEarningsQuery,
  useGetMyGuideReviewsQuery,
  useGetMyGuideScheduleQuery,
  useGetMyGuideToursQuery,
} from '@/redux/features/guide/guide.api';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function GuideOverviewPage() {
  const {
    data: statsResponse,
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useGetGuideStatsQuery();
  const { data: scheduleResponse, isLoading: isScheduleLoading } = useGetMyGuideScheduleQuery();
  const { data: toursResponse, isLoading: isToursLoading } = useGetMyGuideToursQuery();
  const { data: earningsResponse, isLoading: isEarningsLoading } = useGetMyGuideEarningsQuery();
  const { data: reviewsResponse, isLoading: isReviewsLoading } = useGetMyGuideReviewsQuery();

  const stats = statsResponse?.data;
  const statsCards = [
    {
      title: 'Total Earnings',
      value: `৳${(stats?.totalEarnings ?? 0).toLocaleString()}`,
      trend: `${Math.round((stats?.commissionRate ?? 0) * 100)}% guide commission`,
      trendUp: true,
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: 'Assigned Tours',
      value: `${stats?.assignedTours ?? 0}`,
      trend: `${stats?.assignedBookings ?? 0} assigned bookings`,
      trendUp: true,
      icon: <MapPinned className="h-4 w-4" />,
    },
    {
      title: 'Upcoming Tours',
      value: `${stats?.upcomingTours ?? 0}`,
      trend: `${stats?.completedTours ?? 0} completed`,
      trendUp: true,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: 'Avg Rating',
      value: `${stats?.averageRating ?? 0} ★`,
      trend: `from ${stats?.totalReviews ?? 0} reviews`,
      trendUp: true,
      icon: <Star className="h-4 w-4" />,
    },
  ];

  return (
    <div>
      {/* Header */}
      {/* <DashboardHeader
				name='Rafiq Josim'
				role='Tour Guide'
				notificationCount={3}
			/> */}

      {/* Main content */}
      <main className="space-y-5">
        {isStatsError && (
          <Alert variant="destructive">
            <AlertDescription>Guide dashboard stats could not be loaded.</AlertDescription>
          </Alert>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {isStatsLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <StatsCard
                  key={index}
                  title="Loading"
                  value="..."
                  trend="Fetching guide data"
                  trendUp
                  icon={<Calendar className="h-4 w-4" />}
                />
              ))
            : statsCards.map((stat) => <StatsCard key={stat.title} {...stat} />)}
        </div>

        {/* Chart + Upcoming tours */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <EarningsChart earnings={earningsResponse?.data} isLoading={isEarningsLoading} />
          </div>
          <div className="lg:col-span-2">
            <UpcomingTours bookings={scheduleResponse?.data} isLoading={isScheduleLoading} />
          </div>
        </div>

        {/* Reviews + Tours overview */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <RecentReviews reviews={reviewsResponse?.data} isLoading={isReviewsLoading} />
          <ToursOverview tours={toursResponse?.data} isLoading={isToursLoading} />
        </div>
      </main>
    </div>
  );
}

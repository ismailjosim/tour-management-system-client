// import { DashboardHeader } from '@/components/modules/Guide/DashboardHeader'
import { EarningsChart } from '@/components/modules/Guide/EarningsChart'
import { RecentReviews } from '@/components/modules/Guide/RecentReviews'
import { StatsCard } from '@/components/modules/Guide/StatsCard'
import { ToursOverview } from '@/components/modules/Guide/ToursOverview'
import { UpcomingTours } from '@/components/modules/Guide/UpcomingTours'
import { DollarSign, Calendar, Star, BarChart2 } from 'lucide-react'

const stats = [
	{
		title: 'Total Earnings',
		value: '৳1,84,500',
		trend: '+12% vs last month',
		trendUp: true,
		icon: <DollarSign className='w-4 h-4' />,
	},
	{
		title: 'This Month',
		value: '৳24,200',
		trend: '+8% vs April avg',
		trendUp: true,
		icon: <BarChart2 className='w-4 h-4' />,
	},
	{
		title: 'Total Bookings',
		value: '138',
		trend: '+5 this week',
		trendUp: true,
		icon: <Calendar className='w-4 h-4' />,
	},
	{
		title: 'Avg Rating',
		value: '4.8 ★',
		trend: 'from 94 reviews',
		trendUp: true,
		icon: <Star className='w-4 h-4' />,
		subtitle: 'from 94 reviews',
	},
]

export default function GuideOverviewPage() {
	return (
		<div>
			{/* Header */}
			{/* <DashboardHeader
				name='Rafiq Josim'
				role='Tour Guide'
				notificationCount={3}
			/> */}

			{/* Main content */}
			<main className=' space-y-5'>
				{/* Stats row */}
				<div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
					{stats.map((stat) => (
						<StatsCard key={stat.title} {...stat} />
					))}
				</div>

				{/* Chart + Upcoming tours */}
				<div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
					<div className='lg:col-span-3'>
						<EarningsChart />
					</div>
					<div className='lg:col-span-2'>
						<UpcomingTours />
					</div>
				</div>

				{/* Reviews + Tours overview */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
					<RecentReviews />
					<ToursOverview />
				</div>
			</main>
		</div>
	)
}

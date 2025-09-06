/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Users, Calendar, DollarSign, MapPin, Award, Globe } from 'lucide-react'
import {
	useGetUserStatsQuery,
	useGetBookingStatsQuery,
	useGetPaymentStatsQuery,
	useGetTourStatsQuery,
} from '@/redux/features/Stats/stats.api'
import PieChartCard from '@/components/modules/analytics/PieChartCard'
import BarChartCard from '@/components/modules/analytics/BarChartCard'
import DivisionProgressCard from '@/components/modules/analytics/DivisionProgressCard'
import StatCard from '@/components/modules/analytics/StatCard'
import DestinationLoading from '@/utils/DestinationLoading'

const COLORS = [
	'#3B82F6',
	'#10B981',
	'#F59E0B',
	'#EF4444',
	'#8B5CF6',
	'#EC4899',
]

const Analytics: React.FC = () => {
	const { data: userStatsRes } = useGetUserStatsQuery(undefined)
	const { data: bookingStatsRes } = useGetBookingStatsQuery(undefined)
	const { data: paymentStatsRes } = useGetPaymentStatsQuery(undefined)
	const { data: tourStatsRes } = useGetTourStatsQuery(undefined)

	if (!userStatsRes || !bookingStatsRes || !paymentStatsRes || !tourStatsRes) {
		return <DestinationLoading />
	}

	const userStats = userStatsRes.data ?? {}
	const bookingStats = bookingStatsRes.data ?? {}
	const paymentStats = paymentStatsRes.data ?? {}
	const tourStats = tourStatsRes.data ?? {}

	const totalRevenue = paymentStats.totalRevenue?.[0]?.totalRevenue ?? 0
	const avgTourCost = tourStats.avgTourCost?.[0]?.avgCostFrom ?? 0
	const avgPaymentAmount =
		paymentStats.avgPaymentAmount?.[0]?.avgPaymentAmount ?? 0

	const bookingStatusData =
		bookingStats.totalBookingByStatus?.map((b: any) => ({
			name: String(b._id),
			value: Number(b.count),
		})) ?? []

	const paymentStatusData =
		paymentStats.totalPaymentByStatus?.map((p: any) => ({
			name: String(p._id),
			value: Number(p.count),
		})) ?? []

	const tourTypeData =
		tourStats.totalTourByTourType?.map((t: any) => ({
			name: String(t._id),
			count: Number(t.count),
		})) ?? []

	const divisionData =
		tourStats.totalTourByDivision?.map((d: any) => ({
			name: String(d._id),
			count: Number(d.count),
		})) ?? []

	return (
		<div className='min-h-screen'>
			{/* Header */}

			<div className='mb-8 flex items-center justify-center text-center'>
				<div>
					<h1 className='text-4xl font-bold mb-2'>Tour Dashboard</h1>
					<p className='text-muted-foreground'>
						Overview of your tour business performance
					</p>
				</div>
			</div>

			{/* Main Stats Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
				<StatCard
					title='Total Revenue'
					value={`$${totalRevenue.toLocaleString()}`}
					subtitle={`${paymentStats.totalPayment ?? 0} payments`}
					trend='up'
					trendValue='15%'
					icon={DollarSign}
					color='green'
				/>
				<StatCard
					title='Total Bookings'
					value={bookingStats.totalBooking ?? 0}
					subtitle={`${bookingStats.bookingLastThirty ?? 0} this month`}
					trend='up'
					trendValue='12%'
					icon={Calendar}
					color='blue'
				/>
				<StatCard
					title='Active Users'
					value={userStats.totalActiveUser ?? 0}
					subtitle={`${userStats.totalUsers ?? 0} total users`}
					trend='up'
					trendValue='8%'
					icon={Users}
					color='purple'
				/>
				<StatCard
					title='Available Tours'
					value={tourStats.totalTour ?? 0}
					subtitle={`Avg cost $${Math.round(avgTourCost)}`}
					icon={MapPin}
					color='orange'
				/>
			</div>

			{/* Charts */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
				<PieChartCard
					title='Booking Status'
					data={bookingStatusData}
					colors={COLORS}
					icon={Award}
				/>
				<BarChartCard
					title='Payment Status'
					data={paymentStatusData}
					dataKey='value'
					icon={DollarSign}
				/>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<BarChartCard
					title='Tour Types'
					data={tourTypeData}
					dataKey='count'
					icon={Globe}
					horizontal
				/>
				<DivisionProgressCard
					title='Tours by Location'
					data={divisionData}
					colors={COLORS}
					extraStats={[
						{
							label: 'Avg Guests/Booking',
							value: Math.round(bookingStats.avgGuestPerBooking ?? 0),
						},
						{ label: 'Avg Payment', value: `$${Math.round(avgPaymentAmount)}` },
					]}
				/>
			</div>
		</div>
	)
}

export default Analytics

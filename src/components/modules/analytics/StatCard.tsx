/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrendingUp, TrendingDown } from 'lucide-react'
import type React from 'react'

interface StatCardProps {
	title: string
	value: string | number
	subtitle?: string
	trend?: 'up' | 'down'
	trendValue?: string
	icon: React.ComponentType<any>
	color?: 'blue' | 'green' | 'orange' | 'purple' | 'pink'
}

const StatCard: React.FC<StatCardProps> = ({
	title,
	value,
	subtitle,
	trend,
	trendValue,
	icon: Icon,
	color = 'blue',
}) => {
	const colorClasses: Record<string, string> = {
		blue: 'from-blue-500 to-blue-600',
		green: 'from-emerald-500 to-emerald-600',
		orange: 'from-orange-500 to-orange-600',
		purple: 'from-purple-500 to-purple-600',
		pink: 'from-pink-500 to-pink-600',
	}

	return (
		<div className='rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md'>
			{/* top section */}
			<div className='mb-4 flex items-center justify-between'>
				<div
					className={`rounded-xl bg-gradient-to-r ${colorClasses[color]} p-3 shadow-md`}
				>
					<Icon className='h-6 w-6 text-white' />
				</div>

				{trend && trendValue && (
					<div
						className={`flex items-center space-x-1 rounded-full px-3 py-1 text-sm font-semibold ${
							trend === 'up'
								? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
								: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
						}`}
					>
						{trend === 'up' ? (
							<TrendingUp className='h-4 w-4' />
						) : (
							<TrendingDown className='h-4 w-4' />
						)}
						<span>{trendValue}</span>
					</div>
				)}
			</div>

			{/* texts */}
			<h3 className='mb-1 text-sm font-medium text-muted-foreground'>
				{title}
			</h3>
			<p className='mb-1 text-3xl font-bold text-foreground'>{value}</p>
			{subtitle && <p className='text-sm text-muted-foreground'>{subtitle}</p>}
		</div>
	)
}

export default StatCard

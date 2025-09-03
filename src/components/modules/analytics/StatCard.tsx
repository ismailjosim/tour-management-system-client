/* eslint-disable @typescript-eslint/no-explicit-any */

import { TrendingUp, TrendingDown } from 'lucide-react'
import type React from 'react'

// ---------- StatCard Component ----------
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
		<div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300'>
			<div className='flex items-center justify-between mb-4'>
				<div
					className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} shadow-lg`}
				>
					<Icon className='w-6 h-6 text-white' />
				</div>
				{trend && trendValue && (
					<div
						className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${
							trend === 'up'
								? 'bg-green-100 text-green-700'
								: 'bg-red-100 text-red-700'
						}`}
					>
						{trend === 'up' ? (
							<TrendingUp className='w-4 h-4' />
						) : (
							<TrendingDown className='w-4 h-4' />
						)}
						<span>{trendValue}</span>
					</div>
				)}
			</div>
			<h3 className='text-sm font-medium text-gray-600 mb-1'>{title}</h3>
			<p className='text-3xl font-bold text-gray-900 mb-1'>{value}</p>
			{subtitle && <p className='text-sm text-gray-500'>{subtitle}</p>}
		</div>
	)
}
export default StatCard

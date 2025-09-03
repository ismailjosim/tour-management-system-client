import React from 'react'
import {
	ResponsiveContainer,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Bar,
	Cell,
} from 'recharts'

interface BarChartCardProps {
	title: string
	data: { name: string; value: number }[]
	dataKey?: string
	icon?: React.FC<React.SVGProps<SVGSVGElement>>
	horizontal?: boolean
}

// Helper to generate random hex color
const getRandomColor = () =>
	'#' +
	Math.floor(Math.random() * 16777215)
		.toString(16)
		.padStart(6, '0')

const BarChartCard: React.FC<BarChartCardProps> = ({
	title,
	data,
	dataKey = 'value',
	icon: Icon,
	horizontal = false,
}) => {
	return (
		<div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-xl font-bold text-gray-900'>{title}</h2>
				{Icon && <Icon className='w-5 h-5 text-gray-400' />}
			</div>
			<div className='h-64'>
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart data={data} layout={horizontal ? 'vertical' : 'horizontal'}>
						<CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />

						{horizontal ? (
							<>
								<XAxis type='number' />
								<YAxis
									dataKey='name'
									type='category'
									width={100}
									tick={{ fontSize: 12 }}
								/>
							</>
						) : (
							<>
								<XAxis dataKey='name' type='category' tick={{ fontSize: 12 }} />
								<YAxis type='number' />
							</>
						)}

						<Bar
							dataKey={dataKey}
							radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
						>
							{data.map((_, index) => (
								<Cell key={index} fill={getRandomColor()} />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default BarChartCard

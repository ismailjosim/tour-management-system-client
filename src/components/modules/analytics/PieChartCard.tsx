import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface PieChartCardProps {
	title: string
	data: { name: string; value: number }[]
	colors: string[]
	icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

const PieChartCard: React.FC<PieChartCardProps> = ({
	title,
	data,
	colors,
	icon: Icon,
}) => {
	return (
		<div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-xl font-bold text-gray-900'>{title}</h2>
				{Icon && <Icon className='w-5 h-5 text-gray-400' />}
			</div>
			<div className='h-64'>
				<ResponsiveContainer width='100%' height='100%'>
					<PieChart>
						<Pie
							data={data}
							dataKey='value'
							nameKey='name'
							cx='50%'
							cy='50%'
							innerRadius={60}
							outerRadius={100}
							paddingAngle={5}
						>
							{data.map((entry, index) => (
								<Cell key={entry.name} fill={colors[index % colors.length]} />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default PieChartCard

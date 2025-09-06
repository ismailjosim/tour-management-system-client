import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface PieChartCardProps {
	title: string
	data: { name: string; value: number }[]
	colors?: string[]
	icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

// default chart-safe theme colors
const defaultColors = [
	'hsl(var(--chart-1))',
	'hsl(var(--chart-2))',
	'hsl(var(--chart-3))',
	'hsl(var(--chart-4))',
	'hsl(var(--chart-5))',
]

const PieChartCard: React.FC<PieChartCardProps> = ({
	title,
	data,
	colors = defaultColors,
	icon: Icon,
}) => {
	return (
		<Card className='rounded-2xl shadow-sm hover:shadow-md transition-all duration-300'>
			<CardHeader className='flex flex-row items-center justify-between'>
				<CardTitle className='text-xl font-bold text-foreground'>
					{title}
				</CardTitle>
				{Icon && <Icon className='h-5 w-5 text-muted-foreground' />}
			</CardHeader>

			<CardContent>
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
			</CardContent>
		</Card>
	)
}

export default PieChartCard

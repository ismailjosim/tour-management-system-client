/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

const earningsData6m = [
	{ month: 'Nov', amount: 14000 },
	{ month: 'Dec', amount: 18000 },
	{ month: 'Jan', amount: 11000 },
	{ month: 'Feb', amount: 21000 },
	{ month: 'Mar', amount: 19000 },
	{ month: 'Apr', amount: 24200 },
]

const earningsData3m = [
	{ month: 'Feb', amount: 21000 },
	{ month: 'Mar', amount: 19000 },
	{ month: 'Apr', amount: 24200 },
]

const earningsData12m = [
	{ month: 'May', amount: 9000 },
	{ month: 'Jun', amount: 12000 },
	{ month: 'Jul', amount: 15500 },
	{ month: 'Aug', amount: 17000 },
	{ month: 'Sep', amount: 13000 },
	{ month: 'Oct', amount: 16000 },
	{ month: 'Nov', amount: 14000 },
	{ month: 'Dec', amount: 18000 },
	{ month: 'Jan', amount: 11000 },
	{ month: 'Feb', amount: 21000 },
	{ month: 'Mar', amount: 19000 },
	{ month: 'Apr', amount: 24200 },
]

const dataMap: Record<string, typeof earningsData6m> = {
	'3m': earningsData3m,
	'6m': earningsData6m,
	'12m': earningsData12m,
}

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			// Switched to bg-popover and text-foreground variables
			<div className='bg-popover border border-border rounded-lg px-3 py-2 shadow-xl'>
				<p className='text-xs text-muted-foreground mb-1'>{label}</p>
				<p className='text-sm font-semibold text-foreground'>
					৳{payload[0].value.toLocaleString()}
				</p>
			</div>
		)
	}
	return null
}

export function EarningsChart() {
	const [range, setRange] = useState('6m')
	const data = dataMap[range]
	// const currentMonth = data[data.length - 1].month

	return (
		<Card className='bg-card border-border h-full flex justify-between'>
			<CardHeader className='flex flex-row items-center justify-between pb-4'>
				<CardTitle className='text-foreground text-base font-semibold'>
					Monthly Earnings
				</CardTitle>
				<Select value={range} onValueChange={setRange}>
					{/* Replaced hardcoded backgrounds with bg-muted and bg-popover */}
					<SelectTrigger className='w-36 bg-muted border-border text-foreground text-xs h-8'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent className='bg-popover border-border text-foreground'>
						<SelectItem value='3m'>Last 3 months</SelectItem>
						<SelectItem value='6m'>Last 6 months</SelectItem>
						<SelectItem value='12m'>Last 12 months</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width='100%' height={220}>
					<BarChart data={data} barSize={28}>
						<CartesianGrid
							strokeDasharray='3 3'
							stroke='var(--border)'
							vertical={false}
						/>
						<XAxis
							dataKey='month'
							tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
							axisLine={false}
							tickLine={false}
						/>
						<YAxis
							tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
							axisLine={false}
							tickLine={false}
							tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
							width={40}
						/>
						<Tooltip
							content={<CustomTooltip />}
							cursor={{ fill: 'var(--muted)', fillOpacity: 0.4 }}
						/>
						<Bar dataKey='amount' radius={[4, 4, 0, 0]}>
							{data.map((entry, index) => (
								<Cell
									key={entry.month}
									fill={`var(--chart-${(index % 5) + 1})`}
								/>
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}

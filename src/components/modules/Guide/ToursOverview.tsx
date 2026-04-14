import { ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TourOverview {
	id: string
	name: string
	bookings: number
	earnings: string
	status: 'live' | 'draft' | 'paused'
}

const tours: TourOverview[] = [
	{
		id: '1',
		name: 'Sundarbans boat trek',
		bookings: 32,
		earnings: '৳58,200',
		status: 'live',
	},
	{
		id: '2',
		name: 'Old Dhaka heritage walk',
		bookings: 27,
		earnings: '৳43,100',
		status: 'live',
	},
	{
		id: '3',
		name: 'Rangamati hill trail',
		bookings: 18,
		earnings: '৳37,800',
		status: 'draft',
	},
	{
		id: '4',
		name: "Cox's Bazar sunset cruise",
		bookings: 61,
		earnings: '৳45,400',
		status: 'paused',
	},
]

const statusConfig = {
	live: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
	draft: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
	paused: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

export function ToursOverview() {
	return (
		<Card className='bg-[#1e2128] border-[#2a2d35]'>
			<CardHeader className='flex flex-row items-center justify-between pb-4'>
				<CardTitle className='text-white text-base font-semibold'>
					My Tours Overview
				</CardTitle>
				<Button
					variant='ghost'
					size='sm'
					className='text-zinc-400 hover:text-white text-xs gap-1 h-7 px-2'
				>
					Manage <ArrowUpRight className='w-3 h-3' />
				</Button>
			</CardHeader>
			<CardContent className='space-y-2'>
				{tours.map((tour) => (
					<div
						key={tour.id}
						className='flex items-center justify-between p-3 rounded-lg bg-[#252830] hover:bg-[#2a2d37] transition-colors cursor-pointer'
					>
						<div className='min-w-0'>
							<p className='text-sm font-medium text-white truncate'>
								{tour.name}
							</p>
							<p className='text-xs text-zinc-500 mt-0.5'>
								{tour.bookings} bookings · {tour.earnings}
							</p>
						</div>
						<Badge
							variant='outline'
							className={cn(
								'text-[10px] px-2 py-0.5 capitalize shrink-0 ml-3',
								statusConfig[tour.status],
							)}
						>
							{tour.status}
						</Badge>
					</div>
				))}

				<Button
					variant='outline'
					className='w-full mt-2 border-[#2a2d35] bg-transparent text-zinc-400 hover:text-white hover:bg-[#252830] text-xs h-9 gap-1'
				>
					View all bookings <ArrowUpRight className='w-3 h-3' />
				</Button>
			</CardContent>
		</Card>
	)
}

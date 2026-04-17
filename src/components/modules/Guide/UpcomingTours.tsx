import { ArrowUpRight, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Tour {
	id: string
	name: string
	date: string
	time: string
	guests: number
	status: 'confirmed' | 'pending' | 'cancelled'
}

const upcomingTours: Tour[] = [
	{
		id: '1',
		name: 'Sundarbans boat trek',
		date: 'Today',
		time: '8:00 AM',
		guests: 4,
		status: 'confirmed',
	},
	{
		id: '2',
		name: 'Old Dhaka heritage walk',
		date: 'Tomorrow',
		time: '9:30 AM',
		guests: 6,
		status: 'pending',
	},
	{
		id: '3',
		name: "Cox's Bazar sunset cruise",
		date: 'Apr 20',
		time: '4:00 PM',
		guests: 3,
		status: 'confirmed',
	},
	{
		id: '4',
		name: 'Rangamati hill trail',
		date: 'Apr 22',
		time: '7:00 AM',
		guests: 8,
		status: 'confirmed',
	},
]

// Updated config to use Tailwind classes that play nice with light/dark variables
const statusConfig = {
	confirmed: {
		dot: 'bg-emerald-500',
		badge:
			'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
		label: 'Confirmed',
	},
	pending: {
		dot: 'bg-amber-500',
		badge:
			'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
		label: 'Pending',
	},
	cancelled: {
		dot: 'bg-red-500',
		badge: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
		label: 'Cancelled',
	},
}

export function UpcomingTours() {
	return (
		<Card className='bg-card border-border'>
			<CardHeader className='flex flex-row items-center justify-between pb-4'>
				<CardTitle className='text-foreground text-base font-semibold'>
					Upcoming Tours
				</CardTitle>
				<Button
					variant='ghost'
					size='sm'
					className='text-muted-foreground hover:text-foreground hover:bg-muted text-xs gap-1 h-7 px-2'
				>
					See all <ArrowUpRight className='w-3 h-3' />
				</Button>
			</CardHeader>
			<CardContent className='space-y-3'>
				{upcomingTours.map((tour) => {
					const config = statusConfig[tour.status]
					return (
						<div
							key={tour.id}
							className='flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-150 cursor-pointer border border-transparent hover:border-border'
						>
							<div
								className={cn('w-2 h-2 rounded-full flex-shrink-0', config.dot)}
							/>
							<div className='flex-1 min-w-0'>
								<p className='text-sm font-medium text-foreground truncate'>
									{tour.name}
								</p>
								<div className='flex items-center gap-2 mt-0.5'>
									<span className='text-xs text-muted-foreground'>
										{tour.date} · {tour.time}
									</span>
									<span className='flex items-center gap-1 text-xs text-muted-foreground'>
										<Users className='w-3 h-3' />
										{tour.guests}
									</span>
								</div>
							</div>
							<Badge
								variant='outline'
								className={cn(
									'text-[10px] px-2 py-0.5 shrink-0 font-medium',
									config.badge,
								)}
							>
								{config.label}
							</Badge>
						</div>
					)
				})}
			</CardContent>
		</Card>
	)
}

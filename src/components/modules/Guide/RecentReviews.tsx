import { ArrowUpRight, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Review {
	id: string
	name: string
	rating: number
	comment: string
	tour: string
	date: string
}

const reviews: Review[] = [
	{
		id: '1',
		name: 'Tasnim Hossain',
		rating: 5,
		comment: 'Incredible experience — Rafiq knew every hidden spot.',
		tour: 'Sundarbans boat trek',
		date: 'Apr 14',
	},
	{
		id: '2',
		name: 'Mehedi Hasan',
		rating: 4,
		comment: 'Very knowledgeable guide. The heritage walk was worth it.',
		tour: 'Old Dhaka heritage walk',
		date: 'Apr 11',
	},
	{
		id: '3',
		name: 'Priya Chakraborty',
		rating: 5,
		comment: "Best tour experience I've had in Bangladesh. Highly recommend!",
		tour: "Cox's Bazar sunset cruise",
		date: 'Apr 8',
	},
]

const ratingDistribution = [
	{ star: 5, count: 72, pct: 77 },
	{ star: 4, count: 16, pct: 17 },
	{ star: 3, count: 4, pct: 4 },
	{ star: 2, count: 1, pct: 1 },
	{ star: 1, count: 1, pct: 1 },
]

function StarRow({ count }: { count: number }) {
	return (
		<div className='flex gap-0.5 justify-center'>
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`w-3 h-3 ${
						i < count
							? 'fill-secondary text-secondary'
							: 'fill-muted text-muted-foreground/30'
					}`}
				/>
			))}
		</div>
	)
}

export function RecentReviews() {
	return (
		<Card className='bg-card border-border'>
			<CardHeader className='flex flex-row items-center justify-between pb-4'>
				<CardTitle className='text-foreground text-base font-semibold'>
					Recent Reviews
				</CardTitle>
				<Button
					variant='ghost'
					size='sm'
					className='text-muted-foreground hover:text-foreground hover:bg-muted text-xs gap-1 h-7 px-2'
				>
					See all <ArrowUpRight className='w-3 h-3' />
				</Button>
			</CardHeader>
			<CardContent>
				{/* Rating summary */}
				<div className='flex gap-6 p-4 rounded-lg bg-muted/50 mb-4 border border-border/50'>
					<div className='text-center'>
						<p className='text-4xl font-bold text-foreground'>4.8</p>
						<StarRow count={5} />
						<p className='text-xs text-muted-foreground mt-1'>94 reviews</p>
					</div>
					<div className='flex-1 space-y-1.5'>
						{ratingDistribution.map(({ star, pct }) => (
							<div key={star} className='flex items-center gap-2'>
								<span className='text-xs text-muted-foreground w-3'>
									{star}
								</span>
								<div className='flex-1 h-1.5 bg-background rounded-full overflow-hidden'>
									<div
										className='h-full bg-amber-400 rounded-full transition-all duration-500'
										style={{ width: `${pct}%` }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Individual reviews */}
				<div className='space-y-3'>
					{reviews.map((review) => (
						<div
							key={review.id}
							className='p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-transparent hover:border-border'
						>
							<div className='flex items-center justify-between mb-1'>
								<p className='text-sm font-semibold text-foreground'>
									{review.name}
								</p>
								<StarRow count={review.rating} />
							</div>
							<p className='text-xs text-muted-foreground leading-relaxed'>
								{review.comment}
							</p>
							<p className='text-[10px] text-muted-foreground/60 mt-2 font-medium uppercase tracking-wider'>
								{review.tour} • {review.date}
							</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

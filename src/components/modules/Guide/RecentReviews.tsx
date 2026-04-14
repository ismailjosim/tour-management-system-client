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
		<div className='flex gap-0.5'>
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`w-3 h-3 ${
						i < count
							? 'fill-amber-400 text-amber-400'
							: 'fill-zinc-700 text-zinc-700'
					}`}
				/>
			))}
		</div>
	)
}

export function RecentReviews() {
	return (
		<Card className='bg-[#1e2128] border-[#2a2d35]'>
			<CardHeader className='flex flex-row items-center justify-between pb-4'>
				<CardTitle className='text-white text-base font-semibold'>
					Recent Reviews
				</CardTitle>
				<Button
					variant='ghost'
					size='sm'
					className='text-zinc-400 hover:text-white text-xs gap-1 h-7 px-2'
				>
					See all <ArrowUpRight className='w-3 h-3' />
				</Button>
			</CardHeader>
			<CardContent>
				{/* Rating summary */}
				<div className='flex gap-6 p-4 rounded-lg bg-[#252830] mb-4'>
					<div className='text-center'>
						<p className='text-4xl font-bold text-white'>4.8</p>
						<StarRow count={5} />
						<p className='text-xs text-zinc-500 mt-1'>94 reviews</p>
					</div>
					<div className='flex-1 space-y-1'>
						{ratingDistribution.map(({ star, pct }) => (
							<div key={star} className='flex items-center gap-2'>
								<span className='text-xs text-zinc-500 w-3'>{star}</span>
								<div className='flex-1 h-1.5 bg-[#1e2128] rounded-full overflow-hidden'>
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
							className='p-3 rounded-lg bg-[#252830] space-y-1.5'
						>
							<div className='flex items-center justify-between'>
								<p className='text-sm font-semibold text-white'>
									{review.name}
								</p>
								<StarRow count={review.rating} />
							</div>
							<p className='text-xs text-zinc-400 leading-relaxed'>
								{review.comment}
							</p>
							<p className='text-[10px] text-zinc-600'>
								{review.tour} · {review.date}
							</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

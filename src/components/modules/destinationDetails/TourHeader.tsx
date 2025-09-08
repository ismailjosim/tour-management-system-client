import React from 'react'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import StarRating from './StarRating'

interface TourHeaderProps {
	title: string
	location: string
	averageRating: number
	totalReviews: number
	slug: string
}

const TourHeader: React.FC<TourHeaderProps> = ({
	title,
	location,
	averageRating,
	totalReviews,
	slug,
}) => {
	const [city, country] = location.split(',').map((s) => s.trim())

	return (
		<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
			<div>
				<h2 className='text-3xl md:text-5xl font-bold capitalize mb-2'>
					{title}
				</h2>
				<div className='flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400'>
					<div className='flex items-center gap-2'>
						<MapPin className='h-4 w-4' />
						<span>
							{city}, {country}
						</span>
					</div>
					<div className='flex items-center gap-1'>
						<StarRating rating={averageRating} />
					</div>
					<span className='text-gray-500 dark:text-gray-500'>
						({totalReviews} Reviews)
					</span>
				</div>
			</div>
			<Link to={`/booking/${slug}`}>
				<Button className='w-full md:w-auto text-lg font-semibold px-8 py-6'>
					Book Now
				</Button>
			</Link>
		</div>
	)
}

export default TourHeader

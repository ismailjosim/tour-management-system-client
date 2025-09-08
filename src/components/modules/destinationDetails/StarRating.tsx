import React from 'react'
import { Star } from 'lucide-react'

interface StarRatingProps {
	rating: number
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
	return (
		<div className='flex items-center gap-1'>
			{[...Array(5)].map((_, i) => (
				<Star
					key={i}
					className={`h-4 w-4 ${
						i < rating
							? 'fill-yellow-400 text-yellow-400'
							: 'fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600'
					}`}
				/>
			))}
		</div>
	)
}

export default StarRating

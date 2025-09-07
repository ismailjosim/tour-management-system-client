import { Star } from 'lucide-react'

// Star Rating Component - Themed
const StarRating: React.FC<{ rating: number; size?: string }> = ({
	rating,
	size = 'w-4 h-4',
}) => {
	return (
		<div className='flex items-center space-x-1 mb-4'>
			{[1, 2, 3, 4, 5].map((star) => (
				<Star
					key={star}
					className={`${size} transition-colors duration-200 ${
						star <= rating
							? 'fill-yellow-400 text-yellow-400 drop-shadow-sm'
							: 'text-gray-300 dark:text-gray-600'
					}`}
				/>
			))}
		</div>
	)
}
export default StarRating

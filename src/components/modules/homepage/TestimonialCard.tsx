import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Quote } from 'lucide-react'
import StarRating from './StarRating'
import type { ReviewContent } from '../../../types/home.type'

const TestimonialCard: React.FC<{ content: ReviewContent; index: number }> = ({
	content,
	index,
}) => {
	const { name, post, details, avatar, rating = 5 } = content

	const initials = name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase()

	return (
		<Card className='h-full shadow-lg hover:shadow-xl dark:shadow-gray-800/25 dark:hover:shadow-gray-700/50 transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 group  transform'>
			<CardContent className='p-8 h-full flex flex-col relative'>
				{/* Quote Icon - Themed */}
				<Quote className='w-8 h-8 text-blue-600 dark:text-blue-400 mb-4 opacity-60 group-hover:opacity-80 transition-all duration-200' />

				{/* Star Rating */}
				<StarRating rating={rating} />

				{/* Review Text - Themed */}
				<blockquote className='text-gray-700 dark:text-gray-300 text-center leading-relaxed mb-8 flex-grow italic relative'>
					<span className='text-blue-600 dark:text-blue-400 text-2xl absolute -top-2 -left-2'>
						"
					</span>
					{details}
					<span className='text-blue-600 dark:text-blue-400 text-2xl absolute -bottom-4 -right-2'>
						"
					</span>
				</blockquote>

				{/* Author Info - Themed */}
				<div className='flex flex-col items-center pt-4 border-t border-gray-100 dark:border-gray-700'>
					<Avatar className='w-16 h-16 mb-4 ring-2 ring-blue-100 dark:ring-blue-900/50 shadow-md hover:ring-blue-200 dark:hover:ring-blue-800/70 transition-all duration-200'>
						<AvatarImage
							src={avatar}
							alt={`${name} - ${post}`}
							className='object-cover'
						/>
						<AvatarFallback className='bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-lg font-semibold'>
							{initials}
						</AvatarFallback>
					</Avatar>

					<div className='text-center'>
						<h3 className='font-semibold text-gray-900 dark:text-gray-100 text-lg mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'>
							{name}
						</h3>
						<Badge
							variant='secondary'
							className='text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200'
						>
							{post}
						</Badge>
					</div>
				</div>

				{/* Card number indicator */}
				<div className='absolute top-4 right-4 w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold opacity-20 group-hover:opacity-40 transition-opacity duration-200'>
					{index + 1}
				</div>
			</CardContent>
		</Card>
	)
}
export default TestimonialCard

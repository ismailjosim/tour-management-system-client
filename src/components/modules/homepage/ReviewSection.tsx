import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { useState, useEffect } from 'react'
import SectionHeading from '../../../utils/SectionHeading'

// Types
interface HeadingProps {
	subHeading: string
	headingOne: string
	headingTwo: string
	describe: string
}

interface ReviewContent {
	name: string
	post: string
	details: string
	avatar?: string
	rating?: number
}

// Custom Slider Component (replacing react-slick)
interface SliderProps {
	children: React.ReactNode[]
	autoplay?: boolean
	autoplaySpeed?: number
	slidesToShow?: number
	className?: string
}

const CustomSlider: React.FC<SliderProps> = ({
	children,
	autoplay = true,
	autoplaySpeed = 5000,
	slidesToShow = 3,
	className = '',
}) => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const totalSlides = children.length
	const maxSlide = Math.max(0, totalSlides - slidesToShow)

	useEffect(() => {
		if (!autoplay) return

		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
		}, autoplaySpeed)

		return () => clearInterval(interval)
	}, [autoplay, autoplaySpeed, maxSlide])

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
	}

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1))
	}

	return (
		<div className={`relative ${className}`}>
			<div className='overflow-hidden'>
				<div
					className='flex transition-transform duration-500 ease-in-out'
					style={{
						transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
					}}
				>
					{children.map((child, index) => (
						<div
							key={index}
							className={`flex-shrink-0 px-4`}
							style={{ width: `${100 / slidesToShow}%` }}
						>
							{child}
						</div>
					))}
				</div>
			</div>

			{/* Navigation Buttons */}
			<button
				onClick={prevSlide}
				className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors'
				aria-label='Previous slide'
			>
				<ChevronLeft className='w-5 h-5 text-gray-600' />
			</button>

			<button
				onClick={nextSlide}
				className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors'
				aria-label='Next slide'
			>
				<ChevronRight className='w-5 h-5 text-gray-600' />
			</button>

			{/* Dots Indicator */}
			<div className='flex justify-center mt-8 space-x-2'>
				{Array.from({ length: maxSlide + 1 }).map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`w-3 h-3 rounded-full transition-colors ${
							currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	)
}

// Star Rating Component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
	return (
		<div className='flex items-center space-x-1 mb-4'>
			{[1, 2, 3, 4, 5].map((star) => (
				<Star
					key={star}
					className={`w-4 h-4 ${
						star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
					}`}
				/>
			))}
		</div>
	)
}

// Main Reviews Component
const ReviewSection: React.FC = () => {
	const heading: HeadingProps = {
		subHeading: "CLIENT'S REVIEWS",
		headingOne: "TRAVELER'S",
		headingTwo: 'TESTIMONIAL',
		describe:
			'Discover what our valued travelers say about their extraordinary journeys and experiences with us.',
	}

	const contents: ReviewContent[] = [
		{
			name: 'Sarah Johnson',
			post: 'Travel Blogger',
			details:
				'An absolutely incredible experience! The attention to detail and personalized service exceeded all my expectations. Every moment of the journey was perfectly planned.',
			avatar:
				'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
			rating: 5,
		},
		{
			name: 'Michael Chen',
			post: 'Photographer',
			details:
				'The landscapes were breathtaking and the cultural immersion was authentic. This trip opened my eyes to new perspectives and created memories that will last forever.',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
			rating: 5,
		},
		{
			name: 'Emma Rodriguez',
			post: 'Adventure Enthusiast',
			details:
				'From the moment I booked until the end of the trip, everything was seamless. The guides were knowledgeable and the accommodations were top-notch.',
			avatar:
				'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
			rating: 4,
		},
		{
			name: 'David Thompson',
			post: 'Business Executive',
			details:
				'Perfect blend of relaxation and adventure. The itinerary was well-balanced and allowed for both exploration and rest. Highly recommend for anyone seeking quality travel.',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
			rating: 5,
		},
		{
			name: 'Lisa Park',
			post: 'Teacher',
			details:
				'Educational and fun! The historical sites were fascinating and our guide made everything come alive. My family and I learned so much about the local culture.',
			avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
			rating: 4,
		},
		{
			name: 'James Wilson',
			post: 'Retired Engineer',
			details:
				'Exceptional service from start to finish. The level of organization and care put into every detail was remarkable. This was truly a once-in-a-lifetime experience.',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
			rating: 5,
		},
	]

	return (
		<div className='py-16 bg-gradient-to-br from-gray-50 to-white'>
			<div className='container mx-auto px-4'>
				<SectionHeading heading={heading} />

				<section className='mb-20'>
					<CustomSlider
						className='w-11/12 mx-auto max-w-6xl'
						autoplay={true}
						autoplaySpeed={5000}
						slidesToShow={3}
					>
						{contents.map((content, idx) => {
							const { name, post, details, avatar, rating = 5 } = content
							return (
								<Card
									key={idx}
									className='h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white'
								>
									<CardContent className='p-8 h-full flex flex-col'>
										{/* Quote Icon */}
										<Quote className='w-8 h-8 text-blue-600 mb-4 opacity-60' />

										{/* Star Rating */}
										<StarRating rating={rating} />

										{/* Review Text */}
										<p className='text-gray-700 text-center leading-relaxed mb-8 flex-grow'>
											"{details}"
										</p>

										{/* Author Info */}
										<div className='flex flex-col items-center'>
											<Avatar className='w-16 h-16 mb-4 ring-2 ring-blue-100'>
												<AvatarImage src={avatar} alt={name} />
												<AvatarFallback className='bg-blue-100 text-blue-600 text-lg font-semibold'>
													{name
														.split(' ')
														.map((n) => n[0])
														.join('')}
												</AvatarFallback>
											</Avatar>

											<div className='text-center'>
												<h3 className='font-semibold text-gray-900 text-lg mb-1'>
													{name}
												</h3>
												<Badge variant='secondary' className='text-sm'>
													{post}
												</Badge>
											</div>
										</div>
									</CardContent>
								</Card>
							)
						})}
					</CustomSlider>
				</section>
			</div>
		</div>
	)
}

export default ReviewSection

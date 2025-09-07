import React from 'react'
import SectionHeading from '../../../utils/SectionHeading'
import type { HeadingProps, ReviewContent } from '../../../types/home.type'
import CustomSlider from './CustomSlider'
import TestimonialCard from './TestimonialCard'

const heading: HeadingProps = {
	subHeading: "CLIENT'S REVIEWS",
	headingOne: "TRAVELER'S",
	headingTwo: 'TESTIMONIAL',
	describe:
		'Discover what our valued travelers say about their extraordinary journeys and experiences with us.',
}

const ReviewSection: React.FC = () => {
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
		<section className='py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 transition-colors duration-300'>
			<div className='container mx-auto'>
				<SectionHeading heading={heading} />

				<div className='mb-20'>
					<CustomSlider
						className='w-full mx-auto'
						autoplay={true}
						autoplaySpeed={6000}
						slidesToShow={3}
					>
						{contents.map((content, idx) => (
							<TestimonialCard
								key={`testimonial-${idx}`}
								content={content}
								index={idx}
							/>
						))}
					</CustomSlider>
				</div>
			</div>
		</section>
	)
}

export default ReviewSection

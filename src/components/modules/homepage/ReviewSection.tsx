import React from 'react'
import SectionHeading from '../../../utils/SectionHeading'
import type { HeadingProps, ReviewContent } from '../../../types/home.type'
import CustomSlider from './CustomSlider'
import TestimonialCard from './TestimonialCard'
import { useGetAllReviewsQuery } from '../../../redux/features/review/review.api'

const heading: HeadingProps = {
	subHeading: "CLIENT'S REVIEWS",
	headingOne: "TRAVELER'S",
	headingTwo: 'TESTIMONIAL',
	describe:
		'Discover what our valued travelers say about their extraordinary journeys and experiences with us.',
}

const ReviewSection: React.FC = () => {
	const { data, isLoading, isError } = useGetAllReviewsQuery({
		limit: 6,
		sort: '-createdAt',
	})

	const contents: ReviewContent[] =
		data?.data?.data?.map((review) => {
			const name = review.user?.name || 'Anonymous Traveler'

			return {
				name,
				post: review.tour?.title || review.tour?.location || 'Traveler',
				details: review.comments,
				avatar:
					review.user?.picture ||
					`https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
						name || review._id,
					)}`,
				rating: review.rating,
			}
		}) || []

	return (
		<section className='py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 transition-colors duration-300'>
			<div className='container mx-auto'>
				<SectionHeading heading={heading} />

				<div className='mb-20'>
					{isLoading ? (
						<p className='text-center text-gray-500 dark:text-gray-300'>
							Loading reviews...
						</p>
					) : isError ? (
						<p className='text-center text-red-500 dark:text-red-300'>
							Failed to load reviews.
						</p>
					) : contents.length > 0 ? (
						<CustomSlider
							className='w-full mx-auto'
							autoplay={true}
							autoplaySpeed={6000}
							slidesToShow={3}
						>
							{contents.map((content, idx) => (
								<TestimonialCard
									key={`${content.name}-${idx}`}
									content={content}
									index={idx}
								/>
							))}
						</CustomSlider>
					) : (
						<p className='text-center text-gray-500 dark:text-gray-300'>
							No traveler reviews yet.
						</p>
					)}
				</div>
			</div>
		</section>
	)
}

export default ReviewSection

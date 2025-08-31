import React, { type JSX } from 'react'

import SectionHeading from '@/utils/SectionHeading'
import bgImg from '@/assets/homepage/slide01.jpg'
import { CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Star } from 'lucide-react'

// TypeScript interfaces
interface HeadingData {
	subHeading: string
	headingOne: string
	headingTwo: string
	describe: string
}

interface DealData {
	id: number
	country: string
	title: string
	rating: number
	reviewCount: number
	price: number
	duration: string
	image: string
}

const TopDealSection: React.FC = () => {
	const heading: HeadingData = {
		subHeading: 'Top Deals',
		headingOne: 'The Last',
		headingTwo: 'Minute Deals',
		describe:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
	}

	// Mock data - replace with real data
	const deals: DealData[] = [
		{
			id: 1,
			country: 'Norway',
			title: 'Norway Lake',
			rating: 5,
			reviewCount: 20,
			price: 180,
			duration: '9 Days Tours',
			image: bgImg,
		},
		{
			id: 2,
			country: 'Norway',
			title: 'Norway Lake',
			rating: 5,
			reviewCount: 20,
			price: 180,
			duration: '9 Days Tours',
			image: bgImg,
		},
		{
			id: 3,
			country: 'Norway',
			title: 'Norway Lake',
			rating: 5,
			reviewCount: 20,
			price: 180,
			duration: '9 Days Tours',
			image: bgImg,
		},
		{
			id: 4,
			country: 'Norway',
			title: 'Norway Lake',
			rating: 5,
			reviewCount: 20,
			price: 180,
			duration: '9 Days Tours',
			image: bgImg,
		},
		{
			id: 5,
			country: 'Norway',
			title: 'Norway Lake',
			rating: 5,
			reviewCount: 20,
			price: 180,
			duration: '9 Days Tours',
			image: bgImg,
		},
		{
			id: 6,
			country: 'Norway',
			title: 'Norway Lake',
			rating: 5,
			reviewCount: 20,
			price: 180,
			duration: '9 Days Tours',
			image: bgImg,
		},
	]

	const renderStars = (rating: number): JSX.Element[] => {
		return Array.from({ length: 5 }, (_, index) => (
			<Star
				key={index}
				className={`w-4 h-4 ${
					index < rating ? 'text-yellow-400' : 'text-gray-300'
				}`}
			/>
		))
	}

	return (
		<section className='py-16 bg-background'>
			<div className='container mx-auto px-4'>
				<SectionHeading heading={heading} />

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
					{deals.map((deal: DealData) => (
						<div
							key={deal.id}
							className='group relative rounded-md overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out hover:-translate-y-2 cursor-pointer'
						>
							{/* Background Image */}
							<div className='relative h-80 overflow-hidden'>
								<img
									className='absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out'
									src={deal.image}
									alt={deal.title}
									loading='lazy'
								/>
								{/* Gradient overlay */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent'></div>

								{/* Top badge */}
								<Badge
									variant='secondary'
									className='absolute top-4 left-4 bg-primary/90 text-primary-foreground hover:bg-primary'
								>
									Hot Deal
								</Badge>
							</div>

							{/* Content */}
							<CardContent className='absolute bottom-0 left-0 right-0 p-6 text-white'>
								<div className='space-y-3'>
									{/* Location */}
									<h2 className='text-lg text-yellow-400 font-medium'>
										{deal.country}
									</h2>

									{/* Title */}
									<h3 className='text-2xl font-bold group-hover:text-yellow-400 transition-colors duration-300'>
										{deal.title}
									</h3>

									{/* Rating */}
									<div className='flex items-center gap-2'>
										<div className='flex gap-1'>{renderStars(deal.rating)}</div>
										<span className='text-white/80 text-sm'>
											({deal.reviewCount})
										</span>
									</div>

									{/* Divider */}
									<div className='border-t border-white/20 my-4'></div>

									{/* Price */}
									<div className='flex items-center justify-between'>
										<p className='text-white font-medium'>
											<span className='text-yellow-400 font-bold text-xl'>
												${deal.price}.00
											</span>
											<span className='text-white/80 text-sm ml-2'>
												Per Person
											</span>
										</p>
									</div>

									{/* Duration */}
									<div className='flex items-center gap-2 pt-2'>
										<Calendar className='w-5 h-5 text-yellow-400' />
										<span className='font-semibold text-lg'>
											{deal.duration}
										</span>
									</div>
								</div>
							</CardContent>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default TopDealSection

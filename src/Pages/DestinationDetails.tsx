/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import {
	MapPin,
	Check,
	X,
	Facebook,
	Twitter,
	Instagram,
	Calendar,
	Compass,
	Plane,
	User,
	Users,
	ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import PageHeading from '../utils/PageHeading'
import {
	useGetSingleTourQuery,
	useGetTourTypesQuery,
} from '../redux/features/Tour/tour.api'
import type { IDestination, IResponse } from '../types'
import {
	dummyCategories,
	dummyFeaturedContent,
	userReviews,
} from '../DummyData'
import { format } from 'date-fns'
import { useGetDivisionsQuery } from '../redux/features/division/division.api'
import { useGetSpecificTourReviewsQuery } from '../redux/features/review/review.api'
import { calculateAverageRating } from '../utils/helpers'
import StarRating from '../components/modules/destinationDetails/StarRating'
import MapRender from '../components/modules/map/MapRender'

// Define a default image for when no image is found
const DEFAULT_IMAGE =
	'https://via.placeholder.com/1200x800.png?text=No+Image+Available'

const DestinationDetails: React.FC = () => {
	const { slug } = useParams<{ slug: string }>()
	const { data, isLoading, isError } = useGetSingleTourQuery(slug)

	const apiResponse = data as IResponse<IDestination> | undefined
	const destination = apiResponse?.data
	const {
		data: reviews,
		isLoading: reviewLoading,
		isError: reviewError,
	} = useGetSpecificTourReviewsQuery(
		{ tourId: destination?._id },
		{ skip: !destination },
	)

	const {
		title,
		description,
		images,
		location,
		departureLocation,
		arrivalLocation,
		included,
		excluded,
		amenities,
		minAge,
		tourType,
		division,
	} = destination || {}

	const newTitle = title || 'No Title Found'
	const newLocation = location || 'No Location Found'
	const [newCity, newCountry] = newLocation.split(',').map((s) => s.trim())
	const newDescription = description || 'No Description Found'
	const newIncluded =
		included && included.length > 0 ? included : ['No Included Items Found']
	const newExcluded =
		excluded && excluded.length > 0 ? excluded : ['No Excluded Items Found']
	const newGallery = images && images.length > 0 ? images : [DEFAULT_IMAGE]
	const newThumbnail = newGallery[0]
	const tags = amenities && amenities.length > 0 ? amenities : []

	const { average, total } = calculateAverageRating(userReviews)
	const averageRating = average.toFixed(1)
	const { data: divisionInfo } = useGetDivisionsQuery(
		{ _id: division, fields: 'name' },
		{ skip: !data },
	)
	const { data: tourTypeInfo } = useGetTourTypesQuery(
		{ _id: tourType, fields: 'name' },
		{ skip: !data },
	)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='text-center'>
					<h2 className='text-2xl font-semibold text-gray-600 dark:text-gray-300'>
						Loading...
					</h2>
				</div>
			</div>
		)
	}

	if (isError || !destination) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='text-center'>
					<h2 className='text-2xl font-semibold text-gray-600 dark:text-gray-300'>
						No Destination Found
					</h2>
					<p className='mt-2 text-gray-500 dark:text-gray-400'>
						The destination you're looking for could not be found. Please try
						again later.
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
			<PageHeading headTitle={newTitle} sectionBackground='' />

			<div className='container mx-auto py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Main Content Area */}
					<div className='lg:col-span-2 space-y-8'>
						{/* Title & Booking */}
						<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
							<div>
								<h2 className='text-3xl md:text-5xl font-bold capitalize mb-2'>
									{newTitle}
								</h2>
								<div className='flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400'>
									<div className='flex items-center gap-2'>
										<MapPin className='h-4 w-4' />
										<span>
											{newCity}, {newCountry}
										</span>
									</div>
									<div className='flex items-center gap-1'>
										<StarRating rating={average} />
									</div>
									<span className='text-gray-500 dark:text-gray-500'>
										({total} Reviews)
									</span>
								</div>
							</div>
							<Link to={`/booking/${slug}`}>
								<Button className='w-full md:w-auto text-lg font-semibold px-8 py-6'>
									Book Now
								</Button>
							</Link>
						</div>

						{/* Main Image */}
						<div className='shadow-lg dark:shadow-none'>
							<img
								className='w-full h-64 md:h-96 object-cover rounded-md'
								src={newThumbnail}
								alt={newTitle}
							/>
						</div>

						{/* Tour Details */}
						<Card className='dark:bg-gray-800'>
							<CardHeader>
								<CardTitle className='text-xl'>Tour Details</CardTitle>
							</CardHeader>
							<CardContent className='grid gap-6'>
								<div className='grid md:grid-cols-2 gap-x-12 gap-y-4'>
									<div className='flex items-center gap-3'>
										<Calendar className='h-5 w-5 text-gray-500 dark:text-gray-400' />
										<div>
											<p className='text-sm text-gray-500 dark:text-gray-400'>
												Dates
											</p>
											<p className='font-medium'>
												From {format(destination.startDate, 'PP')} -{' '}
												{format(destination.endDate, 'PP')}
											</p>
										</div>
									</div>
									<div className='flex items-center gap-3'>
										<Compass className='h-5 w-5 text-gray-500 dark:text-gray-400' />
										<div>
											<p className='text-sm text-gray-500 dark:text-gray-400'>
												Tour Type
											</p>
											<p className='font-medium'>
												{tourTypeInfo?.data[0]?.name || 'Not specified'}
											</p>
										</div>
									</div>
									<div className='flex items-center gap-3'>
										<Plane className='h-5 w-5 text-gray-500 dark:text-gray-400' />
										<div>
											<p className='text-sm text-gray-500 dark:text-gray-400'>
												Departure
											</p>
											<p className='font-medium'>
												{departureLocation || 'Not specified'}
											</p>
										</div>
									</div>
									<div className='flex items-center gap-3'>
										<User className='h-5 w-5 text-gray-500 dark:text-gray-400' />
										<div>
											<p className='text-sm text-gray-500 dark:text-gray-400'>
												Minimum Age
											</p>
											<p className='font-medium'>
												{minAge ? `${minAge} Years` : 'Not specified'}
											</p>
										</div>
									</div>
									<div className='flex items-center gap-3'>
										<MapPin className='h-5 w-5 text-gray-500 dark:text-gray-400' />
										<div>
											<p className='text-sm text-gray-500 dark:text-gray-400'>
												Arrival
											</p>
											<p className='font-medium'>
												{arrivalLocation || 'Not specified'}
											</p>
										</div>
									</div>
									<div className='flex items-center gap-3'>
										<Users className='h-5 w-5 text-gray-500 dark:text-gray-400' />
										<div>
											<p className='text-sm text-gray-500 dark:text-gray-400'>
												Division
											</p>
											<p className='font-medium'>
												{divisionInfo?.data[0]?.name || 'Not specified'}
											</p>
										</div>
									</div>
								</div>
								<div>
									<h3>Description</h3>
									<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
										{newDescription}
									</p>
								</div>
								<div className='grid md:grid-cols-2 gap-6'>
									<Card className='bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'>
										<CardHeader>
											<CardTitle className='text-lg text-green-800 dark:text-green-300'>
												Tour Includes
											</CardTitle>
										</CardHeader>
										<CardContent>
											<ul className='space-y-3'>
												{newIncluded.map((item, idx) => (
													<li key={idx} className='flex items-center gap-3'>
														<Check className='h-5 w-5 text-green-600 dark:text-green-400' />
														<span className='text-green-700 dark:text-green-300'>
															{item}
														</span>
													</li>
												))}
											</ul>
										</CardContent>
									</Card>
									<Card className='bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'>
										<CardHeader>
											<CardTitle className='text-lg text-red-800 dark:text-red-300'>
												Tour Not Included
											</CardTitle>
										</CardHeader>
										<CardContent>
											<ul className='space-y-3'>
												{newExcluded.map((item, idx) => (
													<li key={idx} className='flex items-center gap-3'>
														<X className='h-5 w-5 text-red-600 dark:text-red-400' />
														<span className='text-red-700 dark:text-red-300'>
															{item}
														</span>
													</li>
												))}
											</ul>
										</CardContent>
									</Card>
								</div>
							</CardContent>
						</Card>

						{/* Gallery */}
						<Card className='dark:bg-gray-800'>
							<CardHeader>
								<CardTitle className='text-2xl'>Gallery</CardTitle>
							</CardHeader>
							<CardContent>
								{newGallery.length > 0 && newGallery[0] !== DEFAULT_IMAGE ? (
									<div className='grid md:grid-cols-2 gap-6'>
										{newGallery.map((image, idx) => (
											<div
												key={idx}
												className='aspect-video rounded-lg overflow-hidden shadow-md'
											>
												<img
													src={image}
													alt={`Gallery image ${idx + 1}`}
													className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
												/>
											</div>
										))}
									</div>
								) : (
									<p className='text-center text-gray-500 dark:text-gray-400'>
										No Gallery Images Found
									</p>
								)}
							</CardContent>
						</Card>

						{/* Map Section */}
						<div className='dark:bg-gray-800 p-5 rounded-md space-y-5'>
							<h3 className='text-2xl font-semibold'>Map Direction</h3>
							<MapRender />
						</div>

						{/* Reviews */}
						<Card className='dark:bg-gray-800'>
							<CardHeader>
								<CardTitle className='text-2xl '>Average Reviews</CardTitle>
							</CardHeader>
							<CardContent className='space-y-6'>
								<Card className='bg-blue-600 text-white text-center dark:bg-blue-800'>
									<CardContent className='pt-6'>
										<h3 className='text-3xl font-bold'>{averageRating}/5</h3>
										<p className='text-xl font-semibold my-2'>
											{total > 0
												? `"Based on user feedback"`
												: `"No reviews yet"`}
										</p>
										<p>From {total} Reviews</p>
									</CardContent>
								</Card>
								<div className='space-y-4'>
									{/* These progress bars should also be dynamic */}
									{/* For now, we'll use dummy data as a placeholder */}
									{[
										{ label: 'Cleanliness', value: 85 },
										{ label: 'Value for Money', value: 70 },
										{ label: 'Service', value: 90 },
										{ label: 'Location', value: 95 },
									].map(({ label, value }) => (
										<div key={label} className='space-y-2'>
											<div className='flex justify-between'>
												<span className='font-medium'>{label}</span>
												<span className='text-gray-500 dark:text-gray-400'>
													{value}%
												</span>
											</div>
											<Progress value={value} className='h-3' />
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* User Reviews Section */}
						{/* User Reviews Section */}
						<Card className='dark:bg-gray-800'>
							<CardHeader>
								<CardTitle className='text-2xl'>User Reviews</CardTitle>
							</CardHeader>
							<CardContent className='space-y-8'>
								{reviewLoading ? (
									<p className='text-center text-gray-500 dark:text-gray-400'>
										Loading reviews...
									</p>
								) : reviewError ? (
									<p className='text-center text-red-500 dark:text-red-400'>
										Failed to load reviews.
									</p>
								) : reviews?.data?.data && reviews.data.data.length > 0 ? (
									reviews.data.data.map((review: any) => {
										// Use default avatar if user image is not available
										const avatarUrl = review.user?.picture
											? review.user.picture
											: `https://api.dicebear.com/7.x/adventurer/svg?seed=${
													review.user?._id || review._id
											  }`

										// Use name if available, otherwise fallback to 'Anonymous'
										const userName = review.user?.name || 'Anonymous'

										return (
											<div
												key={review._id}
												className='flex items-start gap-4 pb-4 border-b dark:border-gray-700 last:border-b-0'
											>
												<Avatar className='w-12 h-12'>
													<AvatarImage src={avatarUrl} alt={userName} />
													<AvatarFallback>
														{userName
															.split(' ')
															.map((n: string) => n[0])
															.join('')}
													</AvatarFallback>
												</Avatar>
												<div className='flex-1'>
													<div className='flex items-center justify-between'>
														<div>
															<h4 className='font-semibold text-lg'>
																{userName}
															</h4>
															<StarRating rating={review.rating} />
														</div>
														<span className='text-sm text-gray-500 dark:text-gray-400'>
															{review.createdAt
																? format(new Date(review.createdAt), 'PP')
																: ''}
														</span>
													</div>
													<p className='mt-2 text-gray-700 dark:text-gray-300 leading-relaxed'>
														{review.comments}
													</p>
												</div>
											</div>
										)
									})
								) : (
									<p className='text-center text-gray-500 dark:text-gray-400'>
										No reviews yet. Be the first to leave one!
									</p>
								)}
							</CardContent>
						</Card>
					</div>

					{/* Right Side: Sticky Sidebar */}
					<div className='space-y-6 lg:sticky lg:top-8 self-start'>
						{/* Author Profile */}
						<Card className='dark:bg-gray-800'>
							<CardContent className='pt-6'>
								<div className='text-center space-y-4'>
									<Avatar className='w-24 h-24 mx-auto'>
										<AvatarImage
											src='https://api.dicebear.com/7.x/adventurer/svg?seed=Relson'
											alt='Relson Dulux'
										/>
										<AvatarFallback>RD</AvatarFallback>
									</Avatar>
									<div>
										<h3 className='font-semibold text-lg'>Relson Dulux</h3>
										<p className='text-gray-600 dark:text-gray-400 text-sm mt-2'>
											Hello, We're content writers who are fascinated by content
											fashion, celebrity and lifestyle. We help clients bring
											the right content to the right people.
										</p>
									</div>
									<div className='flex justify-center gap-3'>
										<Button
											size='icon'
											variant='outline'
											className='dark:bg-gray-900 dark:border-gray-700'
										>
											<Facebook className='h-4 w-4' />
										</Button>
										<Button
											size='icon'
											variant='outline'
											className='dark:bg-gray-900 dark:border-gray-700'
										>
											<Twitter className='h-4 w-4' />
										</Button>
										<Button
											size='icon'
											variant='outline'
											className='dark:bg-gray-900 dark:border-gray-700'
										>
											<Instagram className='h-4 w-4' />
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Categories */}
						<Card className='dark:bg-gray-800'>
							<CardHeader>
								<CardTitle className='text-xl'>All Categories</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className='space-y-2'>
									{dummyCategories.map((category, idx) => (
										<li key={idx}>
											<Button
												variant='ghost'
												className='w-full justify-between items-center hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400'
											>
												<span>{category}</span>
												<ChevronRight className='h-4 w-4' />
											</Button>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>

						{/* Featured Content (for advertising) */}
						<Card className='overflow-hidden dark:bg-gray-800 shadow-lg dark:shadow-none'>
							<CardHeader>
								<CardTitle className='text-xl'>Featured Content</CardTitle>
							</CardHeader>
							<CardContent className='p-0'>
								<img
									src={dummyFeaturedContent}
									alt='Featured content'
									className='w-full h-48 object-cover'
								/>
								<div className='p-4'>
									<h3 className='text-lg font-semibold'>
										Special Travel Package!
									</h3>
									<p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
										Explore the breathtaking beauty of the mountains with our
										limited-time offer. Book now and save 20%!
									</p>
									<Button size='sm' className='mt-4 w-full'>
										Learn More
									</Button>
								</div>
							</CardContent>
						</Card>

						{/* Relevant Tours Section */}
						<Card className='dark:bg-gray-800'>
							<CardHeader>
								<CardTitle className='text-xl'>Relevant Tours</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-center text-gray-500 dark:text-gray-400 space-y-4'>
									<p>
										This section will feature a list of other tours relevant to
										this destination.
									</p>
									<p>
										You can fetch this data from your API and render it here in
										a carousel or grid format.
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Tags */}
						<Card className='dark:bg-gray-800'>
							<CardHeader>
								<CardTitle className='text-xl'>Tags</CardTitle>
							</CardHeader>
							<CardContent>
								{tags.length > 0 ? (
									<div className='flex flex-wrap gap-2'>
										{tags.map((tag, idx) => (
											<Badge
												key={idx}
												variant='outline'
												className='cursor-pointer hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-gray-700 dark:border-gray-700 dark:hover:border-blue-400'
											>
												{tag}
											</Badge>
										))}
									</div>
								) : (
									<p className='text-gray-500 dark:text-gray-400'>
										No Tags Found
									</p>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DestinationDetails

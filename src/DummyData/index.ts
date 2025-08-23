import type { IDestination } from '../types'

// Dummy data that matches the IDestination interface structure
export const dummyTourData: Partial<IDestination> = {
	_id: '68878f011f9e51d8bce30a4a',
	title: 'Magical Santorini Island Adventure',
	description:
		'Experience the breathtaking beauty of Santorini with its iconic white-washed buildings, stunning sunsets, and crystal-clear waters. This 5-day adventure includes visits to traditional villages, wine tasting, and relaxation on unique volcanic beaches.',
	images: [
		'https://images.pexels.com/photos/1680140/pexels-photo-1680140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
	],
	location: 'Santorini, Greece',
	// The duration field is a placeholder for start and end dates combined
	// In a real application, you would calculate this from startDate and endDate
	maxGuest: 12,
	costFrom: 1299, // Renamed from pricePerPerson to match the interface
	included: [
		'Round-trip flights',
		'4-star hotel accommodation',
		'Daily breakfast',
		'Guided tours',
		'Wine tasting experience',
		'Sunset cruise',
	],
	tourPlan: [
		'Arrival in Santorini and check-in to hotel',
		'Explore Fira town and enjoy welcome dinner',
		'Visit Oia village and watch famous sunset',
		'Wine tasting tour in traditional vineyards',
		'Relax at Red Beach and visit Akrotiri ruins',
	],
}

// Dummy data for reviews, categories, and tags as they are not in the provided API response
export const dummyReviews = [
	{ label: 'Cleanliness', value: 80 },
	{ label: 'Facilities', value: 60 },
	{ label: 'Value for money', value: 100 },
	{ label: 'Service', value: 40 },
	{ label: 'Location', value: 75 },
]
export const dummyCategories = [
	'Adventure',
	'Beach',
	'Cultural',
	'Hiking',
	'Relaxation',
]
export const dummyTags = ['Travel', 'Explore', 'Nature', 'City Break']
export const dummyFeaturedContent =
	'https://via.placeholder.com/400x300.png?text=Featured+Content'

// Dummy user reviews
export const userReviews = [
	{
		name: 'Jane Doe',
		avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jane',
		rating: 5,
		comment:
			'This tour was an amazing experience! Everything was well-organized and the guides were fantastic. Highly recommend!',
		date: 'August 15, 2025',
	},
	{
		name: 'John Smith',
		avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=John',
		rating: 4,
		comment:
			'Had a great time, but the schedule was a bit rushed. The scenery was beautiful though.',
		date: 'August 10, 2025',
	},
	{
		name: 'Alice Johnson',
		avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alice',
		rating: 5,
		comment:
			'A perfect getaway! The facilities were top-notch and the value for money was excellent.',
		date: 'July 28, 2025',
	},
]

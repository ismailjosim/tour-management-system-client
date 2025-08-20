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

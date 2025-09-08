import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Compass, Plane, User, Users, MapPin } from 'lucide-react'
import { format } from 'date-fns'

interface TourDetailsCardProps {
	startDate: Date
	endDate: Date
	tourType: string
	departure: string
	arrival: string
	minAge: number
	division: string
}

const TourDetailsCard: React.FC<TourDetailsCardProps> = ({
	startDate,
	endDate,
	tourType,
	departure,
	arrival,
	minAge,
	division,
}) => {
	return (
		<Card className='dark:bg-gray-800'>
			<CardHeader>
				<CardTitle className='text-xl'>Tour Details</CardTitle>
			</CardHeader>
			<CardContent className='grid gap-6'>
				<div className='grid md:grid-cols-2 gap-x-12 gap-y-4'>
					<div className='flex items-center gap-3'>
						<Calendar className='h-5 w-5 text-gray-500 dark:text-gray-400' />
						<div>
							<p className='text-sm text-gray-500 dark:text-gray-400'>Dates</p>
							<p className='font-medium'>
								From {format(new Date(startDate), 'PP')} -{' '}
								{format(new Date(endDate), 'PP')}
							</p>
						</div>
					</div>
					<div className='flex items-center gap-3'>
						<Compass className='h-5 w-5 text-gray-500 dark:text-gray-400' />
						<div>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								Tour Type
							</p>
							<p className='font-medium'>{tourType || 'Not specified'}</p>
						</div>
					</div>
					<div className='flex items-center gap-3'>
						<Plane className='h-5 w-5 text-gray-500 dark:text-gray-400' />
						<div>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								Departure
							</p>
							<p className='font-medium'>{departure || 'Not specified'}</p>
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
							<p className='font-medium'>{arrival || 'Not specified'}</p>
						</div>
					</div>
					<div className='flex items-center gap-3'>
						<Users className='h-5 w-5 text-gray-500 dark:text-gray-400' />
						<div>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								Division
							</p>
							<p className='font-medium'>{division || 'Not specified'}</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default TourDetailsCard

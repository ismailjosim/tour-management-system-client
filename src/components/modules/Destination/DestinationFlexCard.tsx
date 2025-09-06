import { Link } from 'react-router'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Clock, Users } from 'lucide-react'
import type { IDestination } from '@/types'
import { format } from 'date-fns'

interface DestinationCardProps {
	item: IDestination
}

const DestinationFlexCard: React.FC<DestinationCardProps> = ({ item }) => {
	const {
		images,
		title,
		description,
		location,
		costFrom,
		slug,
		minAge,
		maxGuest,
		startDate,
		endDate,
	} = item
	const rating = 4.5
	const reviewCount = 1

	return (
		<Card className='flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'>
			{/* Image Section */}
			<div className='relative w-full md:w-2/5 flex-shrink-0 pl-5 overflow-hidden'>
				<img
					src={images[1]}
					alt={title}
					className='w-full scale-100 rounded-md h-full object-cover transition-transform duration-300'
				/>
				<div className='absolute top-4 left-8 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1'>
					<Star size={14} className='text-yellow-500 fill-yellow-500' />
					<span>
						{rating.toFixed(1)} ({reviewCount})
					</span>
				</div>
			</div>

			{/* Content Section */}
			<div className='flex flex-col p-4 md:p-6 w-full md:w-3/5'>
				<CardHeader className='p-0 mb-4'>
					<div className='flex items-center gap-2 text-sm text-muted-foreground mb-1'>
						<span className='font-semibold'>{location}</span>
					</div>
					<CardTitle className='text-2xl font-bold'>{title}</CardTitle>
					<CardDescription className='text-sm line-clamp-2 mt-2'>
						{description}
					</CardDescription>
				</CardHeader>

				<CardContent className='flex flex-col gap-3 p-0 text-sm text-muted-foreground'>
					<div className='flex items-center gap-2'>
						<Clock size={16} />
						<p className='font-medium'>
							From {format(startDate, 'PP')} - {format(endDate, 'PP')}
						</p>
					</div>
					<div className='flex items-center gap-2'>
						<Users size={16} />
						<span className='font-medium'>
							0 - {maxGuest} | Min age: {minAge}
						</span>
					</div>
				</CardContent>

				<div className='mt-auto flex justify-between items-center pt-6'>
					<div className='flex flex-col'>
						<span className='text-sm font-normal text-muted-foreground'>
							from
						</span>
						<div className='text-2xl font-bold text-primary'>
							${costFrom}
							<span className='text-base font-normal text-muted-foreground'>
								/person
							</span>
						</div>
					</div>
					<Button asChild>
						<Link to={`/destination/${slug}`}>View Tour</Link>
					</Button>
				</div>
			</div>
		</Card>
	)
}

export default DestinationFlexCard

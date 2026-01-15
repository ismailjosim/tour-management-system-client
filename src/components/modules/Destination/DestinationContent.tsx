import type { IDestination } from '../../../types'
import DestinationCardSkeleton from '../../../utils/DestinationCardSkeleton'
import DestinationFlexCard from './DestinationFlexCard'
import DestinationGridCard from './DestinationGridCard'

type DestinationContentProps = {
	data?: {
		data: IDestination[]
	}
	isLoading: boolean
	isError: boolean
	isFlexLayout: boolean
}

const SKELETON_COUNT = 8

const DestinationContent = ({
	data,
	isLoading,
	isError,
	isFlexLayout,
}: DestinationContentProps) => {
	const containerClasses = isFlexLayout
		? 'flex flex-wrap gap-10'
		: 'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'

	if (isLoading) {
		return (
			<div className={containerClasses}>
				{Array.from({ length: SKELETON_COUNT }).map((_, index) => (
					<DestinationCardSkeleton key={index} />
				))}
			</div>
		)
	}

	if (isError) {
		return (
			<div className='py-10 text-center'>
				<h3 className='text-xl text-red-500'>Something went wrong</h3>
				<p className='mt-2 text-gray-600'>Please try again later</p>
			</div>
		)
	}

	if (!data?.data?.length) {
		return (
			<div className='py-10 text-center'>
				<h3 className='text-xl text-gray-500'>No destinations found</h3>
				<p className='mt-2 text-gray-600'>Try adjusting your filters</p>
			</div>
		)
	}

	return (
		<div className={containerClasses}>
			{data.data.map((destination) =>
				isFlexLayout ? (
					<DestinationFlexCard key={destination._id} item={destination} />
				) : (
					<DestinationGridCard key={destination._id} item={destination} />
				),
			)}
		</div>
	)
}

export default DestinationContent

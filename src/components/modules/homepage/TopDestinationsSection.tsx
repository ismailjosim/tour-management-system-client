import { useGetAllToursQuery } from '@/redux/features/Tour/tour.api'
import SectionHeading from '@/utils/SectionHeading'
import DestinationCardSkeleton from '@/utils/DestinationCardSkeleton'
import Error from '@/utils/Error'
import DestinationCard from '../Destination/DestinationGridCard'
import ButtonNavigate from '@/utils/ButtonNavigate'
import type { IDestination } from '../../../types'

const heading = {
	subHeading: 'Uncover Place',
	headingOne: 'POPULAR',
	headingTwo: 'DESTINATION',
	describe:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
}

const SKELETON_COUNT = 6

const TopDestinationsSection = () => {
	const { isLoading, data, isError } = useGetAllToursQuery({ limit: 6 })

	let content

	if (isLoading) {
		content = Array.from({ length: SKELETON_COUNT }).map((_, index) => (
			<DestinationCardSkeleton key={index} />
		))
	} else if (isError || !data?.data?.length) {
		content = <Error message='No destinations found!' />
	} else {
		content = data.data.map((item: IDestination) => (
			<DestinationCard key={item._id} item={item} />
		))
	}

	return (
		<div>
			<SectionHeading heading={heading} />

			<div className='container mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'>
				{content}
			</div>

			<div className='my-10 text-center'>
				<ButtonNavigate
					btnText='View All'
					destination='/destinations'
					size='lg'
				/>
			</div>
		</div>
	)
}

export default TopDestinationsSection

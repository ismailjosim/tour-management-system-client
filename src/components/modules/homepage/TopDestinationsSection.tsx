import { useGetAllToursQuery } from '@/redux/features/Tour/tour.api'
import SectionHeading from '@/utils/SectionHeading'
import DestinationLoading from '@/utils/DestinationLoading'
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

const TopDestinationsSection = () => {
	const { isLoading, data, isError } = useGetAllToursQuery({ limit: 6 })

	let content
	if (isLoading) {
		content = <DestinationLoading />
	}
	if (!isLoading && isError) {
		content = <Error message='No Videos Found!' />
	}
	if (!isLoading && !isError && data?.data?.length === 0) {
		content = <Error message='No Videos Found!' />
	} else {
		content = (
			<>
				{data?.data?.map((item: IDestination) => (
					<DestinationCard item={item} key={item._id} />
				))}
			</>
		)
	}

	return (
		<div>
			<SectionHeading heading={heading} />
			<div className='container mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'>
				{content}
			</div>
			<div className='text-center my-10'>
				<ButtonNavigate
					btnText={'View All'}
					destination={'/destinations'}
					size='lg'
				></ButtonNavigate>
			</div>
		</div>
	)
}

export default TopDestinationsSection

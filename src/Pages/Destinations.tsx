import { useEffect, useState } from 'react'
import { useGetAllToursQuery } from '@/redux/features/Tour/tour.api'
import DestinationLoading from '@/utils/DestinationLoading'
import type { IDestination } from '@/types'

import sectionBG from '@/assets/destinations/destination-section-bg.jpg'
import PageHeading from '@/utils/PageHeading'
import DestinationFilter from '@/components/modules/Destination/DestinationFilter'
import { useSearchParams } from 'react-router'
import { Button } from '../components/ui/button'
import { LayoutGrid, Rows3 } from 'lucide-react'
import DestinationGridCard from '@/components/modules/Destination/DestinationGridCard'
import DestinationFlexCard from '../components/modules/Destination/DestinationFlexCard'

const Destinations = () => {
	const [searchParams] = useSearchParams()
	const [changeLayout, setChangeLayout] = useState(false)
	const division = searchParams.get('division') || undefined
	const tourType = searchParams.get('tourType') || undefined
	const { isLoading, data, isError } = useGetAllToursQuery({
		division,
		tourType,
	})

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	// left side component

	let content
	if (isLoading) {
		content = <DestinationLoading />
	}
	if (!isLoading && isError) {
		content = <h3>something went wrong</h3>
	}
	if (!isLoading && !isError && data?.data?.length === 0) {
		content = <h3>No destination found</h3>
	} else {
		content = (
			<>
				{data?.data?.map((item: IDestination) =>
					changeLayout ? (
						<DestinationFlexCard item={item} key={item._id} />
					) : (
						<DestinationGridCard item={item} key={item._id} />
					),
				)}
			</>
		)
	}

	return (
		<>
			<PageHeading headTitle='destination list' sectionBackground={sectionBG} />
			<section className='w-11/12 mx-auto my-20'>
				<div className='grid lg:grid-cols-5 gap-10'>
					<div className='min-h-60'>
						<DestinationFilter />
					</div>
					<div className='col-span-4'>
						<div className='flex justify-between items-center gap-5 mb-5'>
							<h3 className='text-2xl font-semibold'>All Destination</h3>
							<Button onClick={() => setChangeLayout(!changeLayout)}>
								{changeLayout ? <Rows3 /> : <LayoutGrid />}
							</Button>
						</div>
						<div
							className={`${
								changeLayout
									? 'flex flex-wrap'
									: 'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'
							}   gap-10`}
						>
							{content}
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Destinations

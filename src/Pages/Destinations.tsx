/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { LayoutGrid, Rows3 } from 'lucide-react'

import { useGetAllToursQuery } from '@/redux/features/Tour/tour.api'
import { Button } from '@/components/ui/button'
import DestinationLoading from '@/utils/DestinationLoading'
import PageHeading from '@/utils/PageHeading'
import DestinationFilter from '@/components/modules/Destination/DestinationFilter'
import DestinationGridCard from '@/components/modules/Destination/DestinationGridCard'
import DestinationFlexCard from '@/components/modules/Destination/DestinationFlexCard'
import DataPagination from '@/utils/DataPagination'
import usePagination from '@/hooks/usePagination'
import type { IDestination } from '@/types'

import sectionBG from '@/assets/destinations/destination-section-bg.jpg'

// Constants
const INITIAL_LIMIT = 9

// Custom hooks
const useDestinationFilters = () => {
	const [searchParams] = useSearchParams()

	return useMemo(
		() => ({
			division: searchParams.get('division') || undefined,
			tourType: searchParams.get('tourType') || undefined,
		}),
		[searchParams],
	)
}

const useDestinationData = (
	filters: Record<string, any>,
	currentPage: number,
	limit: number,
) => {
	return useGetAllToursQuery({
		...filters,
		page: currentPage,
		limit,
	})
}

// Component for rendering destination content
const DestinationContent = ({
	data,
	isLoading,
	isError,
	isFlexLayout,
}: {
	data: any
	isLoading: boolean
	isError: boolean
	isFlexLayout: boolean
}) => {
	if (isLoading) {
		return <DestinationLoading />
	}

	if (isError) {
		return (
			<div className='text-center py-10'>
				<h3 className='text-xl text-red-500'>Something went wrong</h3>
				<p className='text-gray-600 mt-2'>Please try again later</p>
			</div>
		)
	}

	if (!data?.data || data.data.length === 0) {
		return (
			<div className='text-center py-10'>
				<h3 className='text-xl text-gray-500'>No destinations found</h3>
				<p className='text-gray-600 mt-2'>Try adjusting your filters</p>
			</div>
		)
	}

	const containerClasses = isFlexLayout
		? 'flex flex-wrap gap-10'
		: 'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'

	return (
		<div className={containerClasses}>
			{data.data.map((destination: IDestination) =>
				isFlexLayout ? (
					<DestinationFlexCard key={destination._id} item={destination} />
				) : (
					<DestinationGridCard key={destination._id} item={destination} />
				),
			)}
		</div>
	)
}

// Layout toggle component
const LayoutToggle = ({
	isFlexLayout,
	onToggle,
}: {
	isFlexLayout: boolean
	onToggle: () => void
}) => (
	<Button
		onClick={onToggle}
		variant='default'
		size='sm'
		aria-label={`Switch to ${isFlexLayout ? 'grid' : 'flex'} layout`}
	>
		{isFlexLayout ? <Rows3 size={16} /> : <LayoutGrid size={16} />}
	</Button>
)

// Main component
const Destinations = () => {
	// State
	const [isFlexLayout, setIsFlexLayout] = useState(false)

	// Custom hooks
	const { currentPage, limit, handlePageChange, handleLimitChange } =
		usePagination({
			initialLimit: INITIAL_LIMIT,
		})

	const filters = useDestinationFilters()
	const { isLoading, data, isError } = useDestinationData(
		filters,
		currentPage,
		limit,
	)

	// Effects
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	// Handlers
	const handleLayoutToggle = useCallback(() => {
		setIsFlexLayout((prev) => !prev)
	}, [])

	// Computed values
	const hasResults = data?.data && data.data.length > 0
	const showPagination = hasResults && data?.meta

	return (
		<>
			<PageHeading headTitle='Destination List' sectionBackground={sectionBG} />

			<section className='w-11/12 mx-auto my-20'>
				<div className='grid lg:grid-cols-5 gap-10'>
					{/* Filter Sidebar */}
					<aside className='min-h-60'>
						<DestinationFilter />
					</aside>

					{/* Main Content */}
					<main className='col-span-4'>
						{/* Header */}
						<header className='flex justify-between items-center gap-5 mb-5'>
							<h1 className='text-2xl font-semibold '>All Destinations</h1>

							{hasResults && (
								<LayoutToggle
									isFlexLayout={isFlexLayout}
									onToggle={handleLayoutToggle}
								/>
							)}
						</header>

						{/* Content */}
						<DestinationContent
							data={data}
							isLoading={isLoading}
							isError={isError}
							isFlexLayout={isFlexLayout}
						/>

						{/* Pagination */}
						{showPagination && (
							<footer className='mt-10'>
								<DataPagination
									currentPage={currentPage}
									totalPage={data.meta.totalPage}
									limit={limit}
									onPageChange={handlePageChange}
									onLimitChange={handleLimitChange}
								/>
							</footer>
						)}
					</main>
				</div>
			</section>
		</>
	)
}

export default Destinations

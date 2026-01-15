/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'

import { useGetAllToursQuery } from '@/redux/features/Tour/tour.api'

import PageHeading from '@/utils/PageHeading'
import DestinationFilter from '@/components/modules/Destination/DestinationFilter'

import DataPagination from '@/utils/DataPagination'
import usePagination from '@/hooks/usePagination'

import sectionBG from '@/assets/destinations/destination-section-bg.jpg'
import LayoutToggle from '../components/modules/Destination/LayoutToggle'
import DestinationContent from '../components/modules/Destination/DestinationContent'

// Main component
const Destinations = () => {
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

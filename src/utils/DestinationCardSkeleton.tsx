const DestinationCardSkeleton = () => {
	return (
		<div className='relative h-72 w-full overflow-hidden rounded-xl bg-gray-100 animate-pulse'>
			{/* Image skeleton */}
			<div className='h-full w-full bg-gray-300' />

			{/* Content */}
			<div className='absolute bottom-0 w-full p-5'>
				<div className='flex items-end justify-between'>
					<div className='space-y-2'>
						{/* Title */}
						<div className='h-5 w-40 rounded bg-gray-400' />
						{/* Location */}
						<div className='h-4 w-28 rounded bg-gray-400' />
					</div>

					{/* Badge */}
					<div className='h-7 w-20 rounded-md bg-gray-400' />
				</div>
			</div>

			{/* Gradient overlay */}
			<div className='absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-400/70 to-transparent' />
		</div>
	)
}

export default DestinationCardSkeleton

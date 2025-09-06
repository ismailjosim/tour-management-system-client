import React from 'react'

interface DivisionProgressCardProps {
	title: string
	data: { name: string; count: number }[]
	colors: string[]
	extraStats?: { label: string; value: number | string }[]
}

const DivisionProgressCard: React.FC<DivisionProgressCardProps> = ({
	title,
	data,
	colors,
	extraStats,
}) => {
	const maxCount = Math.max(...data.map((d) => d.count), 1)

	return (
		<div className='bg-white dark:bg-[#202E3C] rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700'>
			{/* Header */}
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-xl font-bold text-gray-900 dark:text-gray-100'>
					{title}
				</h2>
			</div>

			{/* Progress bars */}
			<div className='space-y-4'>
				{data.map((item, index) => (
					<div key={item.name} className='flex items-center justify-between'>
						<div className='flex items-center space-x-3'>
							<div
								className='w-4 h-4 rounded-full'
								style={{ backgroundColor: colors[index % colors.length] }}
							/>
							<span className='font-medium text-gray-900 dark:text-gray-100'>
								{item.name}
							</span>
						</div>
						<div className='flex items-center space-x-2'>
							<div className='w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
								<div
									className='h-2 rounded-full'
									style={{
										backgroundColor: colors[index % colors.length],
										width: `${(item.count / maxCount) * 100}%`,
									}}
								/>
							</div>
							<span className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
								{item.count}
							</span>
						</div>
					</div>
				))}
			</div>

			{/* Extra stats */}
			{extraStats && extraStats.length > 0 && (
				<div className='mt-6 pt-6 border-t border-gray-200 dark:border-gray-700'>
					<div className='grid grid-cols-2 gap-4 text-center'>
						{extraStats.map((stat, idx) => (
							<div key={idx}>
								<p className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
									{stat.value}
								</p>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									{stat.label}
								</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default DivisionProgressCard

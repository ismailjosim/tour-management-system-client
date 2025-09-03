/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/admin/AllTours.tsx
import { format } from 'date-fns'
import { Edit, EyeIcon, Trash2 } from 'lucide-react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import DeleteConfirmation from '@/components/DeleteConfirmation'

import usePagination from '@/hooks/usePagination'
import {
	useGetAllToursQuery,
	useRemoveTourMutation,
} from '@/redux/features/Tour/tour.api'
import DataTable from '../../utils/DataTable'
import DataPagination from '../../utils/DataPagination'

interface Tour {
	_id: string
	title: string
	images: string[]
	location: string
	costFrom: number
	startDate: string
	endDate: string
	maxGuest: number
	slug: string
	createdAt: string
}

const AllTours = () => {
	const { currentPage, limit, handlePageChange, handleLimitChange } =
		usePagination()

	const { data, isLoading } = useGetAllToursQuery({
		page: currentPage,
		limit,
	})

	const [removeTour] = useRemoveTourMutation()

	const handleDelete = async (id: string) => {
		return removeTour(id).unwrap()
	}

	const columns = [
		{
			key: 'images',
			header: 'Image',
			className: 'font-medium',
			render: (images: string[], item: Tour) => (
				<div className='font-medium'>
					<Avatar className='rounded-md'>
						{images && images.length > 0 ? (
							<AvatarImage src={images[0]} alt={item.title} />
						) : (
							<AvatarFallback>{item.title?.charAt(0) ?? 'T'}</AvatarFallback>
						)}
					</Avatar>
				</div>
			),
		},
		{
			key: 'title',
			header: 'Tour Title',
			className: 'font-medium',
			render: (title: string) => (
				<div className='font-medium'>
					<div className='max-w-[200px] truncate' title={title}>
						{title}
					</div>
				</div>
			),
		},
		{
			key: 'location',
			header: 'Location',
			className: 'font-medium',
			render: (location: string) => (
				<div className='font-medium'>{location}</div>
			),
		},
		{
			key: 'costFrom',
			header: 'Price',
			className: 'font-medium',
			render: (costFrom: number) => (
				<div className='font-medium'>${costFrom}</div>
			),
		},
		{
			key: 'duration',
			header: 'Duration',
			className: 'font-medium hidden md:table-cell',
			render: (_: any, item: Tour) => (
				<div className='font-medium hidden md:table-cell'>
					{format(new Date(item.startDate), 'MMM dd')} -{' '}
					{format(new Date(item.endDate), 'MMM dd, yyyy')}
				</div>
			),
		},
		{
			key: 'maxGuest',
			header: 'Max Guests',
			className: 'text-center hidden sm:table-cell',
			render: (maxGuest: number) => (
				<div className='text-center hidden sm:table-cell'>
					{maxGuest} guests
				</div>
			),
		},
		{
			key: 'actions',
			header: 'Actions',
			className: 'text-right',
			render: (_: any, item: Tour) => (
				<div className='text-right'>
					<div className='flex items-center justify-end gap-2'>
						<Button size='sm' variant='outline' asChild>
							<Link to={`/destination/${item.slug}`}>
								<EyeIcon className='h-4 w-4' />
							</Link>
						</Button>
						<Button size='sm' variant='outline' asChild>
							<Link to={`/admin/edit-tour/${item._id}`}>
								<Edit className='h-4 w-4' />
							</Link>
						</Button>
						<DeleteConfirmation onConfirm={() => handleDelete(item._id)}>
							<Button size='sm' variant='destructive'>
								<Trash2 className='h-4 w-4' />
							</Button>
						</DeleteConfirmation>
					</div>
				</div>
			),
		},
	]

	return (
		<div className='container mx-auto'>
			<div className='flex justify-between items-center mb-5'>
				<h3 className='text-2xl font-semibold'>All Tours</h3>
				<Button asChild>
					<Link to='/admin/add-tour'>Add New Tour</Link>
				</Button>
			</div>

			<DataTable
				columns={columns}
				data={data?.data || []}
				isLoading={isLoading}
				emptyMessage='No tours found'
			/>

			{data?.meta && (
				<DataPagination
					currentPage={currentPage}
					totalPage={data.meta.totalPage}
					limit={limit}
					onPageChange={handlePageChange}
					onLimitChange={handleLimitChange}
				/>
			)}
		</div>
	)
}

export default AllTours

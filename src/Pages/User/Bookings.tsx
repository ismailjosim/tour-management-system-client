/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/admin/AllTours.tsx
import { format } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
// import { TableCell } from '@/components/ui/table'
import DeleteConfirmation from '@/components/DeleteConfirmation'

import usePagination from '@/hooks/usePagination'
import DataTable from '../../utils/DataTable'
import DataPagination from '../../utils/DataPagination'
import {
	useGetMyBookingsQuery,
	useRemoveBookingMutation,
} from '../../redux/features/booking/booking.api'

interface Booking {
	_id: string
	user: string
	tour: string
	guestCount: number
	status: string
	createdAt: string
	updatedAt: string
	payment: string
}

const Bookings = () => {
	const { currentPage, limit, handlePageChange, handleLimitChange } =
		usePagination()

	const { data, isLoading } = useGetMyBookingsQuery({
		page: currentPage,
		limit,
	})

	const [removeBooking] = useRemoveBookingMutation()

	const handleDelete = async (id: string) => {
		return removeBooking(id).unwrap()
	}

	const columns = [
		{
			key: 'tour',
			header: 'Tour ID',
			className: 'font-medium',
			render: (tour: string) => (
				<div className='font-medium truncate max-w-[200px]'>{tour}</div>
			),
		},
		{
			key: 'guestCount',
			header: 'Guests',
			className: 'text-center',
			render: (guestCount: number) => (
				<div className='text-center'>{guestCount}</div>
			),
		},
		{
			key: 'status',
			header: 'Status',
			className: 'text-center',
			render: (status: string) => (
				<span
					className={`px-2 py-1 rounded text-xs font-medium ${
						status === 'COMPLETE'
							? 'bg-green-100 text-green-700'
							: status === 'CANCEL'
							? 'bg-red-100 text-red-700'
							: 'bg-yellow-100 text-yellow-700'
					}`}
				>
					{status}
				</span>
			),
		},
		{
			key: 'createdAt',
			header: 'Booking Date',
			className: 'font-medium',
			render: (createdAt: string) => (
				<span>{format(new Date(createdAt), 'MMM dd, yyyy')}</span>
			),
		},
		{
			key: 'payment',
			header: 'Payment ID',
			className: 'font-medium',
			render: (payment: string) => (
				<div className='truncate max-w-[200px]'>{payment}</div>
			),
		},
		{
			key: 'actions',
			header: 'Actions',
			className: 'text-right',
			render: (_: any, item: Booking) => (
				<div className='flex items-center justify-end gap-2'>
					<Button size='sm' variant='outline' asChild>
						<Link to={`/destination/${item.tour}`}>View Tour</Link>
					</Button>
					<DeleteConfirmation onConfirm={() => handleDelete(item._id)}>
						<Button size='sm' variant='destructive'>
							<Trash2 className='h-4 w-4' />
						</Button>
					</DeleteConfirmation>
				</div>
			),
		},
	]

	return (
		<div className='container mx-auto'>
			<div className='flex justify-between items-center mb-5'>
				<h3 className='text-2xl font-semibold'>All Bookings</h3>
			</div>

			<DataTable
				columns={columns}
				data={data?.data?.data || []}
				isLoading={isLoading}
				emptyMessage='No bookings found'
			/>

			{data?.data?.meta && (
				<DataPagination
					currentPage={currentPage}
					totalPage={data.data.meta.totalPage}
					limit={limit}
					onPageChange={handlePageChange}
					onLimitChange={handleLimitChange}
				/>
			)}
		</div>
	)
}

export default Bookings

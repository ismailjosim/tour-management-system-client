/* eslint-disable @typescript-eslint/no-explicit-any */

import { format } from 'date-fns'
import { EyeIcon, Trash2, FileText } from 'lucide-react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import DeleteConfirmation from '@/components/DeleteConfirmation'
import usePagination from '@/hooks/usePagination'

import {
	useGetAllBookingsQuery,
	useRemoveBookingMutation,
} from '@/redux/features/booking/booking.api'

import DataTable from '@/utils/DataTable'
import DataPagination from '@/utils/DataPagination'
import type { Booking } from '@/types/booking'
import BookingDetailsModal from '../../components/modules/Admin/Bookings/BookingDetailsModal'

const AllBookings = () => {
	const { currentPage, limit, handlePageChange, handleLimitChange } =
		usePagination()

	const { data, isLoading } = useGetAllBookingsQuery({
		page: currentPage,
		limit,
	})
	const bookings = data?.data?.data
	const meta = data?.data?.meta

	const [removeBooking] = useRemoveBookingMutation()

	const handleDelete = async (id: string) => {
		return removeBooking(id).unwrap()
	}

	const columns = [
		{
			key: 'tour',
			header: 'Tour Info',
			className: 'font-medium',
			render: (tour: Booking['tour']) => (
				<div className='flex items-center gap-2'>
					<Avatar className='rounded-md'>
						{tour?.images?.length ? (
							<AvatarImage src={tour.images[0]} alt={tour.title} />
						) : (
							<AvatarFallback>{tour?.title?.charAt(0) ?? 'T'}</AvatarFallback>
						)}
					</Avatar>
					<div>
						<div className='font-medium max-w-[200px] truncate'>
							{tour.title}
						</div>
						<div className='text-xs text-muted-foreground'>{tour.location}</div>
					</div>
				</div>
			),
		},
		{
			key: 'user',
			header: 'User',
			className: 'font-medium',
			render: (user: Booking['user']) => (
				<div>
					<div className='font-medium'>{user.name}</div>
					<div className='text-xs text-muted-foreground'>{user.email}</div>
				</div>
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
			className: 'font-medium',
			render: (status: string) => (
				<span
					className={`px-2 py-1 rounded text-xs font-semibold ${
						status === 'COMPLETE'
							? 'bg-green-100 text-green-700'
							: status === 'PENDING'
							? 'bg-yellow-100 text-yellow-700'
							: status === 'CANCELLED'
							? 'bg-red-100 text-red-700'
							: 'bg-blue-100 text-blue-700'
					}`}
				>
					{status}
				</span>
			),
		},
		{
			key: 'payment',
			header: 'Payment',
			className: 'font-medium hidden md:table-cell',
			render: (payment: Booking['payment']) => (
				<div className='hidden md:block'>
					<div className='font-medium text-sm'>${payment.amount}</div>
					<div
						className={`text-xs ${
							payment.status === 'PAID' ? 'text-green-600' : 'text-red-600'
						}`}
					>
						{payment.status}
					</div>
				</div>
			),
		},
		{
			key: 'createdAt',
			header: 'Booking Date',
			className: 'hidden lg:table-cell',
			render: (createdAt: string) => (
				<div className='hidden lg:table-cell'>
					{format(new Date(createdAt), 'MMM dd, yyyy')}
				</div>
			),
		},
		{
			key: 'actions',
			header: 'Actions',
			className: 'text-right',
			render: (_: any, item: Booking) => (
				<div className='flex justify-end gap-2'>
					<Button size='sm' variant='outline' asChild>
						<Link to={item.payment.invoiceUrl} target='_blank'>
							<FileText className='h-4 w-4' />
						</Link>
					</Button>
					<BookingDetailsModal
						booking={item}
						trigger={
							<Button size='sm' variant='outline'>
								<EyeIcon className='h-4 w-4' />
							</Button>
						}
					/>

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
				data={bookings || []}
				isLoading={isLoading}
				emptyMessage='No bookings found'
			/>

			{meta && (
				<DataPagination
					currentPage={currentPage}
					totalPage={meta.totalPage}
					limit={limit}
					onPageChange={handlePageChange}
					onLimitChange={handleLimitChange}
				/>
			)}
		</div>
	)
}

export default AllBookings

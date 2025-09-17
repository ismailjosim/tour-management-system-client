// components/modules/Admin/Booking/BookingDetailsModal.tsx
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { FileText } from 'lucide-react'

interface BookingDetailsModalProps {
	booking: {
		_id: string
		user: {
			name: string
			email: string
		}
		tour: {
			title: string
			images: string[]
			location: string
			costFrom: number
			startDate: string
			endDate: string
		}
		guestCount: number
		status: string
		createdAt: string
		payment: {
			transactionId: string
			status: string
			amount: number
			invoiceUrl: string
		}
	}
	trigger: React.ReactNode
}

const BookingDetailsModal = ({
	booking,
	trigger,
}: BookingDetailsModalProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='max-w-2xl'>
				<DialogHeader>
					<DialogTitle>Booking Details</DialogTitle>
					<DialogDescription>
						Full details of booking ID: {booking._id}
					</DialogDescription>
				</DialogHeader>

				<div className='space-y-6'>
					{/* Tour Info */}
					<div className='flex items-start gap-4'>
						<Avatar className='h-20 w-20 rounded-md'>
							{booking.tour.images?.length ? (
								<AvatarImage
									src={booking.tour.images[0]}
									alt={booking.tour.title}
								/>
							) : (
								<AvatarFallback>
									{booking.tour.title?.charAt(0) ?? 'T'}
								</AvatarFallback>
							)}
						</Avatar>
						<div>
							<h4 className='font-semibold'>{booking.tour.title}</h4>
							<p className='text-sm text-muted-foreground'>
								{booking.tour.location}
							</p>
							<p className='text-sm'>
								{format(new Date(booking.tour.startDate), 'MMM dd, yyyy')} -{' '}
								{format(new Date(booking.tour.endDate), 'MMM dd, yyyy')}
							</p>
							<p className='text-sm font-medium'>
								Price: ${booking.tour.costFrom}
							</p>
						</div>
					</div>

					{/* User Info */}
					<div>
						<h5 className='font-semibold mb-1'>Booked By</h5>
						<p>{booking.user.name}</p>
						<p className='text-sm text-muted-foreground'>
							{booking.user.email}
						</p>
					</div>

					{/* Booking Details */}
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<h5 className='font-semibold'>Guests</h5>
							<p>{booking.guestCount}</p>
						</div>
						<div>
							<h5 className='font-semibold'>Status</h5>
							<Badge
								variant={
									booking.status === 'COMPLETE'
										? 'default'
										: booking.status === 'PENDING'
										? 'secondary'
										: booking.status === 'CANCELLED'
										? 'destructive'
										: 'outline'
								}
							>
								{booking.status}
							</Badge>
						</div>
						<div>
							<h5 className='font-semibold'>Booking Date & Time</h5>
							<p>{format(new Date(booking.createdAt), 'PPpp')}</p>
						</div>
					</div>

					{/* Payment Info */}
					<div>
						<h5 className='font-semibold mb-2'>Payment</h5>
						<p>
							Transaction ID:{' '}
							<span className='font-mono'>{booking.payment.transactionId}</span>
						</p>
						<p>
							Amount:{' '}
							<span className='font-medium'>${booking.payment.amount}</span>
						</p>
						<p>Status: {booking.payment.status}</p>
						{booking.payment.invoiceUrl && (
							<Button asChild size='sm' variant='outline' className='mt-2'>
								<a
									href={booking.payment.invoiceUrl}
									target='_blank'
									rel='noopener noreferrer'
								>
									<FileText className='h-4 w-4 mr-2' /> View Invoice
								</a>
							</Button>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default BookingDetailsModal

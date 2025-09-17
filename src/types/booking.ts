export type Booking = {
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
	updatedAt: string
	payment: {
		_id: string
		transactionId: string
		status: string
		amount: number
		invoiceUrl: string
	}
}

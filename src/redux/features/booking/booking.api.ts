import { baseApi } from '../../app/baseApi'

export const bookingApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		addBooking: builder.mutation({
			query: (bookingData) => ({
				url: '/booking',
				method: 'POST',
				data: bookingData,
			}),
			invalidatesTags: ['BOOKING'],
		}),
		getAllBookings: builder.query({
			query: () => ({
				url: '/tour',
				method: 'GET',
			}),
			providesTags: ['BOOKING'],
		}),
	}),
})

export const { useAddBookingMutation, useGetAllBookingsQuery } = bookingApi

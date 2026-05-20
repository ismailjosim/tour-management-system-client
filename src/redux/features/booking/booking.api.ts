import { baseApi } from '../../app/baseApi';

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
        url: '/booking',
        method: 'GET',
      }),
      providesTags: ['BOOKING'],
    }),
    getMyBookings: builder.query({
      query: (params) => ({
        url: '/booking/my-bookings',
        method: 'GET',
        params,
      }),
      providesTags: ['BOOKING'],
    }),
    removeBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/booking/${bookingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BOOKING'],
    }),
    initiatePayment: builder.mutation({
      query: (bookingId) => ({
        url: `/payment/init-payment/${bookingId}`,
        method: 'POST',
      }),
      invalidatesTags: ['BOOKING'],
    }),
  }),
});

export const {
  useAddBookingMutation,
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
  useInitiatePaymentMutation,
  useRemoveBookingMutation,
} = bookingApi;

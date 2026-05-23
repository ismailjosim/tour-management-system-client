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
    getGuidePendingApprovals: builder.query({
      query: (params) => ({
        url: '/booking/guide/pending-approvals',
        method: 'GET',
        params,
      }),
      providesTags: ['BOOKING', 'GUIDE'],
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
    approveOrRejectBooking: builder.mutation({
      query: ({ bookingId, approved, rejectionReason }) => ({
        url: `/booking/${bookingId}/guide-approval`,
        method: 'PATCH',
        data: { approved, rejectionReason },
      }),
      invalidatesTags: ['BOOKING', 'GUIDE'],
    }),
    completeBooking: builder.mutation({
      query: ({ bookingId, completedBy }) => ({
        url: `/booking/${bookingId}/complete`,
        method: 'PATCH',
        data: { completedBy },
      }),
      invalidatesTags: ['BOOKING', 'GUIDE'],
    }),
  }),
});

export const {
  useAddBookingMutation,
  useApproveOrRejectBookingMutation,
  useCompleteBookingMutation,
  useGetAllBookingsQuery,
  useGetGuidePendingApprovalsQuery,
  useGetMyBookingsQuery,
  useInitiatePaymentMutation,
  useRemoveBookingMutation,
} = bookingApi;

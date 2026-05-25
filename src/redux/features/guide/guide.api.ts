import { baseApi } from '../../app/baseApi';
import type {
  ApiResponse,
  GuideBooking,
  GuideEarnings,
  GuideReviews,
  GuideTourSummary,
} from '@/types/guide';

export const guideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyGuide: builder.mutation({
      query: (guideData) => ({
        url: '/guide/apply',
        method: 'POST',
        data: guideData,
      }),
      invalidatesTags: ['GUIDE'],
    }),
    approveOrRejectGuide: builder.mutation({
      query: ({ guideId, ...params }) => ({
        url: `/guide/${guideId}`,
        method: 'PATCH',
        params,
      }),
      invalidatesTags: ['GUIDE'],
    }),

    getAllGuides: builder.query({
      query: (params) => ({
        url: `/guide`,
        method: 'GET',
        params,
      }),
      providesTags: ['GUIDE'],
    }),
    getPublicGuides: builder.query({
      query: (params) => ({
        url: `/guide/public`,
        method: 'GET',
        params,
      }),
      providesTags: ['GUIDE'],
    }),
    getMyGuideApplication: builder.query({
      query: (params) => ({
        url: `/guide/me/profile`,
        method: 'GET',
        params,
      }),
      providesTags: ['GUIDE'],
    }),
    getMyGuideTours: builder.query<ApiResponse<GuideTourSummary[]>, void>({
      query: () => ({
        url: `/guide/me/tours`,
        method: 'GET',
      }),
      providesTags: ['GUIDE', 'BOOKING'],
    }),
    getMyGuideBookings: builder.query<ApiResponse<GuideBooking[]>, Record<string, unknown> | void>({
      query: (params) => ({
        url: `/guide/me/bookings`,
        method: 'GET',
        params,
      }),
      providesTags: ['GUIDE', 'BOOKING'],
    }),
    getMyGuideSchedule: builder.query<ApiResponse<GuideBooking[]>, void>({
      query: () => ({
        url: `/guide/me/schedule`,
        method: 'GET',
      }),
      providesTags: ['GUIDE', 'BOOKING'],
    }),
    updateMyGuideBookingStatus: builder.mutation<
      ApiResponse<GuideBooking>,
      { bookingId: string; status: string }
    >({
      query: ({ bookingId, status }) => ({
        url: `/guide/me/bookings/${bookingId}/status`,
        method: 'PATCH',
        data: { status },
      }),
      invalidatesTags: ['GUIDE', 'BOOKING'],
    }),
    getMyGuideEarnings: builder.query<ApiResponse<GuideEarnings>, void>({
      query: () => ({
        url: `/guide/me/earnings`,
        method: 'GET',
      }),
      providesTags: ['GUIDE', 'BOOKING'],
    }),
    getMyGuideReviews: builder.query<ApiResponse<GuideReviews>, void>({
      query: () => ({
        url: `/guide/me/reviews`,
        method: 'GET',
      }),
      providesTags: ['GUIDE', 'REVIEWS'],
    }),
    getAvailableGuidesForTour: builder.query({
      query: (tourId) => ({
        url: `/guide/available/${tourId}`,
        method: 'GET',
      }),
      providesTags: ['GUIDE'],
    }),
    updateMyGuideProfile: builder.mutation({
      query: (formData) => ({
        url: '/guide/me/profile',
        method: 'PATCH',
        data: formData,
      }),
      invalidatesTags: ['GUIDE'],
    }),
  }),
});

export const {
  useApplyGuideMutation,
  useApproveOrRejectGuideMutation,
  useGetAllGuidesQuery,
  useGetPublicGuidesQuery,
  useGetMyGuideApplicationQuery,
  useGetMyGuideToursQuery,
  useGetMyGuideBookingsQuery,
  useGetMyGuideScheduleQuery,
  useUpdateMyGuideBookingStatusMutation,
  useGetMyGuideEarningsQuery,
  useGetMyGuideReviewsQuery,
  useGetAvailableGuidesForTourQuery,
  useUpdateMyGuideProfileMutation,
} = guideApi;

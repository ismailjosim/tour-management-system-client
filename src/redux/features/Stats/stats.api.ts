import { baseApi } from '../../app/baseApi';
import type { ApiResponse, GuideStats } from '@/types/guide';

export type HomepageStats = {
  totalTours: number;
  totalGuides: number;
  totalDestinations: number;
  happyTravelers: number;
};

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomepageStats: builder.query<ApiResponse<HomepageStats>, void>({
      query: () => ({
        url: '/stats/homepage',
        method: 'GET',
      }),
      providesTags: ['STATS'],
    }),
    getUserStats: builder.query({
      query: () => ({
        url: '/stats/user',
        method: 'GET',
      }),
      providesTags: ['STATS'],
    }),
    getTourStats: builder.query({
      query: () => ({
        url: '/stats/tour',
        method: 'GET',
      }),
      providesTags: ['STATS'],
    }),
    getBookingStats: builder.query({
      query: () => ({
        url: '/stats/booking',
        method: 'GET',
      }),
      providesTags: ['STATS'],
    }),
    getPaymentStats: builder.query({
      query: () => ({
        url: '/stats/payment',
        method: 'GET',
      }),
      providesTags: ['STATS'],
    }),
    getGuideStats: builder.query<ApiResponse<GuideStats>, void>({
      query: () => ({
        url: '/stats/guide/me',
        method: 'GET',
      }),
      providesTags: ['STATS', 'GUIDE'],
    }),
  }),
});

export const {
  useGetBookingStatsQuery,
  useGetPaymentStatsQuery,
  useGetTourStatsQuery,
  useGetUserStatsQuery,
  useGetGuideStatsQuery,
  useGetHomepageStatsQuery,
} = statsApi;

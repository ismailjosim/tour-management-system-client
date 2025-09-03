import { baseApi } from '../../app/baseApi'

const statsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
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
	}),
})

export const {
	useGetBookingStatsQuery,
	useGetPaymentStatsQuery,
	useGetTourStatsQuery,
	useGetUserStatsQuery,
} = statsApi

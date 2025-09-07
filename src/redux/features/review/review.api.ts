import { baseApi } from '../../app/baseApi'

export const reviewApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		addReview: builder.mutation({
			query: (reviewData) => ({
				url: '/review/create-review',
				method: 'POST',
				data: reviewData,
			}),
			invalidatesTags: ['REVIEWS'],
		}),
		getSpecificTourReviews: builder.query({
			query: ({ tourId, ...params }) => ({
				url: `/review/${tourId}`,
				method: 'GET',
				params,
			}),
			providesTags: ['REVIEWS'],
		}),
	}),
})

export const { useAddReviewMutation, useGetSpecificTourReviewsQuery } =
	reviewApi

import { baseApi } from '../../app/baseApi';
import type { HomepageReview, PaginatedData } from '../../../types/home.type';
import type { IResponse } from '../../../types';

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: '/review/create-review',
        method: 'POST',
        data: reviewData,
      }),
      invalidatesTags: ['REVIEWS', 'GUIDE'],
    }),
    addGuideRating: builder.mutation({
      query: ({ reviewId, guideRating, guideComments }) => ({
        url: `/review/${reviewId}/guide-rating`,
        method: 'PATCH',
        data: { guideRating, guideComments },
      }),
      invalidatesTags: ['REVIEWS', 'GUIDE'],
    }),
    getAllReviews: builder.query<
      IResponse<PaginatedData<HomepageReview>>,
      Record<string, string | number> | undefined
    >({
      query: (params) => ({
        url: '/review',
        method: 'GET',
        params,
      }),
      providesTags: ['REVIEWS'],
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
});

export const {
  useAddGuideRatingMutation,
  useAddReviewMutation,
  useGetAllReviewsQuery,
  useGetSpecificTourReviewsQuery,
} = reviewApi;

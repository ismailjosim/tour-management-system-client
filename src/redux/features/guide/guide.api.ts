import { baseApi } from '../../app/baseApi'

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
		getMyGuideApplication: builder.query({
			query: (params) => ({
				url: `/guide/me/profile`,
				method: 'GET',
				params,
			}),
			providesTags: ['GUIDE'],
		}),
	}),
})

export const {
	useApplyGuideMutation,
	useApproveOrRejectGuideMutation,
	useGetAllGuidesQuery,
	useGetMyGuideApplicationQuery,
} = guideApi

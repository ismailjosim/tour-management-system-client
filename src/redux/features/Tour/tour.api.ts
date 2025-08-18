import { baseApi } from '../../app/baseApi'

export const tourApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		addTourType: builder.mutation({
			query: (tourType) => ({
				url: '/tour/create-tour-types',
				method: 'POST',
				data: tourType,
			}),
			invalidatesTags: ['TOUR'],
		}),
		removeTourType: builder.mutation({
			query: (tourTypeId) => ({
				url: `/tour/tour-types/${tourTypeId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['TOUR'],
		}),
		getTourTypes: builder.query({
			query: () => ({
				url: '/tour/tour-types',
				method: 'GET',
			}),
			providesTags: ['TOUR'],
			// transformResponse: (response) => response.data, * trim data that we want to consume
		}),
		// create tour
		addTour: builder.mutation({
			query: (tourData) => ({
				url: '/tour/create',
				method: 'POST',
				data: tourData,
			}),
			invalidatesTags: ['TOUR'],
		}),
	}),
})

export const {
	useAddTourTypeMutation,
	useGetTourTypesQuery,
	useRemoveTourTypeMutation,
	useAddTourMutation,
} = tourApi

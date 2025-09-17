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
		updateTourType: builder.mutation({
			query: ({ id, ...tourTypeInfo }) => ({
				url: `/tour/tour-types/${id}`,
				method: 'PATCH',
				data: tourTypeInfo,
			}),
			invalidatesTags: ['TOUR'],
		}),
		getTourTypes: builder.query({
			query: (params) => ({
				url: '/tour/tour-types',
				method: 'GET',
				params,
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
		getAllTours: builder.query({
			query: (params) => ({
				url: '/tour',
				method: 'GET',
				params: params,
			}),
			providesTags: ['TOUR'],
		}),
		getSingleTour: builder.query({
			query: (slug) => ({
				url: `/tour/${slug}`,
				method: 'GET',
			}),
			providesTags: ['TOUR'],
		}),
		removeTour: builder.mutation({
			query: (tourId) => ({
				url: `/tour/${tourId}`,
				method: 'DELETE',
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
	useGetAllToursQuery,
	useGetSingleTourQuery,
	useRemoveTourMutation,
	useUpdateTourTypeMutation,
} = tourApi

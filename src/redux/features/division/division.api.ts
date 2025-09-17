import { baseApi } from '../../app/baseApi'

export const divisionApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		addDivision: builder.mutation({
			query: (divisionData) => ({
				url: '/division/create',
				method: 'POST',
				data: divisionData,
			}),
			invalidatesTags: ['DIVISION'],
		}),
		removeDivision: builder.mutation({
			query: (divisionId) => ({
				url: `/division/${divisionId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['DIVISION'],
		}),
		getDivisions: builder.query({
			query: (params) => ({
				url: '/division',
				method: 'GET',
				params,
			}),
			providesTags: ['DIVISION'],
		}),
		updateDivision: builder.mutation({
			query: ({ divisionId, ...divisionInfo }) => ({
				url: `/division/${divisionId}`,
				method: 'PATCH',
				data: divisionInfo,
			}),
			invalidatesTags: ['DIVISION'],
		}),
	}),
})

export const {
	useAddDivisionMutation,
	useRemoveDivisionMutation,
	useGetDivisionsQuery,
	useUpdateDivisionMutation,
} = divisionApi

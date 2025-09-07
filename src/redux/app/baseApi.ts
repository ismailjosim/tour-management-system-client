import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from './axiosBaseQuery'

export const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: axiosBaseQuery(),
	// * if we want to use fetch base query
	// baseQuery: fetchBaseQuery({
	// 	baseUrl: 'your base url',
	// 	credentials: 'include',
	// }),
	tagTypes: ['USER', 'TOUR', 'DIVISION', 'BOOKING', 'STATS', 'REVIEWS'],
	endpoints: () => ({}),
})

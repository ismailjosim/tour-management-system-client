import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		// All reducers functions
	},
	// middleware: (GetDefaultMiddleware) => GetDefaultMiddleware.concat(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

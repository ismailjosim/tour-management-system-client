import type { ComponentType } from 'react'
import { useUserInfoQuery } from '../redux/features/auth/auth.api'
import PageLoader from './PageLoader'
import { Navigate } from 'react-router'

const withGuest = (Component: ComponentType) => {
	return function GuestWrapper() {
		const { data, isLoading } = useUserInfoQuery(undefined)
		const user = data?.data

		if (isLoading) {
			return <PageLoader />
		}
		if (user?.email) {
			return <Navigate to='/' replace />
		}
		return <Component />
	}
}

export default withGuest

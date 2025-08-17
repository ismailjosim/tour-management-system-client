import type { ComponentType } from "react"
import type { TRole } from "../types"
import { useUserInfoQuery } from "../redux/features/auth/auth.api"
import { Navigate } from "react-router"
import PageLoader from "./PageLoader"

export const withAuth = (
    Component: ComponentType,
    requiredRole?: TRole | TRole[]
) => {
    return function AuthWrapper() {
        const { data, isLoading } = useUserInfoQuery(undefined)
        const userRole = data?.data?.role

        if (isLoading) {
            return <PageLoader />
        }

        if (!isLoading && !data?.data?.email) {
            return <Navigate to={"/login"} />
        }

        if (requiredRole) {
            const allowed =
                Array.isArray(requiredRole)
                    ? requiredRole.includes(userRole as TRole)
                    : requiredRole === userRole

            if (!allowed) {
                return <Navigate to="/unauthorized" />
            }
        }

        return <Component />
    }
}

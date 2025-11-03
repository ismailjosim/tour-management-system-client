import { role } from './../constants/role'
import { createBrowserRouter } from 'react-router'

// * Layout Import
import App from '@/App'
import DashboardLayout from '@/components/layout/DashboardLayout'
import generateRoutes from '@/utils/generateRoutes'
import { adminSidebarItems } from './adminSidebarItems'
import { userSidebarItems } from './userSidebarItems'
import { guideSidebarItems } from './guideSidebarItems'

// * Pages Import
import Home from '@/Pages/Home'
import About from '@/Pages/About'
import Login from '@/Pages/Login'
import Register from '@/Pages/Register'
import Verify from '@/Pages/Verify'
import Unauthorized from '@/Pages/Unauthorized'
import { withAuth } from '@/utils/withAuth'
import type { TRole } from '@/types'
import Destinations from '@/Pages/Destinations'
import ErrorPage from '@/utils/ErrorPage'
import DestinationDetails from '@/Pages/DestinationDetails'
import BookTour from '@/Pages/BookTour'
import SuccessPayment from '@/Pages/Payment/SuccessPayment'
import FailPayment from '@/Pages/Payment/FailPayment'
import CancelPayment from '@/Pages/Payment/CancelPayment'
import Contact from '@/Pages/Contact'
import FAQs from '@/Pages/FAQs'
import Profile from '@/Pages/Profile'
import EditTour from '@/Pages/Admin/EditTour'
import ForgotPassword from '@/Pages/ForgotPassword'
import ResetPassword from '@/Pages/ResetPassword'
import withGuest from '@/utils/withGuest'
import { withPaymentGuard } from '@/utils/withPaymentGuard'

const router = createBrowserRouter([
	{
		path: '/',
		Component: App,
		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: 'about',
				Component: About,
			},
			{
				path: 'contact',
				Component: Contact,
			},
			{
				path: 'faq',
				Component: FAQs,
			},
			{
				path: 'destinations',
				Component: Destinations,
			},
			{
				path: 'destination/:slug',
				Component: DestinationDetails,
			},
			{
				path: 'booking/:slug',
				Component: withAuth(BookTour),
			},
			{
				path: 'profile',
				Component: withAuth(Profile),
			},
		],
	},
	{
		Component: withAuth(DashboardLayout, [
			role.ADMIN as TRole,
			role.SUPER_ADMIN as TRole,
		]),
		path: '/admin',
		children: [
			...generateRoutes(adminSidebarItems),
			{
				path: 'edit-tour/:slug',
				Component: EditTour,
			},
		],
	},
	{
		Component: withAuth(DashboardLayout, role.USER as TRole),
		path: '/user',
		children: [...generateRoutes(userSidebarItems)],
	},
	{
		Component: withAuth(DashboardLayout, role.GUIDE as TRole),
		path: '/guide',
		children: [...generateRoutes(guideSidebarItems)],
	},
	{
		Component: withGuest(Login),
		path: '/login',
	},
	{
		Component: withGuest(Register),
		path: '/register',
	},
	{
		Component: withGuest(ForgotPassword),
		path: '/forgot-password',
	},
	{
		Component: withGuest(ResetPassword),
		path: '/reset-password',
	},
	{
		Component: Verify,
		path: '/verify',
	},
	{
		Component: Unauthorized,
		path: '/unauthorized',
	},
	{
		Component: withPaymentGuard(SuccessPayment),
		path: '/payment/success',
	},
	{
		Component: withPaymentGuard(FailPayment),
		path: '/payment/fail',
	},
	{
		Component: withPaymentGuard(CancelPayment),
		path: '/payment/cancel',
	},
	{
		path: '*',
		Component: ErrorPage,
	},
])

export default router

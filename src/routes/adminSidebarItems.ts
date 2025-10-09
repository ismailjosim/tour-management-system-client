import { lazy } from 'react'
const Analytics = lazy(() => import('@/Pages/Admin/Analytics'))
const AddTour = lazy(() => import('@/Pages/Admin/AddTour'))
const AddTourType = lazy(() => import('@/Pages/Admin/AddTourType'))
const AddDivision = lazy(() => import('@/Pages/Admin/AddDivision'))
const AllTours = lazy(() => import('@/Pages/Admin/AllTours'))
const AllUsers = lazy(() => import('@/Pages/Admin/AllUsers'))
const AllBookings = lazy(() => import('@/Pages/Admin/AllBookings'))
const GuideRequest = lazy(() => import('@/Pages/Admin/GuideRequest'))

export const adminSidebarItems = [
	{
		title: 'Dashboard',
		items: [
			{
				title: 'Analytics',
				url: '/admin/analytics',
				component: Analytics,
			},
		],
	},
	{
		title: 'User Management',
		items: [
			{
				title: 'All Users',
				url: '/admin/users',
				component: AllUsers,
			},
			{
				title: 'Guide Request',
				url: '/admin/guide-request',
				component: GuideRequest,
			},
		],
	},
	{
		title: 'Tour Management',
		items: [
			{
				title: 'Add Tour Type',
				url: '/admin/add-tour-type',
				component: AddTourType,
			},
			{
				title: 'Add Division',
				url: '/admin/add-division',
				component: AddDivision,
			},

			{
				title: 'All Tours',
				url: '/admin/all-tours',
				component: AllTours,
			},
			{
				title: 'Add Tour',
				url: '/admin/add-tour',
				component: AddTour,
			},
		],
	},
	{
		title: 'Booking Management',
		items: [
			{
				title: 'All Bookings',
				url: '/admin/all-bookings',
				component: AllBookings,
			},
		],
	},
]

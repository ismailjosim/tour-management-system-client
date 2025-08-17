import { lazy } from 'react'

const Analytics = lazy(() => import('@/Pages/Admin/Analytics'))
const AddTour = lazy(() => import('@/Pages/Admin/AddTour'))
const AllTours = lazy(() => import('@/Pages/Admin/AllTours'))

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
		title: 'Tour Management',
		items: [
			{
				title: 'Add Tour',
				url: '/admin/add-tour',
				component: AddTour,
			},
			{
				title: 'All Tours',
				url: '/admin/all-tours',
				component: AllTours,
			},
		],
	},
]

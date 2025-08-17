import { lazy } from 'react'

const Analytics = lazy(() => import('@/Pages/Admin/Analytics'))
const AllTours = lazy(() => import('@/Pages/Admin/AllTours'))
const AddTour = lazy(() => import('@/Pages/Admin/AddTour'))
const AddTourType = lazy(() => import('@/Pages/Admin/AddTourType'))
const AddDivision = lazy(() => import('@/Pages/Admin/AddDivision'))

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
				title: 'All Tours',
				url: '/admin/all-tours',
				component: AllTours,
			},
			{
				title: 'Add Tour',
				url: '/admin/add-tour',
				component: AddTour,
			},
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
		],
	},
]

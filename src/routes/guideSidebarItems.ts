
import { lazy } from 'react'

const GuideOverviewPage = lazy(() => import('@/Pages/Guide/GuideOverviewPage'))
const MyTours = lazy(() => import('@/Pages/Guide/MyTours'))
const Schedule = lazy(() => import('@/Pages/Guide/Schedule'))
const Earnings = lazy(() => import('@/Pages/Guide/Earnings'))
const Communication = lazy(() => import('@/Pages/Guide/Communication'))

export const guideSidebarItems = [
	{
		title: 'Dashboard',
		items: [
			{
				title: 'Overview Stats',
				url: '/guide/overview',
				component: GuideOverviewPage,
			},
			{
				title: 'My Tours',
				url: '/guide/my-tours',
				component: MyTours,
			},
			{
				title: 'Bookings & Schedule',
				url: '/guide/schedule',
				component: Schedule,
			},
			{
				title: 'Earnings',
				url: '/guide/earnings',
				component: Earnings,
			},
			{
				title: 'Communication',
				url: '/guide/communication',
				component: Communication,
			},
		],
	},
]

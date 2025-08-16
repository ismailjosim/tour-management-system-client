import AddTour from '../Pages/Admin/AddTour'
import AllTours from '../Pages/Admin/AllTours'
import Analytics from '../Pages/Admin/Analytics'

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

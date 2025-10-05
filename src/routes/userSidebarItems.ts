import ApplyGuide from '../Pages/User/ApplyGuide'
import Bookings from '../Pages/User/Bookings'

export const userSidebarItems = [
	{
		title: 'Dashboard',
		items: [
			{
				title: 'Bookings',
				url: '/user/bookings',
				component: Bookings,
			},
			{
				title: 'Apply Guide',
				url: '/user/guide',
				component: ApplyGuide,
			},
		],
	},
]

import { createBrowserRouter } from 'react-router'

// * Layout Import
import App from '../App'

// * Pages Import
import Home from '../Pages/Home'
import About from '../Pages/About'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Verify from '../Pages/Verify'
import DashboardLayout from '../components/layout/DashboardLayout'

import Bookings from '../Pages/User/Bookings'
import generateRoutes from '../utils/generateRoutes'
import { adminSidebarItems } from './adminSidebarItems'

// * Admin Pages Import
// * User Pages Import
// * Guides Pages Import

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
		],
	},
	{
		Component: DashboardLayout,
		path: '/admin',
		children: [...generateRoutes(adminSidebarItems)],
	},
	{
		Component: DashboardLayout,
		path: '/user',
		children: [
			{
				Component: Bookings,
				path: 'bookings',
			},
		],
	},
	{
		Component: Login,
		path: '/login',
	},
	{
		Component: Register,
		path: '/register',
	},
	{
		Component: Verify,
		path: '/verify',
	},
])

export default router

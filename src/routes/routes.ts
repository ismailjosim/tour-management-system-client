import { role } from './../constants/role'
import { createBrowserRouter } from 'react-router'

// * Layout Import
import App from '../App'
import DashboardLayout from '../components/layout/DashboardLayout'
import generateRoutes from '../utils/generateRoutes'
import { adminSidebarItems } from './adminSidebarItems'
import { userSidebarItems } from './userSidebarItems'

// * Pages Import
import Home from '../Pages/Home'
import About from '../Pages/About'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Verify from '../Pages/Verify'
import Unauthorized from '../Pages/Unauthorized'
import { withAuth } from '../utils/withAuth'
import type { TRole } from '../types'
import Destinations from '../Pages/Destinations'

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
				path: 'destinations',
				Component: Destinations,
			},
		],
	},
	{
		Component: withAuth(DashboardLayout, [
			role.ADMIN as TRole,
			role.SUPER_ADMIN as TRole,
		]),
		path: '/admin',
		children: [...generateRoutes(adminSidebarItems)],
	},
	{
		Component: withAuth(DashboardLayout, role.USER as TRole),

		path: '/user',
		children: [...generateRoutes(userSidebarItems)],
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
	{
		Component: Unauthorized,
		path: '/unauthorized',
	},
])

export default router

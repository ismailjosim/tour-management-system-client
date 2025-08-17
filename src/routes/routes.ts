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
])

export default router

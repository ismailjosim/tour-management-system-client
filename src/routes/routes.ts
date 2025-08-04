import { createBrowserRouter } from 'react-router'
import App from '../App'
import Home from '../Pages/Home'
import AdminLayout from '../components/ui/layout/AdminLayout'
import Analytics from '../Pages/Analytics'

const router = createBrowserRouter([
	{
		path: '/',
		Component: App,
		children: [
			{
				index: true,
				Component: Home,
			},
		],
	},
	{
		Component: AdminLayout,
		path: 'admin',
		children: [
			{
				Component: Analytics,
				path: 'analytics',
			},
		],
	},
])

export default router

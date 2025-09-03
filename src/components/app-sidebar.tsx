import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar'
import { useTheme } from '@/hooks/useTheme'
import { Link, useLocation } from 'react-router'
import logoBlack from '@/assets/images/site-logo-dark.png'
import logoWhile from '@/assets/images/site-logo-light.png'
import { getSidebarItems } from '@/utils/getSidebarItems'
import { useUserInfoQuery } from '@/redux/features/auth/auth.api'
import type { TRole } from '@/types'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data: userData } = useUserInfoQuery(undefined)
	const getRole = userData?.data.role as TRole
	const { theme } = useTheme()
	const location = useLocation()

	const data = {
		navMain: getSidebarItems(getRole),
	}

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<Link to='/' className='flex items-center gap-2 font-medium'>
					<img src={theme === 'dark' ? logoWhile : logoBlack} alt='Site logo' />
				</Link>
			</SidebarHeader>
			<SidebarContent>
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((subItem) => {
									const isActive = location.pathname === subItem.url
									return (
										<SidebarMenuItem key={subItem.title}>
											<SidebarMenuButton
												asChild
												className={
													isActive ? 'bg-primary text-primary-foreground' : ''
												}
											>
												<Link to={subItem.url}>{subItem.title}</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}

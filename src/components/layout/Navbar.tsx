import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Skeleton } from '@/components/ui/skeleton'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuGroup,
	DropdownMenuShortcut,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { Link, NavLink } from 'react-router'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { ModeToggle } from './ModeToggler'
import {
	authApi,
	useLogoutMutation,
	useUserInfoQuery,
} from '@/redux/features/auth/auth.api'
import { toast } from 'sonner'
import { useAppDispatch } from '@/redux/app/hook'
import { role } from '@/constants/role'
import type { ApiError } from '@/types'
import { useTheme } from '@/hooks/useTheme'
import logoBlack from '@/assets/images/site-logo-dark.png'
import logoWhile from '@/assets/images/site-logo-light.png'

const navLinks = [
	{ label: 'Home', href: '/', role: 'PUBLIC' },
	{ label: 'About', href: '/about', role: 'PUBLIC' },
	{ label: 'Destination', href: '/destinations', role: 'PUBLIC' },
	// { label: 'Packages', href: '/packages', role: 'PUBLIC' },
	// { label: 'Blog', href: '/blog', role: 'PUBLIC' },
	{ label: 'FAQs', href: '/faq', role: 'PUBLIC' },
	{ label: 'Contact Us', href: '/contact', role: 'PUBLIC' },
	// { label: 'Cart', href: '/cart', role: 'PUBLIC' },
	{ label: 'Dashboard', href: '/admin', role: role.ADMIN },
	{ label: 'Dashboard', href: '/admin', role: role.SUPER_ADMIN },
	{ label: 'Dashboard', href: '/user', role: role.USER },
	{ label: 'Dashboard', href: '/guide', role: role.GUIDE },
]

const Header: React.FC = () => {
	const { data, isLoading } = useUserInfoQuery(undefined)
	const [logout] = useLogoutMutation()
	const dispatch = useAppDispatch()
	const user = data?.data
	const { theme } = useTheme()

	const handleLogout = async () => {
		try {
			const { data } = await logout(undefined)
			if (data?.success) {
				toast.success(data.message)
				dispatch(authApi.util.resetApiState())
			}
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError.data.message)
		}
	}

	const renderUserSection = () => {
		if (isLoading) {
			return <Skeleton className='h-10 w-24 rounded-full' />
		}

		if (!user?.email) {
			return (
				<NavigationMenuItem>
					<Link
						to='/login'
						className='text-sm font-medium uppercase text-foreground transition hover:text-primary'
					>
						Login / Register
					</Link>
				</NavigationMenuItem>
			)
		}

		return (
			<>
				<NavigationMenuItem>
					<DropdownMenu>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<DropdownMenuTrigger asChild>
										<Avatar className='cursor-pointer'>
											{user?.picture ? (
												<AvatarImage src={user.picture} alt={user.name} />
											) : (
												<AvatarFallback>
													{user?.name?.charAt(0) ?? 'U'}
												</AvatarFallback>
											)}
										</Avatar>
									</DropdownMenuTrigger>
								</TooltipTrigger>
								<TooltipContent>{user.name}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<DropdownMenuContent className='w-56' align='center'>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuGroup>
								<DropdownMenuItem asChild>
									<NavLink to='/profile'>
										Profile
										<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
									</NavLink>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<NavLink to='/settings'>
										Settings
										<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
									</NavLink>
								</DropdownMenuItem>
							</DropdownMenuGroup>

							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<NavLink to='/support'>Support</NavLink>
							</DropdownMenuItem>

							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleLogout}>
								Log out
								<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Button
						variant='default'
						className='text-sm font-medium uppercase transition border hover:border-primary cursor-pointer hover:text-primary hover:bg-transparent px-2 mx-0'
						onClick={handleLogout}
					>
						Logout
					</Button>
				</NavigationMenuItem>
			</>
		)
	}

	const filteredNavLinks = () => {
		if (user?.role) {
			return navLinks.filter(
				(link) => link.role === 'PUBLIC' || link.role === user.role,
			)
		}
		return navLinks.filter((link) => link.role === 'PUBLIC')
	}

	return (
		<header className='border-b shadow-sm'>
			<div className='container mx-auto flex items-center justify-between px-0 py-4'>
				<Link to='/' className='flex items-center gap-2 font-medium'>
					<img src={theme === 'dark' ? logoWhile : logoBlack} alt='Site logo' />
				</Link>

				{/* Desktop Navigation */}
				<nav className='hidden lg:flex'>
					<NavigationMenu>
						<NavigationMenuList className='gap-4'>
							{filteredNavLinks().map(({ label, href }) => (
								<NavigationMenuItem key={href}>
									<NavLink className={'p-2 px-3 rounded-md'} to={href}>
										{label}
									</NavLink>
								</NavigationMenuItem>
							))}
							{renderUserSection()}
							<ModeToggle />
						</NavigationMenuList>
					</NavigationMenu>
				</nav>

				{/* Mobile Dropdown */}
				<div className='lg:hidden'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' size='icon'>
								<Menu className='h-6 w-6' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='w-56 space-y-2 p-2'>
							{user?.email ? (
								<>
									<div className='flex items-center justify-between px-2 py-1'>
										<Avatar className='h-8 w-8'>
											<AvatarImage src={user?.picture} alt={user?.name} />
											<AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
										</Avatar>
										<Button variant='ghost' size='sm' onClick={handleLogout}>
											Logout
										</Button>
									</div>
									<DropdownMenuSeparator />
								</>
							) : (
								<>
									<Link
										to='/login'
										className='block px-4 py-2 text-sm text-foreground hover:text-primary'
									>
										Login / Register
									</Link>
									<DropdownMenuSeparator />
								</>
							)}
							{filteredNavLinks().map(({ label, href }) => (
								<Link
									key={href}
									to={href}
									className='block px-4 py-2 text-sm text-foreground hover:text-primary'
								>
									{label}
								</Link>
							))}
							<DropdownMenuSeparator />
							<ModeToggle />
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	)
}

export default Header

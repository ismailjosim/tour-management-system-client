import { Bell, Pencil } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface DashboardHeaderProps {
	name: string
	role: string
	avatarUrl?: string
	notificationCount?: number
}

export function DashboardHeader({
	name,
	role,
	avatarUrl,
	notificationCount = 3,
}: DashboardHeaderProps) {
	const initials = name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase()

	const today = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	const hour = new Date().getHours()
	const greeting =
		hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

	return (
		<>
			{/* Top bar */}
			<header className='sticky top-0 z-10 bg-[#16181f]/95 backdrop-blur border-b border-[#2a2d35] px-6 py-3 flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<Avatar className='w-9 h-9 border-2 border-teal-600'>
						{avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
						<AvatarFallback className='bg-teal-700 text-white text-sm font-bold'>
							{initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className='text-sm font-semibold text-white leading-tight'>
							{name}
						</p>
						<p className='text-xs text-zinc-500 capitalize'>{role}</p>
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<Button
						variant='ghost'
						size='icon'
						className='relative text-zinc-400 hover:text-white w-9 h-9'
					>
						<Bell className='w-4 h-4' />
						{notificationCount > 0 && (
							<Badge className='absolute -top-0.5 -right-0.5 w-4 h-4 p-0 flex items-center justify-center text-[10px] bg-teal-600 border-0'>
								{notificationCount}
							</Badge>
						)}
					</Button>
					<Button
						size='sm'
						variant='outline'
						className='border-[#2a2d35] bg-[#252830] text-zinc-300 hover:text-white hover:bg-[#2a2d37] text-xs gap-1.5 h-8'
					>
						<Pencil className='w-3 h-3' />
						Edit profile
					</Button>
				</div>
			</header>

			{/* Page title */}
			<div className='px-6 pt-6 pb-2'>
				<h1 className='text-2xl font-bold text-white tracking-tight'>
					{greeting}, {name.split(' ')[0]} 👋
				</h1>
				<p className='text-sm text-zinc-500 mt-0.5'>
					Here's what's happening with your tours today — {today}
				</p>
			</div>
		</>
	)
}

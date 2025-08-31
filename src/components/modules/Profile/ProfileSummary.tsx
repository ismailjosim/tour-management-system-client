/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, BadgeCheck, ShieldAlert } from 'lucide-react'

const getInitials = (name: string) =>
	name
		.split(' ')
		.map((w) => w[0])
		.join('')
		.toUpperCase()

const getRoleColor = (role: string) => {
	switch (role) {
		case 'ADMIN':
			return 'bg-destructive/10 text-destructive hover:bg-destructive/20'
		case 'MANAGER':
			return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
		case 'USER':
			return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
		default:
			return 'bg-muted text-foreground'
	}
}

const ProfileSummary = ({ userData }: { userData: any }) => {
	return (
		<Card className='shadow-lg border'>
			<CardContent className='pt-6 text-center space-y-4'>
				{/* Avatar */}
				<div className='relative w-24 h-24 mx-auto'>
					<Avatar className='w-24 h-24'>
						<AvatarImage src={userData.picture} />
						<AvatarFallback className='bg-primary text-white text-xl font-bold'>
							{getInitials(userData.name)}
						</AvatarFallback>
					</Avatar>

					{/* Status */}
					<div className='absolute -top-1 -right-1 bg-background rounded-full p-1 shadow'>
						{userData.isVerified ? (
							<BadgeCheck className='w-6 h-6 text-primary' />
						) : (
							<ShieldAlert className='w-6 h-6 text-destructive' />
						)}
					</div>
				</div>

				{/* Info */}
				<div>
					<h2 className='text-xl font-bold'>{userData.name}</h2>
					<p className='text-muted-foreground text-sm mb-3'>{userData.email}</p>

					{/* Role */}
					<div
						className={`flex items-center px-4 py-2 rounded-full font-semibold text-sm justify-center ${getRoleColor(
							userData.role,
						)}`}
					>
						<Shield className='w-5 h-5 mr-2' />
						<span>{userData.role}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default ProfileSummary

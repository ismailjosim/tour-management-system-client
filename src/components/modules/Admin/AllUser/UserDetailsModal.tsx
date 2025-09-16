import { format } from 'date-fns'
import {
	Phone,
	MapPin,
	Mail,
	Calendar,
	Shield,
	CheckCircle,
	XCircle,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import type { ReactNode } from 'react'
import type { IUser, IAuth, IsActive, Role } from '@/types/auth.type'

interface UserDetailsModalProps {
	user: IUser
	children: ReactNode
}

const UserDetailsModal = ({ user, children }: UserDetailsModalProps) => {
	const getStatusBadgeVariant = (status?: IsActive) => {
		switch (status) {
			case 'ACTIVE':
				return 'default'
			case 'INACTIVE':
				return 'secondary'
			case 'BLOCKED':
				return 'destructive'
			default:
				return 'outline'
		}
	}

	const getRoleBadgeVariant = (role?: Role) => {
		switch (role) {
			case 'ADMIN':
			case 'SUPER_ADMIN':
				return 'destructive'
			case 'GUIDE':
				return 'default'
			case 'USER':
				return 'secondary'
			default:
				return 'outline'
		}
	}

	const formatAuthProviders = (auths?: IAuth[]) => {
		if (!auths || auths.length === 0) return 'Email/Password'
		return auths.map((auth) => auth.provider).join(', ')
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-3'>
						<Avatar className='h-12 w-12'>
							{user.picture ? (
								<AvatarImage src={user.picture} alt={user.name ?? 'User'} />
							) : (
								<AvatarFallback className='text-lg'>
									{user.name?.charAt(0)?.toUpperCase() ?? 'U'}
								</AvatarFallback>
							)}
						</Avatar>
						<div>
							<div className='text-xl font-semibold'>
								{user.name ?? 'Unknown User'}
							</div>
							<div className='text-sm text-muted-foreground font-normal'>
								{user.email}
							</div>
						</div>
					</DialogTitle>
					<DialogDescription>
						Complete user information and account details
					</DialogDescription>
				</DialogHeader>

				<div className='space-y-6'>
					{/* Status and Role Section */}
					<div className='flex flex-wrap gap-3'>
						<Badge
							variant={getStatusBadgeVariant(user.isActive)}
							className='capitalize'
						>
							{user.isActive === 'ACTIVE' ? (
								<CheckCircle className='h-3 w-3 mr-1' />
							) : (
								<XCircle className='h-3 w-3 mr-1' />
							)}
							{user.isActive?.toLowerCase() ?? 'inactive'}
						</Badge>
						{user.isVerified && (
							<Badge
								variant='outline'
								className='text-green-600 border-green-600'
							>
								<CheckCircle className='h-3 w-3 mr-1' />
								Verified
							</Badge>
						)}
						{user.isDeleted && <Badge variant='destructive'>Deleted</Badge>}
						{user.role && (
							<Badge
								variant={getRoleBadgeVariant(user.role)}
								className='capitalize'
							>
								{user.role.toLowerCase()}
							</Badge>
						)}
					</div>

					<Separator />

					{/* Contact Information */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Contact Information</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='flex items-center gap-3'>
								<Mail className='h-4 w-4 text-muted-foreground' />
								<div>
									<div className='font-medium'>Email</div>
									<div className='text-sm text-muted-foreground'>
										{user.email}
									</div>
								</div>
							</div>
							{user.phone && (
								<div className='flex items-center gap-3'>
									<Phone className='h-4 w-4 text-muted-foreground' />
									<div>
										<div className='font-medium'>Phone</div>
										<div className='text-sm text-muted-foreground'>
											{user.phone}
										</div>
									</div>
								</div>
							)}
							{user.address && (
								<div className='flex items-center gap-3 md:col-span-2'>
									<MapPin className='h-4 w-4 text-muted-foreground' />
									<div>
										<div className='font-medium'>Address</div>
										<div className='text-sm text-muted-foreground'>
											{user.address}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					<Separator />

					{/* Account Statistics */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Account Statistics</h3>
						<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
							{/* {user.booking && user.booking.length > 0 && (
								<div className='text-center p-4 bg-muted/50 rounded-lg'>
									<BookOpen className='h-6 w-6 mx-auto mb-2 text-blue-600' />
									<div className='text-2xl font-bold'>
										{user.booking.length}
									</div>
									<div className='text-sm text-muted-foreground'>Bookings</div>
								</div>
							)}
							{user.guides && user.guides.length > 0 && (
								<div className='text-center p-4 bg-muted/50 rounded-lg'>
									<Users className='h-6 w-6 mx-auto mb-2 text-green-600' />
									<div className='text-2xl font-bold'>{user.guides.length}</div>
									<div className='text-sm text-muted-foreground'>Guides</div>
								</div>
							)} */}
							{user.createdAt && (
								<div className='text-center p-4 bg-muted/50 rounded-lg'>
									<Calendar className='h-6 w-6 mx-auto mb-2 text-purple-600' />
									<div className='text-sm font-medium'>
										{format(new Date(user.createdAt), 'MMM dd, yyyy')}
									</div>
									<div className='text-sm text-muted-foreground'>
										Joined Date
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Authentication Methods */}
					{user.auths && user.auths.length > 0 && (
						<>
							<Separator />
							<div className='space-y-4'>
								<h3 className='text-lg font-semibold'>
									Authentication Methods
								</h3>
								<div className='space-y-2'>
									<div className='flex items-center justify-between p-3 bg-muted/50 rounded-lg'>
										<div className='flex items-center gap-2'>
											<Shield className='h-4 w-4 text-muted-foreground' />
											<span className='font-medium'>Login Methods</span>
										</div>
										<Badge variant='outline'>
											{formatAuthProviders(user.auths)}
										</Badge>
									</div>
									{user.auths.map((auth, index) => (
										<div
											key={index}
											className='flex items-center justify-between p-2 pl-8 text-sm'
										>
											<span className='capitalize'>{auth.provider}</span>
											<span className='text-muted-foreground font-mono text-xs'>
												{auth.providerId}
											</span>
										</div>
									))}
								</div>
							</div>
						</>
					)}

					{/* Account Status Details */}
					<Separator />
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Account Status</h3>
						<div className='grid grid-cols-2 gap-4 text-sm'>
							<div className='flex justify-between'>
								<span className='text-muted-foreground'>Account Status:</span>
								<span className='font-medium capitalize'>
									{user.isActive?.toLowerCase() ?? 'inactive'}
								</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-muted-foreground'>Email Verified:</span>
								<span className='font-medium'>
									{user.isVerified ? 'Yes' : 'No'}
								</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-muted-foreground'>Account Deleted:</span>
								<span className='font-medium'>
									{user.isDeleted ? 'Yes' : 'No'}
								</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-muted-foreground'>User ID:</span>
								<span className='font-mono text-xs'>{user._id}</span>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default UserDetailsModal

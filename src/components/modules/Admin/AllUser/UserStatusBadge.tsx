import { Badge } from '@/components/ui/badge'
import type { IUser, IsActive } from '@/types/auth.type'

const UserStatusBadge = ({ user }: { user: IUser }) => {
	const getStatusVariant = (status: IsActive) => {
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

	return (
		<div className='flex flex-col gap-1'>
			<Badge
				variant={getStatusVariant(user.isActive || 'INACTIVE')}
				className='capitalize w-fit'
			>
				{user.isActive || 'inactive'}
			</Badge>
			{user.isVerified ? (
				<Badge variant='outline' className='text-xs w-fit'>
					Verified
				</Badge>
			) : (
				<Badge
					variant='outline'
					className='text-xs w-fit text-destructive border-destructive'
				>
					Not Verified
				</Badge>
			)}
			{user.isDeleted && (
				<Badge variant='destructive' className='text-xs w-fit'>
					Deleted
				</Badge>
			)}
		</div>
	)
}

export default UserStatusBadge

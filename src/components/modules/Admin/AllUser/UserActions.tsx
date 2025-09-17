/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUpdateUserInfoViaAdminMutation } from '@/redux/features/auth/auth.api'
import {
	EyeIcon,
	Trash2,
	UserCog,
	Shield,
	ShieldOff,
	UserCheck,
	CheckCircle,
	XCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import type { IUser, Role, IsActive } from '@/types/auth.type'
import UserDetailsModal from '@/components/modules/Admin/AllUser/UserDetailsModal'

interface UserActionsProps {
	user: IUser
}

const UserActions = ({ user }: UserActionsProps) => {
	const [updateUserInfoViaAdmin, { isLoading: isUpdating }] =
		useUpdateUserInfoViaAdminMutation()

	// Role update
	const handleRoleUpdate = async (newRole: Role) => {
		try {
			const result = await updateUserInfoViaAdmin({
				userId: user._id,
				role: newRole,
			}).unwrap()
			if (result.success && result.statusCode === 201) {
				toast.success(`User role updated to ${newRole} successfully`)
			}
		} catch (error: any) {
			toast.error(error?.data?.message || 'Failed to update user role')
		}
	}

	// Active status
	const handleActiveStatusUpdate = async (isActive: IsActive) => {
		try {
			const result = await updateUserInfoViaAdmin({
				userId: user._id,
				isActive,
			}).unwrap()
			if (result.success && result.statusCode === 201) {
				const statusText =
					isActive === 'ACTIVE'
						? 'activated'
						: isActive === 'BLOCKED'
						? 'blocked'
						: 'deactivated'
				toast.success(`User ${statusText} successfully`)
			}
		} catch (error: any) {
			toast.error(error?.data?.message || 'Failed to update user status')
		}
	}

	// Verification
	const handleVerificationUpdate = async (isVerified: boolean) => {
		try {
			const result = await updateUserInfoViaAdmin({
				userId: user._id,
				isVerified,
			}).unwrap()
			if (result.success && result.statusCode === 201) {
				toast.success(
					`User ${isVerified ? 'verified' : 'unverified'} successfully`,
				)
			}
		} catch (error: any) {
			toast.error(
				error?.data?.message || 'Failed to update verification status',
			)
		}
	}

	// Delete
	const handleDeleteStatusUpdate = async (isDeleted: boolean) => {
		try {
			const result = await updateUserInfoViaAdmin({
				userId: user._id,
				isDeleted,
			}).unwrap()
			if (result.success && result.statusCode === 201) {
				toast.success(
					`User ${isDeleted ? 'marked as deleted' : 'restored'} successfully`,
				)
			}
		} catch (error: any) {
			toast.error(error?.data?.message || 'Failed to update user delete status')
		}
	}

	return (
		<div className='flex items-center justify-end gap-2'>
			<UserDetailsModal user={user}>
				<Button size='sm' variant='outline'>
					<EyeIcon className='h-4 w-4' />
				</Button>
			</UserDetailsModal>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size='sm' variant='outline' disabled={isUpdating}>
						<UserCog className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end' className='w-56'>
					{/* Role Management */}
					<DropdownMenuItem className='text-xs font-medium text-muted-foreground px-2 py-1'>
						ROLE MANAGEMENT
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleRoleUpdate('USER')}
						disabled={user.role === 'USER'}
					>
						<UserCheck className='h-4 w-4 mr-2' />
						Set as User
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleRoleUpdate('GUIDE')}
						disabled={user.role === 'GUIDE'}
					>
						<UserCog className='h-4 w-4 mr-2' />
						Set as Guide
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleRoleUpdate('ADMIN')}
						disabled={user.role === 'ADMIN'}
					>
						<Shield className='h-4 w-4 mr-2' />
						Set as Admin
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					{/* Status Management */}
					<DropdownMenuItem className='text-xs font-medium text-muted-foreground px-2 py-1'>
						STATUS MANAGEMENT
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleActiveStatusUpdate('ACTIVE')}
						disabled={user.isActive === 'ACTIVE'}
					>
						<CheckCircle className='h-4 w-4 mr-2 text-green-500' />
						Activate User
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleActiveStatusUpdate('INACTIVE')}
						disabled={user.isActive === 'INACTIVE'}
					>
						<XCircle className='h-4 w-4 mr-2 text-gray-500' />
						Deactivate User
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleActiveStatusUpdate('BLOCKED')}
						disabled={user.isActive === 'BLOCKED'}
					>
						<ShieldOff className='h-4 w-4 mr-2 text-red-500' />
						Block User
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					{/* Verification */}
					<DropdownMenuItem className='text-xs font-medium text-muted-foreground px-2 py-1'>
						VERIFICATION
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleVerificationUpdate(!user.isVerified)}
					>
						{user.isVerified ? (
							<>
								<XCircle className='h-4 w-4 mr-2 text-red-500' />
								Unverify User
							</>
						) : (
							<>
								<CheckCircle className='h-4 w-4 mr-2 text-green-500' />
								Verify User
							</>
						)}
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					{/* Delete */}
					<DropdownMenuItem className='text-xs font-medium text-muted-foreground px-2 py-1'>
						DELETE MANAGEMENT
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleDeleteStatusUpdate(!user.isDeleted)}
						className={user.isDeleted ? 'text-green-600' : 'text-red-600'}
					>
						{user.isDeleted ? (
							<>
								<CheckCircle className='h-4 w-4 mr-2' />
								Restore User
							</>
						) : (
							<>
								<Trash2 className='h-4 w-4 mr-2' />
								Mark as Deleted
							</>
						)}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default UserActions

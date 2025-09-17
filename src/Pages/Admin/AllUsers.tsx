/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	useGetAllUsersQuery,
	useUpdateUserInfoViaAdminMutation,
} from '@/redux/features/auth/auth.api'
import { format } from 'date-fns'
import {
	EyeIcon,
	Trash2,
	UserCog,
	Shield,
	ShieldOff,
	UserCheck,
	CheckCircle,
	XCircle,
	SquarePen,
} from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import usePagination from '@/hooks/usePagination'

import DataTable from '@/utils/DataTable'
import DataPagination from '@/utils/DataPagination'
import type { IsActive, IUser, Role } from '@/types/auth.type'
import UserDetailsModal from '@/components/modules/Admin/AllUser/UserDetailsModal'

const AllUsers = () => {
	const { currentPage, limit, handlePageChange, handleLimitChange } =
		usePagination()

	const { data, isLoading } = useGetAllUsersQuery({
		page: currentPage,
		limit,
	})

	const [updateUserInfoViaAdmin, { isLoading: isUpdating }] =
		useUpdateUserInfoViaAdminMutation()

	//* Update user role
	const handleRoleUpdate = async (userId: string, newRole: Role) => {
		try {
			const result = await updateUserInfoViaAdmin({
				userId,
				role: newRole,
			}).unwrap()
			console.log(result)

			toast.success(`User role updated to ${newRole} successfully`)
		} catch (error: any) {
			toast.error(error?.data?.message || 'Failed to update user role')
		}
	}

	// Update user active status
	const handleActiveStatusUpdate = async (
		userId: string,
		isActive: IsActive,
	) => {
		try {
			const result = await updateUserInfoViaAdmin({
				userId,
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

	// Update user deleted status
	const handleDeleteStatusUpdate = async (
		userId: string,
		isDeleted: boolean,
	) => {
		try {
			const result = await updateUserInfoViaAdmin({
				userId,
				isDeleted,
			}).unwrap()
			if (result.success && result.statusCode === 201) {
				const statusText = isDeleted ? 'marked as deleted' : 'restored'
				toast.success(`User ${statusText} successfully`)
			}
		} catch (error: any) {
			toast.error(error?.data?.message || 'Failed to update user delete status')
		}
	}

	// Update user verification status
	const handleVerificationUpdate = async (
		userId: string,
		isVerified: boolean,
	) => {
		try {
			const result = await updateUserInfoViaAdmin({
				userId,
				isVerified,
			}).unwrap()
			console.log(result)

			if (result.success && result.statusCode === 201) {
				const statusText = isVerified ? 'verified' : 'unverified'
				toast.success(`User ${statusText} successfully`)
			}
		} catch (error: any) {
			toast.error(
				error?.data?.message || 'Failed to update verification status',
			)
		}
	}

	const getRoleBadgeVariant = (role: Role) => {
		switch (role) {
			case 'ADMIN':
				return 'destructive'
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

	const getStatusBadgeVariant = (status: IsActive) => {
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

	const columns = [
		{
			key: 'picture',
			header: 'Avatar',
			className: 'font-medium hidden sm:table-cell',
			render: (picture: string | undefined, item: IUser) => (
				<div className='font-medium'>
					<Avatar className='h-10 w-10'>
						{picture ? (
							<AvatarImage src={picture} alt={item.name} />
						) : (
							<AvatarFallback>
								{item.name?.charAt(0)?.toUpperCase() ?? 'U'}
							</AvatarFallback>
						)}
					</Avatar>
				</div>
			),
		},
		{
			key: 'name',
			header: 'Name',
			className: 'font-medium',
			render: (name: string, item: IUser) => (
				<div className='font-medium'>
					<div className='max-w-[150px] truncate' title={name}>
						{name}
					</div>
					<div
						className='text-sm text-muted-foreground truncate max-w-[150px] hidden sm:table-cell'
						title={item.email}
					>
						{item.email}
					</div>
				</div>
			),
		},
		{
			key: 'role',
			header: 'Role',
			className: 'font-medium',
			render: (role: Role) => (
				<Badge variant={getRoleBadgeVariant(role)} className='capitalize'>
					{role}
				</Badge>
			),
		},
		{
			key: 'isActive',
			header: 'Status',
			className: 'font-medium hidden sm:table-cell',
			render: (isActive: IsActive | undefined, item: IUser) => (
				<div className='hidden sm:table-cell'>
					<div className='flex flex-col justify-center gap-1'>
						<Badge
							variant={getStatusBadgeVariant(isActive || 'INACTIVE')}
							className='capitalize w-fit'
						>
							{isActive || 'inactive'}
						</Badge>
						{item.isVerified ? (
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
						{item.isDeleted && (
							<Badge variant='destructive' className='text-xs w-fit'>
								Deleted
							</Badge>
						)}
					</div>
				</div>
			),
		},
		{
			key: 'phone',
			header: 'Contact',
			className: 'hidden md:table-cell',
			render: (phone: string | undefined, item: IUser) => (
				<div className='hidden md:table-cell'>
					{item.address && item.phone ? (
						<div className='text-sm'>
							{phone && (
								<div className='truncate' title={phone}>
									{phone}
								</div>
							)}
							{item.address && (
								<div
									className='text-muted-foreground truncate'
									title={item.address}
								>
									{item.address}
								</div>
							)}
						</div>
					) : (
						<div
							className='text-muted-foreground truncate'
							title='Info Not Found'
						>
							Info Not Found
						</div>
					)}
				</div>
			),
		},

		{
			key: 'createdAt',
			header: 'Joined',
			className: 'hidden xl:table-cell',
			render: (createdAt: string | undefined) => (
				<div className='hidden xl:table-cell'>
					{createdAt && (
						<div className='text-sm text-muted-foreground'>
							{format(new Date(createdAt), 'MMM dd, yyyy')}
						</div>
					)}
				</div>
			),
		},
		{
			key: 'actions',
			header: 'Actions',
			className: 'text-right',
			render: (_: any, item: IUser) => {
				const isSuperAdmin = item.role === 'SUPER_ADMIN'

				return (
					<div className='text-right'>
						<div className='flex items-center justify-end gap-2'>
							{/* View Details (always enabled) */}
							<UserDetailsModal
								user={item}
								getRoleBadgeVariant={getRoleBadgeVariant}
								getStatusBadgeVariant={getStatusBadgeVariant}
							>
								<Button size='sm' variant='outline'>
									<EyeIcon className='h-4 w-4' />
								</Button>
							</UserDetailsModal>

							{/* User Management Dropdown */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										size='sm'
										variant='outline'
										disabled={isUpdating || isSuperAdmin}
									>
										<SquarePen className='h-4 w-4' />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end' className='w-56'>
									{/* Role Management */}
									<DropdownMenuItem
										disabled
										className='text-xs font-medium text-muted-foreground px-2 py-1'
									>
										ROLE MANAGEMENT
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => handleRoleUpdate(item._id, 'USER')}
										disabled={isSuperAdmin || item.role === 'USER'}
									>
										<UserCheck className='h-4 w-4 mr-2' />
										Set as User
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => handleRoleUpdate(item._id, 'GUIDE')}
										disabled={isSuperAdmin || item.role === 'GUIDE'}
									>
										<UserCog className='h-4 w-4 mr-2' />
										Set as Guide
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => handleRoleUpdate(item._id, 'ADMIN')}
										disabled={isSuperAdmin || item.role === 'ADMIN'}
									>
										<Shield className='h-4 w-4 mr-2' />
										Set as Admin
									</DropdownMenuItem>

									<DropdownMenuSeparator />

									{/* Status Management */}
									<DropdownMenuItem
										disabled
										className='text-xs font-medium text-muted-foreground px-2 py-1'
									>
										STATUS MANAGEMENT
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => handleActiveStatusUpdate(item._id, 'ACTIVE')}
										disabled={isSuperAdmin || item.isActive === 'ACTIVE'}
									>
										<CheckCircle className='h-4 w-4 mr-2 text-green-500' />
										Activate User
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() =>
											handleActiveStatusUpdate(item._id, 'INACTIVE')
										}
										disabled={isSuperAdmin || item.isActive === 'INACTIVE'}
									>
										<XCircle className='h-4 w-4 mr-2 text-gray-500' />
										Deactivate User
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() =>
											handleActiveStatusUpdate(item._id, 'BLOCKED')
										}
										disabled={isSuperAdmin || item.isActive === 'BLOCKED'}
									>
										<ShieldOff className='h-4 w-4 mr-2 text-red-500' />
										Block User
									</DropdownMenuItem>

									<DropdownMenuSeparator />

									{/* Verification */}
									<DropdownMenuItem
										disabled
										className='text-xs font-medium text-muted-foreground px-2 py-1'
									>
										VERIFICATION
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() =>
											handleVerificationUpdate(item._id, !item.isVerified)
										}
										disabled={isSuperAdmin}
									>
										{item.isVerified ? (
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

									{/* Delete Management */}
									<DropdownMenuItem
										disabled
										className='text-xs font-medium text-muted-foreground px-2 py-1'
									>
										DELETE MANAGEMENT
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() =>
											handleDeleteStatusUpdate(item._id, !item.isDeleted)
										}
										className={
											item.isDeleted ? 'text-green-600' : 'text-red-600'
										}
										disabled={isSuperAdmin}
									>
										{item.isDeleted ? (
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
					</div>
				)
			},
		},
	]

	return (
		<div className='container mx-auto'>
			<div className='flex justify-between items-center mb-5'>
				<div>
					<h3 className='text-2xl font-semibold'>All Users</h3>
					<p className='text-muted-foreground'>
						Manage all registered users in the system
					</p>
				</div>
			</div>

			<DataTable
				columns={columns}
				data={data?.data || []}
				isLoading={isLoading}
				emptyMessage='No users found'
			/>

			{data?.meta && (
				<DataPagination
					currentPage={currentPage}
					totalPage={data.meta.totalPage}
					limit={limit}
					onPageChange={handlePageChange}
					onLimitChange={handleLimitChange}
				/>
			)}
		</div>
	)
}

export default AllUsers

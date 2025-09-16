/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllUsersQuery } from '@/redux/features/auth/auth.api'
import { format } from 'date-fns'
import { Edit, EyeIcon, Trash2 } from 'lucide-react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

import DeleteConfirmation from '@/components/DeleteConfirmation'

import usePagination from '@/hooks/usePagination'

import DataTable from '@/utils/DataTable'
import DataPagination from '@/utils/DataPagination'
import type { IsActive, IUser, Role } from '@/types/auth.type'
import UserDetailsModal from '../../components/modules/Admin/AllUser/UserDetailsModal'

const AllUsers = () => {
	const { currentPage, limit, handlePageChange, handleLimitChange } =
		usePagination()

	const { data, isLoading } = useGetAllUsersQuery({
		page: currentPage,
		limit,
	})

	const handleDelete = async (
		id: string,
	): Promise<{ success: boolean; message: string }> => {
		console.log(id)

		// Example mock response (you probably call API here)
		return {
			success: true,
			message: `User with id ${id} deleted successfully`,
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
			className: 'font-medium',
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
						className='text-sm text-muted-foreground truncate max-w-[150px]'
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
					<div className='flex flex-col gap-1'>
						<Badge
							variant={getStatusBadgeVariant(isActive || 'INACTIVE')}
							className='capitalize w-fit'
						>
							{isActive || 'inactive'}
						</Badge>
						{item.isVerified && (
							<Badge variant='outline' className='text-xs w-fit'>
								Verified
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
					<div className='text-sm'>
						{phone && (
							<div className='truncate max-w-[120px]' title={phone}>
								{phone}
							</div>
						)}
						{item.address && (
							<div
								className='text-muted-foreground truncate max-w-[120px]'
								title={item.address}
							>
								{item.address}
							</div>
						)}
					</div>
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
			render: (_: any, item: IUser) => (
				<div className='text-right'>
					<div className='flex items-center justify-end gap-2'>
						<UserDetailsModal user={item}>
							<Button size='sm' variant='outline'>
								<EyeIcon className='h-4 w-4' />
							</Button>
						</UserDetailsModal>
						<Button size='sm' variant='outline' asChild>
							<Link to={`/admin/edit-user/${item._id}`}>
								<Edit className='h-4 w-4' />
							</Link>
						</Button>
						<DeleteConfirmation onConfirm={() => handleDelete(item?._id)}>
							<Button size='sm' variant='destructive'>
								<Trash2 className='h-4 w-4' />
							</Button>
						</DeleteConfirmation>
					</div>
				</div>
			),
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

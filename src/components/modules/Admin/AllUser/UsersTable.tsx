/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import DataTable from '@/utils/DataTable'
import DataPagination from '@/utils/DataPagination'
import type { IUser, Role, IsActive } from '@/types/auth.type'
import UserRoleBadge from './UserRoleBadge'
import UserStatusBadge from './UserStatusBadge'
import UserActions from './UserActions'

interface UsersTableProps {
	users: IUser[]
	isLoading: boolean
	meta?: { totalPage: number }
	currentPage: number
	limit: number
	onPageChange: (page: number) => void
	onLimitChange: (limit: number) => void
}

const UsersTable = ({
	users,
	isLoading,
	meta,
	currentPage,
	limit,
	onPageChange,
	onLimitChange,
}: UsersTableProps) => {
	const columns = [
		{
			key: 'picture',
			header: 'Avatar',
			render: (picture: string | undefined, item: IUser) => (
				<Avatar className='h-10 w-10'>
					{picture ? (
						<AvatarImage src={picture} alt={item.name} />
					) : (
						<AvatarFallback>
							{item.name?.charAt(0)?.toUpperCase() ?? 'U'}
						</AvatarFallback>
					)}
				</Avatar>
			),
		},
		{
			key: 'name',
			header: 'Name',
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
			render: (role: Role) => <UserRoleBadge role={role} />,
		},
		{
			key: 'isActive',
			header: 'Status',
			className: 'hidden sm:table-cell',
			render: (_: IsActive, item: IUser) => <UserStatusBadge user={item} />,
		},
		{
			key: 'phone',
			header: 'Contact',
			className: 'hidden md:table-cell',
			render: (phone: string | undefined, item: IUser) => (
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
			),
		},
		{
			key: 'createdAt',
			header: 'Joined',
			className: 'hidden xl:table-cell',
			render: (createdAt: string | undefined) =>
				createdAt && (
					<div className='text-sm text-muted-foreground'>
						{format(new Date(createdAt), 'MMM dd, yyyy')}
					</div>
				),
		},
		{
			key: 'actions',
			header: 'Actions',
			render: (_: any, item: IUser) => <UserActions user={item} />,
		},
	]

	return (
		<>
			<DataTable
				columns={columns}
				data={users}
				isLoading={isLoading}
				emptyMessage='No users found'
			/>

			{meta && (
				<DataPagination
					currentPage={currentPage}
					totalPage={meta.totalPage}
					limit={limit}
					onPageChange={onPageChange}
					onLimitChange={onLimitChange}
				/>
			)}
		</>
	)
}

export default UsersTable

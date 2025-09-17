/* eslint-disable @typescript-eslint/no-explicit-any */
import AddDivisionModal from '@/components/modules/Admin/Division/AddDivisionModal'
import {
	useGetDivisionsQuery,
	useRemoveDivisionMutation,
} from '@/redux/features/division/division.api'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Trash2, Edit } from 'lucide-react'
import DataTable from '@/utils/DataTable'
import DataPagination from '@/utils/DataPagination'
import DeleteConfirmation from '@/components/DeleteConfirmation'
import usePagination from '@/hooks/usePagination'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Division = {
	_id: string
	name: string
	description: string
	thumbnail?: string
	createdAt: string
	updatedAt: string
}

const Divisions = () => {
	const { currentPage, limit, handlePageChange, handleLimitChange } =
		usePagination()
	const { data, isLoading } = useGetDivisionsQuery({ page: currentPage, limit })
	const [removeDivision] = useRemoveDivisionMutation()

	const handleDelete = async (id: string) => removeDivision(id).unwrap()

	const columns = [
		{
			key: 'thumbnail',
			header: '',
			className: 'w-[60px]',
			render: (_: any, item: Division) => (
				<Avatar className='rounded-md'>
					{item.thumbnail ? (
						<AvatarImage src={item.thumbnail} alt={item.name} />
					) : (
						<AvatarFallback>{item.name?.charAt(0)}</AvatarFallback>
					)}
				</Avatar>
			),
		},
		{
			key: 'name',
			header: 'Name',
			className: 'font-medium',
			render: (name: string) => <div className='font-medium'>{name}</div>,
		},
		{
			key: 'description',
			header: 'Description',
			className: 'font-medium hidden sm:table-cell',
			render: (description: string) => {
				const words = description.split(' ').slice(0, 5).join(' ')
				return (
					<div className='font-medium'>
						{words}
						{description.split(' ').length > 10 ? '...' : ''}
					</div>
				)
			},
		},
		{
			key: 'createdAt',
			header: 'Created At',
			className: 'font-medium hidden sm:table-cell',
			render: (createdAt: string) => (
				<div className='font-medium hidden sm:table-cell'>
					{format(new Date(createdAt), 'dd-MMM-yyyy hh:mma')}
				</div>
			),
		},
		{
			key: 'updatedAt',
			header: 'Last Modified',
			className: 'font-medium hidden sm:table-cell',
			render: (updatedAt: string) => (
				<div className='font-medium hidden sm:table-cell'>
					{format(new Date(updatedAt), 'dd-MMM-yyyy hh:mma')}
				</div>
			),
		},
		{
			key: 'actions',
			header: 'Actions',
			className: 'text-right',
			render: (_: any, item: Division) => (
				<div className='flex justify-end gap-2'>
					<AddDivisionModal
						divisionId={item._id}
						initialData={{
							name: item.name,
							description: item.description,
							thumbnail: item.thumbnail,
						}}
						triggerButton={
							<Button size='sm' variant='outline'>
								<Edit className='h-4 w-4' />
							</Button>
						}
					/>
					<DeleteConfirmation onConfirm={() => handleDelete(item._id)}>
						<Button size='sm' variant='destructive'>
							<Trash2 className='h-4 w-4' />
						</Button>
					</DeleteConfirmation>
				</div>
			),
		},
	]

	return (
		<div className='container mx-auto'>
			<div className='flex justify-between items-center mb-5'>
				<h2 className='text-2xl font-semibold'>Divisions</h2>
				<AddDivisionModal />
			</div>

			<DataTable
				columns={columns}
				data={data?.data || []}
				isLoading={isLoading}
				emptyMessage='No divisions found'
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

export default Divisions

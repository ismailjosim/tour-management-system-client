/* eslint-disable @typescript-eslint/no-explicit-any */

import { Edit, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import DeleteConfirmation from '@/components/DeleteConfirmation'
import usePagination from '@/hooks/usePagination'
import {
	useGetTourTypesQuery,
	useRemoveTourTypeMutation,
} from '@/redux/features/Tour/tour.api'
import DataTable from '@/utils/DataTable'
import DataPagination from '@/utils/DataPagination'
import AddTourModal from '@/components/modules/Admin/TourType/AddTourModal'
import { format } from 'date-fns'

type TourType = {
	_id: string
	name: string
	createdAt: string
}

const TourTypes = () => {
	const { currentPage, limit, handlePageChange, handleLimitChange } =
		usePagination()

	const { data, isLoading } = useGetTourTypesQuery({
		page: currentPage,
		limit,
	})

	const [removeTourType] = useRemoveTourTypeMutation()

	const handleDelete = async (id: string) => {
		return removeTourType(id).unwrap()
	}

	const columns = [
		{
			key: 'name',
			header: 'Name',
			className: 'font-medium',
			render: (name: string) => <div className='font-medium'>{name}</div>,
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
			render: (_: any, item: TourType) => (
				<div className='flex justify-end gap-2'>
					{/* Edit button opens AddTourModal in edit mode */}
					<AddTourModal
						tourTypeId={item._id}
						initialName={item.name}
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
				<h2 className='text-2xl font-semibold'>Tour Types</h2>
				<AddTourModal />
			</div>

			<DataTable
				columns={columns}
				data={data?.data || []}
				isLoading={isLoading}
				emptyMessage='No tour types found'
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

export default TourTypes

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { EyeIcon } from 'lucide-react'
import { format } from 'date-fns'
import {
	useApproveOrRejectGuideMutation,
	useGetAllGuidesQuery,
} from '@/redux/features/guide/guide.api'
import usePagination from '@/hooks/usePagination'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import DataTable from '@/utils/DataTable'
import DataPagination from '@/utils/DataPagination'

import { toast } from 'sonner'
import GuideModal from '../../components/modules/Admin/Guide/GuideModal'

interface Guide {
	_id: string
	user: {
		name: string
		email: string
		address: string
		phone: string
		picture: string
	}
	division: {
		name: string
		thumbnail: string
		description: string
	}
	nidPhoto: string
	status: 'PENDING' | 'APPROVED' | 'REJECTED'
	createdAt: string
}

const GuideRequest = () => {
	const { currentPage, limit, handlePageChange, handleLimitChange } =
		usePagination()
	const { data, isLoading } = useGetAllGuidesQuery({
		page: currentPage,
		limit,
	})
	const [approveOrRejectGuide, { isLoading: isActionLoading }] =
		useApproveOrRejectGuideMutation()

	const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null)

	const handleGuideAction = async (status: 'APPROVED' | 'REJECTED') => {
		if (!selectedGuide) return
		try {
			await approveOrRejectGuide({
				guideId: selectedGuide._id,
				status,
			}).unwrap()
			toast.success(`Guide ${status.toLowerCase()} successfully.`)
			setSelectedGuide(null)
		} catch (err: any) {
			toast.error(err?.data?.message || 'Something went wrong!')
		}
	}

	const columns = [
		{
			key: 'user',
			header: 'Guide',
			className: 'font-medium',
			render: (user: Guide['user']) => (
				<div className='flex items-center gap-3'>
					<Avatar className='rounded-md'>
						<AvatarImage src={user.picture} alt={user.name} />
						<AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
					</Avatar>
					<div>
						<p className='font-medium'>{user.name}</p>
						<p className='text-xs text-muted-foreground'>{user.email}</p>
					</div>
				</div>
			),
		},
		{
			key: 'division',
			header: 'Division',
			render: (division: Guide['division']) => (
				<div className='font-medium'>{division.name}</div>
			),
		},
		{
			key: 'status',
			header: 'Status',
			render: (status: string) => (
				<span
					className={`px-2 py-1 rounded-full text-xs font-semibold ${
						status === 'APPROVED'
							? 'bg-green-100 text-green-700'
							: status === 'REJECTED'
							? 'bg-red-100 text-red-700'
							: 'bg-yellow-100 text-yellow-700'
					}`}
				>
					{status}
				</span>
			),
		},
		{
			key: 'createdAt',
			header: 'Requested At',
			render: (date: string) => (
				<div className='font-medium'>
					{format(new Date(date), 'MMM dd, yyyy')}
				</div>
			),
		},
		{
			key: 'actions',
			header: 'Action',
			className: 'text-right',
			render: (_: any, item: Guide) => (
				<div className='text-right'>
					<Button
						size='sm'
						variant='outline'
						onClick={() => setSelectedGuide(item)}
					>
						<EyeIcon className='h-4 w-4' />
					</Button>
				</div>
			),
		},
	]

	const modalProps = {
		handleGuideAction,
		isActionLoading,
		selectedGuide,
		setSelectedGuide,
	}

	return (
		<div className='container mx-auto'>
			<div className='flex justify-between items-center mb-5'>
				<h3 className='text-2xl font-semibold'>Guide Requests</h3>
			</div>

			<DataTable
				columns={columns}
				data={data?.data || []}
				isLoading={isLoading}
				emptyMessage='No guide requests found'
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

			{/* Modal for guide details */}
			<GuideModal modalProps={modalProps} />
		</div>
	)
}

export default GuideRequest

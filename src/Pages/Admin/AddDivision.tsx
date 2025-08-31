import AddDivisionModal from '@/components/modules/Admin/Division/AddDivisionModal'
import {
	useGetDivisionsQuery,
	useRemoveDivisionMutation,
} from '../../redux/features/division/division.api'
import { useState } from 'react'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import DataLoader from '@/utils/DataLoader'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { format } from 'date-fns'

import DeleteConfirmation from '@/components/DeleteConfirmation'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationEllipsis,
} from '@/components/ui/pagination'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'

const AddDivision = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const { data, isLoading } = useGetDivisionsQuery({ page: currentPage, limit })
	const [removeDivision] = useRemoveDivisionMutation()

	const totalPage = data?.meta?.totalPage || 1

	const handleDelete = async (id: string) => {
		return removeDivision(id).unwrap()
	}
	const handleLimitChange = (value: string) => {
		setLimit(Number(value))
		setCurrentPage(1)
	}

	const getPaginationItems = () => {
		const pageNumbers = []
		const maxVisiblePages = 2

		if (totalPage <= maxVisiblePages + 2) {
			for (let i = 1; i <= totalPage; i++) {
				pageNumbers.push(i)
			}
		} else if (currentPage <= maxVisiblePages) {
			for (let i = 1; i <= maxVisiblePages; i++) {
				pageNumbers.push(i)
			}
			pageNumbers.push('ellipsis')
			pageNumbers.push(totalPage)
		} else if (currentPage > totalPage - maxVisiblePages) {
			pageNumbers.push(1)
			pageNumbers.push('ellipsis')
			for (let i = totalPage - maxVisiblePages + 1; i <= totalPage; i++) {
				pageNumbers.push(i)
			}
		} else {
			pageNumbers.push(1)
			pageNumbers.push('ellipsis')
			for (let i = currentPage - 1; i <= currentPage + 1; i++) {
				pageNumbers.push(i)
			}
			pageNumbers.push('ellipsis')
			pageNumbers.push(totalPage)
		}
		return pageNumbers
	}

	if (isLoading) {
		return <DataLoader />
	}
	return (
		<div className='container mx-auto'>
			<div className='flex justify-between items-center mb-5'>
				<h3>Add Division</h3>
				<AddDivisionModal />
			</div>
			<div className='border border-muted rounded-md'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>
								<Avatar className='rounded '>
									<AvatarFallback>I</AvatarFallback>
								</Avatar>
							</TableHead>
							<TableHead className='w-[100px]'>Name</TableHead>
							<TableHead className='text-center hidden sm:table-cell'>
								createdAt
							</TableHead>
							<TableHead className='text-right'>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.data?.map(
							(item: {
								name: string
								_id: string
								thumbnail: string
								createdAt: string
							}) => (
								<TableRow key={item._id}>
									<TableCell className='font-medium'>
										<Avatar className='rounded-md'>
											{item.thumbnail ? (
												<AvatarImage src={item.thumbnail} alt={item.name} />
											) : (
												<AvatarFallback>
													{item.name?.charAt(0) ?? 'I'}
												</AvatarFallback>
											)}
										</Avatar>
									</TableCell>
									<TableCell className='font-medium'>{item.name}</TableCell>
									<TableCell className='font-medium text-center hidden sm:block'>
										{format(new Date(item.createdAt), 'dd-MMM-yyyy: hh:mma')}
									</TableCell>
									<TableCell className='text-right'>
										<DeleteConfirmation
											onConfirm={() => handleDelete(item._id)}
										>
											<Button size={'sm'}>
												<Trash2 />
											</Button>
										</DeleteConfirmation>
									</TableCell>
								</TableRow>
							),
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-between mt-5'>
				<div className='flex items-center space-x-2'>
					<span className='text-sm text-gray-500'>Items per page:</span>
					<Select
						onValueChange={handleLimitChange}
						defaultValue={String(limit)}
					>
						<SelectTrigger className='w-[80px]'>
							<SelectValue placeholder='Select' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value='5'>5</SelectItem>
								<SelectItem value='10'>10</SelectItem>
								<SelectItem value='20'>20</SelectItem>
								<SelectItem value='50'>50</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				{totalPage > 1 && (
					<div>
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										className={
											currentPage === 1
												? 'pointer-events-none opacity-50'
												: 'cursor-pointer'
										}
										onClick={() => setCurrentPage((prev) => prev - 1)}
									/>
								</PaginationItem>
								{getPaginationItems().map((page, index) => (
									<PaginationItem key={index}>
										{page === 'ellipsis' ? (
											<PaginationEllipsis />
										) : (
											<PaginationLink
												isActive={page === currentPage}
												className='cursor-pointer'
												onClick={() => setCurrentPage(page as number)}
											>
												{page}
											</PaginationLink>
										)}
									</PaginationItem>
								))}
								<PaginationItem>
									<PaginationNext
										className={
											currentPage === totalPage
												? 'pointer-events-none opacity-50'
												: 'cursor-pointer'
										}
										onClick={() => setCurrentPage((prev) => prev + 1)}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				)}
			</div>
		</div>
	)
}

export default AddDivision

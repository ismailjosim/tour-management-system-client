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

interface DataPaginationProps {
	currentPage: number
	totalPage: number
	limit: number
	onPageChange: (page: number) => void
	onLimitChange: (limit: number) => void
	limitOptions?: number[]
}

const DataPagination = ({
	currentPage,
	totalPage,
	limit,
	onPageChange,
	onLimitChange,
	limitOptions = [5, 10, 20, 50],
}: DataPaginationProps) => {
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

	const handleLimitChange = (value: string) => {
		onLimitChange(Number(value))
	}

	return (
		<div className='flex items-center justify-between mt-5'>
			<div className='flex items-center space-x-2'>
				<span className='text-sm text-gray-500'>Items per page:</span>
				<Select onValueChange={handleLimitChange} defaultValue={String(limit)}>
					<SelectTrigger className='w-[80px]'>
						<SelectValue placeholder='Select' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{limitOptions.map((option) => (
								<SelectItem key={option} value={String(option)}>
									{option}
								</SelectItem>
							))}
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
									onClick={() => onPageChange(currentPage - 1)}
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
											onClick={() => onPageChange(page as number)}
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
									onClick={() => onPageChange(currentPage + 1)}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}
		</div>
	)
}

export default DataPagination

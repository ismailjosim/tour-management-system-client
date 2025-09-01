// hooks/usePagination.ts
import { useState } from 'react'

interface UsePaginationProps {
	initialPage?: number
	initialLimit?: number
}

interface UsePaginationReturn {
	currentPage: number
	limit: number
	setCurrentPage: (page: number) => void
	setLimit: (limit: number) => void
	handlePageChange: (page: number) => void
	handleLimitChange: (limit: number) => void
	resetPagination: () => void
}

const usePagination = ({
	initialPage = 1,
	initialLimit = 10,
}: UsePaginationProps = {}): UsePaginationReturn => {
	const [currentPage, setCurrentPage] = useState(initialPage)
	const [limit, setLimit] = useState(initialLimit)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	const handleLimitChange = (newLimit: number) => {
		setLimit(newLimit)
		setCurrentPage(1) // Reset to first page when limit changes
	}

	const resetPagination = () => {
		setCurrentPage(initialPage)
		setLimit(initialLimit)
	}

	return {
		currentPage,
		limit,
		setCurrentPage,
		setLimit,
		handlePageChange,
		handleLimitChange,
		resetPagination,
	}
}

export default usePagination

import type React from 'react'

// Types
export interface HeadingProps {
	subHeading: string
	headingOne: string
	headingTwo: string
	describe: string
}

export interface ReviewContent {
	name: string
	post: string
	details: string
	avatar?: string
	rating?: number
}

export interface HomepageReview {
	_id: string
	rating: number
	comments: string
	createdAt?: string
	user?: {
		name?: string
		picture?: string
	}
	tour?: {
		title?: string
		slug?: string
		location?: string
	}
}

export interface PaginatedData<T> {
	data: T[]
	meta: {
		page: number
		limit: number
		total: number
		totalPage: number
	}
}

// Custom Slider Component with theme support
export interface SliderProps {
	children: React.ReactNode[]
	autoplay?: boolean
	autoplaySpeed?: number
	slidesToShow?: number
	className?: string
}

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

// Custom Slider Component with theme support
export interface SliderProps {
	children: React.ReactNode[]
	autoplay?: boolean
	autoplaySpeed?: number
	slidesToShow?: number
	className?: string
}

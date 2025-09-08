import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
	DialogDescription,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAddReviewMutation } from '../../../redux/features/review/review.api'
import { useUserInfoQuery } from '../../../redux/features/auth/auth.api'
import { toast } from 'sonner'
import { Rating, RatingButton } from '../../ui/shadcn-io/rating'
import type { ApiError } from '../../../types'

interface AddReviewButtonProps {
	tourId: string
}

const AddReviewButton: React.FC<AddReviewButtonProps> = ({ tourId }) => {
	const [open, setOpen] = useState(false)
	const [rating, setRating] = useState<number>(0)
	const [comments, setComments] = useState<string>('')

	const [addReview, { isLoading }] = useAddReviewMutation()
	const { data } = useUserInfoQuery(undefined)

	const handleSubmit = async () => {
		if (rating === 0 || !comments.trim()) {
			toast('Please provide a rating and comment.')
			return
		}

		const formData = {
			tour: tourId,
			user: data?.data?._id,
			rating,
			comments,
		}

		try {
			const res = await addReview(formData).unwrap()
			if (res.statusCode === 201) {
				toast.success(res.success)
				setOpen(false)
				setComments('')
			}
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError.data.message)
			setComments('')
			setOpen(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size='sm' variant='secondary'>
					Add Review
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle>Add Your Review</DialogTitle>
					<DialogDescription>
						Share your experience with this tour.
					</DialogDescription>
				</DialogHeader>

				<div className='space-y-4'>
					<div>
						<Label>Rating</Label>
						<div className='flex flex-col items-center gap-3'>
							<Rating value={rating} onValueChange={setRating}>
								{Array.from({ length: 5 }).map((_, index) => (
									<RatingButton className='text-yellow-500' key={index} />
								))}
							</Rating>
							<span className='text-xs text-muted-foreground'>{rating}/5</span>
						</div>
					</div>

					<div>
						<Label>Comments</Label>
						<Textarea
							rows={4}
							value={comments}
							onChange={(e) => setComments(e.target.value)}
						/>
					</div>
				</div>

				<DialogFooter>
					<Button
						onClick={handleSubmit}
						disabled={isLoading}
						className='w-full'
					>
						{isLoading ? 'Submitting...' : 'Submit Review'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default AddReviewButton

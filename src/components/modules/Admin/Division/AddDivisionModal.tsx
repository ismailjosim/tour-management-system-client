import { useEffect, useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { toast } from 'sonner'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import Swal from 'sweetalert2'
import { Loader2 } from 'lucide-react'
import SingleImageUploader from '@/components/SingleImageUploader'
import type { ApiError } from '@/types'
import { divisionSchema } from '@/Schema/zodValidationSchemas'
import {
	useAddDivisionMutation,
	useUpdateDivisionMutation,
} from '@/redux/features/division/division.api'

interface AddDivisionModalProps {
	divisionId?: string
	initialData?: { name: string; description: string; thumbnail?: string }
	triggerButton?: React.ReactNode
}

const AddDivisionModal = ({
	divisionId,
	initialData = { name: '', description: '', thumbnail: '' },
	triggerButton,
}: AddDivisionModalProps) => {
	const [open, setOpen] = useState(false)
	const [image, setImage] = useState<File | null>(null)
	const [showConfetti, setShowConfetti] = useState(false)

	const { width, height } = useWindowSize()

	const [addDivision, { isLoading: adding }] = useAddDivisionMutation()
	const [updateDivision, { isLoading: updating }] = useUpdateDivisionMutation()

	const isEditMode = Boolean(divisionId)

	const form = useForm<z.infer<typeof divisionSchema>>({
		resolver: zodResolver(divisionSchema),
		defaultValues: {
			name: initialData.name,
			description: initialData.description,
		},
	})
	const { handleSubmit, control, reset } = form

	useEffect(() => {
		if (isEditMode) {
			reset({
				name: initialData.name,
				description: initialData.description,
			})
		}
	}, [initialData, isEditMode, reset])

	const triggerConfetti = () => {
		setShowConfetti(true)
		setTimeout(() => setShowConfetti(false), 10000)
	}

	const onSubmit = async (data: z.infer<typeof divisionSchema>) => {
		const formData = new FormData()
		formData.append('data', JSON.stringify(data))
		if (image) formData.append('file', image)

		try {
			if (isEditMode && divisionId) {
				const result = await updateDivision({
					divisionId,
					...data,
					file: image,
				}).unwrap()
				if (result.success) {
					toast.success(result.message)
					setOpen(false)
				}
			} else {
				const result = await addDivision(formData).unwrap()
				if (result.success) {
					toast.success(result.message)
					triggerConfetti()
					Swal.fire({
						title: 'Awesome ❤️',
						text: result.message,
						icon: 'success',
					})
					reset()
					setImage(null)
					setOpen(false)
				}
			}
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError.data.message)
		}
	}

	return (
		<>
			{showConfetti && <Confetti width={width} height={height} />}
			<Dialog open={open} onOpenChange={setOpen}>
				{triggerButton ? (
					<DialogTrigger asChild>{triggerButton}</DialogTrigger>
				) : (
					<DialogTrigger asChild>
						<Button variant='default'>
							{isEditMode ? 'Edit Division' : 'Add Division'}
						</Button>
					</DialogTrigger>
				)}

				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>
							{isEditMode ? 'Edit Division' : 'Add New Division'}
						</DialogTitle>
						<DialogDescription>
							Fill in the details to {isEditMode ? 'update' : 'add'} a division.
						</DialogDescription>
					</DialogHeader>

					<Form {...form}>
						<form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
							<FormField
								control={control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Division Name</FormLabel>
										<FormControl>
											<Input placeholder='Enter Division Name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Describe the division...'
												className='resize-none text-sm'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<SingleImageUploader
								initialImage={initialData?.thumbnail}
								onChange={(file) => setImage(file)}
							/>

							<Button
								className='w-full'
								type='submit'
								disabled={(!image && !isEditMode) || adding || updating}
							>
								{(adding || updating) && (
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								)}
								{adding || updating
									? isEditMode
										? 'Updating...'
										: 'Submitting...'
									: isEditMode
									? 'Update'
									: 'Submit'}
							</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default AddDivisionModal

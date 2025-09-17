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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {
	useAddTourTypeMutation,
	useUpdateTourTypeMutation,
} from '@/redux/features/Tour/tour.api'
import type { ApiError } from '@/types'
import { tourTypeSchema } from '@/Schema/zodValidationSchemas'

interface AddTourModalProps {
	tourTypeId?: string
	initialName?: string
	triggerButton?: React.ReactNode
}

const AddTourModal = ({
	tourTypeId,
	initialName = '',
	triggerButton,
}: AddTourModalProps) => {
	const [open, setOpen] = useState(false)
	const [addTourType] = useAddTourTypeMutation()
	const [updateTourType] = useUpdateTourTypeMutation()

	const isEditMode = Boolean(tourTypeId)

	const form = useForm<z.infer<typeof tourTypeSchema>>({
		resolver: zodResolver(tourTypeSchema),
		defaultValues: {
			name: initialName,
		},
	})

	useEffect(() => {
		if (isEditMode) {
			form.reset({ name: initialName })
		}
	}, [initialName, isEditMode])

	const onSubmit = async (data: z.infer<typeof tourTypeSchema>) => {
		try {
			if (isEditMode && tourTypeId) {
				const formInfo = {
					id: tourTypeId,
					name: data.name,
				}
				const result = await updateTourType(formInfo).unwrap()
				if (result.success) {
					toast.success(result.message)
					setOpen(false)
				}
			} else {
				const result = await addTourType({ name: data.name }).unwrap()
				if (result.success) {
					toast.success(result.message)
					form.reset()
					setOpen(false)
				}
			}
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError.data.message)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{triggerButton ? (
				<DialogTrigger asChild>{triggerButton}</DialogTrigger>
			) : (
				<DialogTrigger asChild>
					<Button variant='default'>Add Tour Type</Button>
				</DialogTrigger>
			)}
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>
						{isEditMode ? 'Edit Tour Type' : 'Add New Tour Type'}
					</DialogTitle>
					<DialogDescription>
						Fill in the details to {isEditMode ? 'update' : 'add'} a tour type.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tour Type Name</FormLabel>
									<FormControl>
										<Input placeholder='Enter Tour Type Name' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button className='w-full' type='submit'>
							{isEditMode ? 'Update' : 'Submit'}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default AddTourModal

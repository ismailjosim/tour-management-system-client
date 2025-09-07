import { useState } from 'react'
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
import type { ApiError } from '@/types'
import { divisionSchema } from '@/Schema/zodValidationSchemas'
import { Textarea } from '@/components/ui/textarea'
import SingleImageUploader from '@/components/SingleImageUploader'
import { useAddDivisionMutation } from '@/redux/features/division/division.api'
import { Loader2 } from 'lucide-react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import Swal from 'sweetalert2'

const AddDivisionModal = () => {
	// ---------- State ----------
	const [open, setOpen] = useState(false)
	const [image, setImage] = useState<File | null>(null)
	const [showConfetti, setShowConfetti] = useState(false)

	const { width, height } = useWindowSize()
	const [addDivision, { isLoading }] = useAddDivisionMutation()

	// ---------- Form ----------
	const form = useForm<z.infer<typeof divisionSchema>>({
		resolver: zodResolver(divisionSchema),
		defaultValues: { name: '', description: '' },
	})

	const { handleSubmit, control, reset } = form

	// ---------- Handlers ----------
	const triggerConfetti = () => {
		setShowConfetti(true)
		setTimeout(() => setShowConfetti(false), 10000)
	}

	const onSubmit = async (data: z.infer<typeof divisionSchema>) => {
		const formData = new FormData()
		formData.append('data', JSON.stringify(data))
		if (image) formData.append('file', image)

		try {
			const result = await addDivision(formData).unwrap()
			if (!result.success) return

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
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError.data.message)
		}
	}

	// ---------- UI ----------
	return (
		<>
			{showConfetti && <Confetti width={width} height={height} />}

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant='default'>Add Division</Button>
				</DialogTrigger>

				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Add New Division</DialogTitle>
						<DialogDescription>
							Fill in the details to add a new Division.
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
												placeholder='Tell us a little bit about division you want to create...'
												className='resize-none text-sm'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<SingleImageUploader onChange={setImage} />

							<Button
								className='w-full'
								type='submit'
								disabled={!image || isLoading}
							>
								{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
								{isLoading ? 'Submitting...' : 'Submit'}
							</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default AddDivisionModal

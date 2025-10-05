import React, { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import { useGetDivisionsQuery } from '@/redux/features/division/division.api'
import { useApplyGuideMutation } from '@/redux/features/guide/guide.api'
import SingleImageUploader from '@/components/SingleImageUploader'
import type { ApiError } from '@/types'

// ✅ Validation schema
const applyGuideSchema = z.object({
	division: z.string({ error: 'Division is required' }),
	nidPhoto: z
		.any()
		.refine((file) => file instanceof File, 'NID photo is required'),
})

interface ApplyGuideModalProps {
	triggerButton?: React.ReactNode
	isApplied: boolean
}

const ApplyGuideModal = ({ triggerButton }: ApplyGuideModalProps) => {
	const [open, setOpen] = useState(false)
	const [nidPhoto, setNidPhoto] = useState<File | null>(null)

	const { data: divisionData, isLoading: divisionLoading } =
		useGetDivisionsQuery({ limit: 1000, fields: '_id,name' })

	const [applyGuide, { isLoading: submitting }] = useApplyGuideMutation()

	const form = useForm<z.infer<typeof applyGuideSchema>>({
		resolver: zodResolver(applyGuideSchema),
		defaultValues: { division: '', nidPhoto: undefined },
	})

	const onSubmit = async (data: z.infer<typeof applyGuideSchema>) => {
		const toastId = toast.loading('Submitting application...')

		if (!nidPhoto) {
			toast.error('Please upload your NID photo', { id: toastId })
			return
		}

		const formData = new FormData()
		formData.append('division', data.division)
		formData.append('file', nidPhoto)

		try {
			const res = await applyGuide(formData).unwrap()
			if (res.success) {
				toast.success('Application submitted successfully!', { id: toastId })
				form.reset()
				setNidPhoto(null)
				setOpen(false)
			} else {
				toast.error('Something went wrong!', { id: toastId })
			}
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError?.data?.message || 'Error submitting form', {
				id: toastId,
			})
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{triggerButton ? (
				<DialogTrigger asChild>{triggerButton}</DialogTrigger>
			) : (
				<DialogTrigger asChild>
					<Button variant='default'>Apply as Guide</Button>
				</DialogTrigger>
			)}

			<DialogContent className='sm:max-w-[450px]'>
				<DialogHeader>
					<DialogTitle>Apply as a Guide</DialogTitle>
					<DialogDescription>
						Submit your details to become a verified guide.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
						{/* --- Division Select --- */}
						<FormField
							control={form.control}
							name='division'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Select Division</FormLabel>
									<FormControl>
										<div className='w-full'>
											<Select
												onValueChange={field.onChange}
												value={field.value}
												disabled={divisionLoading}
											>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Select division' />
												</SelectTrigger>
												<SelectContent>
													{divisionData?.data?.map(
														(division: { _id: string; name: string }) => (
															<SelectItem
																key={division._id}
																value={division._id}
															>
																{division.name}
															</SelectItem>
														),
													)}
												</SelectContent>
											</Select>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* --- NID Upload --- */}
						<FormField
							control={form.control}
							name='nidPhoto'
							render={() => (
								<FormItem>
									<FormLabel>NID Photo</FormLabel>
									<FormControl>
										<SingleImageUploader
											initialImage={
												nidPhoto ? URL.createObjectURL(nidPhoto) : null
											}
											onChange={(file) => {
												setNidPhoto(file)
												form.setValue('nidPhoto', file)
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* --- Submit Button --- */}
						<Button
							className='w-full'
							type='submit'
							disabled={!nidPhoto || submitting}
						>
							{submitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
							{submitting ? 'Submitting...' : 'Submit Application'}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default ApplyGuideModal

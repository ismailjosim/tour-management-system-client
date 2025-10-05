import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'

import { useGetDivisionsQuery } from '@/redux/features/division/division.api'
import { useApplyGuideMutation } from '@/redux/features/guide/guide.api'
import type { ApiError } from '@/types'
import SingleImageUploader from '@/components/SingleImageUploader'

// --- Validation schema ---
const applyGuideSchema = z.object({
	division: z.string({ error: 'Division is required' }),
	nidPhoto: z
		.any()
		.refine((file) => file instanceof File, 'NID photo is required'),
})

// --- Component ---
const ApplyGuide = () => {
	const [nidPhoto, setNidPhoto] = useState<File | null>(null)

	// Fetch divisions
	const { data: divisionData, isLoading: divisionLoading } =
		useGetDivisionsQuery({ limit: 1000, fields: '_id,name' })

	// Mutation hook
	const [applyGuide] = useApplyGuideMutation()

	// Form setup
	const form = useForm<z.infer<typeof applyGuideSchema>>({
		resolver: zodResolver(applyGuideSchema),
		defaultValues: { division: '', nidPhoto: undefined },
	})

	// Handle form submit
	const handleSubmit = async (data: z.infer<typeof applyGuideSchema>) => {
		const toastId = toast.loading('Submitting application...')
		console.log(data)

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
				console.log(res)
				toast.success('Application submitted successfully!', { id: toastId })
				form.reset()
				setNidPhoto(null)
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
		<div className='w-full max-w-3xl mx-auto sm:mt-16'>
			<Card>
				<CardHeader>
					<CardTitle>Apply as a Guide</CardTitle>
					<CardDescription>
						Submit your details to become a verified guide
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className='space-y-6'
							id='apply-guide-form'
						>
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
						</form>
					</Form>
				</CardContent>

				<CardFooter className='flex justify-end'>
					<Button type='submit' form='apply-guide-form'>
						Submit Application
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

export default ApplyGuide

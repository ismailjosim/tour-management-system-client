/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatISO, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { useGetDivisionsQuery } from '@/redux/features/division/division.api'
import {
	useAddTourMutation,
	useGetTourTypesQuery,
	useUpdateTourMutation,
} from '@/redux/features/Tour/tour.api'
import type { ApiError } from '@/types'

import { addTourSchema } from '@/Schema/zodValidationSchemas'
import TourBasicInfo from '@/components/modules/Admin/Tour/TourBasicInfo'
import TourSelectOptions from '@/components/modules/Admin/Tour/TourSelectOptions'
import TourGuestInfo from '@/components/modules/Admin/Tour/TourGuestInfo'
import TourDatePickers from '@/components/modules/Admin/Tour/TourDatePickers'
import TourDynamicFields from '@/components/modules/Admin/Tour/TourDynamicFields'
import LocationInput from '@/components/modules/map/LocationInput'
import MultipleImageUploader from '../../../MultipleImageUploader'

interface TourFormProps {
	mode: 'create' | 'edit'
	initialData?: any
	tourId?: string
}

export default function TourForm({ mode, initialData, tourId }: TourFormProps) {
	const [images, setImages] = useState<(string | File)[]>([])

	const { data: divisionData, isLoading: divisionLoading } =
		useGetDivisionsQuery({ limit: 1000, fields: '_id,name' })
	const { data: tourTypeData } = useGetTourTypesQuery({
		limit: 1000,
		fields: '_id,name',
	})
	const [addTour] = useAddTourMutation()
	const [updateTour] = useUpdateTourMutation()

	// Dropdown options
	const divisionOptions =
		divisionData?.data?.map((item: { _id: string; name: string }) => ({
			value: item._id,
			label: item.name,
		})) || []

	const tourTypeOptions =
		tourTypeData?.data?.map((tourType: { _id: string; name: string }) => ({
			value: tourType._id,
			label: tourType.name,
		})) || []

	// React Hook Form setup
	const form = useForm<z.infer<typeof addTourSchema>>({
		resolver: zodResolver(addTourSchema),
		defaultValues: {
			title: '',
			description: '',
			location: '',
			costFrom: '',
			startDate: new Date(),
			endDate: new Date(),
			departureLocation: '',
			arrivalLocation: '',
			included: [{ value: '' }],
			excluded: [{ value: '' }],
			amenities: [{ value: '' }],
			tourPlan: [{ value: '' }],
			maxGuest: '',
			minAge: '',
			division: '',
			tourType: '',
			departureLocationInMap: { title: '', lat: 0, lng: 0 },
			arrivalLocationInMap: { title: '', lat: 0, lng: 0 },
		},
	})

	// Populate form in edit mode
	useEffect(() => {
		if (mode === 'edit' && initialData) {
			form.reset({
				title: initialData.title || '',
				description: initialData.description || '',
				location: initialData.location || '',
				costFrom: String(initialData.costFrom || ''),
				startDate: initialData.startDate
					? parseISO(initialData.startDate)
					: new Date(),
				endDate: initialData.endDate
					? parseISO(initialData.endDate)
					: new Date(),
				departureLocation: initialData.departureLocation || '',
				arrivalLocation: initialData.arrivalLocation || '',
				included: initialData.included?.length
					? initialData.included.map((v: string) => ({ value: v }))
					: [{ value: '' }],
				excluded: initialData.excluded?.length
					? initialData.excluded.map((v: string) => ({ value: v }))
					: [{ value: '' }],
				amenities: initialData.amenities?.length
					? initialData.amenities.map((v: string) => ({ value: v }))
					: [{ value: '' }],
				tourPlan: initialData.tourPlan?.length
					? initialData.tourPlan.map((v: string) => ({ value: v }))
					: [{ value: '' }],
				maxGuest: String(initialData.maxGuest || ''),
				minAge: String(initialData.minAge || ''),
				division: initialData.division?._id || initialData.division || '',
				tourType: initialData.tourType?._id || initialData.tourType || '',
				departureLocationInMap: initialData.departureLocationInMap || {
					title: '',
					lat: 0,
					lng: 0,
				},
				arrivalLocationInMap: initialData.arrivalLocationInMap || {
					title: '',
					lat: 0,
					lng: 0,
				},
			})

			// ✅ Set existing image URLs for edit mode
			if (Array.isArray(initialData.images) && initialData.images.length > 0) {
				setImages(initialData.images)
			}
		}
	}, [mode, initialData, form])

	const handleSubmit = async (data: z.infer<typeof addTourSchema>) => {
		const toastId = toast.loading(
			mode === 'create' ? 'Creating tour...' : 'Updating tour...',
		)

		if (images.length === 0) {
			toast.error('Please add some images', { id: toastId })
			return
		}

		const tourData = {
			...data,
			costFrom: Number(data.costFrom),
			minAge: Number(data.minAge),
			maxGuest: Number(data.maxGuest),
			startDate: formatISO(data.startDate),
			endDate: formatISO(data.endDate),
			included: data.included.filter((i) => i.value).map((i) => i.value),
			excluded: data.excluded.filter((i) => i.value).map((i) => i.value),
			amenities: data.amenities.filter((i) => i.value).map((i) => i.value),
			tourPlan: data.tourPlan.filter((i) => i.value).map((i) => i.value),
		}

		const formData = new FormData()
		formData.append('data', JSON.stringify(tourData))

		// Only append new File uploads
		images.forEach((img) => {
			if (img instanceof File) {
				formData.append('files', img)
			}
		})

		try {
			let res
			if (mode === 'create') {
				res = await addTour(formData).unwrap()
			} else {
				res = await updateTour({ id: tourId!, data: formData }).unwrap()
			}

			if (res.success) {
				toast.success(
					mode === 'create'
						? 'Tour created successfully!'
						: 'Tour updated successfully!',
					{ id: toastId },
				)
				if (mode === 'create') {
					form.reset()
					setImages([])
				}
			} else {
				toast.error('Something went wrong', { id: toastId })
			}
		} catch (error) {
			const apiError = error as ApiError
			toast.error(
				apiError.data?.message ||
					`Error ${mode === 'create' ? 'creating' : 'updating'} tour`,
				{ id: toastId },
			)
		}
	}

	return (
		<div className='w-full max-w-4xl mx-auto sm:mt-16'>
			<Card>
				<CardHeader>
					<CardTitle>
						{mode === 'create' ? 'Add New Tour' : 'Edit Tour'}
					</CardTitle>
					<CardDescription>
						{mode === 'create'
							? 'Add a new tour to the system'
							: 'Update tour information'}
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form
							id='tour-form'
							className='space-y-5'
							onSubmit={form.handleSubmit(handleSubmit)}
						>
							<TourBasicInfo form={form} />

							{/* Departure Location Map */}
							<div className='space-y-2'>
								<label className='block text-sm font-medium'>
									Departure Location (Map)
								</label>
								<LocationInput
									onSelect={(location) => {
										form.setValue('departureLocationInMap', location)
									}}
									defaultValue={form.watch('departureLocationInMap')}
								/>
							</div>

							{/* Arrival Location Map */}
							<div className='space-y-2'>
								<label className='block text-sm font-medium'>
									Arrival Location (Map)
								</label>
								<LocationInput
									onSelect={(location) => {
										form.setValue('arrivalLocationInMap', location)
									}}
									defaultValue={form.watch('arrivalLocationInMap')}
								/>
							</div>

							<TourSelectOptions
								form={form}
								divisionOptions={divisionOptions}
								divisionLoading={divisionLoading}
								tourTypeOptions={tourTypeOptions}
							/>

							<TourGuestInfo form={form} />
							<TourDatePickers form={form} />
							<TourDynamicFields form={form} />
							<div className='flex sm:flex-row flex-col gap-5 items-stretch'>
								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem className='flex-1'>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea {...field} className='h-[205px]' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='flex-1 mt-5'>
									<MultipleImageUploader
										onChange={setImages}
										initialImages={
											mode === 'edit' && initialData?.images
												? initialData.images
												: []
										}
									/>
								</div>
							</div>
						</form>
					</Form>
				</CardContent>

				<CardFooter className='flex justify-end'>
					<Button type='submit' form='tour-form'>
						{mode === 'create' ? 'Create Tour' : 'Update Tour'}
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

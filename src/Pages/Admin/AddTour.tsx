import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatISO } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { useGetDivisionsQuery } from '@/redux/features/division/division.api'
import {
	useAddTourMutation,
	useGetTourTypesQuery,
} from '@/redux/features/Tour/tour.api'
import type { ApiError } from '@/types'
import type { FileMetadata } from '@/hooks/use-file-upload'
import { addTourSchema } from '@/Schema/zodValidationSchemas'
import TourBasicInfo from '@/components/modules/Admin/Tour/TourBasicInfo'
import TourSelectOptions from '@/components/modules/Admin/Tour/TourSelectOptions'
import TourGuestInfo from '@/components/modules/Admin/Tour/TourGuestInfo'
import TourDatePickers from '@/components/modules/Admin/Tour/TourDatePickers'
import TourDescriptionImages from '@/components/modules/Admin/Tour/TourDescriptionImages'
import TourDynamicFields from '@/components/modules/Admin/Tour/TourDynamicFields'
import LocationInput from '@/components/modules/map/LocationInput'

export default function AddTour() {
	const [images, setImages] = useState<(File | FileMetadata)[]>([])

	const { data: divisionData, isLoading: divisionLoading } =
		useGetDivisionsQuery({ limit: 1000, fields: '_id,name' })
	const { data: tourTypeData } = useGetTourTypesQuery({
		limit: 1000,
		fields: '_id,name',
	})
	const [addTour] = useAddTourMutation()

	// Create dropdown options
	const divisionOptions = divisionData?.data?.map(
		(item: { _id: string; name: string }) => ({
			value: item._id,
			label: item.name,
		}),
	)

	const tourTypeOptions = tourTypeData?.data?.map(
		(tourType: { _id: string; name: string }) => ({
			value: tourType._id,
			label: tourType.name,
		}),
	)

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

	const handleSubmit = async (data: z.infer<typeof addTourSchema>) => {
		const toastId = toast.loading('Creating tour...')

		if (images.length === 0) {
			toast.error('Please add some images', { id: toastId })
			return
		}

		// Construct clean tour data
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

		// Attach to FormData
		const formData = new FormData()
		formData.append('data', JSON.stringify(tourData))
		images.forEach((img) => formData.append('files', img as File))

		try {
			const res = await addTour(formData).unwrap()
			if (res.success) {
				toast.success('Tour created successfully!', { id: toastId })
				form.reset()
				setImages([])
			} else {
				toast.error('Something went wrong', { id: toastId })
			}
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError.data?.message || 'Error creating tour', {
				id: toastId,
			})
		}
	}

	return (
		<div className='w-full max-w-4xl mx-auto sm:mt-16'>
			<Card>
				<CardHeader>
					<CardTitle>Add New Tour</CardTitle>
					<CardDescription>Add a new tour to the system</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form
							id='add-tour-form'
							className='space-y-5'
							onSubmit={form.handleSubmit(handleSubmit)}
						>
							{/* Basic Info */}
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

							{/* Select Options */}
							<TourSelectOptions
								form={form}
								divisionOptions={divisionOptions}
								divisionLoading={divisionLoading}
								tourTypeOptions={tourTypeOptions}
							/>

							{/* Guest & Date Info */}
							<TourGuestInfo form={form} />
							<TourDatePickers form={form} />

							{/* Dynamic Fields */}
							<TourDynamicFields form={form} />

							{/* Images */}
							<TourDescriptionImages form={form} setImages={setImages} />
						</form>
					</Form>
				</CardContent>

				<CardFooter className='flex justify-end'>
					<Button type='submit' form='add-tour-form'>
						Create Tour
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

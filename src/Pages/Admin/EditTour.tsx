import { useParams } from 'react-router'

import TourForm from '@/components/modules/Admin/Tour/TourForm'
import { Loader2 } from 'lucide-react'
import { useGetSingleTourQuery } from '../../redux/features/Tour/tour.api'

const EditTour = () => {
	const { slug } = useParams<{ slug: string }>()
	const { data, isLoading, isError } = useGetSingleTourQuery(slug)

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-[400px]'>
				<Loader2 className='h-8 w-8 animate-spin text-primary' />
			</div>
		)
	}

	if (isError || !data?.data) {
		return (
			<div className='flex items-center justify-center min-h-[400px]'>
				<p className='text-destructive'>Failed to load tour data</p>
			</div>
		)
	}

	return <TourForm mode='edit' initialData={data.data} tourId={data.data._id} />
}

export default EditTour

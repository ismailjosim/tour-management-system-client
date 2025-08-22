import { useEffect } from 'react'
import { useGetAllToursQuery } from '../redux/features/Tour/tour.api'
import DestinationLoading from '../utils/DestinationLoading'
import DestinationCard from '../components/modules/Destination/DestinationCard'
import type { IDestination } from '../types'

import sectionBG from '@/assets/destinations/destination-section-bg.jpg'
import PageHeading from '../utils/PageHeading'
import DestinationFilter from '../components/modules/Destination/DestinationFilter'

const Destinations = () => {
    const { isLoading, data, isError } = useGetAllToursQuery({
        // division: selectedDivision,
        // tourType: selectedTourType,
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // left side component

    let content
    if (isLoading) {
        content = <DestinationLoading />
    }
    if (!isLoading && isError) {
        content = <h3>something went wrong</h3>
    }
    if (!isLoading && !isError && data?.data?.length === 0) {
        content = <h3>No destination found</h3>
    } else {
        content = (
            <>
                {data?.data?.map((item: IDestination) => (
                    <DestinationCard item={item} key={item._id} />
                ))}
            </>
        )
    }

    return (
        <>
            <PageHeading headTitle='destination list' sectionBackground={sectionBG} />
            <section className='w-11/12 mx-auto my-20'>
                <div className='grid lg:grid-cols-5 gap-10'>
                    <DestinationFilter />
                    <div className='col-span-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'>
                        {content}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Destinations

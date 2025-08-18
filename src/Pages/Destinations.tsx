import { useEffect } from 'react'
import { useGetAllToursQuery } from '../redux/features/Tour/tour.api'
import DestinationLoading from '../utils/DestinationLoading'
import DestinationCard from '../components/modules/Destination/DestinationCard'
import type { IDestination } from '../types'

import sectionBG from "@/assets/destinations/destination-section-bg.jpg"
import PageHeading from '../utils/PageHeading'


const Destinations = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const { isLoading, data, isError } = useGetAllToursQuery(undefined)
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
            <div className='w-11/12 mx-auto my-20 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'>
                {data?.data?.map((item: IDestination) => (
                    <DestinationCard item={item} key={item._id} />
                ))}
            </div>
        )
    }

    return <>
        <PageHeading headTitle="destination list" sectionBackground={sectionBG} />
        {content}
    </>
}

export default Destinations

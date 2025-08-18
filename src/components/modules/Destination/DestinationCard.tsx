import { Link } from 'react-router'
import type { IDestination } from '@/types'
import { CardContent } from '@/components/ui/card'

interface DestinationCardProps {
    item: IDestination
}

const DestinationCard: React.FC<DestinationCardProps> = ({ item }) => {
    const { _id, images, title, location, tourType } = item || {}
    return (
        <>
            <Link to={`/destination/${_id}`} key={_id} className='destination_item'>
                <div className='transition-all relative rounded-xl ease-in-out duration-500 overflow-hidden max-h-72 h-full'>
                    <img
                        src={images[0]}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    <CardContent className="absolute bottom-0 w-full flex items-center justify-between p-6 z-10">
                        <div>
                            <h3 className="text-white text-xl font-bold capitalize">{title}</h3>
                            <span className="text-white">{location}</span>
                        </div>
                        <span className="text-white bg-primary px-2 py-1 rounded-md text-sm">
                            {tourType?.name}
                        </span>
                    </CardContent>
                    <div className='color-overlay absolute left-0 bottom-0 h-1/2 w-full opacity-60 transition-all ease-in-out duration-500 bg-gradient-to-b from-transparent to-slate-900'></div>
                </div>
            </Link>
        </>
    )
}

export default DestinationCard

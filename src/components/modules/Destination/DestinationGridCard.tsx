import { Link } from 'react-router';
import type { IDestination } from '@/types';
import { CardContent } from '@/components/ui/card';

interface DestinationCardProps {
  item: IDestination;
}

const DestinationGridCard: React.FC<DestinationCardProps> = ({ item }) => {
  const { images, title, location, tourType, slug } = item || {};
  return (
    <>
      <Link to={`/destination/${slug}`} key={slug} className="destination_item">
        <div className="relative h-full max-h-72 overflow-hidden rounded-xl transition-all duration-500 ease-in-out">
          <img
            src={images[0]}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <CardContent className="absolute bottom-0 z-10 flex w-full items-center justify-between p-6">
            <div>
              <h3 className="text-xl font-bold text-white capitalize">{title}</h3>
              <span className="text-white">{location}</span>
            </div>
            <span className="bg-primary rounded-md px-2 py-1 text-sm text-white">
              {tourType?.name}
            </span>
          </CardContent>
          <div className="color-overlay absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-b from-transparent to-slate-900 opacity-60 transition-all duration-500 ease-in-out"></div>
        </div>
      </Link>
    </>
  );
};

export default DestinationGridCard;

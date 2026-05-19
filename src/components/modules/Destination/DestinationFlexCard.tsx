import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users } from 'lucide-react';
import type { IDestination } from '@/types';
import { format } from 'date-fns';

interface DestinationCardProps {
  item: IDestination;
}

const DestinationFlexCard: React.FC<DestinationCardProps> = ({ item }) => {
  const {
    images,
    title,
    description,
    location,
    costFrom,
    slug,
    minAge,
    maxGuest,
    startDate,
    endDate,
  } = item;
  const rating = 4.5;
  const reviewCount = 1;

  return (
    <Card className="flex flex-col overflow-hidden rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl md:flex-row">
      {/* Image Section */}
      <div className="relative w-full flex-shrink-0 overflow-hidden pl-5 md:w-2/5">
        <img
          src={images[1]}
          alt={title}
          className="h-full w-full scale-100 rounded-md object-cover transition-transform duration-300"
        />
        <div className="absolute top-4 left-8 flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-sm font-semibold backdrop-blur-sm">
          <Star size={14} className="fill-yellow-500 text-yellow-500" />
          <span>
            {rating.toFixed(1)} ({reviewCount})
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex w-full flex-col p-4 md:w-3/5 md:p-6">
        <CardHeader className="mb-4 p-0">
          <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
            <span className="font-semibold">{location}</span>
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="mt-2 line-clamp-2 text-sm">{description}</CardDescription>
        </CardHeader>

        <CardContent className="text-muted-foreground flex flex-col gap-3 p-0 text-sm">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <p className="font-medium">
              From {format(startDate, 'PP')} - {format(endDate, 'PP')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span className="font-medium">
              0 - {maxGuest} | Min age: {minAge}
            </span>
          </div>
        </CardContent>

        <div className="mt-auto flex items-center justify-between pt-6">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm font-normal">from</span>
            <div className="text-primary text-2xl font-bold">
              ${costFrom}
              <span className="text-muted-foreground text-base font-normal">/person</span>
            </div>
          </div>
          <Button asChild>
            <Link to={`/destination/${slug}`}>View Tour</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DestinationFlexCard;

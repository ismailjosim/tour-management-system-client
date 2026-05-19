import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import StarRating from './StarRating';

interface TourHeaderProps {
  title: string;
  location: string;
  averageRating: number;
  totalReviews: number;
  slug: string;
}

const TourHeader: React.FC<TourHeaderProps> = ({
  title,
  location,
  averageRating,
  totalReviews,
  slug,
}) => {
  const [city, country] = location.split(',').map((s) => s.trim());

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="mb-2 text-3xl font-bold capitalize md:text-5xl">{title}</h2>
        <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>
              {city}, {country}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <StarRating rating={averageRating} />
          </div>
          <span className="text-gray-500 dark:text-gray-500">({totalReviews} Reviews)</span>
        </div>
      </div>
      <Link to={`/booking/${slug}`}>
        <Button className="w-full px-8 py-6 text-lg font-semibold md:w-auto">Book Now</Button>
      </Link>
    </div>
  );
};

export default TourHeader;

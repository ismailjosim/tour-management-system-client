import React, { type JSX } from 'react';

import SectionHeading from '@/utils/SectionHeading';
import bgImg from '@/assets/homepage/slide01.jpg';
import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Star } from 'lucide-react';

// TypeScript interfaces
interface HeadingData {
  subHeading: string;
  headingOne: string;
  headingTwo: string;
  describe: string;
}

interface DealData {
  id: number;
  country: string;
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  duration: string;
  image: string;
}

const TopDealSection: React.FC = () => {
  const heading: HeadingData = {
    subHeading: 'Top Deals',
    headingOne: 'The Last',
    headingTwo: 'Minute Deals',
    describe:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
  };

  // Mock data - replace with real data
  const deals: DealData[] = [
    {
      id: 1,
      country: 'Norway',
      title: 'Norway Lake',
      rating: 5,
      reviewCount: 20,
      price: 180,
      duration: '9 Days Tours',
      image: bgImg,
    },
    {
      id: 2,
      country: 'Norway',
      title: 'Norway Lake',
      rating: 5,
      reviewCount: 20,
      price: 180,
      duration: '9 Days Tours',
      image: bgImg,
    },
    {
      id: 3,
      country: 'Norway',
      title: 'Norway Lake',
      rating: 5,
      reviewCount: 20,
      price: 180,
      duration: '9 Days Tours',
      image: bgImg,
    },
    {
      id: 4,
      country: 'Norway',
      title: 'Norway Lake',
      rating: 5,
      reviewCount: 20,
      price: 180,
      duration: '9 Days Tours',
      image: bgImg,
    },
    {
      id: 5,
      country: 'Norway',
      title: 'Norway Lake',
      rating: 5,
      reviewCount: 20,
      price: 180,
      duration: '9 Days Tours',
      image: bgImg,
    },
    {
      id: 6,
      country: 'Norway',
      title: 'Norway Lake',
      rating: 5,
      reviewCount: 20,
      price: 180,
      duration: '9 Days Tours',
      image: bgImg,
    },
  ];

  const renderStars = (rating: number): JSX.Element[] => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto">
        <SectionHeading heading={heading} />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal: DealData) => (
            <div
              key={deal.id}
              className="group relative cursor-pointer overflow-hidden rounded-md border-0 shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Background Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  src={deal.image}
                  alt={deal.title}
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Top badge */}
                <Badge
                  variant="secondary"
                  className="bg-primary/90 text-primary-foreground hover:bg-primary absolute top-4 left-4"
                >
                  Hot Deal
                </Badge>
              </div>

              {/* Content */}
              <CardContent className="absolute right-0 bottom-0 left-0 p-6 text-white">
                <div className="space-y-3">
                  {/* Location */}
                  <h2 className="text-lg font-medium text-yellow-400">{deal.country}</h2>

                  {/* Title */}
                  <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:text-yellow-400">
                    {deal.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">{renderStars(deal.rating)}</div>
                    <span className="text-sm text-white/80">({deal.reviewCount})</span>
                  </div>

                  {/* Divider */}
                  <div className="my-4 border-t border-white/20"></div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">
                      <span className="text-xl font-bold text-yellow-400">${deal.price}.00</span>
                      <span className="ml-2 text-sm text-white/80">Per Person</span>
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 pt-2">
                    <Calendar className="h-5 w-5 text-yellow-400" />
                    <span className="text-lg font-semibold">{deal.duration}</span>
                  </div>
                </div>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDealSection;

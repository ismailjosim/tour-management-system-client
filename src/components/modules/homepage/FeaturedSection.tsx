import React from 'react';
import SectionHeading from '@/utils/SectionHeading';
import { Flag, MapPin, Compass, Map } from 'lucide-react';
import { Card as ShadCard } from '@/components/ui/card';

interface CardProps {
  data: FeatureData;
}

interface FeatureData {
  id: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  review: string;
}

const featureData: FeatureData[] = [
  {
    id: 1,
    icon: <Flag className="h-12 w-12" />,
    title: 'Tell Us What You Want To Do',
    subtitle: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    review: '100+ Reviews',
  },
  {
    id: 2,
    icon: <MapPin className="h-12 w-12" />,
    title: 'Share Your Travel Locations',
    subtitle: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    review: '100+ Reviews',
  },
  {
    id: 3,
    icon: <Map className="h-12 w-12" />,
    title: 'Share Your Travel Preference',
    subtitle: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    review: '100+ Reviews',
  },
  {
    id: 4,
    icon: <Compass className="h-12 w-12" />,
    title: 'Here 100% Trusted Tour Agency',
    subtitle: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    review: '100+ Reviews',
  },
];

const heading = {
  subHeading: 'Core Features',
  headingOne: 'Find',
  headingTwo: 'Travel Perfection',
  describe:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
};

// Card component

const Card: React.FC<CardProps> = ({ data }) => {
  const { icon, title, subtitle, review } = data;

  return (
    <ShadCard className="why-us-item rounded-xl border-2 p-12">
      <div className="why-us-content">
        <p className="text-primary icon mb-3 text-6xl">{icon}</p>
        <h4 className="text-xl leading-6 font-semibold">{title}</h4>
        <p className="my-4 text-base font-normal">{subtitle}</p>
        <p className="text-primary card_review mb-0">{review}</p>
      </div>
    </ShadCard>
  );
};

const FeaturedSection: React.FC = () => {
  return (
    <div className="container mx-auto mb-20">
      <SectionHeading heading={heading} />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {featureData.map((data) => (
          <Card key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;

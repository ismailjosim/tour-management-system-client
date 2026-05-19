import { Flag, MapPin, Compass, Globe } from 'lucide-react';
import { Card as ShadCard } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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

const featureData = [
  {
    id: 1,
    icon: <Flag className="text-primary h-6 w-6" />,
    title: 'Tell Us What You Want To Do',
    subtitle: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    review: '100+ Reviews',
  },
  {
    id: 2,
    icon: <MapPin className="text-primary h-6 w-6" />,
    title: 'Share Your Travel Locations',
    subtitle: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    review: '100+ Reviews',
  },
  {
    id: 3,
    icon: <Globe className="text-primary h-6 w-6" />,
    title: 'Share Your Travel Preference',
    subtitle: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    review: '100+ Reviews',
  },
  {
    id: 4,
    icon: <Compass className="text-primary h-6 w-6" />,
    title: 'Here 100% Trusted Tour Agency',
    subtitle: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    review: '100+ Reviews',
  },
];

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

const FeaturedSection = () => {
  return (
    <section className="container mx-auto py-12">
      {/* Section Heading */}
      <div className="mb-10 text-center">
        <h3 className="text-primary text-lg font-semibold">Core Features</h3>
        <h2 className="mt-2 text-4xl font-bold md:text-5xl">
          Find <span className="text-primary">Travel Perfection</span>
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {featureData.map((data) => (
          <Card key={data.id} data={data}></Card>
        ))}
      </div>
      <Separator className="mt-12" />
    </section>
  );
};

export default FeaturedSection;

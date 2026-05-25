import { BadgeCheck, Compass, Map, Users } from 'lucide-react';
import { useGetHomepageStatsQuery } from '@/redux/features/Stats/stats.api';

const formatStat = (value?: number) => {
  if (typeof value !== 'number') {
    return '--';
  }

  return `${value.toLocaleString()}+`;
};

const StatsSection = () => {
  const { data, isLoading } = useGetHomepageStatsQuery();
  const stats = data?.data;

  const items = [
    {
      label: 'Tours',
      value: stats?.totalTours,
      icon: <Compass className="h-8 w-8" />,
    },
    {
      label: 'Guides',
      value: stats?.totalGuides,
      icon: <BadgeCheck className="h-8 w-8" />,
    },
    {
      label: 'Destinations',
      value: stats?.totalDestinations,
      icon: <Map className="h-8 w-8" />,
    },
    {
      label: 'Happy Travelers',
      value: stats?.happyTravelers,
      icon: <Users className="h-8 w-8" />,
    },
  ];

  return (
    <section className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="rounded-md border border-white/15 p-5 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                {item.icon}
              </div>
              <p className="mt-4 text-3xl font-bold md:text-4xl">
                {isLoading ? '--' : formatStat(item.value)}
              </p>
              <p className="text-primary-foreground/80 mt-1 text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

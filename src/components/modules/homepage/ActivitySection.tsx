import camping from '@/assets/activity/camping-tent.png';
import cycling from '@/assets/activity/cycling.png';
import hiking from '@/assets/activity/hiking.png';
import safari from '@/assets/activity/safari.png';
import beach from '@/assets/activity/sunbed.png';
import surfing from '@/assets/activity/surf.png';
import SectionHeading from '@/utils/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';

// TypeScript interfaces
interface HeadingData {
  subHeading: string;
  headingOne: string;
  headingTwo: string;
  describe: string;
}

interface ActivityData {
  id: number;
  img: string;
  title: string;
}

const ActivitySection = () => {
  const heading: HeadingData = {
    subHeading: 'TRAVEL BY ACTIVITY',
    headingOne: 'ADVENTURE &',
    headingTwo: 'ACTIVITY',
    describe:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
  };

  const data: ActivityData[] = [
    {
      id: 1,
      img: camping,
      title: 'camping',
    },
    {
      id: 2,
      img: cycling,
      title: 'cycling',
    },
    {
      id: 3,
      img: hiking,
      title: 'hiking',
    },
    {
      id: 4,
      img: safari,
      title: 'safari',
    },
    {
      id: 5,
      img: beach,
      title: 'Beach',
    },
    {
      id: 6,
      img: surfing,
      title: 'surfing',
    },
  ];

  return (
    <section className="bg-muted/30 pb-10">
      <div className="container mx-auto my-10">
        <SectionHeading heading={heading} />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {data.map((activity: ActivityData) => (
            <Card
              key={activity.id}
              className="group border-border/20 relative cursor-pointer overflow-hidden border shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-lg"
            >
              <CardContent className="relative z-10 flex flex-col items-center justify-center space-y-3 px-6 py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center">
                  <img
                    className="h-full w-full object-contain transition-all duration-500 ease-in-out group-hover:scale-110"
                    src={activity.img}
                    alt={`${activity.title} activity icon`}
                    loading="lazy"
                  />
                </div>
                <h3 className="text-foreground group-hover:text-primary -all text-lg font-semibold capitalize delay-300 duration-500 ease-in-out">
                  {activity.title}
                </h3>
              </CardContent>
              {/* Bottom sliding border animation */}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 cursor-pointer bg-teal-600 transition-all duration-500 ease-in-out group-hover:w-full"></span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ActivitySection;

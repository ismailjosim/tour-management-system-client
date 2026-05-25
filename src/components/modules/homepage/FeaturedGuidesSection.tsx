import { Link } from 'react-router';
import { ArrowRight, MapPin, UserRoundCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetPublicGuidesQuery } from '@/redux/features/guide/guide.api';

interface PublicGuide {
  _id: string;
  photo?: string;
  locationDivision?: string;
  user?: {
    name?: string;
    picture?: string;
    email?: string;
  };
  division?: {
    name?: string;
  };
}

const FeaturedGuidesSection = () => {
  const { data, isLoading, isError } = useGetPublicGuidesQuery({
    limit: 4,
    sort: '-createdAt',
  });

  const guides = (data?.data ?? []) as PublicGuide[];

  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-primary text-lg font-semibold">Featured Guides</p>
            <h2 className="mt-2 text-3xl font-bold md:text-5xl">Meet Local Experts</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Approved guides bring local context, tour coordination, and traveler support to your
              booked experiences.
            </p>
          </div>
          <Link to="/about">
            <Button variant="outline">
              View Guides
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground text-center">Loading featured guides...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load featured guides.</p>
        ) : guides.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((guide) => {
              const name = guide.user?.name ?? 'Traveler Guide';
              const division =
                guide.locationDivision || guide.division?.name || 'Traveler Destination';
              const picture =
                guide.photo ||
                guide.user?.picture ||
                `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`;

              return (
                <div
                  key={guide._id}
                  className="bg-background overflow-hidden rounded-md border shadow-sm"
                >
                  <img className="aspect-[4/5] w-full object-cover" src={picture} alt={name} />
                  <div className="p-5">
                    <div className="text-primary mb-2 flex items-center gap-2 text-sm font-medium">
                      <UserRoundCheck className="h-4 w-4" />
                      Verified Guide
                    </div>
                    <h3 className="text-xl font-semibold capitalize">{name}</h3>
                    <p className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      {division}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-background rounded-md border p-8 text-center">
            <p className="text-muted-foreground">No approved guides are available yet.</p>
            <Link to="/user/apply-guide" className="mt-4 inline-flex">
              <Button>Apply as Guide</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedGuidesSection;

import { useGetPublicGuidesQuery } from '@/redux/features/guide/guide.api';

interface PublicGuide {
  _id: string;
  photo?: string;
  locationDivision?: string;
  user?: {
    name?: string;
    picture?: string;
    role?: string;
  };
  division?: {
    name?: string;
  };
}

const TourGuideSection = () => {
  const { data, isLoading, isError } = useGetPublicGuidesQuery({
    limit: 4,
    sort: '-createdAt',
  });

  const guides = (data?.data || []) as PublicGuide[];

  return (
    <section className="container mx-auto py-12">
      {/* Section Heading */}
      <div className="mb-10 text-center">
        <h3 className="text-primary text-lg font-semibold">Tour Guides</h3>
        <h2 className="mt-2 text-4xl font-bold md:text-5xl">
          Meet Our <span className="text-primary">Excellent Guides</span>
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
          Meet the approved local experts who help travelers discover each destination with
          confidence.
        </p>
      </div>

      {/* Tour Guide Cards Grid */}
      {isLoading ? (
        <p className="text-muted-foreground text-center">Loading guides...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load guides.</p>
      ) : guides.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide) => {
            const name = guide.user?.name || 'Traveler Guide';
            const guideLocation = guide.locationDivision || guide.division?.name;
            const post = guideLocation ? `${guideLocation} Guide` : 'Tour Guide';
            const pic =
              guide.photo ||
              guide.user?.picture ||
              `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`;

            return (
              <div key={guide._id} className="rounded-t-lg transition-all duration-500">
                <div className="overflow-hidden rounded-t-lg transition-all duration-500">
                  <img
                    className="aspect-[4/5] w-full object-cover transition-all duration-500 hover:scale-110"
                    src={pic}
                    alt={name}
                  />
                </div>
                <div className="bg-primary relative z-[1] cursor-pointer rounded-b-lg p-3 pt-5 text-center text-white transition-all duration-500 hover:-mt-4">
                  <h4 className="mb-0 text-2xl font-bold capitalize">{name}</h4>
                  <p className="mb-0">{post}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-muted-foreground text-center">No approved guides are available yet.</p>
      )}
    </section>
  );
};

export default TourGuideSection;

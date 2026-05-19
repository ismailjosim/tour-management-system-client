import { Briefcase, Folder, Map } from 'lucide-react';
import image from '@/assets/images/travel.png';

const ExploreSection = () => {
  return (
    <section className="container mx-auto py-12">
      <div className="flex flex-col-reverse items-center gap-8 lg:flex-row">
        {/* Left Column - Text Content */}
        <div className="flex-1">
          <h3 className="text-primary text-lg font-semibold">Get To Know Us</h3>
          <h2 className="mt-2 text-4xl leading-tight font-bold md:text-5xl">
            Explore All Tour of the World With Us.
          </h2>
          <p className="text-muted-foreground mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-muted-foreground mt-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:justify-start">
            <div className="flex items-center space-x-2">
              <Briefcase className="text-primary h-6 w-6" />
              <span className="text-sm font-medium">Tour Guide</span>
            </div>
            <div className="flex items-center space-x-2">
              <Folder className="text-primary h-6 w-6" />
              <span className="text-sm font-medium">Friendly Price</span>
            </div>
            <div className="flex items-center space-x-2">
              <Map className="text-primary h-6 w-6" />
              <span className="text-sm font-medium">Reliable Tour Package</span>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="flex-1">
          <img src={image} alt="" />
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;

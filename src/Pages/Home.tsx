import HeroSection from '@/components/modules/homepage/HeroSection';
import FeaturedSection from '@/components/modules/homepage/FeaturedSection';
import TopDestinationsSection from '@/components/modules/homepage/TopDestinationsSection';
import GallerySection from '@/components/modules/homepage/GallerySection';
import ActivitySection from '@/components/modules/homepage/ActivitySection';
import TopDealSection from '@/components/modules/homepage/TopDealSection';
import ReviewSection from '@/components/modules/homepage/ReviewSection';
import CTASection from '@/components/modules/homepage/CTASection';
import PartnerSection from '@/components/modules/homepage/PartnerSection';
import HowTravelerWorksSection from '@/components/modules/homepage/HowTravelerWorksSection';
import WhyBookWithTravelerSection from '@/components/modules/homepage/WhyBookWithTravelerSection';
import FeaturedGuidesSection from '@/components/modules/homepage/FeaturedGuidesSection';
import StatsSection from '@/components/modules/homepage/StatsSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <TopDestinationsSection />
      <HowTravelerWorksSection />
      <WhyBookWithTravelerSection />
      <StatsSection />
      <FeaturedGuidesSection />
      <ActivitySection />
      <FeaturedSection />
      <TopDealSection />
      <GallerySection />
      <ReviewSection />
      <CTASection />
      <PartnerSection />
      {/* <TopPackages /> */}
    </>
  );
};

export default Home;

import HeroSection from '@/components/modules/homepage/HeroSection'
import QuickSearchSection from '@/components/modules/homepage/QuickSearchSection'
import FeaturedSection from '@/components/modules/homepage/FeaturedSection'
import TopDestinationsSection from '@/components/modules/homepage/TopDestinationsSection'
import GallerySection from '@/components/modules/homepage/GallerySection'
import ActivitySection from '@/components/modules/homepage/ActivitySection'
import TopDealSection from '@/components/modules/homepage/TopDealSection'
import ReviewSection from '@/components/modules/homepage/ReviewSection'
import CTASection from '@/components/modules/homepage/CTASection'
import PartnerSection from '@/components/modules/homepage/PartnerSection'

const Home = () => {
	return (
		<>
			<HeroSection />
			<QuickSearchSection />
			<FeaturedSection />
			<TopDestinationsSection />
			<GallerySection />
			<ActivitySection />
			<TopDealSection />
			<ReviewSection />
			<CTASection />
			<PartnerSection />
			{/* <TopPackages /> */}
		</>
	)
}

export default Home

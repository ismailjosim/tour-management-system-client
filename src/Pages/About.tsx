import PageHeading from '@/utils/PageHeading'
import img1 from '@/assets/images/bg1.jpg'
import ExploreSection from '../components/modules/about/ExploreSection'
import FeaturedSection from '../components/modules/homepage/FeaturedSection'
import TourGuideSection from '../components/modules/about/TourGuideSection'
import TestimonialsSection from '../components/modules/about/TestimonialsSection'
import AboutPartnersSection from '../components/modules/about/AboutPartnersSection'

const About = () => {
	return (
		<section>
			<PageHeading headTitle='About Us' sectionBackground={img1} />
			<ExploreSection />
			<FeaturedSection />
			<TourGuideSection />
			<TestimonialsSection />
			<AboutPartnersSection />
		</section>
	)
}

export default About

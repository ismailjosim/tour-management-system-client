import QuestionSection from '../components/modules/FAQs/QuestionSection'
import SubmitQuestionSection from '../components/modules/FAQs/SubmitQuestionSection'
import PartnerSection from '../components/modules/homepage/PartnerSection'
import PageHeading from '../utils/PageHeading'

const FAQs = () => {
	return (
		<div>
			<PageHeading headTitle={'faq'}></PageHeading>
			<QuestionSection />
			<SubmitQuestionSection />
			<PartnerSection />
		</div>
	)
}

export default FAQs

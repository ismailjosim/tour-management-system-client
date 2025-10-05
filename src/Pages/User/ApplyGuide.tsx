import ApplyGuideModal from '@/components/modules/User/ApplyGuideModal'
import GuideApplicationProfile from '@/components/modules/User/GuideApplicationProfile'
import { useState } from 'react'

const ApplyGuide = () => {
	const [isApplied, setIsApplied] = useState(false)

	return (
		<section className='container mx-auto'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-semibold'>Apply as a Guide</h1>
				{isApplied ? (
					<p>You have already applied as a guide.</p>
				) : (
					<ApplyGuideModal isApplied={isApplied} />
				)}
			</div>
			<div>
				<GuideApplicationProfile setIsApplied={setIsApplied} />
			</div>
		</section>
	)
}

export default ApplyGuide

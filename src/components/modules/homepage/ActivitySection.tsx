import camping from '@/assets/activity/camping-tent.png'
import cycling from '@/assets/activity/cycling.png'
import hiking from '@/assets/activity/hiking.png'
import safari from '@/assets/activity/safari.png'
import beach from '@/assets/activity/sunbed.png'
import surfing from '@/assets/activity/surf.png'
import SectionHeading from '@/utils/SectionHeading'
import { Card, CardContent } from '@/components/ui/card'

// TypeScript interfaces
interface HeadingData {
	subHeading: string
	headingOne: string
	headingTwo: string
	describe: string
}

interface ActivityData {
	id: number
	img: string
	title: string
}

const ActivitySection = () => {
	const heading: HeadingData = {
		subHeading: 'TRAVEL BY ACTIVITY',
		headingOne: 'ADVENTURE &',
		headingTwo: 'ACTIVITY',
		describe:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
	}

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
	]

	return (
		<section className='bg-muted/30 pb-10'>
			<div className='container mx-auto px-4 my-10'>
				<SectionHeading heading={heading} />
				<div className='grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-8'>
					{data.map((activity: ActivityData) => (
						<Card
							key={activity.id}
							className='group relative overflow-hidden hover:shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-2 border border-border/20 shadow-sm cursor-pointer'
						>
							<CardContent className='px-6 py-8 text-center flex flex-col justify-center items-center space-y-3 relative z-10'>
								<div className='w-16 h-16 flex items-center justify-center'>
									<img
										className='w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ease-in-out'
										src={activity.img}
										alt={`${activity.title} activity icon`}
										loading='lazy'
									/>
								</div>
								<h3 className='text-lg font-semibold capitalize text-foreground group-hover:text-primary -all duration-500 ease-in-out delay-300'>
									{activity.title}
								</h3>
							</CardContent>
							{/* Bottom sliding border animation */}
							<span className='absolute left-0 bottom-0 w-0 h-0.5 bg-teal-600 transition-all duration-500 ease-in-out group-hover:w-full cursor-pointer'></span>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
export default ActivitySection

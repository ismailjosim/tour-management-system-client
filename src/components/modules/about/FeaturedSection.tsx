import { Flag, MapPin, Compass, Globe } from 'lucide-react'
import { Card as ShadCard } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface CardProps {
	data: FeatureData
}

interface FeatureData {
	id: number
	icon: React.ReactNode
	title: string
	subtitle: string
	review: string
}

const featureData = [
	{
		id: 1,
		icon: <Flag className='h-6 w-6 text-primary' />,
		title: 'Tell Us What You Want To Do',
		subtitle:
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
		review: '100+ Reviews',
	},
	{
		id: 2,
		icon: <MapPin className='h-6 w-6 text-primary' />,
		title: 'Share Your Travel Locations',
		subtitle:
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
		review: '100+ Reviews',
	},
	{
		id: 3,
		icon: <Globe className='h-6 w-6 text-primary' />,
		title: 'Share Your Travel Preference',
		subtitle:
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
		review: '100+ Reviews',
	},
	{
		id: 4,
		icon: <Compass className='h-6 w-6 text-primary' />,
		title: 'Here 100% Trusted Tour Agency',
		subtitle:
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
		review: '100+ Reviews',
	},
]

const Card: React.FC<CardProps> = ({ data }) => {
	const { icon, title, subtitle, review } = data

	return (
		<ShadCard className='why-us-item p-12 border-2 rounded-xl'>
			<div className='why-us-content'>
				<p className='text-6xl text-primary mb-3 icon'>{icon}</p>
				<h4 className='font-semibold text-xl leading-6'>{title}</h4>
				<p className='my-4 text-base font-normal'>{subtitle}</p>
				<p className='mb-0 text-primary card_review'>{review}</p>
			</div>
		</ShadCard>
	)
}

const FeaturedSection = () => {
	return (
		<section className='container mx-auto py-12'>
			{/* Section Heading */}
			<div className='text-center mb-10'>
				<h3 className='text-lg font-semibold text-primary'>Core Features</h3>
				<h2 className='text-4xl md:text-5xl font-bold mt-2'>
					Find <span className='text-primary'>Travel Perfection</span>
				</h2>
				<p className='mt-4 text-muted-foreground max-w-2xl mx-auto'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore.
				</p>
			</div>

			{/* Feature Cards Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				{featureData.map((data) => (
					<Card key={data.id} data={data}></Card>
				))}
			</div>
			<Separator className='mt-12' />
		</section>
	)
}

export default FeaturedSection

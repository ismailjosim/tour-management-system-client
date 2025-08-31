import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Quote } from 'lucide-react'

import testBg from '@/assets/images/travel2.png'

const testimonialsData = [
	{
		name: 'Sarah Johnson',
		post: 'Marketing Manager',
		details:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error corrupti nesciunt veritatis, omnis deleniti consequatur ipsum itaque ullam adipisci sequi.',
	},
	{
		name: 'Michael Chen',
		post: 'Software Engineer',
		details:
			'The service was incredible from start to finish. Our guide was knowledgeable and the itinerary was perfectly planned. Highly recommend!',
	},
	{
		name: 'Emily Williams',
		post: 'Graphic Designer',
		details:
			'A truly unforgettable experience! Everything was seamless, and the team went above and beyond to ensure our trip was perfect.',
	},
]

const TestimonialsSection = () => {
	return (
		<section className='container mx-auto py-12'>
			{/* Section Heading */}
			<div className='text-center mb-10'>
				<h3 className='text-lg font-semibold text-primary'>Our Testimonials</h3>
				<h2 className='text-4xl md:text-5xl font-bold mt-2'>
					Good Reviews By <span className='text-primary'>Clients</span>
				</h2>
				<p className='mt-4 text-muted-foreground max-w-2xl mx-auto'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore.
				</p>
			</div>

			<div className='grid lg:grid-cols-2 md:grid-cols-1 gap-10 items-center'>
				{/* Left Column - Image */}
				<div className='hidden md:block'>
					<img src={testBg} alt='Travel background' className='w-full h-auto' />
				</div>

				{/* Right Column - Testimonial Cards */}
				<div className='space-y-6'>
					{testimonialsData.map((testimonial, idx) => (
						<Card key={idx} className='p-6'>
							<CardHeader className='flex flex-row items-center space-x-4 p-0'>
								<div className='w-16 h-16 rounded-full overflow-hidden flex-shrink-0'>
									<img
										src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${testimonial.name}`}
										alt={testimonial.name}
										className='w-full h-full object-cover'
									/>
								</div>
								<div>
									<CardTitle className='text-xl font-bold text-primary'>
										{testimonial.name}
									</CardTitle>
									<CardDescription className='text-muted-foreground'>
										{testimonial.post}
									</CardDescription>
								</div>
							</CardHeader>
							<CardContent className='p-0 mt-4'>
								<div className='flex items-start space-x-2'>
									<Quote className='text-primary h-6 w-6 flex-shrink-0' />
									<p className='text-muted-foreground italic leading-relaxed'>
										{testimonial.details}
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}

export default TestimonialsSection

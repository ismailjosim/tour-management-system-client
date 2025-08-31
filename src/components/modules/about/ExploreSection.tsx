import { Briefcase, Folder, Map } from 'lucide-react'
import image from '@/assets/images/travel.png'

const ExploreSection = () => {
	return (
		<section className='container mx-auto py-12'>
			<div className='flex lg:flex-row flex-col-reverse gap-8 items-center'>
				{/* Left Column - Text Content */}
				<div className='flex-1'>
					<h3 className='text-primary font-semibold text-lg'>Get To Know Us</h3>
					<h2 className='text-4xl md:text-5xl font-bold mt-2 leading-tight'>
						Explore All Tour of the World With Us.
					</h2>
					<p className='mt-4 text-muted-foreground'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
					<p className='mt-4 text-muted-foreground'>
						Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
						cupidatat non proident, sunt in culpa qui officia deserunt mollit
						anim id est laborum.
					</p>

					<div className='flex flex-wrap sm:justify-start justify-center items-center gap-6 mt-8'>
						<div className='flex items-center space-x-2'>
							<Briefcase className='text-primary h-6 w-6' />
							<span className='font-medium text-sm'>Tour Guide</span>
						</div>
						<div className='flex items-center space-x-2'>
							<Folder className='text-primary h-6 w-6' />
							<span className='font-medium text-sm'>Friendly Price</span>
						</div>
						<div className='flex items-center space-x-2'>
							<Map className='text-primary h-6 w-6' />
							<span className='font-medium text-sm'>Reliable Tour Package</span>
						</div>
					</div>
				</div>

				{/* Right Column - Image */}
				<div className='flex-1'>
					<img src={image} alt='' />
				</div>
			</div>
		</section>
	)
}

export default ExploreSection

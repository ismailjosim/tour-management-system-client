import React from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Phone, MapPin, Clock } from 'lucide-react'

const CTASection: React.FC = () => {
	return (
		<section className='bg-primary py-20 relative overflow-hidden'>
			{/* Background Pattern */}
			<div className='absolute inset-0 opacity-10'>
				<svg
					className='w-full h-full'
					viewBox='0 0 100 100'
					preserveAspectRatio='none'
				>
					<defs>
						<pattern
							id='grid'
							width='10'
							height='10'
							patternUnits='userSpaceOnUse'
						>
							<path
								d='M 10 0 L 0 0 0 10'
								fill='none'
								stroke='currentColor'
								strokeWidth='0.5'
							/>
						</pattern>
					</defs>
					<rect width='100' height='100' fill='url(#grid)' />
				</svg>
			</div>

			{/* Floating Elements */}
			<div className='absolute top-10 right-10 w-20 h-20 bg-primary-foreground/10 rounded-full blur-xl animate-pulse'></div>
			<div className='absolute bottom-10 left-10 w-32 h-32 bg-primary-foreground/5 rounded-full blur-2xl animate-pulse delay-1000'></div>

			<div className='container mx-auto px-4 relative z-10'>
				<div className='max-w-6xl mx-auto grid lg:grid-cols-2 grid-cols-1 gap-12 items-center text-primary-foreground'>
					{/* Content Section */}
					<div className='space-y-6'>
						<Badge
							variant='outline'
							className='border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-sm font-medium tracking-wide'
						>
							<Phone className='w-4 h-4 mr-2' />
							CALL TO ACTION
						</Badge>

						<h2 className='lg:text-5xl md:text-4xl text-3xl leading-tight font-bold'>
							READY FOR <span className='text-accent'>UNFORGETTABLE</span>{' '}
							TRAVEL?
							<br />
							<span className='text-muted-foreground'>REMEMBER US!</span>
						</h2>

						<p className='text-primary-foreground/80 text-lg leading-relaxed max-w-md'>
							Experience extraordinary journeys with personalized itineraries,
							expert guides, and unforgettable memories. Your next adventure
							awaits – let us make it extraordinary.
						</p>

						{/* Feature Points */}
						<div className='grid md:grid-cols-2 grid-cols-1 gap-4 pt-4'>
							<div className='flex items-center space-x-3'>
								<MapPin className='w-5 h-5 text-accent flex-shrink-0' />
								<span className='text-sm text-primary-foreground/70'>
									Worldwide Destinations
								</span>
							</div>
							<div className='flex items-center space-x-3'>
								<Clock className='w-5 h-5 text-accent flex-shrink-0' />
								<span className='text-sm text-primary-foreground/70'>
									24/7 Support
								</span>
							</div>
						</div>
					</div>

					{/* CTA Section */}
					<div className='flex flex-col lg:items-end items-center space-y-6'>
						{/* Main CTA Button */}
						<div className='text-center lg:text-right'>
							<p className='text-primary-foreground/70 mb-4 text-sm'>
								Start your journey today
							</p>

							<Link to='/contact'>
								<Button
									size='lg'
									variant='secondary'
									className='px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group'
								>
									Contact Us
									<ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300' />
								</Button>
							</Link>
						</div>

						{/* Secondary Actions */}
						<div className='flex flex-col sm:flex-row gap-4 text-center lg:text-right'>
							<Link to='/packages'>
								<Button
									variant='outline'
									className='border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50 backdrop-blur-sm'
								>
									View Packages
								</Button>
							</Link>

							<Link to='/about'>
								<Button
									variant='ghost'
									className='text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm'
								>
									Learn More
								</Button>
							</Link>
						</div>

						{/* Contact Info */}
						<div className='bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 mt-8 border border-primary-foreground/20'>
							<h4 className='font-semibold mb-3 text-primary-foreground'>
								Get In Touch
							</h4>
							<div className='space-y-2 text-sm text-primary-foreground/70'>
								<p className='flex items-center'>
									<Phone className='w-4 h-4 mr-2 text-accent' />
									+1 (555) 123-4567
								</p>
								<p className='flex items-center'>
									<MapPin className='w-4 h-4 mr-2 text-accent' />
									Available 24/7
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CTASection

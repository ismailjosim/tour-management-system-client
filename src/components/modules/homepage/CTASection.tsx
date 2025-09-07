import React from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Globe, Star } from 'lucide-react'

const CTASection: React.FC = () => {
	return (
		<section className='bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/80 dark:to-secondary/80 py-16 relative'>
			<div className='container mx-auto px-4'>
				<div className='max-w-4xl mx-auto text-center space-y-8'>
					{/* Badge */}
					<Badge className='bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary-foreground font-medium tracking-wide'>
						<Globe className='w-4 h-4 mr-2' />
						Explore the World
					</Badge>

					{/* Main Headline */}
					<h2 className='text-4xl md:text-5xl font-bold text-primary dark:text-primary-foreground'>
						Embark on Your{' '}
						<span className='text-accent dark:text-accent-foreground'>
							Dream Adventure
						</span>
					</h2>

					{/* Subheadline */}
					<p className='text-lg text-primary/80 dark:text-primary-foreground/80 max-w-2xl mx-auto'>
						Discover breathtaking destinations with curated travel experiences
						designed just for you. Let’s make your journey unforgettable.
					</p>

					{/* Feature Highlights */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-primary/80 dark:text-primary-foreground/80'>
						<div className='flex items-center justify-center space-x-2'>
							<Star className='w-5 h-5 text-accent dark:text-accent-foreground' />
							<span>Top-Rated Guides</span>
						</div>
						<div className='flex items-center justify-center space-x-2'>
							<Globe className='w-5 h-5 text-accent dark:text-accent-foreground' />
							<span>Global Itineraries</span>
						</div>
					</div>

					{/* CTA Buttons */}
					<div className='flex flex-col sm:flex-row justify-center gap-4'>
						<Link to='/contact'>
							<Button
								size='lg'
								className='bg-accent text-accent-foreground hover:bg-accent/90 dark:bg-accent-foreground dark:text-accent dark:hover:bg-accent-foreground/90 transition-transform transform hover:scale-105'
							>
								Plan Your Trip
								<ArrowRight className='w-5 h-5 ml-2' />
							</Button>
						</Link>
						<Link to='/destinations'>
							<Button
								variant='outline'
								className='border-primary/50 text-primary dark:border-primary-foreground/50 dark:text-primary-foreground hover:bg-primary/10 dark:hover:bg-primary-foreground/10'
							>
								Browse Destinations
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CTASection

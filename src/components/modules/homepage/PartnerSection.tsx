import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Handshake, Star, Award, Users, Globe, Shield } from 'lucide-react'

interface Partner {
	id: number
	name: string
	logo: string
	description: string
	category: 'airline' | 'hotel' | 'transport' | 'insurance' | 'activity'
	rating?: number
	established?: string
}

const PartnerSection: React.FC = () => {
	const partners: Partner[] = [
		{
			id: 1,
			name: 'SkyLine Airways',
			logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&h=100&fit=crop',
			description:
				'Premium airline services with global reach and exceptional comfort.',
			category: 'airline',
			rating: 4.8,
			established: '1995',
		},
		{
			id: 2,
			name: 'Grand Hotels',
			logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=100&fit=crop',
			description: 'Luxury accommodations in prime destinations worldwide.',
			category: 'hotel',
			rating: 4.9,
			established: '1987',
		},
		{
			id: 3,
			name: 'Elite Transport',
			logo: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=100&fit=crop',
			description: 'Professional ground transportation and tour services.',
			category: 'transport',
			rating: 4.7,
			established: '2001',
		},
		{
			id: 4,
			name: 'SecureTravel Insurance',
			logo: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&h=100&fit=crop',
			description: 'Comprehensive travel protection and peace of mind.',
			category: 'insurance',
			rating: 4.6,
			established: '1992',
		},
		{
			id: 5,
			name: 'Adventure Experiences',
			logo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=100&fit=crop',
			description: 'Unique activities and unforgettable adventure experiences.',
			category: 'activity',
			rating: 4.8,
			established: '2005',
		},
		{
			id: 6,
			name: 'Global Connect',
			logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=100&fit=crop',
			description: 'International connectivity and communication solutions.',
			category: 'transport',
			rating: 4.5,
			established: '1998',
		},
	]

	const getCategoryIcon = (category: Partner['category']) => {
		switch (category) {
			case 'airline':
				return <Globe className='w-5 h-5 text-primary' />
			case 'hotel':
				return <Award className='w-5 h-5 text-primary' />
			case 'transport':
				return <Users className='w-5 h-5 text-primary' />
			case 'insurance':
				return <Shield className='w-5 h-5 text-primary' />
			case 'activity':
				return <Star className='w-5 h-5 text-primary' />
			default:
				return <Handshake className='w-5 h-5 text-primary' />
		}
	}

	const getCategoryLabel = (category: Partner['category']) => {
		switch (category) {
			case 'airline':
				return 'Airlines'
			case 'hotel':
				return 'Hotels'
			case 'transport':
				return 'Transport'
			case 'insurance':
				return 'Insurance'
			case 'activity':
				return 'Activities'
			default:
				return 'Partner'
		}
	}

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, index) => (
			<Star
				key={index}
				className={`w-4 h-4 ${
					index < Math.floor(rating)
						? 'text-yellow-400 fill-yellow-400'
						: index < rating
						? 'text-yellow-400 fill-yellow-400/50'
						: 'text-muted-foreground/30'
				}`}
			/>
		))
	}

	return (
		<section className='py-20 bg-background'>
			<div className='container mx-auto px-4'>
				{/* Header */}
				<div className='text-center mb-16'>
					<Badge
						variant='outline'
						className='mb-4 text-sm font-medium tracking-wide'
					>
						<Handshake className='w-4 h-4 mr-2' />
						TRUSTED PARTNERS
					</Badge>

					<h2 className='text-4xl md:text-5xl font-bold mb-4'>
						Our <span className='text-primary'>Trusted</span> Partners
					</h2>

					<p className='text-muted-foreground text-lg max-w-3xl mx-auto'>
						We collaborate with industry-leading partners to provide you with
						exceptional travel experiences, ensuring quality, reliability, and
						value in every journey.
					</p>
				</div>

				{/* Stats Section */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-16'>
					<div className='text-center'>
						<div className='text-3xl font-bold text-primary mb-2'>150+</div>
						<div className='text-sm text-muted-foreground'>Global Partners</div>
					</div>
					<div className='text-center'>
						<div className='text-3xl font-bold text-primary mb-2'>25+</div>
						<div className='text-sm text-muted-foreground'>
							Years Experience
						</div>
					</div>
					<div className='text-center'>
						<div className='text-3xl font-bold text-primary mb-2'>4.8</div>
						<div className='text-sm text-muted-foreground'>Average Rating</div>
					</div>
					<div className='text-center'>
						<div className='text-3xl font-bold text-primary mb-2'>100%</div>
						<div className='text-sm text-muted-foreground'>Satisfaction</div>
					</div>
				</div>

				{/* Partners Grid */}
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
					{partners.map((partner) => (
						<Card
							key={partner.id}
							className='group hover:shadow-lg transition-all duration-300 border hover:border-primary/20'
						>
							<CardContent className='p-6'>
								{/* Partner Logo */}
								<div className='relative mb-6 overflow-hidden rounded-lg bg-muted'>
									<img
										src={partner.logo}
										alt={`${partner.name} logo`}
										className='w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300'
									/>
									<div className='absolute top-2 right-2'>
										{getCategoryIcon(partner.category)}
									</div>
								</div>

								{/* Partner Info */}
								<div className='space-y-4'>
									<div className='flex items-start justify-between'>
										<div>
											<h3 className='font-semibold text-lg text-foreground group-hover:text-primary transition-colors'>
												{partner.name}
											</h3>
											<Badge variant='secondary' className='mt-1 text-xs'>
												{getCategoryLabel(partner.category)}
											</Badge>
										</div>
										{partner.established && (
											<span className='text-xs text-muted-foreground'>
												Est. {partner.established}
											</span>
										)}
									</div>

									<p className='text-sm text-muted-foreground leading-relaxed'>
										{partner.description}
									</p>

									{/* Rating */}
									{partner.rating && (
										<div className='flex items-center gap-2'>
											<div className='flex items-center'>
												{renderStars(partner.rating)}
											</div>
											<span className='text-sm font-medium text-foreground'>
												{partner.rating}
											</span>
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Bottom CTA */}
				<div className='text-center mt-16 p-8 bg-muted/50 rounded-2xl'>
					<h3 className='text-2xl font-semibold mb-4'>
						Interested in <span className='text-primary'>Partnership?</span>
					</h3>
					<p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
						Join our network of trusted partners and help us deliver exceptional
						travel experiences to customers worldwide.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<button className='px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors'>
							Become a Partner
						</button>
						<button className='px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors'>
							Learn More
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default PartnerSection

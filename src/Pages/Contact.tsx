import React from 'react'
import PageHeading from '@/utils/PageHeading'
import ContactCard from '@/components/modules/contact/ContactCard'
import ContactForm from '@/components/modules/contact/ContactForm'
import MapRender from '../components/modules/map/MapRender'

const Contact: React.FC = () => {
	return (
		<section>
			<PageHeading headTitle={'contact us'} />
			<div className='min-h-screen bg-background'>
				<div className='text-center mb-12 px-4'>
					<h2 className='text-3xl font-bold text-foreground mb-4'>
						INFORMATION ABOUT US
					</h2>
					<p className='text-base font-medium text-muted-foreground max-w-2xl mx-auto'>
						Find our locations and get directions to reach us easily.
					</p>
				</div>
				<div className='container mx-auto mb-16 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
					<ContactCard />
				</div>

				<section className='pb-16 w-11/12 mx-auto'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
						<MapRender
							origin={{
								lat: 23.8103,
								lng: 90.4125,
								title: 'Dhaka',
							}}
							destination={{
								lat: 21.4272,
								lng: 92.0058,
								title: "Cox's Bazar",
							}}
							height='500px'
							zoom={8}
						/>
						<ContactForm />
					</div>
				</section>
			</div>
		</section>
	)
}

export default Contact

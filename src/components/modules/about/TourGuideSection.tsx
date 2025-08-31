import img01 from '@/assets/tour-guide/img1.jpg'
import img02 from '@/assets/tour-guide/img2.jpg'
import img03 from '@/assets/tour-guide/img3.jpg'
import img04 from '@/assets/tour-guide/img4.jpg'

const TourGuideSection = () => {
	const teams = [
		{
			name: 'Horke Pels',
			post: 'Head Officer',
			pic: img01,
		},
		{
			name: 'Cacics Coold',
			post: 'Asst. Manager',
			pic: img02,
		},
		{
			name: 'Solden Kalos',
			post: 'Senior Agent',
			pic: img03,
		},
		{
			name: 'Nelson Bam',
			post: 'Quality Assurance',
			pic: img04,
		},
	]

	return (
		<section className='container mx-auto py-12'>
			{/* Section Heading */}
			<div className='text-center mb-10'>
				<h3 className='text-lg font-semibold text-primary'>Tour Guides</h3>
				<h2 className='text-4xl md:text-5xl font-bold mt-2'>
					Meet Our <span className='text-primary'>Excellent Guides</span>
				</h2>
				<p className='mt-4 text-muted-foreground max-w-2xl mx-auto'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore.
				</p>
			</div>

			{/* Tour Guide Cards Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				{teams.map((team, idx) => {
					const { name, post, pic } = team
					return (
						<div key={idx} className='transition-all duration-500 rounded-t-lg'>
							<div className='overflow-hidden transition-all duration-500 rounded-t-lg'>
								<img
									className='transition-all duration-500 hover:scale-110 w-screen'
									src={pic}
									alt='team'
								/>
							</div>
							<div className='relative z-[1] transition-all hover:-mt-4 duration-500 text-center p-3 bg-primary text-white rounded-b-lg cursor-pointer pt-5'>
								<h4 className='mb-0 text-2xl font-bold capitalize'>{name}</h4>
								<p className='mb-0'>{post}</p>
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default TourGuideSection

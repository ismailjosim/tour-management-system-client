import { Separator } from '@/components/ui/separator'
import brand01 from '@/assets/brand/aboutBrand/brand01.png'
import brand02 from '@/assets/brand/aboutBrand/brand02.png'
import brand03 from '@/assets/brand/aboutBrand/brand03.png'
import brand04 from '@/assets/brand/aboutBrand/brand04.png'
import brand05 from '@/assets/brand/aboutBrand/brand05.png'
import brand06 from '@/assets/brand/aboutBrand/brand06.png'
import brand07 from '@/assets/brand/aboutBrand/brand07.png'
import brand08 from '@/assets/brand/aboutBrand/brand08.png'
import brand09 from '@/assets/brand/aboutBrand/brand09.png'
import brand10 from '@/assets/brand/aboutBrand/brand10.png'

const AboutPartnersSection = () => {
	const partnersData = [
		brand01,
		brand02,
		brand03,
		brand04,
		brand05,
		brand06,
		brand07,
		brand08,
		brand09,
		brand10,
	]
	return (
		<section className='container mx-auto py-12'>
			<div className='text-center mb-10'>
				<h2 className='text-4xl md:text-5xl font-bold mt-2'>
					Our <span className='text-primary'>Partners</span>
				</h2>
				<p className='mt-4 text-muted-foreground max-w-2xl mx-auto'>
					We are proud to partner with some of the best names in the travel
					industry.
				</p>
			</div>
			<div className='grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5'>
				{partnersData.map((brand, idx) => (
					<div
						key={idx}
						className='border border-input p-5 flex justify-center items-center'
					>
						<img
							className='w-full max-w-[80px] saturate-0 hover:saturate-100 transition-all duration-500'
							src={brand}
							alt=''
						/>
					</div>
				))}
			</div>
			<Separator className='mt-12' />
		</section>
	)
}

export default AboutPartnersSection

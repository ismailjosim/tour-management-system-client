import React from 'react'

interface GalleryProps {
	images: string[]
}

const DEFAULT_IMAGE =
	'https://via.placeholder.com/1200x800.png?text=No+Image+Available'

const Gallery: React.FC<GalleryProps> = ({ images }) => {
	const newGallery = images.length > 0 ? images : [DEFAULT_IMAGE]

	return (
		<div>
			{newGallery.length > 0 && newGallery[0] !== DEFAULT_IMAGE ? (
				<div className='grid md:grid-cols-2 gap-6'>
					{newGallery.map((image, idx) => (
						<div
							key={idx}
							className='aspect-video rounded-lg overflow-hidden shadow-md'
						>
							<img
								src={image}
								alt={`Gallery image ${idx + 1}`}
								className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
							/>
						</div>
					))}
				</div>
			) : (
				<p className='text-center text-gray-500 dark:text-gray-400'>
					No Gallery Images Found
				</p>
			)}
		</div>
	)
}

export default Gallery

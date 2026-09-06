import img01 from '@/assets/images/gallery (1).jpg';
import img02 from '@/assets/images/gallery (2).jpg';
import img03 from '@/assets/images/gallery (3).jpg';
import SectionHeading from '@/utils/SectionHeading';

// TypeScript interfaces
interface HeadingData {
  subHeading: string;
  headingOne: string;
  headingTwo: string;
  describe: string;
}

interface GalleryImage {
  src: string;
  alt: string;
  id: string;
}

const GallerySection = () => {
  const heading: HeadingData = {
    subHeading: 'Photo Gallery',
    headingOne: "Photo's From",
    headingTwo: 'Travelers',
    describe:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
  };

  const galleryImages: GalleryImage[] = [
    {
      src: img01,
      alt: 'Travelers sitting by mountain lake with backpacks',
      id: 'gallery-1',
    },
    { src: img02, alt: 'Mountain hikers on snowy peak', id: 'gallery-2' },
    {
      src: img03,
      alt: 'Hiker with orange jacket and backpack',
      id: 'gallery-3',
    },
  ];

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto">
        <SectionHeading heading={heading} />

        {/* Responsive Gallery Grid */}
        <div className="mt-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                <img
                  className="h-64 w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110 lg:h-80"
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
              <div className="hidden grid-cols-2 gap-6 lg:grid">
                <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                  <img
                    className="h-48 w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                    src={galleryImages[1].src}
                    alt={galleryImages[1].alt}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
                <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                  <img
                    className="h-48 w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
              </div>
            </div>

            {/* Right Column - Desktop Only */}
            <div className="hidden space-y-6 lg:block">
              <div className="grid grid-cols-2 gap-6">
                <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                  <img
                    className="h-48 w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                    src={galleryImages[1].src}
                    alt={galleryImages[1].alt}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
                <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                  <img
                    className="h-48 w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                <img
                  className="h-80 w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
            </div>

            {/* Mobile Additional Images */}
            <div className="space-y-6 lg:hidden">
              {galleryImages.slice(1).map((image) => (
                <div
                  key={`mobile-${image.id}`}
                  className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
                >
                  <img
                    className="h-64 w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

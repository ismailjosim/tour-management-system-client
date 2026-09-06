import { Link } from 'react-router';
import type { IDestination } from '@/types';
import { Star, MapPin, ArrowRight, Heart } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface DestinationCardProps {
  item: IDestination;
}

const DestinationGridCard: React.FC<DestinationCardProps> = ({ item }) => {
  const { images, title, location, tourType, slug, costFrom } = item || {};

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-4xl border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl dark:border-slate-800/50 dark:bg-slate-900">
      {/* Image Carousel */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Swiper modules={[Pagination]} pagination={{ clickable: true }} className="h-full w-full">
          {images && images.length > 0 ? (
            images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`${title} - image ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="h-full w-full bg-slate-200 dark:bg-slate-800" />
            </SwiperSlide>
          )}
        </Swiper>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold tracking-wide text-slate-800 uppercase shadow-sm backdrop-blur-md dark:bg-slate-900/90 dark:text-slate-200">
            {tourType?.name || 'Tour'}
          </span>
        </div>

        {/* Favorite Button */}
        <div className="absolute top-4 right-4 z-10">
          <button className="rounded-full bg-white/90 p-2 text-slate-400 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-red-500 active:scale-95 dark:bg-slate-900/90">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-start justify-between gap-4">
          <Link to={`/destination/${slug}`} className="transition-colors hover:text-[#D96C4A]">
            <h3
              className="line-clamp-1 text-xl leading-tight font-bold text-slate-900 capitalize dark:text-white"
              style={{ fontFamily: 'var(--font-heading, serif)' }}
            >
              {title}
            </h3>
          </Link>
          <div className="flex shrink-0 items-center gap-1 rounded-lg bg-slate-50 px-2 py-1 dark:bg-slate-800/50">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">4.8</span>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <MapPin className="h-4 w-4 shrink-0 text-[#0A3D62] dark:text-blue-400" />
          <span className="truncate text-sm font-medium">{location}</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <div className="min-w-0">
            <span className="mb-0.5 block text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              From
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#0A3D62] dark:text-blue-400">
                ${costFrom || 0}
              </span>
              <span className="text-xs font-medium text-slate-500">/person</span>
            </div>
          </div>

          <Link
            to={`/destination/${slug}`}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#D96C4A] px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-white shadow-md shadow-[#D96C4A]/20 transition-transform hover:scale-105 hover:bg-[#c25838] active:scale-95"
          >
            Quick Book
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationGridCard;

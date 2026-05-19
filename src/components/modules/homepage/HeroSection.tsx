/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative, Navigation, Pagination } from 'swiper/modules';
import gsap from 'gsap';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import slideImg01 from '@/assets/homepage/slide01.jpg';
import slideImg02 from '@/assets/homepage/slide02.jpg';
import ButtonNavigate from '../../../utils/ButtonNavigate';

interface SlideType {
  picture: string;
  subHeading: string;
  heading: string;
  description: string;
  btnText: string;
}

const slides: SlideType[] = [
  {
    picture: slideImg01,
    subHeading: 'Amazing Places',
    heading: 'Make Your Trip Fun & Noted',
    description:
      'Aperiam sociosqu urna praesent, tristique, corrupti condimentum asperiores platea ipsum ad arcu. Nostrud. Aut nostrum, ornare quas provident laoreet nesciunt.',
    btnText: 'Get Started',
  },
  {
    picture: slideImg02,
    subHeading: 'Amazing Places',
    heading: 'Make Your Trip Fun & Noted',
    description:
      'Aperiam sociosqu urna praesent, tristique, corrupti condimentum asperiores platea ipsum ad arcu. Nostrud. Aut nostrum, ornare quas provident laoreet nesciunt.',
    btnText: 'Get Started',
  },
];

const HeroSection = () => {
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);
  const swiperRef = useRef<any>(null);

  const onAutoplayTimeLeft = (_s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  useEffect(() => {
    const swiper = swiperRef.current.swiper;

    const animateSlide = (index: number) => {
      const slide = swiper.slides[index];
      const content = slide.querySelector('.slide-content');

      if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
      }
    };

    swiper.on('slideChange', () => {
      animateSlide(swiper.realIndex);
    });

    // Animate first slide on mount
    animateSlide(swiper.realIndex);

    return () => {
      swiper.off('slideChange');
    };
  }, []);

  return (
    <div className="relative w-full">
      <Swiper
        ref={swiperRef}
        speed={1000}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, EffectCreative, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        grabCursor={true}
        effect="creative"
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        className="h-[80vh] w-full overflow-hidden rounded-2xl shadow-xl"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative flex h-[80vh] w-full items-center justify-center">
              <img
                src={slide.picture}
                alt={slide.heading}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Overlay for dark mode */}
              <div className="absolute inset-0 bg-black/40 transition-colors duration-300 dark:bg-black/60" />

              <div className="slide-content relative z-10 max-w-2xl px-6 text-center">
                <h3 className="text-secondary text-lg font-semibold tracking-wide uppercase transition-colors duration-300 md:text-xl dark:text-gray-300">
                  {slide.subHeading}
                </h3>
                <h2 className="my-4 text-3xl font-extrabold text-white drop-shadow-lg transition-colors duration-300 md:text-5xl dark:text-gray-100">
                  {slide.heading}
                </h2>
                <p className="mb-6 text-base text-gray-100 transition-colors duration-300 md:text-lg dark:text-gray-300">
                  {slide.description}
                </p>

                <ButtonNavigate
                  btnText={slide.btnText}
                  destination={'/destinations'}
                  size="lg"
                ></ButtonNavigate>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Progress Circle */}
        <div className="absolute right-4 bottom-4 z-20 flex h-12 w-12 items-center justify-center font-bold">
          <svg
            className="stroke-primary dark:stroke-primary-dark absolute inset-0 h-full w-full -rotate-90 fill-none stroke-[4] transition-colors duration-300"
            viewBox="0 0 48 48"
            ref={progressCircle}
          >
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span
            className="text-primary dark:text-primary-dark font-semibold transition-colors duration-300"
            ref={progressContent}
          ></span>
        </div>
      </Swiper>
    </div>
  );
};

export default HeroSection;

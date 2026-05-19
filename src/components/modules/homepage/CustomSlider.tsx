import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import type { SliderProps } from '../../../types/home.type';

const CustomSlider: React.FC<SliderProps> = ({
  children,
  autoplay = true,
  autoplaySpeed = 5000,
  slidesToShow = 3,
  className = '',
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [responsiveSlides, setResponsiveSlides] = useState(slidesToShow);

  const totalSlides = children.length;
  const maxSlide = Math.max(0, totalSlides - responsiveSlides);

  // Responsive slides calculation
  const getResponsiveSlides = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return Math.min(2, slidesToShow);
      return slidesToShow;
    }
    return slidesToShow;
  }, [slidesToShow]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  }, [maxSlide]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  }, [maxSlide]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index <= maxSlide) {
        setCurrentSlide(index);
      }
    },
    [maxSlide]
  );

  // Handle autoplay
  useEffect(() => {
    if (!autoplay || isPaused || totalSlides <= responsiveSlides) return;

    const interval = setInterval(nextSlide, autoplaySpeed);
    return () => clearInterval(interval);
  }, [autoplay, autoplaySpeed, nextSlide, isPaused, totalSlides, responsiveSlides]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const newResponsiveSlides = getResponsiveSlides();
      setResponsiveSlides(newResponsiveSlides);

      // Adjust current slide if necessary
      const newMaxSlide = Math.max(0, totalSlides - newResponsiveSlides);
      if (currentSlide > newMaxSlide) {
        setCurrentSlide(newMaxSlide);
      }
    };

    // Set initial responsive slides
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getResponsiveSlides, totalSlides, currentSlide]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Don't render navigation if all items fit
  const showNavigation = totalSlides > responsiveSlides;
  const showDots = showNavigation && maxSlide > 0;

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main slider container */}
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * (100 / responsiveSlides)}%)`,
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / responsiveSlides}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {showNavigation && (
        <>
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="absolute top-1/2 left-0 z-10 -translate-x-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-3 shadow-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50 dark:hover:bg-gray-700 dark:focus:ring-blue-400"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === maxSlide}
            className="absolute top-1/2 right-0 z-10 translate-x-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-3 shadow-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50 dark:hover:bg-gray-700 dark:focus:ring-blue-400"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && (
        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-200 hover:scale-110 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900 ${
                currentSlide === index
                  ? 'bg-blue-600 shadow-md dark:bg-blue-500'
                  : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSlider;

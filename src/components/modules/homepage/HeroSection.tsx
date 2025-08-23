/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Navigation, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import slideImg01 from "@/assets/homepage/slide01.jpg";
import slideImg02 from "@/assets/homepage/slide02.jpg";

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
        subHeading: "Amazing Places",
        heading: "Make Your Trip Fun & Noted",
        description:
            "Aperiam sociosqu urna praesent, tristique, corrupti condimentum asperiores platea ipsum ad arcu. Nostrud. Aut nostrum, ornare quas provident laoreet nesciunt.",
        btnText: "Get Started",
    },
    {
        picture: slideImg02,
        subHeading: "Amazing Places",
        heading: "Make Your Trip Fun & Noted",
        description:
            "Aperiam sociosqu urna praesent, tristique, corrupti condimentum asperiores platea ipsum ad arcu. Nostrud. Aut nostrum, ornare quas provident laoreet nesciunt.",
        btnText: "Get Started",
    },
];

const HeroSection = () => {
    const progressCircle = useRef<SVGSVGElement | null>(null);
    const progressContent = useRef<HTMLSpanElement | null>(null);
    const swiperRef = useRef<any>(null);

    const onAutoplayTimeLeft = (_s: any, time: number, progress: number) => {
        if (progressCircle.current) {
            progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
        }
        if (progressContent.current) {
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };

    useEffect(() => {
        const swiper = swiperRef.current.swiper;

        const animateSlide = (index: number) => {
            const slide = swiper.slides[index];
            const content = slide.querySelector(".slide-content");

            if (content) {
                gsap.fromTo(
                    content,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
                );
            }
        };

        swiper.on("slideChange", () => {
            animateSlide(swiper.realIndex);
        });

        // Animate first slide on mount
        animateSlide(swiper.realIndex);

        return () => {
            swiper.off("slideChange");
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
                        translate: ["100%", 0, 0],
                    },
                }}
                className="w-full h-[80vh] rounded-2xl overflow-hidden shadow-xl"
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative w-full h-[80vh] flex items-center justify-center">
                            <img
                                src={slide.picture}
                                alt={slide.heading}
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Overlay for dark mode */}
                            <div className="absolute inset-0 bg-black/40 dark:bg-black/60 transition-colors duration-300" />

                            <div className="relative z-10 max-w-2xl text-center px-6 slide-content">
                                <h3 className="text-lg md:text-xl font-semibold uppercase tracking-wide text-secondary dark:text-gray-300 transition-colors duration-300">
                                    {slide.subHeading}
                                </h3>
                                <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg my-4 dark:text-gray-100 transition-colors duration-300">
                                    {slide.heading}
                                </h2>
                                <p className="text-base md:text-lg text-gray-100 mb-6 dark:text-gray-300 transition-colors duration-300">
                                    {slide.description}
                                </p>
                                <Button
                                    size="lg"
                                    className="bg-primary text-white shadow-lg dark:bg-primary-dark dark:text-white transition-colors duration-300"
                                >
                                    {slide.btnText}
                                </Button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Progress Circle */}
                <div className="absolute right-4 bottom-4 z-20 w-12 h-12 flex items-center justify-center font-bold">
                    <svg
                        className="absolute inset-0 w-full h-full stroke-primary fill-none -rotate-90 stroke-[4] dark:stroke-primary-dark transition-colors duration-300"
                        viewBox="0 0 48 48"
                        ref={progressCircle}
                    >
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span
                        className="text-primary font-semibold dark:text-primary-dark transition-colors duration-300"
                        ref={progressContent}
                    ></span>
                </div>
            </Swiper>
        </div>
    );
};

export default HeroSection;

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import HolidayForm from './QuickSearchSection';
import travelerLogo from '../../../assets/images/site-logo-light.png';
const HeroSection = () => {
  const [, setVideoStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Optimized Cloudinary URL
  const VIDEO_URL =
    'https://res.cloudinary.com/dggdr7ort/video/upload/q_auto,w_auto,dpr_auto,f_auto/v1788690432/BANGLADESH_8K_Video_Ultra_HD_60FPS_Dolby_Vision_-_Bangladesh_8K_HDR_udmfwe.mp4';
  const POSTER_URL =
    'https://res.cloudinary.com/dggdr7ort/video/upload/v1788690432/BANGLADESH_8K_Video_Ultra_HD_60FPS_Dolby_Vision_-_Bangladesh_8K_HDR_udmfwe.jpg';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      // Set video to start from 5 seconds
      video.currentTime = 5;
      video.play();
      setVideoStarted(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 h-full w-full">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER_URL}
          style={{ width: '100%', height: '100%', transform: 'scale(1.06)' }}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Watermark Logo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-15">
        <img src={travelerLogo} alt="Traveler Background" className="h-auto w-96" />
      </div>

      {/* Content Wrapper - Centered */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4">
        {/* Heading & Description Section */}
        <motion.div
          className="mb-12 w-full max-w-4xl text-center md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Discover the World's Best Destinations
          </motion.h1>

          <motion.p
            className="text-base text-white/95 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience extraordinary journeys crafted for the modern traveler.
            <br />
            Explore hidden gems and iconic landmarks.
          </motion.p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="rounded-2xl border border-white/20 bg-white/5 p-4 shadow-2xl backdrop-blur-xl md:p-6">
            <HolidayForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

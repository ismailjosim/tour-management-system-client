import { useState } from 'react';
import { Search, Calendar as CalendarIcon, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import heroBg from '@/assets/homepage/slide01.jpg';

const HeroSection = () => {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="relative flex h-[85vh] min-h-125 w-full flex-col items-center justify-center overflow-hidden bg-[#FBF9F5]">
      {/* Background Media */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src={heroBg}
          alt="Travel Destination"
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply dark:bg-black/40" />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 mx-auto mt-[-10vh] max-w-4xl px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          className="mb-6 text-4xl font-bold tracking-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl"
          style={{ fontFamily: 'var(--font-heading, serif)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Discover the World's Best Destinations
        </motion.h1>
        <motion.p
          className="mx-auto mb-10 max-w-2xl text-lg font-medium text-white/90 drop-shadow-md md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          Experience extraordinary journeys crafted for the modern traveler. Explore hidden gems and
          iconic landmarks.
        </motion.p>
      </motion.div>

      {/* Floating Search Widget */}
      <div className="absolute bottom-10 left-1/2 hidden w-11/12 max-w-5xl -translate-x-1/2">
        <motion.div
          className="rounded-2xl border border-white/20 bg-white/80 p-4 shadow-2xl backdrop-blur-xl md:rounded-4xl md:p-6 dark:bg-slate-900/80"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-4">
            {/* Destination */}
            <div className="space-y-1.5">
              <label className="ml-1 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Where are you going?"
                  className="h-12 rounded-xl border-slate-200 bg-white/50 pl-10 focus-visible:ring-[#0A3D62] dark:border-slate-700 dark:bg-slate-800/50"
                />
              </div>
            </div>

            {/* Travel Dates */}
            <div className="space-y-1.5">
              <label className="ml-1 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                Dates
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className="h-12 w-full justify-start rounded-xl border-slate-200 bg-white/50 pl-3 text-left font-normal focus-visible:ring-[#0A3D62] dark:border-slate-700 dark:bg-slate-800/50"
                  >
                    <CalendarIcon className="mr-2 h-5 w-5 text-slate-400" />
                    {date ? format(date, 'PPP') : <span className="text-slate-500">Add dates</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto rounded-xl p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests */}
            <div className="space-y-1.5">
              <label className="ml-1 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                Guests
              </label>
              <div className="relative">
                <Users className="absolute top-1/2 left-3 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Select>
                  <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-white/50 pl-10 focus:ring-[#0A3D62] dark:border-slate-700 dark:bg-slate-800/50">
                    <SelectValue placeholder="2 Adults" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Button */}
            <div>
              <Button className="h-12 w-full rounded-xl bg-[#D96C4A] text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-[#c25838] active:scale-[0.98]">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

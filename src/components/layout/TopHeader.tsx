import moment from 'moment';
import { CalendarDays, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const TopHeader = () => {
  const day = moment().format('dddd');
  const date = moment().format('LL');

  return (
    <div className="bg-primary hidden py-2 text-white lg:block">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side: Date */}
        <div className="flex gap-2 text-sm">
          <div className="flex items-center gap-2 border-r border-white pr-2">
            <CalendarDays className="h-4 w-4" />
            <span>{day}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{date}</span>
          </div>
        </div>

        {/* Right side: Social Icons */}
        <div className="flex items-center gap-4 text-lg">
          <a
            href="#"
            className="hover:text-secondary border-r border-white pr-3 transition-colors duration-300"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="hover:text-secondary border-r border-white pr-3 transition-colors duration-300"
            aria-label="Twitter"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="hover:text-secondary border-r border-white pr-3 transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="hover:text-secondary transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;

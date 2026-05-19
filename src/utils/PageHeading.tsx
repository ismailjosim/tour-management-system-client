import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import shapeLight from '@/assets/images/shapeLight.png';
import shapeDark from '@/assets/images/shapeDark.png';
import { useTheme } from '@/hooks/useTheme';
import defaultBG from '@/assets/destinations/destination2.jpg';

interface PageHeadingProps {
  headTitle: string;
  sectionBackground?: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ headTitle, sectionBackground = defaultBG }) => {
  const { theme } = useTheme();

  return (
    <section
      className={cn(
        'relative z-[1] justify-center bg-cover bg-fixed bg-top bg-no-repeat py-28 text-center'
      )}
      style={{ backgroundImage: `url(${sectionBackground || defaultBG})` }}
    >
      {/* Decorative Shape */}
      <div
        className={cn(
          'absolute bottom-0 left-0 z-[1] h-20 w-full origin-center rotate-180 bg-contain bg-repeat-x pt-28 pb-40'
        )}
        style={{
          backgroundImage: `url(${theme === 'dark' ? shapeDark : shapeLight})`,
        }}
      />

      {/* Content */}
      <div className="relative z-[1] bg-transparent md:pb-5 lg:pb-10">
        <div className="relative z-[1]">
          <h1 className="mb-6 text-3xl leading-tight font-bold text-white uppercase md:text-4xl lg:text-6xl">
            {headTitle}
          </h1>
          <nav>
            <ul className="m-0 flex items-center justify-center gap-1 p-0 font-medium text-white">
              <li>
                <Link to="/" className="text-primary hover:underline">
                  Home
                </Link>
              </li>
              <span>|</span>
              <li className="capitalize">{headTitle}</li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 h-full w-full bg-black/60" />
    </section>
  );
};

export default PageHeading;

import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

interface ButtonInterface {
  btnText: string;
  destination: string;
  size: 'default' | 'sm' | 'icon' | 'lg';
}

const ButtonNavigate = ({ btnText, destination, size }: ButtonInterface) => {
  return (
    <Button
      size={size ? size : 'sm'}
      className="group relative overflow-hidden border-none transition-all duration-500 ease-in-out"
      asChild
    >
      <Link to={destination} className="relative z-10">
        {/* Sliding background element */}
        <span className="absolute top-0 left-0 -z-10 h-full w-0 bg-yellow-400 transition-all duration-500 ease-in-out group-hover:w-full"></span>
        {btnText}
      </Link>
    </Button>
  );
};

export default ButtonNavigate;

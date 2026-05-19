import { Link } from 'react-router';
import logo from '@/assets/images/404-1.svg';
import ErrorImage from '@/assets/icons/404.png';
import { Button } from '../components/ui/button';

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col-reverse items-center justify-center gap-16 px-4 py-24 md:gap-28 md:px-44 md:py-20 lg:flex-row lg:px-24 lg:py-24">
      <div className="relative w-full pb-12 lg:pb-0 xl:w-1/2 xl:pt-24">
        <div className="relative">
          <div className="absolute">
            <div className="flex flex-col gap-2">
              <h1 className="dark:text-primary my-2 text-2xl font-bold text-gray-800">
                Oops! Page Not Found
              </h1>
              <p className="dark:text-primary my-2 text-gray-800">
                We Are Sorry, But The Page You Requested Was Not Found.
              </p>
              <Link to={'/'}>
                <Button>Back To Home</Button>
              </Link>
            </div>
          </div>
          <div>
            <img alt="" src={ErrorImage} />
          </div>
        </div>
      </div>
      <div>
        <img alt="" src={logo} />
      </div>
    </div>
  );
};

export default ErrorPage;

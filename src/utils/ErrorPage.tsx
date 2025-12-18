import { Link } from 'react-router'
import logo from '@/assets/images/404-1.svg'
import ErrorImage from '@/assets/icons/404.png'
import { Button } from '../components/ui/button'

const ErrorPage: React.FC = () => {
	return (
		<div className='lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16'>
			<div className='xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0'>
				<div className='relative'>
					<div className='absolute'>
						<div className='flex flex-col  gap-2'>
							<h1 className='my-2 text-gray-800 dark:text-primary font-bold text-2xl'>
								Oops! Page Not Found
							</h1>
							<p className='my-2 text-gray-800 dark:text-primary'>
								We Are Sorry, But The Page You Requested Was Not Found.
							</p>
							<Link to={'/'}>
								<Button>Back To Home</Button>
							</Link>
						</div>
					</div>
					<div>
						<img alt='' src={ErrorImage} />
					</div>
				</div>
			</div>
			<div>
				<img alt='' src={logo} />
			</div>
		</div>
	)
}

export default ErrorPage

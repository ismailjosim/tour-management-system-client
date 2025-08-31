import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

interface ButtonInterface {
	btnText: string
	destination: string
	size: 'default' | 'sm' | 'icon' | 'lg'
}

const ButtonNavigate = ({ btnText, destination, size }: ButtonInterface) => {
	return (
		<Button
			size={size ? size : 'sm'}
			className='relative overflow-hidden border-none transition-all duration-500 ease-in-out group'
			asChild
		>
			<Link to={destination} className='relative z-10'>
				{/* Sliding background element */}
				<span className='absolute left-0 top-0 h-full w-0 bg-yellow-400 transition-all duration-500 ease-in-out group-hover:w-full -z-10'></span>
				{btnText}
			</Link>
		</Button>
	)
}

export default ButtonNavigate

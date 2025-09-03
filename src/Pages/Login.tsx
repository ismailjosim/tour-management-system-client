import { Link } from 'react-router'
import logoBlack from '@/assets/images/site-logo-dark.png'
import logoWhile from '@/assets/images/site-logo-light.png'
import loginBG from '@/assets/images/login.jpg'
import { useTheme } from '@/hooks/useTheme'
import { LoginForm } from '@/components/modules/Auth/LoginForm'

const Login = () => {
	const { theme } = useTheme()
	return (
		<div className='grid min-h-svh lg:grid-cols-2'>
			<div className='flex flex-col gap-4 p-6 md:p-10'>
				<div className='flex justify-center gap-2 md:justify-start'>
					<Link to='/' className='flex items-center gap-2 font-medium'>
						<img
							src={theme === 'dark' ? logoWhile : logoBlack}
							alt='Site logo'
						/>
					</Link>
				</div>
				<div className='flex flex-1 items-center justify-center'>
					<div className='w-full max-w-xs'>
						<LoginForm />
					</div>
				</div>
			</div>
			<div className=' relative hidden lg:block'>
				<img
					src={loginBG}
					alt='Image'
					className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] '
				/>
			</div>
		</div>
	)
}

export default Login

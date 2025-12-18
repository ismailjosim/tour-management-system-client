import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Password from '@/components/ui/Password'
import { toast } from 'sonner'
import { useLoginMutation } from '@/redux/features/auth/auth.api'
import config from '@/config'
import type { ApiError } from '@/types'
import { loginSchema } from '@/Schema/zodValidationSchemas'
import { FaGoogle } from 'react-icons/fa'
import { Checkbox } from '../../ui/checkbox'

export function LoginForm({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const [login] = useLoginMutation()
	const navigate = useNavigate()
	// const location = useLocation()
	// const from = location.state?.from || '/'

	// const navigateNow = () => {
	// 	setTimeout(() => {
	// 		navigate(from, { replace: true })
	// 	}, 1000)
	// }

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: z.infer<typeof loginSchema>) => {
		const userInfo = {
			email: data.email,
			password: data.password,
		}
		try {
			const result = await login(userInfo).unwrap()
			if (result.success) {
				toast.success(result.message)
				navigate('/')
			}
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError.data.message)

			if ('status' in apiError && apiError.status === 401) {
				navigate('/verify', { state: data.email })
			}
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<div className='flex flex-col items-center gap-2 text-center'>
				<h1 className='text-2xl font-bold'>Login to your account</h1>
				<p className='text-muted-foreground text-sm text-balance'>
					Enter your email below to login to your account
				</p>
			</div>
			<div className='grid gap-6'>
				<Form {...form}>
					<form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input placeholder='example@traveler.com' {...field} />
									</FormControl>
									<FormDescription></FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Password {...field} />
									</FormControl>
									<FormDescription></FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='flex justify-between items-center'>
							<p className='space-x-2'>
								<Checkbox />
								<span>Remember Me</span>
							</p>
							<Link className='text-primary underline' to={'/forgot-password'}>
								Forgot Password?
							</Link>
						</div>

						<Button className='w-full' type='submit'>
							Submit
						</Button>
					</form>
				</Form>

				<div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
					<span className='bg-background text-muted-foreground relative z-10 px-2'>
						Or continue with
					</span>
				</div>
				<Button
					onClick={() =>
						(document.location.href = `${config.baseUrl}/auth/google`)
					}
					variant='outline'
					className='w-full'
				>
					<FaGoogle />
					Login with Google
				</Button>
			</div>
			<div className='text-center text-sm'>
				Don&apos;t have an account?{' '}
				<Link to={'/register'} className='underline underline-offset-4'>
					Register
				</Link>
			</div>
		</div>
	)
}

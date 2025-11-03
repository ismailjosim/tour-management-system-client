import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams, useNavigate } from 'react-router'
import { useResetPasswordMutation } from '../redux/features/auth/auth.api'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useState } from 'react'

// UI Components
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa6'
import { ArrowBigLeft } from 'lucide-react'
import { Link } from 'react-router'
import type { ApiError } from '../types'

// ------------------ Validation Schema ------------------
const resetPasswordSchema = z
	.object({
		newPassword: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.regex(/[A-Z]/, 'Must contain an uppercase letter')
			.regex(/[a-z]/, 'Must contain a lowercase letter')
			.regex(/[0-9]/, 'Must contain a number')
			.regex(/[@$!%*?&]/, 'Must contain a special character'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})

// ------------------ Component ------------------
const ResetPassword = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const [resetPassword] = useResetPasswordMutation()
	const [showNewPassword, setShowNewPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const id = searchParams.get('id')
	const token = searchParams.get('token')

	const form = useForm<z.infer<typeof resetPasswordSchema>>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			newPassword: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
		if (!id || !token) {
			toast.error('Invalid or missing reset link')
			return
		}

		const payload = {
			id,
			newPassword: data.newPassword,
			token,
		}

		console.log('🚀 Sending payload:', payload)

		try {
			const result = await resetPassword(payload).unwrap()
			console.log('✅ Success:', result)
			toast.success(result.message)
			navigate('/login')
		} catch (error) {
			console.error('❌ Error:', error)
			const apiError = error as ApiError
			toast.error(apiError?.data?.message || 'Failed to reset password')
		}
	}

	return (
		<section
			className={cn(
				'flex items-center justify-center min-h-screen px-4',
				className,
			)}
		>
			<div className='w-full max-w-md space-y-8 text-center'>
				{/* Icon */}
				<div className='flex justify-center'>
					<div className='bg-muted/10 rounded-full p-4'>
						<FaLock className='text-3xl text-primary' />
					</div>
				</div>

				{/* Heading */}
				<div>
					<h2 className='text-2xl font-bold'>Reset Password</h2>
					<p className='text-muted-foreground text-sm mt-1'>
						Enter your new password below
					</p>
				</div>

				{/* Form */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='bg-card border rounded-xl p-6 space-y-5 shadow-sm text-left'
					>
						<FormField
							control={form.control}
							name='newPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												type={showNewPassword ? 'text' : 'password'}
												placeholder='Enter new password'
												{...field}
											/>
											<button
												type='button'
												className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground'
												onClick={() => setShowNewPassword(!showNewPassword)}
											>
												{showNewPassword ? <FaEyeSlash /> : <FaEye />}
											</button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												type={showConfirmPassword ? 'text' : 'password'}
												placeholder='Confirm your new password'
												{...field}
											/>
											<button
												type='button'
												className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground'
												onClick={() =>
													setShowConfirmPassword(!showConfirmPassword)
												}
											>
												{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
											</button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full'>
							Reset Password
						</Button>
					</form>
				</Form>

				{/* Back to Home */}
				<Button asChild variant='outline' className='w-full'>
					<Link to='/'>
						<ArrowBigLeft className='mr-2' /> Back to Home
					</Link>
				</Button>
			</div>
		</section>
	)
}

export default ResetPassword

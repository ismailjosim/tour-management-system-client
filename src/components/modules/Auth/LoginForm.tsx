/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useLoginMutation } from '../../../redux/features/auth/auth.api'

const loginSchema = z.object({
    email: z
        .email({ message: 'Please enter a valid email address.' })
        .min(1, { message: 'Email is required.' }),

    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long.' })
        .max(100, { message: 'Password cannot exceed 100 characters.' })
        .regex(/[A-Z]/, {
            message: 'Password must contain at least one uppercase letter.',
        })
        .regex(/[a-z]/, {
            message: 'Password must contain at least one lowercase letter.',
        })
        .regex(/[0-9]/, {
            message: 'Password must contain at least one number.',
        })
        .regex(/[@$!%*?&]/, {
            message:
                'Password must contain at least one special character (@, $, !, %, *, ?, &).',
        }),
})

export function LoginForm({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const [login] = useLoginMutation()
    const navigate = useNavigate()



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
                // navigate('/verify')
            }
        } catch (error: any) {
            toast.error(error.data.message)
            if (error.status === 401) {
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
                <Button variant='outline' className='w-full'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                        <path
                            d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                            fill='currentColor'
                        />
                    </svg>
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


import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { Dot } from 'lucide-react'

import { cn } from '../lib/utils'
import { useSendOTPMutation, useVerifyOTPMutation } from '../redux/features/auth/auth.api'

// UI Components
import { Button } from '@/components/ui/button'
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form'
import {
    InputOTP, InputOTPGroup, InputOTPSlot,
} from '@/components/ui/input-otp'
import {
    Card, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card'
import type { ApiError } from '../types'

// ---------------- Schema ----------------
const FormSchema = z.object({
    pin: z.string().min(6, {
        message: 'Your OTP must be 6 characters.',
    }),
})

// ---------------- Constants ----------------
const OTP_SLOT_CLASSES =
    'w-12 h-14 text-center text-xl font-bold rounded-lg border-2 bg-gray-700 text-white border-gray-600 focus:outline-none focus:border-teal-500 transition-all duration-200'

// ---------------- Component ----------------
const Verify = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [email] = useState(location.state)
    const [confirm, setConfirm] = useState(false)
    const [timer, setTimer] = useState(120)

    const [sendOTP] = useSendOTPMutation()
    const [verifyOTP] = useVerifyOTPMutation()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { pin: '' },
    })

    // Redirect if no email
    useEffect(() => {
        if (!email) navigate('/')
    }, [email, navigate])

    // Timer countdown
    useEffect(() => {
        const timerId = setInterval(() => {
            if (email && confirm) {
                setTimer(prev => (prev > 0 ? prev - 1 : 0))
            }
        }, 1000)
        return () => clearInterval(timerId)
    }, [email, confirm])

    // ---------------- Handlers ----------------
    const handleSendOtp = async () => {
        const toastId = toast.loading('Sending OTP')
        try {
            const result = await sendOTP({ email }).unwrap()
            if (result.success) {
                toast.success(result.message, { id: toastId })
                setConfirm(true)
                setTimer(120)
            }
        } catch (error: unknown) {
            const apiError = error as ApiError
            toast.error(apiError?.message || "Something went wrong")
        }
    }

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const toastId = toast.loading('Verifying OTP')
        try {
            const res = await verifyOTP({ email, otp: data.pin }).unwrap()
            if (res.success) {
                toast.success(res.message, { id: toastId })
                navigate('/login')
            }
        } catch (error: unknown) {
            const apiError = error as ApiError
            toast.error(apiError?.message || "Something went wrong")
        }
    }

    // ---------------- JSX ----------------
    return (
        <section className="grid place-content-center h-screen">
            {confirm ? (
                <div className="flex flex-col items-center justify-center">
                    <div className="max-w-md w-full p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
                        {/* Header */}
                        <h2 className="text-3xl font-bold text-center text-white mb-2">
                            OTP Verification
                        </h2>
                        <p className="text-center text-gray-400 mb-6">
                            A one-time password has been sent to{' '}
                            <span className="font-bold text-teal-400">{email}</span>.
                        </p>

                        {/* Form */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="pin"
                                    render={({ field }) => (
                                        <FormItem className="text-center">
                                            <FormLabel>Enter 6-digit OTP</FormLabel>
                                            <FormControl>
                                                <InputOTP maxLength={6} {...field}>
                                                    <InputOTPGroup className="flex w-full space-x-2 justify-center items-center">
                                                        {[0, 1, 2].map(i => (
                                                            <InputOTPSlot key={i} className={OTP_SLOT_CLASSES} index={i} />
                                                        ))}
                                                        <Dot />
                                                        {[3, 4, 5].map(i => (
                                                            <InputOTPSlot key={i} className={OTP_SLOT_CLASSES} index={i} />
                                                        ))}
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    className="w-full cursor-pointer py-3 px-4 rounded-xl shadow-lg font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors duration-200"
                                    type="submit"
                                >
                                    Verify Account
                                </Button>
                            </form>
                        </Form>

                        {/* Resend Section */}
                        <div className="mt-6 text-center text-sm">
                            <p className="text-gray-400">Didn't receive the code?</p>
                            <button
                                disabled={timer !== 0}
                                type="button"
                                onClick={handleSendOtp}
                                className={cn(
                                    'font-medium focus:outline-none hover:underline',
                                    timer === 0
                                        ? 'text-teal-500 cursor-pointer'
                                        : 'text-teal-500/40 cursor-not-allowed'
                                )}
                            >
                                Resend OTP
                            </button>
                            {timer !== 0 && (
                                <span className="ml-2 text-gray-400">{timer}s</span>
                            )}
                        </div>

                        {/* Back to login */}
                        <div className="mt-4 text-center">
                            <Link
                                to="/login"
                                className="text-gray-400 hover:text-teal-500 transition-colors duration-200"
                            >
                                &larr; Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                // Initial confirm card
                <div className="flex flex-col items-center justify-center">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Verify your email address</CardTitle>
                            <CardDescription>
                                We will send you an OTP at <br /> {email}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-end">
                            <Button onClick={handleSendOtp} className="w-[300px]">
                                Confirm
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </section>
    )
}

export default Verify

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";





const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your OTP Must be 6 characters.",
    }),
})






const Verify = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [email] = useState(location.state)


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log(data);
    }

    useEffect(() => {
        if (!email) {
            navigate('/')
        }

    }, [email])

    const handleResend = () => {
        console.log('Resending OTP to:', email);
        // Here you would make an API call to resend the OTP
        toast.info('OTP Resent', {
            description: 'A new OTP has been sent to your email.',
        });
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-gray-200">
            <div className="max-w-md w-full p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
                <h2 className="text-3xl font-bold text-center text-white mb-2">OTP Verification</h2>
                <p className="text-center text-gray-400 mb-6">
                    A one-time password has been sent to <span className="font-bold text-teal-400">{email || 'your email address'}</span>.
                </p>

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
                                            <InputOTPGroup className="flex w-full space-x-2 justify-center items-center ">
                                                <InputOTPSlot className="w-12 h-14 text-center text-xl font-bold rounded-lg border-2 bg-gray-700 text-white border-gray-600 focus:outline-none focus:border-teal-500 transition-all duration-200" index={0} />
                                                <InputOTPSlot className="w-12 h-14 text-center text-xl font-bold rounded-lg border-2 bg-gray-700 text-white border-gray-600 focus:outline-none focus:border-teal-500 transition-all duration-200" index={1} />
                                                <InputOTPSlot className="w-12 h-14 text-center text-xl font-bold rounded-lg border-2 bg-gray-700 text-white border-gray-600 focus:outline-none focus:border-teal-500 transition-all duration-200" index={2} />
                                                <InputOTPSlot className="w-12 h-14 text-center text-xl font-bold rounded-lg border-2 bg-gray-700 text-white border-gray-600 focus:outline-none focus:border-teal-500 transition-all duration-200" index={3} />
                                                <InputOTPSlot className="w-12 h-14 text-center text-xl font-bold rounded-lg border-2 bg-gray-700 text-white border-gray-600 focus:outline-none focus:border-teal-500 transition-all duration-200" index={4} />
                                                <InputOTPSlot className="w-12 h-14 text-center text-xl font-bold rounded-lg border-2 bg-gray-700 text-white border-gray-600 focus:outline-none focus:border-teal-500 transition-all duration-200" index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full py-3 px-4 rounded-xl shadow-lg font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors duration-200" type="submit">Verify Account</Button>
                    </form>
                </Form>

                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-400">Didn't receive the code?</p>
                    <button
                        onClick={handleResend}
                        className="text-teal-500 font-medium hover:underline focus:outline-none"
                    >
                        Resend OTP
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <Link to={'/login'} className="text-gray-400 hover:text-teal-500 transition-colors duration-200">
                        &larr; Back to Login
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Verify;





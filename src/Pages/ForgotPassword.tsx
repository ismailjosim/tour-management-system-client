import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import { FaLock, FaEnvelopeOpenText } from 'react-icons/fa6';
import { ArrowBigLeft } from 'lucide-react';
import { Link } from 'react-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { ApiError } from '../types';
import { useForgotPasswordMutation } from '../redux/features/auth/auth.api';

// ✅ Zod validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const ForgotPassword = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [forgotPassword] = useForgotPasswordMutation();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    try {
      const result = await forgotPassword(data.email).unwrap();
      if (result.success) {
        console.log(result);
        toast.success(result.message);

        setUserEmail(data.email);
        setEmailSent(true);
      }

      toast.success('Password reset instructions sent!');
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.data.message || 'Failed to send reset email. Try again.');
    }
  };

  return (
    <section className={cn('flex min-h-screen items-center justify-center px-4', className)}>
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Conditional Rendering */}
        {emailSent ? (
          <Card className="bg-card border-border border p-8 shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="bg-muted/10 rounded-full p-4">
                <FaEnvelopeOpenText className="text-primary text-3xl" />
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
              <CardDescription>
                We&apos;ve sent a verification link to{' '}
                <span className="text-primary font-medium">{userEmail}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mt-3 text-sm">
                Check your inbox for a verification link. Please also check your spam folder.
              </p>
            </CardContent>
            <Button asChild className="mt-6 w-full">
              <Link to="/login">Back to Login</Link>
            </Button>
          </Card>
        ) : (
          <>
            {/* Icon */}
            <div className="flex justify-center">
              <div className="bg-muted/10 rounded-full p-4">
                <FaLock className="text-primary text-3xl" />
              </div>
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-2xl font-bold">Forgot password</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                No worries, we&apos;ll send you reset instructions
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-card space-y-5 rounded-xl border p-6 shadow-sm"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email here" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Next
                </Button>
              </form>
            </Form>

            {/* Back Button */}
            <Button asChild variant="outline" className="w-full">
              <Link to="/">
                <ArrowBigLeft /> Back to Home
              </Link>
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;

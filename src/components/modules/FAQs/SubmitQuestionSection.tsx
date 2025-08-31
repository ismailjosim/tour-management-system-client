'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

import SectionHeading from '../../../utils/SectionHeading'
import logo from '@/assets/images/trending4.jpg'

const formSchema = z.object({
	fullName: z.string().min(2, 'Full name is required'),
	phone: z.string().min(5, 'Phone number is required'),
	email: z.string().email('Enter a valid email'),
	destination: z.string().min(1, 'Please select a destination'),
	message: z.string().min(5, 'Message must be at least 5 characters'),
})

type FormValues = z.infer<typeof formSchema>

const SubmitQuestionSection: React.FC = () => {
	const heading = {
		subHeading: '',
		headingOne: 'Do You Have Any',
		headingTwo: 'Questions?',
		describe:
			"As opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum.",
	}

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			phone: '',
			email: '',
			destination: '',
			message: '',
		},
	})

	const onSubmit = (data: FormValues) => {
		console.log('Form Submitted:', data)
	}

	return (
		<div>
			<SectionHeading heading={heading} />

			<section className='container mx-auto mb-16'>
				<div className='flex flex-col lg:flex-row gap-5'>
					{/* Image Section */}
					<div className='flex-1'>
						<img
							alt='Question Illustration'
							src={logo}
							className='w-full h-full object-cover rounded-lg'
						/>
					</div>

					<div className='flex-1'>
						<Card className='h-full'>
							<CardContent>
								<form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
									<div className='grid lg:grid-cols-2 space-y-2 gap-5'>
										<div className='space-y-2'>
											<Label htmlFor='fullName'>Full Name</Label>
											<Input
												id='fullName'
												placeholder='Full Name'
												{...register('fullName')}
											/>
											{errors.fullName && (
												<p className='text-sm text-red-500'>
													{errors.fullName.message}
												</p>
											)}
										</div>

										<div className='space-y-2'>
											<Label htmlFor='phone'>Phone No</Label>
											<Input
												id='phone'
												placeholder='Phone Number'
												{...register('phone')}
											/>
											{errors.phone && (
												<p className='text-sm text-red-500'>
													{errors.phone.message}
												</p>
											)}
										</div>

										<div className='space-y-2'>
											<Label htmlFor='email'>Email Address</Label>
											<Input
												id='email'
												placeholder='Email Address'
												{...register('email')}
											/>
											{errors.email && (
												<p className='text-sm text-red-500'>
													{errors.email.message}
												</p>
											)}
										</div>

										<div className='space-y-2'>
											<Label htmlFor='destination'>Destination</Label>
											<Select
												onValueChange={(val) => setValue('destination', val)}
											>
												<Select
													onValueChange={(val) => setValue('destination', val)}
												>
													<SelectTrigger id='destination' className='w-full'>
														<SelectValue placeholder='Select Location' />
													</SelectTrigger>
													<SelectContent>
														{[
															'Afghanistan',
															'Albania',
															'Algeria',
															'Bangladesh',
															'Canada',
															'France',
															'Germany',
															'India',
															'Japan',
															'Malaysia',
															'United States',
														].map((country) => (
															<SelectItem key={country} value={country}>
																{country}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</Select>
											{errors.destination && (
												<p className='text-sm text-red-500'>
													{errors.destination.message}
												</p>
											)}
										</div>
									</div>

									<div className='space-y-2'>
										<Label htmlFor='message'>Message</Label>
										<Textarea
											id='message'
											rows={10}
											className='w-full min-h-56'
											placeholder='Type your message here...'
											{...register('message')}
										/>
										{errors.message && (
											<p className='text-sm text-red-500'>
												{errors.message.message}
											</p>
										)}
									</div>

									<div className='text-center pt-4'>
										<Button type='submit' className='px-6 w-full'>
											Send Message
										</Button>
									</div>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</div>
	)
}

export default SubmitQuestionSection

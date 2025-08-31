import React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import PageHeading from '../utils/PageHeading'

interface ContactCardData {
	icon: React.ReactNode
	title: string
	details1: string
	details2: string
}

const Contact: React.FC = () => {
	const cardData: ContactCardData[] = [
		{
			icon: <MapPin className='w-12 h-12' />,
			title: 'Office Location',
			details1: '445 Mount Eden Road, Mt Eden Basundhara Chakrapath',
			details2: '',
		},
		{
			icon: <Phone className='w-12 h-12' />,
			title: 'Phone Number',
			details1: '977-444-222-000',
			details2: '977-444-222-000',
		},
		{
			icon: <Mail className='w-12 h-12' />,
			title: 'Email Address',
			details1: 'contact@traveler.com',
			details2: 'info@traveler.com',
		},
	]

	const handleSubmit = (): void => {
		console.log('Form submitted')
	}

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	): void => {
		console.log('Input changed:', event.target.name, event.target.value)
	}

	return (
		<section>
			<PageHeading headTitle={'contact us'} />
			<div className='min-h-screen bg-background'>
				<div className='text-center mb-12 px-4'>
					<h2 className='text-3xl font-bold text-foreground mb-4'>
						INFORMATION ABOUT US
					</h2>
					<p className='text-base font-medium text-muted-foreground max-w-2xl mx-auto'>
						Sagittis posuere id nam quis vestibulum vestibulum a facilisi at
						elit hendrerit scelerisque sodales nam dis orci.
					</p>
				</div>

				<div className='w-11/12 mx-auto mb-16 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
					{cardData.map((data: ContactCardData, idx: number) => (
						<Card
							key={idx}
							className='border border-border shadow-sm hover:shadow-md transition-shadow bg-card'
						>
							<CardContent className='p-6 flex flex-col items-center text-center'>
								<div className='text-primary mb-6'>{data.icon}</div>
								<div>
									<h3 className='text-xl font-semibold mb-4 text-foreground'>
										{data.title}
									</h3>
									<p className='text-muted-foreground mb-2'>{data.details1}</p>
									{data.details2 && (
										<p className='text-muted-foreground'>{data.details2}</p>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<section className='pb-16 w-11/12 mx-auto'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
						{/* Map */}
						<div className='w-full'>
							<iframe
								className='w-full rounded-lg shadow-sm'
								title='Office Location Map'
								height={500}
								src='https://maps.google.com/maps?q=Bhola,%20barishal,%20bangladesh&t=&z=11&ie=UTF8&iwloc=&output=embed'
								style={{ border: 0 }}
								allowFullScreen
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'
							/>
						</div>

						{/* Form */}
						<Card className='shadow-sm bg-card border border-border'>
							<CardContent className='p-6'>
								<div className='space-y-6'>
									<Input
										type='text'
										name='firstName'
										placeholder='First Name'
										className='w-full'
										onChange={handleInputChange}
									/>
									<Input
										type='text'
										name='lastName'
										placeholder='Last Name'
										className='w-full'
										onChange={handleInputChange}
									/>
									<Input
										type='email'
										name='email'
										placeholder='Email'
										className='w-full'
										onChange={handleInputChange}
									/>
									<Input
										type='tel'
										name='phone'
										placeholder='Phone'
										className='w-full'
										onChange={handleInputChange}
									/>
									<Textarea
										name='message'
										rows={4}
										placeholder='Enter your message...'
										className='w-full resize-none'
										onChange={handleInputChange}
									/>
									<div className='flex justify-center pt-4'>
										<Button
											onClick={handleSubmit}
											className='px-8 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium'
										>
											Send Message
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</section>
			</div>
		</section>
	)
}

export default Contact

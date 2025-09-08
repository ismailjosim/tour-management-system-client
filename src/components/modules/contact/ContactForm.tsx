import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
const ContactForm = () => {
	const handleSubmit = (): void => {
		console.log('Form submitted')
	}

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	): void => {
		console.log('Input changed:', event.target.name, event.target.value)
	}

	return (
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
					<div className='flex justify-end pt-4'>
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
	)
}

export default ContactForm

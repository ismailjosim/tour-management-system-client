/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

export default function TourDatePickers({ form }: { form: any }) {
	return (
		<div className='flex sm:flex-row flex-col gap-5'>
			{/* Start Date */}
			<FormField
				control={form.control}
				name='startDate'
				render={({ field }) => (
					<FormItem className='flex flex-col flex-1'>
						<FormLabel>Start Date</FormLabel>
						<Popover>
							<PopoverTrigger asChild>
								<FormControl>
									<Button
										variant='outline'
										className={cn(
											'w-full pl-3 text-left font-normal',
											!field.value && 'text-muted-foreground',
										)}
									>
										{field.value ? (
											format(field.value, 'PPP')
										) : (
											<span>Pick a date</span>
										)}
										<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
									</Button>
								</FormControl>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0' align='start'>
								<Calendar
									mode='single'
									selected={new Date(field.value)}
									onSelect={field.onChange}
									disabled={(date) =>
										date <
										new Date(new Date().setDate(new Date().getDate() - 1))
									}
									captionLayout='dropdown'
								/>
							</PopoverContent>
						</Popover>
						<FormMessage />
					</FormItem>
				)}
			/>

			{/* End Date */}
			<FormField
				control={form.control}
				name='endDate'
				render={({ field }) => (
					<FormItem className='flex flex-col flex-1'>
						<FormLabel>End Date</FormLabel>
						<Popover>
							<PopoverTrigger asChild>
								<FormControl>
									<Button
										variant='outline'
										className={cn(
											'w-full pl-3 text-left font-normal',
											!field.value && 'text-muted-foreground',
										)}
									>
										{field.value ? (
											format(field.value, 'PPP')
										) : (
											<span>Pick a date</span>
										)}
										<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
									</Button>
								</FormControl>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0' align='start'>
								<Calendar
									mode='single'
									selected={new Date(field.value)}
									onSelect={field.onChange}
									disabled={(date) =>
										date <
										new Date(new Date().setDate(new Date().getDate() - 1))
									}
									captionLayout='dropdown'
								/>
							</PopoverContent>
						</Popover>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	)
}

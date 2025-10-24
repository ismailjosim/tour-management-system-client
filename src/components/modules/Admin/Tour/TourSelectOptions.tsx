/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

type Option = { value: string; label: string }

export default function TourSelectOptions({
	form,
	divisionOptions,
	divisionLoading,
	tourTypeOptions,
}: {
	form: any
	divisionOptions: Option[]
	divisionLoading: boolean
	tourTypeOptions: Option[]
}) {
	return (
		<div className='flex sm:flex-row flex-col gap-5'>
			{/* Division */}
			<FormField
				control={form.control}
				name='division'
				render={({ field }) => (
					<FormItem className='flex-1'>
						<FormLabel>Division</FormLabel>
						<Select
							onValueChange={field.onChange}
							value={field.value || undefined}
							disabled={divisionLoading}
							key={`division-${field.value}`}
						>
							<FormControl>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Select division' />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{divisionOptions?.map((opt) => (
									<SelectItem key={opt.value} value={opt.value}>
										{opt.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>

			{/* Tour Type */}
			<FormField
				control={form.control}
				name='tourType'
				render={({ field }) => (
					<FormItem className='flex-1'>
						<FormLabel>Tour Type</FormLabel>
						<Select
							onValueChange={field.onChange}
							value={field.value || undefined}
							key={`tourType-${field.value}`}
						>
							<FormControl>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Select tour type' />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{tourTypeOptions?.map((opt) => (
									<SelectItem key={opt.value} value={opt.value}>
										{opt.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	)
}

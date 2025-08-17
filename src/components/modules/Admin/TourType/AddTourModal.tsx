

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAddTourTypeMutation } from '@/redux/features/Tour/tour.api'
import type { ApiError } from '../../../../types'
import { tourTypeSchema } from '../../../../Schema/zodValidationSchemas'



const AddTourModal = () => {
    const [open, setOpen] = useState(false)
    const [addTourType] = useAddTourTypeMutation()

    const form = useForm<z.infer<typeof tourTypeSchema>>({
        resolver: zodResolver(tourTypeSchema),
        defaultValues: {
            name: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof tourTypeSchema>) => {
        try {
            const result = await addTourType({ name: data.name }).unwrap()
            if (result.success) {
                toast.success(result.message)
                form.reset()
                setOpen(false)
            }
        } catch (error: unknown) {
            const apiError = error as ApiError
            toast.error(apiError?.message || "Something went wrong")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='default'>Add Tour Type</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Add New Tour Type</DialogTitle>
                    <DialogDescription>
                        Fill in the details to add a new tour type.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tour Type Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter Tour Type Name' {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className='w-full' type='submit'>
                            Submit
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTourModal

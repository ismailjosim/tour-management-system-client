import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import type { ApiError } from "@/types"
import { Textarea } from "@/components/ui/textarea"
import SingleImageUploader from "@/components/SingleImageUploader"
import { Loader2 } from "lucide-react"
import { useWindowSize } from "react-use"
import Confetti from "react-confetti"
import Swal from "sweetalert2"
import { useAddTourMutation } from "@/redux/features/Tour/tour.api"


// ---------- Zod Schema for Tour ----------
const tourSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    location: z.string().optional(),
    departureLocation: z.string().optional(),
    arrivalLocation: z.string().optional(),
    costFrom: z.number().min(0, "Cost must be positive"),
    startDate: z.string().optional(), // Will be converted to Date in backend
    endDate: z.string().optional(),
    maxGuest: z.number().min(1, "Must allow at least 1 guest"),
    minAge: z.number().optional(),
    division: z.string().min(1, "Division is required"),
    tourType: z.string().min(1, "Tour type is required"),
})

const AddTourModal = () => {
    // ---------- State ----------
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState<File | null>(null)
    const [showConfetti, setShowConfetti] = useState(false)

    const { width, height } = useWindowSize()
    const [addTour, { isLoading }] = useAddTourMutation()

    // ---------- Form ----------
    const form = useForm<z.infer<typeof tourSchema>>({
        resolver: zodResolver(tourSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
            departureLocation: "",
            arrivalLocation: "",
            costFrom: 0,
            startDate: "",
            endDate: "",
            maxGuest: 1,
            minAge: 0,
            division: "",
            tourType: "",
        },
    })

    const { handleSubmit, control, reset } = form

    // ---------- Handlers ----------
    const triggerConfetti = () => {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 4000)
    }

    const onSubmit = async (data: z.infer<typeof tourSchema>) => {
        const formData = new FormData()
        formData.append("data", JSON.stringify(data))
        if (image) formData.append("file", image)

        try {
            const result = await addTour(formData).unwrap()
            if (!result.success) return

            toast.success(result.message)
            triggerConfetti()

            Swal.fire({
                title: "Awesome ❤️",
                text: result.message,
                icon: "success",
            })

            reset()
            setImage(null)
            setOpen(false)
        } catch (error: unknown) {
            const apiError = error as ApiError
            toast.error(apiError?.message || "Something went wrong")
        }
    }

    // ---------- UI ----------
    return (
        <>
            {showConfetti && <Confetti width={width} height={height} />}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="default">Add Tour</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Tour</DialogTitle>
                        <DialogDescription>
                            Fill in the details to add a new Tour.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            {/* Title */}
                            <FormField
                                control={control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Tour Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter Tour Description..."
                                                className="resize-none text-sm"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Location */}
                            <FormField
                                control={control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Location" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Cost */}
                            <FormField
                                control={control}
                                name="costFrom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cost From</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Cost" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start Date</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="endDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>End Date</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Guests & Age */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={control}
                                    name="maxGuest"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Max Guests</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="minAge"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Minimum Age</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Image */}
                            <SingleImageUploader onChange={setImage} />

                            <Button
                                className="w-full"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {isLoading ? "Submitting..." : "Submit"}
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddTourModal

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import MultipleImageUploader from "../../../MultipleImageUploader"


export default function TourDescriptionImages({
    form,
    setImages,
}: {
    form: any
    setImages: (images: File[]) => void
}) {
    return (
        <div className="flex gap-5 items-stretch">
            {/* Description */}
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea {...field} className="h-[205px]" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Image Uploader */}
            <div className="flex-1 mt-5">
                <MultipleImageUploader onChange={setImages} />
            </div>
        </div>
    )
}

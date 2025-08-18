/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function TourGuestInfo({ form }: { form: any }) {
    return (
        <div className="flex gap-5">
            {/* Max Guest */}
            <FormField
                control={form.control}
                name="maxGuest"
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Max Guest</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {/* Min Age */}
            <FormField
                control={form.control}
                name="minAge"
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Minimum Age</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

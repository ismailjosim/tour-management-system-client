/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function TourBasicInfo({ form }: { form: any }) {
    return (
        <>
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tour Title</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="flex gap-5">
                <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Location</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="costFrom" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Cost</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <div className="flex gap-5">
                <FormField control={form.control} name="departureLocation" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Departure Location</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="arrivalLocation" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Arrival Location</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
        </>
    )
}

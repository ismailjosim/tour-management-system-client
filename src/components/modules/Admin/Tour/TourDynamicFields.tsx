/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Plus, Trash2 } from "lucide-react"
import { useFieldArray } from "react-hook-form"

function DynamicFieldGroup({
    form,
    name,
    label,
}: {
    form: any
    name: "included" | "excluded" | "amenities" | "tourPlan"
    label: string
}) {
    const { fields, append, remove } = useFieldArray({ control: form.control, name })

    return (
        <div>
            <div className="flex justify-between">
                <p className="font-semibold">{label}</p>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => append({ value: "" })}
                >
                    <Plus />
                </Button>
            </div>

            <div className="space-y-4 mt-4">
                {fields.map((item, index) => (
                    <div className="flex gap-2" key={item.id}>
                        <FormField
                            control={form.control}
                            name={`${name}.${index}.value`}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            onClick={() => remove(index)}
                            variant="destructive"
                            className="!bg-red-700"
                            size="icon"
                            type="button"
                        >
                            <Trash2 />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function TourDynamicFields({ form }: { form: any }) {
    return (
        <>
            <div className="border-t border-muted w-full my-5"></div>
            <DynamicFieldGroup form={form} name="included" label="Included" />
            <DynamicFieldGroup form={form} name="excluded" label="Excluded" />
            <DynamicFieldGroup form={form} name="amenities" label="Amenities" />
            <DynamicFieldGroup form={form} name="tourPlan" label="Tour Plan" />
        </>
    )
}

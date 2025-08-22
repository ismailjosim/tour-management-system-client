// left side filter system
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useGetDivisionsQuery } from '@/redux/features/division/division.api'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useGetTourTypesQuery } from '@/redux/features/Tour/tour.api'

const DestinationFilter = () => {
    const [selectedDivision, setSelectedDivision] = useState<string | undefined>(undefined)
    const [selectedTourType, setSelectedTourType] = useState<string | undefined>(undefined)

    const { data: divisionData, isLoading: divisionLoading } = useGetDivisionsQuery(undefined)
    const divisionOptions = divisionData?.data?.map((item: { _id: string; name: string }) => ({
        value: item._id,
        label: item.name,
    }))

    const { data: tourTypeData, isLoading: tourTypeLoading } = useGetTourTypesQuery(undefined)
    const tourTypeOptions = tourTypeData?.data?.map((tourType: { _id: string; name: string }) => ({
        value: tourType._id,
        label: tourType.name,
    }))

    const handleClearFilter = () => {
        setSelectedDivision(undefined)
        setSelectedTourType(undefined)
    };
    const handleDivisionChange = (value: string) => {
        setSelectedDivision(value)
    }
    const handleTourTypeChange = (value: string) => {
        setSelectedTourType(value)
    }
    return (
        <div>
            <Card className='px-5'>
                <div className="flex justify-between items-center">
                    <h1>Filters</h1>
                    <Button size="sm" variant="outline" onClick={handleClearFilter}>
                        Clear Filter
                    </Button>
                </div>
                <Label className='pb-0'>Division to visit</Label>
                <Select
                    onValueChange={(value) => handleDivisionChange(value)}
                    value={selectedDivision ? selectedDivision : ""}
                    disabled={divisionLoading}
                >
                    <SelectTrigger className='w-full'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Divisions</SelectLabel>
                            {divisionOptions?.map(
                                (item: { value: string; label: string }) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ),
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Label className='pb-0'>Tour Type</Label>
                <Select
                    onValueChange={(value) => handleTourTypeChange(value)}
                    value={selectedTourType ? selectedTourType : ""}
                    disabled={tourTypeLoading}
                >
                    <SelectTrigger className='w-full'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Divisions</SelectLabel>
                            {tourTypeOptions?.map(
                                (item: { value: string; label: string }) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ),
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Card>
        </div>
    );
};

export default DestinationFilter;

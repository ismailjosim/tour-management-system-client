import { type FC, useMemo } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router';
import { useGetDivisionsQuery } from '@/redux/features/division/division.api';
import { useGetTourTypesQuery } from '@/redux/features/Tour/tour.api';

interface Option {
    value: string;
    label: string;
}

const DestinationFilter: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedDivision = searchParams.get('division') || '';
    const selectedTourType = searchParams.get('tourType') || '';

    const { data: divisionData, isLoading: divisionLoading } = useGetDivisionsQuery(undefined);
    const { data: tourTypeData, isLoading: tourTypeLoading } = useGetTourTypesQuery(undefined);

    // Memoize options to avoid recalculation on each render
    const divisionOptions: Option[] = useMemo(
        () =>
            divisionData?.data?.map((item: { _id: string; name: string }) => ({
                value: item._id,
                label: item.name,
            })) || [],
        [divisionData]
    );

    const tourTypeOptions: Option[] = useMemo(
        () =>
            tourTypeData?.data?.map((item: { _id: string; name: string }) => ({
                value: item._id,
                label: item.name,
            })) || [],
        [tourTypeData]
    );

    const updateSearchParams = (key: string, value?: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        setSearchParams(params);
    };

    const handleClearFilter = () => {
        setSearchParams(new URLSearchParams());
    };

    return (
        <Card className="px-5">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">Filters</h1>
                <Button size="sm" variant="outline" onClick={handleClearFilter}>
                    Clear Filter
                </Button>
            </div>

            <div className="mb-4">
                <Label className="pb-2">Division to visit</Label>
                <Select
                    onValueChange={(value) => updateSearchParams('division', value)}
                    value={selectedDivision}
                    disabled={divisionLoading}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a division" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Divisions</SelectLabel>
                            {divisionOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label className="pb-2  ">Tour Type</Label>
                <Select
                    onValueChange={(value) => updateSearchParams('tourType', value)}
                    value={selectedTourType}
                    disabled={tourTypeLoading}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a tour type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Tour Types</SelectLabel>
                            {tourTypeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </Card>
    );
};

export default DestinationFilter;

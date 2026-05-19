import { useMemo, useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { useGetDivisionsQuery } from '@/redux/features/division/division.api';
import { useGetTourTypesQuery } from '@/redux/features/Tour/tour.api';
import { useNavigate } from 'react-router';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
import shapeLight from '@/assets/images/shapeLight.png';
import shapeDark from '@/assets/images/shapeDark.png';

interface SearchOption {
  value: string;
  label: string;
}

const HolidayForm: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedTourType, setSelectedTourType] = useState('');
  // const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  // const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const { data: divisionData, isLoading: divisionLoading } = useGetDivisionsQuery({
    limit: 1000,
    fields: '_id,name',
  });

  const { data: tourTypeData, isLoading: tourTypeLoading } = useGetTourTypesQuery({
    limit: 1000,
    fields: '_id,name',
  });

  const divisionOptions = useMemo<SearchOption[]>(
    () =>
      divisionData?.data?.map((item: { _id: string; name: string }) => ({
        value: item._id,
        label: item.name,
      })) || [],
    [divisionData]
  );

  const tourTypeOptions = useMemo<SearchOption[]>(
    () =>
      tourTypeData?.data?.map((item: { _id: string; name: string }) => ({
        value: item._id,
        label: item.name,
      })) || [],
    [tourTypeData]
  );

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (selectedDivision) {
      params.set('division', selectedDivision);
    }

    if (selectedTourType) {
      params.set('tourType', selectedTourType);
    }

    const queryString = params.toString();
    navigate(queryString ? `/destinations?${queryString}` : '/destinations');
  };

  return (
    <div className="relative z-10 pt-10">
      <div
        className={cn(
          'absolute bottom-16 left-0 z-[1] h-20 w-full origin-center rotate-180 bg-contain bg-repeat-x pt-28 pb-40'
        )}
        style={{ backgroundImage: `url(${theme === 'dark' ? shapeDark : shapeLight})` }}
      />
      {/* <div className="section-shape lg:mt-12 md:mt-12 mt-20" /> */}
      <div className="dark:bg-accent relative -top-10 z-10 container mx-auto flex flex-col items-center justify-between gap-5 overflow-hidden rounded-lg bg-white shadow-xl sm:flex-row">
        <div className="bg-primary w-full flex-1">
          <h3 className="flex items-center justify-center gap-2 px-2 py-10 font-semibold text-white">
            <MapPin />
            <span className="text-xl font-bold">Find Your Holidays</span>
          </h3>
        </div>

        {/* Destination Select */}
        <div className="w-full flex-1">
          <Select
            value={selectedDivision}
            onValueChange={setSelectedDivision}
            disabled={divisionLoading}
          >
            <SelectTrigger className="border-primary w-full border">
              <SelectValue placeholder="Select Division" />
            </SelectTrigger>
            <SelectContent>
              {divisionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Travel Type Select */}
        <div className="w-full flex-1">
          <Select
            value={selectedTourType}
            onValueChange={setSelectedTourType}
            disabled={tourTypeLoading}
          >
            <SelectTrigger className="border-primary w-full border">
              <SelectValue placeholder="Select Tour Type" />
            </SelectTrigger>
            <SelectContent>
              {tourTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search button */}
        <div className="w-full flex-1 sm:pr-5">
          <Button
            className="flex w-full cursor-pointer gap-1 text-white transition-all duration-300"
            onClick={handleSearch}
          >
            <Search />
            <span>Search Now</span>
          </Button>
        </div>

        {/* Start Date */}
        {/* <div className="px-2 lg:px-0">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start border border-primary text-left"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? format(startDate, 'PPP') : 'Select Start Date'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={(date) => setStartDate(date || undefined)}
                                    fromDate={new Date()}
                                    className="rounded-md"
                                />
                            </PopoverContent>
                        </Popover>
                    </div> */}

        {/* End Date */}
        {/* <div className="px-2 lg:px-0">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start border border-primary text-left"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? format(endDate, 'PPP') : 'Select End Date'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={(date) => setEndDate(date || undefined)}
                                    fromDate={startDate || new Date()}
                                    className="rounded-md"
                                />
                            </PopoverContent>
                        </Popover>
                    </div> */}

        {/* Search Button */}
      </div>
    </div>
  );
};

export default HolidayForm;

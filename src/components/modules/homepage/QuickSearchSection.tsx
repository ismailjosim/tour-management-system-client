import { useMemo, useState } from 'react';
import { MapPin, Search, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetDivisionsQuery } from '@/redux/features/division/division.api';
import { useGetTourTypesQuery } from '@/redux/features/Tour/tour.api';
import { useNavigate } from 'react-router';

interface SearchOption {
  value: string;
  label: string;
}

const HolidayForm: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedTourType, setSelectedTourType] = useState('');

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
    <div className="w-full">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
        {/* Label */}
        <div className="flex items-center gap-2 text-white">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
            <MapPin className="text-primary h-5 w-5" />
          </div>
          <span className="text-sm font-semibold tracking-wide whitespace-nowrap text-white/90 uppercase">
            Find Your Trip
          </span>
        </div>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-white/20 sm:block" />

        {/* Division Select */}
        <div className="w-full flex-1">
          <Select
            value={selectedDivision}
            onValueChange={setSelectedDivision}
            disabled={divisionLoading}
          >
            <SelectTrigger className="focus:ring-primary/50 h-11 w-full rounded-lg border-white/25 bg-white/10 text-white backdrop-blur-sm placeholder:text-white/60 [&>span]:text-white/80">
              <SelectValue placeholder="Select Division" />
            </SelectTrigger>
            <SelectContent className="max-h-50 border-white/20 bg-black/70 text-white backdrop-blur-xl">
              {divisionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tour Type Select */}
        <div className="w-full flex-1">
          <Select
            value={selectedTourType}
            onValueChange={setSelectedTourType}
            disabled={tourTypeLoading}
          >
            <SelectTrigger className="focus:ring-primary/50 h-11 w-full rounded-lg border-white/25 bg-white/10 text-white backdrop-blur-sm placeholder:text-white/60 [&>span]:text-white/80">
              <Compass className="mr-2 h-4 w-4 text-white/60" />
              <SelectValue placeholder="Select Tour Type" />
            </SelectTrigger>
            <SelectContent className="max-h-50 border-white/20 bg-black/70 text-white backdrop-blur-xl">
              {tourTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="w-full sm:w-auto">
          <Button
            className="bg-primary hover:bg-primary/90 hover:shadow-primary/30 h-11 w-full cursor-pointer gap-2 rounded-lg px-6 text-sm font-semibold tracking-wider text-white uppercase shadow-lg transition-all duration-300 hover:shadow-xl sm:w-auto"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HolidayForm;

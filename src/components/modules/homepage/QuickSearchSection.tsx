// import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
import shapeLight from "@/assets/images/shapeLight.png"
import shapeDark from "@/assets/images/shapeDark.png"

const HolidayForm: React.FC = () => {
    const { theme } = useTheme()
    // const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    // const [endDate, setEndDate] = useState<Date | undefined>(new Date());

    return (
        <div className="relative z-10 pt-10">
            <div
                className={cn(
                    "absolute bottom-16 left-0 w-full h-20 pb-40 pt-28 rotate-180 origin-center bg-contain bg-repeat-x z-[1]",
                )}
                style={{ backgroundImage: `url(${theme === 'dark' ? shapeDark : shapeLight})` }}
            />
            {/* <div className="section-shape lg:mt-12 md:mt-12 mt-20" /> */}
            <div className="container mx-auto relative -top-10 flex sm:flex-row flex-col justify-between gap-5 items-center bg-white dark:bg-accent shadow-xl rounded-lg overflow-hidden z-10">
                <div className="bg-primary flex-1 w-full">
                    <h3 className="flex gap-2 justify-center items-center font-semibold px-2 py-10 text-white">
                        <MapPin />
                        <span className="text-xl font-bold">Find Your Holidays</span>
                    </h3>
                </div>


                {/* Destination Select */}
                <div className="flex-1 w-full">
                    <Select>
                        <SelectTrigger className="w-full border border-primary">
                            <SelectValue placeholder="Select Division" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="USA">USA</SelectItem>
                            <SelectItem value="Argentina">Argentina</SelectItem>
                            <SelectItem value="Belgium">Belgium</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="Denmark">Denmark</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Travel Type Select */}
                <div className="flex-1 w-full">
                    <Select>
                        <SelectTrigger className="w-full border border-primary">
                            <SelectValue placeholder="Select Tour Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="single">Single Tour</SelectItem>
                            <SelectItem value="family">Family Tour</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Search button */}
                <div className="flex-1 w-full sm:pr-5">
                    <Button className="flex gap-1 w-full cursor-pointer text-white transition-all duration-300">
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

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { toast } from 'sonner';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';

import { useApplyGuideMutation } from '@/redux/features/guide/guide.api';
import SingleImageUploader from '@/components/SingleImageUploader';
import type { ApiError } from '@/types';
import { cn } from '@/lib/utils';
import { getAllCountries, getStatesByCountryName } from '@/constants/locations';

// ✅ Validation schema
const applyGuideSchema = z.object({
  country: z.string({ error: 'Country is required' }).min(1, 'Country is required'),
  locationDivision: z
    .string({ error: 'Local division is required' })
    .min(1, 'Local division is required'),
  nidFrontPhoto: z.any().refine((file) => file instanceof File, 'NID front photo is required'),
  nidBackPhoto: z.any().refine((file) => file instanceof File, 'NID back photo is required'),
  photo: z.any().refine((file) => file instanceof File, 'Guide profile image is required'),
});

interface ApplyGuideModalProps {
  triggerButton?: React.ReactNode;
  isApplied: boolean;
}

const ApplyGuideModal = ({ triggerButton }: ApplyGuideModalProps) => {
  const [open, setOpen] = useState(false);
  const [nidFrontPhoto, setNidFrontPhoto] = useState<File | null>(null);
  const [nidBackPhoto, setNidBackPhoto] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [locationSearch, setLocationSearch] = useState('');
  const [locationSelectOpen, setLocationSelectOpen] = useState(false);

  const [applyGuide, { isLoading: submitting }] = useApplyGuideMutation();

  const form = useForm<z.infer<typeof applyGuideSchema>>({
    resolver: zodResolver(applyGuideSchema),
    defaultValues: {
      country: '',
      locationDivision: '',
      nidFrontPhoto: undefined,
      nidBackPhoto: undefined,
      photo: undefined,
    },
  });

  const selectedCountry = form.watch('country');
  const selectedLocationDivision = form.watch('locationDivision');
  const countries = getAllCountries();
  const localDivisions = selectedCountry ? getStatesByCountryName(selectedCountry) : [];
  const filteredLocalDivisions = localDivisions.filter((division) =>
    division.name.toLowerCase().includes(locationSearch.trim().toLowerCase())
  );

  const onSubmit = async (data: z.infer<typeof applyGuideSchema>) => {
    const toastId = toast.loading('Submitting application...');

    if (!nidFrontPhoto || !nidBackPhoto || !profilePhoto) {
      toast.error('Please upload NID front, NID back, and guide profile image', { id: toastId });
      return;
    }

    const formData = new FormData();
    formData.append('country', data.country);
    formData.append('locationDivision', data.locationDivision);
    formData.append('nidFrontPhoto', nidFrontPhoto);
    formData.append('nidBackPhoto', nidBackPhoto);
    formData.append('photo', profilePhoto);

    try {
      const res = await applyGuide(formData).unwrap();
      if (res.success) {
        toast.success('Application submitted successfully!', { id: toastId });
        form.reset();
        setNidFrontPhoto(null);
        setNidBackPhoto(null);
        setProfilePhoto(null);
        setOpen(false);
      } else {
        toast.error('Something went wrong!', { id: toastId });
      }
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message || 'Error submitting form', {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerButton ? (
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="default">Apply as Guide</Button>
        </DialogTrigger>
      )}

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[720px]">
        <DialogHeader>
          <DialogTitle>Apply as a Guide</DialogTitle>
          <DialogDescription>Submit your details to become a verified guide.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            {/* --- Location Selects --- */}
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Country</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue('locationDivision', '');
                          setLocationSearch('');
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.id} value={country.name}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locationDivision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Local Division</FormLabel>
                    <FormControl>
                      <Popover open={locationSelectOpen} onOpenChange={setLocationSelectOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            role="combobox"
                            aria-expanded={locationSelectOpen}
                            disabled={!selectedCountry}
                            className="w-full justify-between font-normal"
                          >
                            {selectedLocationDivision || 'Search or select division'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2">
                          <Input
                            value={locationSearch}
                            onChange={(event) => setLocationSearch(event.target.value)}
                            placeholder="Search division"
                            className="mb-2"
                          />
                          <div className="max-h-56 overflow-y-auto">
                            {filteredLocalDivisions.length > 0 ? (
                              filteredLocalDivisions.map((division) => (
                                <button
                                  key={division.id}
                                  type="button"
                                  className="hover:bg-accent flex w-full items-center rounded-md px-3 py-2 text-left text-sm"
                                  onClick={() => {
                                    field.onChange(division.name);
                                    setLocationSelectOpen(false);
                                    setLocationSearch('');
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      selectedLocationDivision === division.name
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {division.name}
                                </button>
                              ))
                            ) : (
                              <p className="text-muted-foreground px-3 py-2 text-sm">
                                No division found.
                              </p>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* --- Guide Profile Image Upload --- */}
            <FormField
              control={form.control}
              name="photo"
              render={() => (
                <FormItem>
                  <FormLabel>Guide Profile Image</FormLabel>
                  <FormControl>
                    <SingleImageUploader
                      initialImage={profilePhoto ? URL.createObjectURL(profilePhoto) : null}
                      onChange={(file) => {
                        setProfilePhoto(file);
                        form.setValue('photo', file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              {/* --- NID Front Upload --- */}
              <FormField
                control={form.control}
                name="nidFrontPhoto"
                render={() => (
                  <FormItem>
                    <FormLabel>NID Front Photo</FormLabel>
                    <FormControl>
                      <SingleImageUploader
                        initialImage={nidFrontPhoto ? URL.createObjectURL(nidFrontPhoto) : null}
                        onChange={(file) => {
                          setNidFrontPhoto(file);
                          form.setValue('nidFrontPhoto', file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- NID Back Upload --- */}
              <FormField
                control={form.control}
                name="nidBackPhoto"
                render={() => (
                  <FormItem>
                    <FormLabel>NID Back Photo</FormLabel>
                    <FormControl>
                      <SingleImageUploader
                        initialImage={nidBackPhoto ? URL.createObjectURL(nidBackPhoto) : null}
                        onChange={(file) => {
                          setNidBackPhoto(file);
                          form.setValue('nidBackPhoto', file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* --- Submit Button --- */}
            <Button
              className="w-full"
              type="submit"
              disabled={!nidFrontPhoto || !nidBackPhoto || !profilePhoto || submitting}
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyGuideModal;

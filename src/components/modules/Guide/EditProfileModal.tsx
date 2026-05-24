import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { X, Upload, Loader } from 'lucide-react';
import { useUpdateMyGuideProfileMutation } from '@/redux/features/guide/guide.api';
import { toast } from 'sonner';

// Validation schema
const updateProfileSchema = z.object({
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
  languages: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  locationDivision: z.string().optional(),
  specialties: z.string().optional(),
});

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

interface IUser {
  name: string;
  email: string;
  picture: string;
  role: string;
  isActive: string;
  isVerified: boolean;
}

interface IGuideProfile {
  _id: string;
  user: IUser;
  country?: string;
  locationDivision?: string;
  photo?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  bio?: string;
  languages?: string[];
  experience?: number;
  phone?: string;
  address?: string;
  specialties?: string[];
  createdAt: string;
  updatedAt: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  guideProfile: IGuideProfile;
}

export const EditProfileModal = ({ isOpen, onClose, guideProfile }: EditProfileModalProps) => {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>(guideProfile.photo || '');
  const [languageInput, setLanguageInput] = useState('');
  const [specialtyInput, setSpecialtyInput] = useState('');
  const [languages, setLanguages] = useState<string[]>(guideProfile.languages || []);
  const [specialties, setSpecialties] = useState<string[]>(guideProfile.specialties || []);

  const [updateProfile, { isLoading }] = useUpdateMyGuideProfileMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      bio: guideProfile.bio || '',
      phone: guideProfile.phone || '',
      address: guideProfile.address || '',
      locationDivision: guideProfile.locationDivision || '',
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addLanguage = () => {
    if (languageInput.trim() && !languages.includes(languageInput.trim())) {
      setLanguages([...languages, languageInput.trim()]);
      setLanguageInput('');
    }
  };

  const removeLanguage = (lang: string) => {
    setLanguages(languages.filter((l) => l !== lang));
  };

  const addSpecialty = () => {
    if (specialtyInput.trim() && !specialties.includes(specialtyInput.trim())) {
      setSpecialties([...specialties, specialtyInput.trim()]);
      setSpecialtyInput('');
    }
  };

  const removeSpecialty = (spec: string) => {
    setSpecialties(specialties.filter((s) => s !== spec));
  };

  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      const formData = new FormData();

      // Add text fields
      if (data.bio) formData.append('bio', data.bio);
      if (data.phone) formData.append('phone', data.phone);
      if (data.address) formData.append('address', data.address);
      if (data.locationDivision) formData.append('locationDivision', data.locationDivision);

      // Add arrays as JSON
      if (languages.length > 0) formData.append('languages', JSON.stringify(languages));
      if (specialties.length > 0) formData.append('specialties', JSON.stringify(specialties));

      // Add photo if changed
      if (profilePhoto) {
        formData.append('photo', profilePhoto);
      }

      await updateProfile(formData).unwrap();
      toast.success('Profile updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Guide Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Photo */}
          <div className="space-y-3">
            <Label>Guide Profile Photo</Label>
            <div className="flex gap-4">
              <div>
                <img
                  src={photoPreview || '/default-guide.png'}
                  alt="Profile preview"
                  className="border-border h-24 w-24 rounded-lg border-2 object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <Label htmlFor="photo" className="cursor-pointer">
                  <div className="border-border bg-muted/50 hover:bg-muted flex h-24 items-center justify-center rounded-lg border-2 border-dashed">
                    <div className="text-center">
                      <Upload className="text-muted-foreground mx-auto h-5 w-5" />
                      <p className="text-muted-foreground text-xs">Click to upload</p>
                    </div>
                  </div>
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </Label>
                <p className="text-muted-foreground text-xs">
                  This is your guide profile photo, separate from your user account photo
                </p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="bio"
                  placeholder="Tell guests about yourself as a guide..."
                  maxLength={500}
                  rows={4}
                />
              )}
            />
            {errors.bio && <p className="text-destructive text-xs">{errors.bio.message}</p>}
          </div>

          {/* Service Area */}
          <div className="space-y-2">
            <Label htmlFor="locationDivision">Service Area</Label>
            <Controller
              name="locationDivision"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="locationDivision"
                  placeholder="e.g., Cox's Bazaar, Dhaka, Chittagong..."
                  type="text"
                />
              )}
            />
            <p className="text-muted-foreground text-xs">
              Update the areas where you can provide guide services
            </p>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input {...field} id="phone" placeholder="+880 1700 000000" type="tel" />
              )}
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input {...field} id="address" placeholder="Your address or landmark" type="text" />
              )}
            />
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <Label>Languages</Label>
            <div className="flex gap-2">
              <Input
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                placeholder="e.g., English, Bengali, Hindi"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addLanguage();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addLanguage}
                variant="outline"
                className="whitespace-nowrap"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <Badge key={lang} variant="secondary" className="gap-1">
                  {lang}
                  <button
                    type="button"
                    onClick={() => removeLanguage(lang)}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div className="space-y-2">
            <Label>Specialties</Label>
            <div className="flex gap-2">
              <Input
                value={specialtyInput}
                onChange={(e) => setSpecialtyInput(e.target.value)}
                placeholder="e.g., Adventure, Culture, Food"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSpecialty();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addSpecialty}
                variant="outline"
                className="whitespace-nowrap"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {specialties.map((spec) => (
                <Badge key={spec} variant="outline" className="gap-1">
                  {spec}
                  <button
                    type="button"
                    onClick={() => removeSpecialty(spec)}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <Alert>
            <AlertDescription className="text-xs">
              Your profile information will be visible to potential tourists. Make sure it's
              accurate and professional.
            </AlertDescription>
          </Alert>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="gap-2">
              {isLoading && <Loader className="h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

import React, { useState } from 'react';
import { Edit3, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useUpdateProfileMutation, useUserInfoQuery } from '@/redux/features/auth/auth.api';
import ProfileSummary from '../components/modules/Profile/ProfileSummary';
import PersonalInfo from '../components/modules/Profile/PersonalInfo';
import AccountInfo from '../components/modules/Profile/AccountInfo';
import { toast } from 'sonner';
import type { ApiError } from '../types';

export interface EditFormData {
  name: string;
  phone: string;
  address: string;
}

const Profile: React.FC = () => {
  const { data, isError, isLoading } = useUserInfoQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<EditFormData>({
    name: '',
    phone: '',
    address: '',
  });

  const userData = data?.data;

  /** Handlers */
  const handleUpdateProfile = async () => {
    if (isEditing) {
      try {
        const res = await updateProfile({
          id: userData?._id,
          ...editData,
        }).unwrap();

        if (res.statusCode === 201) {
          toast.success(res?.message);
        }

        setIsEditing(false);
      } catch (error) {
        const apiError = error as ApiError;
        toast.error(apiError.data.message);
      }
    } else {
      if (userData) {
        setEditData({
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
        });
      }
      setIsEditing(true);
    }
  };
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (userData) {
      setEditData({
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
      });
    }
  };

  const handleInputChange =
    (field: keyof EditFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  /** Loading */
  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <Loader2 className="text-primary mx-auto h-12 w-12 animate-spin" />
          <p className="text-muted-foreground text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  /** Error */
  if (isError || !userData) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="space-y-4 pt-6 text-center">
            <div className="bg-destructive/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
              <X className="text-destructive h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Failed to Load Profile</h3>
              <p className="text-muted-foreground text-sm">
                Unable to fetch your profile information. Please try again.
              </p>
            </div>
            <Button onClick={() => window.location.reload()} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  /** Main UI */
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">Manage your account information and settings</p>
          </div>
          <Button
            onClick={handleEditToggle}
            variant={isEditing ? 'outline' : 'default'}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : isEditing ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSummary userData={userData} />
          </div>

          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            <PersonalInfo
              userData={userData}
              isEditing={isEditing}
              editData={editData}
              handleInputChange={handleInputChange}
              handleUpdateProfile={handleUpdateProfile}
            />
            <AccountInfo userData={userData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

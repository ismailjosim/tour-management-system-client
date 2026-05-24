import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGetMyGuideApplicationQuery } from '@/redux/features/guide/guide.api';
import { EditProfileModal } from '@/components/modules/Guide/EditProfileModal';
import { ProfileCard } from '@/components/modules/Guide/ProfileCard';
import { AlertCircle, Loader } from 'lucide-react';

export default function GuideProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data, isLoading, isError, error } = useGetMyGuideApplicationQuery(undefined);

  const guideProfile = data?.data;

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {((error as Record<string, unknown>)?.message as string) ||
            'Failed to load your guide profile'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!guideProfile) {
    return (
      <Card>
        <CardContent className="text-muted-foreground p-8 text-center">
          <p>No guide profile found. Have you applied to become a guide?</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Guide Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your guide information and service areas
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <ProfileCard guideProfile={guideProfile} />
        </div>

        {/* Action Card */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={() => setIsEditModalOpen(true)} className="w-full" variant="default">
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full" disabled>
                View Public Profile
              </Button>
              <p className="text-muted-foreground text-xs">
                Update your profile information, guide photo, bio, languages, and service areas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        guideProfile={guideProfile}
      />
    </div>
  );
}

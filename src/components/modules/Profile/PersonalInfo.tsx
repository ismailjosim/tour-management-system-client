/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, User, Save } from 'lucide-react';
import type { EditFormData } from '../../../Pages/Profile';

interface Props {
  userData: any;
  isEditing: boolean;
  editData: EditFormData;
  handleInputChange: (
    field: keyof EditFormData
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateProfile: () => void;
}

const PersonalInfo: React.FC<Props> = ({
  userData,
  isEditing,
  editData,
  handleInputChange,
  handleUpdateProfile,
}) => {
  return (
    <Card className="border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <User className="text-primary mr-2 h-5 w-5" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Full Name */}
          <div>
            <Label>Full Name</Label>
            {isEditing ? (
              <Input value={editData.name} onChange={handleInputChange('name')} className="mt-1" />
            ) : (
              <p className="mt-1 font-medium">{userData.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label>Email Address</Label>
            <div className="mt-1 flex items-center space-x-2">
              <Mail className="text-muted-foreground h-4 w-4" />
              <p className="truncate">{userData.email}</p>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">Email cannot be changed</p>
          </div>

          {/* Phone */}
          <div>
            <Label>Phone Number</Label>
            {isEditing ? (
              <Input
                value={editData.phone}
                onChange={handleInputChange('phone')}
                className="mt-1"
              />
            ) : (
              <div className="mt-1 flex items-center space-x-2">
                <Phone className="text-muted-foreground h-4 w-4" />
                <p>{userData.phone}</p>
              </div>
            )}
          </div>

          {/* Address */}
          <div>
            <Label>Address</Label>
            {isEditing ? (
              <Input
                value={editData.address}
                onChange={handleInputChange('address')}
                className="mt-1"
              />
            ) : (
              <div className="mt-1 flex items-center space-x-2">
                <MapPin className="text-muted-foreground h-4 w-4" />
                <p>{userData.address}</p>
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end border-t pt-4">
            <Button onClick={handleUpdateProfile}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;

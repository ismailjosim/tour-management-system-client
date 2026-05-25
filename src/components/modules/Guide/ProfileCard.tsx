import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Globe,
  BookOpen,
  Briefcase,
  Languages,
  Phone,
  Home,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import { format } from 'date-fns';

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

interface ProfileCardProps {
  guideProfile: IGuideProfile;
}

const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, { bg: string; text: string; icon: typeof CheckCircle }> = {
    APPROVED: {
      bg: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-800 dark:text-green-200',
      icon: CheckCircle,
    },
    PENDING: {
      bg: 'bg-yellow-100 dark:bg-yellow-900',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: Clock,
    },
    REJECTED: {
      bg: 'bg-red-100 dark:bg-red-900',
      text: 'text-red-800 dark:text-red-200',
      icon: XCircle,
    },
  };

  const variant = variants[status] || variants.PENDING;
  const Icon = variant.icon;

  return (
    <div className={`flex w-fit items-center gap-2 rounded-full ${variant.bg} px-3 py-1`}>
      <Icon className={`h-4 w-4 ${variant.text}`} />
      <span className={`text-sm font-medium ${variant.text}`}>{status}</span>
    </div>
  );
};

export const ProfileCard = ({ guideProfile }: ProfileCardProps) => {
  const infoItems = [
    {
      label: 'Service Area',
      value: guideProfile.locationDivision || 'Not specified',
      icon: MapPin,
    },
    {
      label: 'Country',
      value: guideProfile.country || 'Not specified',
      icon: Globe,
    },
    { label: 'Experience', value: `${guideProfile.experience || 0} years`, icon: Briefcase },
    { label: 'Phone', value: guideProfile.phone || 'Not provided', icon: Phone },
    {
      label: 'Address',
      value: guideProfile.address || 'Not provided',
      icon: Home,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Card with Profile Image */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-40 bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="absolute inset-0 bg-black/10" />
          </div>
          <div className="relative px-6 pb-6">
            <div className="-mt-20 flex items-end gap-4">
              <img
                src={guideProfile.photo || '/default-guide.png'}
                alt={guideProfile.user.name}
                className="border-background h-32 w-32 rounded-lg border-4 object-cover shadow-lg"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{guideProfile.user.name}</h2>
                    <p className="text-muted-foreground text-sm">{guideProfile.user.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <StatusBadge status={guideProfile.status} />
              <Badge variant="outline">Guide</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {infoItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-muted/50 flex gap-3 rounded-lg p-4">
                  <Icon className="text-primary h-5 w-5" />
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">{item.label}</p>
                    <p className="text-foreground mt-1 font-semibold">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Bio Section */}
      {guideProfile.bio && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5" />
              About Me
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{guideProfile.bio}</p>
          </CardContent>
        </Card>
      )}

      {/* Languages Section */}
      {guideProfile.languages && guideProfile.languages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Languages className="h-5 w-5" />
              Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {guideProfile.languages.map((lang, idx) => (
                <Badge key={idx} variant="secondary">
                  {lang}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Specialties Section */}
      {guideProfile.specialties && guideProfile.specialties.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5" />
              Specialties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {guideProfile.specialties.map((specialty, idx) => (
                <Badge key={idx} variant="outline">
                  {specialty}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Metadata */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Profile Created</span>
              <span className="font-medium">
                {format(new Date(guideProfile.createdAt), 'MMM dd, yyyy')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="font-medium">
                {format(new Date(guideProfile.updatedAt), 'MMM dd, yyyy HH:mm')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

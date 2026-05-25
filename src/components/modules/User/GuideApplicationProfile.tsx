import { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BadgeCheck, CheckCircle, Mail, ShieldAlert, XCircle } from 'lucide-react';
import DataLoader from '@/utils/DataLoader';
import { useGetMyGuideApplicationQuery } from '@/redux/features/guide/guide.api';

interface IUser {
  name: string;
  email: string;
  picture: string;
  role: string;
  isActive: string;
  isVerified: boolean;
}

interface IDivision {
  name: string;
  thumbnail: string;
  description: string;
}

interface IGuideApplication {
  _id: string;
  user: IUser;
  country?: string;
  locationDivision?: string;
  division?: IDivision;
  nidPhoto: string;
  nidFrontPhoto?: string;
  nidBackPhoto?: string;
  photo?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

interface GuideApplicationProfileProps {
  setIsApplied: React.Dispatch<React.SetStateAction<boolean>>;
}

// Reusable Status Badge Component
const StatusBadge = ({ status }: { status: string }) => (
  <Badge variant="secondary">{status.replace('_', ' ')}</Badge>
);

// Reusable Timeline Item
const TimelineItem = ({
  title,
  description,
  date,
  color = 'green',
  isCurrent = false,
}: {
  title: string;
  description: string;
  date: string;
  color?: string;
  isCurrent?: boolean;
}) => (
  <li className="relative -ms-1.5 flex items-start gap-4">
    <span
      className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
        isCurrent ? 'animate-pulse' : ''
      } bg-${color}-500`}
    ></span>
    <div className="-mt-2">
      <time className="text-xs font-medium text-gray-700 dark:text-gray-200">{date}</time>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
      <p
        className={`mt-0.5 text-sm ${
          isCurrent ? `text-${color}-500 font-medium` : 'text-gray-700 dark:text-gray-200'
        }`}
      >
        {description}
      </p>
    </div>
  </li>
);

// Main Component
const GuideApplicationProfile = ({ setIsApplied }: GuideApplicationProfileProps) => {
  const { data, isLoading, isError, error } = useGetMyGuideApplicationQuery(undefined);
  const guideApplication: IGuideApplication | undefined = data?.data;

  useEffect(() => {
    if (guideApplication) setIsApplied(true);
  }, [guideApplication, setIsApplied]);

  if (isLoading) return <DataLoader />;

  if (isError)
    return (
      <Alert variant="destructive">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {(error as { message?: string })?.message || 'Something went wrong'}
        </AlertDescription>
      </Alert>
    );

  if (!guideApplication)
    return (
      <Card className="bg-card text-card-foreground mt-10 p-6">
        <p className="text-muted-foreground text-center">No guide application found.</p>
      </Card>
    );

  const {
    user,
    country,
    locationDivision,
    division,
    nidPhoto,
    nidFrontPhoto,
    nidBackPhoto,
    photo,
    status,
    _id,
    createdAt,
    updatedAt,
  } = guideApplication;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) +
    ' ' +
    new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <section className="bg-background text-foreground min-h-screen py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-foreground text-3xl font-bold underline">
            Guide Application Details
          </h1>
        </div>

        {/* Profile Card */}
        <Card className="bg-card overflow-hidden rounded-xl shadow">
          <div className="md:flex">
            {/* Profile Image */}
            <div className="ml-5 flex items-center justify-center rounded-md bg-gradient-to-br from-blue-50 to-indigo-50 p-8 md:w-1/3 dark:from-blue-900 dark:to-indigo-800">
              <div className="text-center">
                <img
                  src={photo || user.picture}
                  alt={user.name}
                  className="border-card mx-auto h-40 w-40 rounded-full border-4 object-cover shadow-lg"
                />
                <div className="mt-4">
                  <StatusBadge status={status} />
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="p-8 md:w-2/3">
              <h2 className="text-card-foreground mb-2 text-3xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground mb-6 flex items-center gap-1">
                <Mail /> {user.email}
              </p>

              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-muted-foreground mb-1 text-xs tracking-wide uppercase">
                    Current Role
                  </p>
                  <p className="text-card-foreground text-lg font-semibold">{user.role}</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-muted-foreground mb-1 text-xs tracking-wide uppercase">
                    Account Status
                  </p>
                  <p className="flex items-center gap-1 text-lg font-semibold text-green-600">
                    <BadgeCheck /> {user.isActive.toLowerCase()}
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-muted-foreground mb-1 text-xs tracking-wide uppercase">
                    Verification
                  </p>
                  <p className="flex items-center gap-2 text-lg font-semibold">
                    {user.isVerified ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-600" /> Verified
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600" /> Unverified
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="border-border border-t pt-4">
                <p className="text-muted-foreground mb-1 text-sm">Application ID</p>
                <p className="text-card-foreground bg-muted inline-block rounded px-3 py-2 font-mono text-sm">
                  {_id}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Specialization & Timeline */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Location */}
          <Card className="overflow-hidden">
            <div className="bg-primary relative -top-6 rounded-t-lg px-6 py-4">
              <h2 className="text-xl font-bold text-white">Guide Location</h2>
            </div>
            <CardContent>
              {division?.thumbnail && (
                <img
                  src={division.thumbnail}
                  alt={division.name}
                  className="mb-4 h-48 w-full rounded-lg object-cover shadow-md"
                />
              )}
              <p className="text-muted-foreground mb-1 text-sm">Country</p>
              <p className="text-card-foreground mb-4 text-lg font-semibold">
                {country || 'Not specified'}
              </p>
              <p className="text-muted-foreground mb-1 text-sm">Division</p>
              <h3 className="text-card-foreground mb-2 text-xl font-bold">
                {locationDivision || division?.name || 'Not specified'}
              </h3>
              {division?.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {division.description}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="overflow-hidden">
            <div className="bg-primary relative -top-6 rounded-t-lg px-6 py-4">
              <h2 className="text-xl font-bold text-white">Application Timeline</h2>
            </div>
            <CardContent>
              <ol className="relative space-y-8 before:absolute before:-ml-px before:h-full before:w-0.5 before:rounded-full before:bg-gray-200 dark:before:bg-gray-700">
                <TimelineItem
                  title="Submitted"
                  description="Your application has been submitted."
                  date={formatDate(createdAt)}
                  color="green"
                />
                <TimelineItem
                  title="Last Updated"
                  description="Your application was last updated."
                  date={formatDate(updatedAt)}
                  color="blue"
                />
                <TimelineItem
                  title="Current Status"
                  description={status.replace('_', ' ')}
                  date={formatDate(new Date().toISOString())}
                  color="yellow"
                  isCurrent
                />
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* NID Document */}
        <Card className="overflow-hidden">
          <div className="bg-primary relative -top-6 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Identity Verification Documents</h2>
          </div>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                { label: 'Front Side', image: nidFrontPhoto || nidPhoto },
                { label: 'Back Side', image: nidBackPhoto },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border-border hover:border-primary block rounded-xl border-2 border-dashed p-4 transition"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`NID ${item.label}`}
                      className="mx-auto h-full max-h-56 w-full cursor-pointer rounded-lg object-contain"
                    />
                  ) : (
                    <div className="text-muted-foreground bg-muted flex h-56 items-center justify-center rounded-lg text-sm">
                      Not uploaded
                    </div>
                  )}
                  <p className="text-muted-foreground mt-4 text-center text-sm font-semibold">
                    National ID Card - {item.label}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GuideApplicationProfile;

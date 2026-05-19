/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Calendar } from 'lucide-react';

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const AccountInfo = ({ userData }: { userData: any }) => {
  return (
    <Card className="border shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Account Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Status */}
          <div>
            <Label>Account Status</Label>
            <div className="mt-1">
              <Badge
                className={
                  userData.isActive === 'ACTIVE'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }
                variant="outline"
              >
                {userData.isActive === 'ACTIVE' ? (
                  <CheckCircle className="mr-1 h-3 w-3" />
                ) : (
                  <Clock className="mr-1 h-3 w-3" />
                )}
                {userData.isActive}
              </Badge>
            </div>
          </div>

          {/* Auth */}
          <div>
            <Label>Authentication Method</Label>
            <p className="mt-1 capitalize">{userData.auths[0]?.provider || 'Not specified'}</p>
          </div>

          {/* Dates */}
          <div>
            <Label>Member Since</Label>
            <div className="mt-1 flex items-center space-x-2">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <p>{formatDate(userData.createdAt)}</p>
            </div>
          </div>

          <div>
            <Label>Last Updated</Label>
            <div className="mt-1 flex items-center space-x-2">
              <Clock className="text-muted-foreground h-4 w-4" />
              <p>{formatDate(userData.updatedAt)}</p>
            </div>
          </div>
        </div>

        {/* ID */}
        <div className="mt-6 border-t pt-4">
          <Label>User ID</Label>
          <p className="bg-muted mt-1 rounded-md px-3 py-2 font-mono text-sm break-all">
            {userData._id}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInfo;

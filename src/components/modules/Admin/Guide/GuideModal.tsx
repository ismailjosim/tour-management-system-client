// components/GuideModal.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface GuideModalProps {
  modalProps: {
    selectedGuide: any;
    setSelectedGuide: (value: any) => void;
    handleGuideAction: (status: 'APPROVED' | 'REJECTED') => void;
    isActionLoading: boolean;
  };
}

const GuideModal = ({ modalProps }: GuideModalProps) => {
  const { selectedGuide, setSelectedGuide, handleGuideAction, isActionLoading } = modalProps;

  const statusConfig = {
    APPROVED: { icon: CheckCircle, color: 'bg-green-100 text-green-800', label: 'Approved' },
    PENDING: { icon: Clock, color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
    REJECTED: { icon: XCircle, color: 'bg-red-100 text-red-800', label: 'Rejected' },
  };

  const currentStatus = selectedGuide?.status as keyof typeof statusConfig;
  const config = statusConfig[currentStatus];
  const StatusIcon = config?.icon || Clock;

  return (
    <Dialog open={!!selectedGuide} onOpenChange={(open) => !open && setSelectedGuide(null)}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        {selectedGuide && (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between gap-4">
                <DialogTitle>{selectedGuide.user?.name || 'Guide Details'}</DialogTitle>
                {currentStatus && config && (
                  <Badge className={config.color}>
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {config.label}
                  </Badge>
                )}
              </div>
              <DialogDescription>Guide Application Details</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* User Info */}
              <div className="space-y-3 border-b pb-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="flex items-center gap-4">
                  {selectedGuide.user?.picture && (
                    <img
                      src={selectedGuide.user.picture}
                      alt={selectedGuide.user.name}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                      <p className="font-semibold">{selectedGuide.user?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                      <p>{selectedGuide.user?.email || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                      <p>{selectedGuide.user?.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                      <p>{selectedGuide.user?.address || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guide Details */}
              <div className="space-y-3 border-b pb-4">
                <h3 className="text-lg font-semibold">Professional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Experience</p>
                    <p className="font-semibold">{selectedGuide.experience || 0} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Role</p>
                    <p className="font-semibold">{selectedGuide.user?.role || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Languages</p>
                    <p className="font-semibold">
                      {selectedGuide.languages && selectedGuide.languages.length > 0
                        ? selectedGuide.languages.join(', ')
                        : 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Specialties</p>
                    <p className="font-semibold">
                      {selectedGuide.specialties && selectedGuide.specialties.length > 0
                        ? selectedGuide.specialties.join(', ')
                        : 'Not specified'}
                    </p>
                  </div>
                </div>
                {selectedGuide.bio && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bio</p>
                    <p>{selectedGuide.bio}</p>
                  </div>
                )}
              </div>

              {/* Division Info */}
              <div className="space-y-3 border-b pb-4">
                <h3 className="text-lg font-semibold">Division / Region</h3>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Division Name</p>
                  <p className="mb-3 font-semibold">{selectedGuide.division?.name || 'N/A'}</p>
                  {selectedGuide.division?.thumbnail && (
                    <img
                      src={selectedGuide.division.thumbnail}
                      alt="Division Thumbnail"
                      className="mb-3 h-32 w-full rounded-md object-cover"
                    />
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
                  <p>{selectedGuide.division?.description || 'N/A'}</p>
                </div>
              </div>

              {/* NID Photo */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">NID Verification</h3>
                {selectedGuide.nidPhoto && (
                  <img
                    src={selectedGuide.nidPhoto}
                    alt="NID"
                    className="h-48 w-full rounded-md object-cover"
                  />
                )}
              </div>
            </div>

            {/* Actions */}
            <DialogFooter className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedGuide(null)}>
                Close
              </Button>

              {/* Show approve/reject buttons only if status is PENDING */}
              {currentStatus === 'PENDING' && (
                <>
                  <Button
                    variant="destructive"
                    disabled={isActionLoading}
                    onClick={() => handleGuideAction('REJECTED')}
                  >
                    {isActionLoading ? 'Processing...' : 'Reject'}
                  </Button>
                  <Button
                    variant="default"
                    disabled={isActionLoading}
                    onClick={() => handleGuideAction('APPROVED')}
                  >
                    {isActionLoading ? 'Processing...' : 'Approve'}
                  </Button>
                </>
              )}

              {/* Show status message for non-pending guides */}
              {currentStatus !== 'PENDING' && currentStatus && (
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {currentStatus === 'APPROVED' && '✓ This guide has been approved'}
                  {currentStatus === 'REJECTED' && '✗ This guide has been rejected'}
                </div>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GuideModal;

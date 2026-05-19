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

  return (
    <Dialog open={!!selectedGuide} onOpenChange={() => setSelectedGuide(null)}>
      <DialogContent className="max-w-lg">
        {selectedGuide && (
          <>
            <DialogHeader>
              <DialogTitle>{selectedGuide.user.name}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Guide Info */}
              <div className="flex items-center gap-4">
                <img
                  src={selectedGuide.user.picture}
                  alt="Guide"
                  className="h-20 w-20 rounded-md object-cover"
                />
                <div>
                  <p className="font-semibold">{selectedGuide.user.email}</p>
                  <p>{selectedGuide.user.phone}</p>
                  <p className="text-muted-foreground text-sm">{selectedGuide.user.address}</p>
                </div>
              </div>

              {/* Division Info */}
              <div className="border-t pt-3">
                <p className="mb-1 font-semibold">Division:</p>
                <p>{selectedGuide.division.name}</p>
                <img
                  src={selectedGuide.division.thumbnail}
                  alt="Division Thumbnail"
                  className="mt-2 h-32 w-full rounded-md object-cover"
                />
                <p className="text-muted-foreground mt-2 text-sm">
                  {selectedGuide.division.description}
                </p>
              </div>

              {/* NID Photo */}
              <div>
                <p className="mb-1 font-semibold">NID Photo:</p>
                <img
                  src={selectedGuide.nidPhoto}
                  alt="NID"
                  className="h-40 w-full rounded-md object-cover"
                />
              </div>
            </div>

            {/* Actions */}
            <DialogFooter className="mt-5 flex justify-end gap-2">
              <Button
                variant="destructive"
                disabled={isActionLoading}
                onClick={() => handleGuideAction('REJECTED')}
              >
                Reject
              </Button>
              <Button
                variant="default"
                disabled={isActionLoading}
                onClick={() => handleGuideAction('APPROVED')}
              >
                Approve
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GuideModal;

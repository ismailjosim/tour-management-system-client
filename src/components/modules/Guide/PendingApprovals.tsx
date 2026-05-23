import { format } from 'date-fns';
import { Check, MapPin, Users, X } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  useApproveOrRejectBookingMutation,
  useGetGuidePendingApprovalsQuery,
} from '@/redux/features/booking/booking.api';
import type { ApiError } from '@/types';
import type { GuideBooking } from '@/types/guide';

export function PendingApprovals() {
  const { data, isLoading } = useGetGuidePendingApprovalsQuery({ limit: 5 });
  const [approveOrRejectBooking, { isLoading: isUpdating }] = useApproveOrRejectBookingMutation();
  const bookings = (data?.data?.data ?? []) as GuideBooking[];

  const handleApproval = async (bookingId: string, approved: boolean) => {
    const toastId = toast.loading(approved ? 'Approving booking...' : 'Rejecting booking...');

    try {
      await approveOrRejectBooking({
        bookingId,
        approved,
        rejectionReason: approved ? undefined : 'Guide rejected the booking',
      }).unwrap();
      toast.success(approved ? 'Booking approved' : 'Booking rejected', { id: toastId });
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.data?.message || 'Could not update booking', { id: toastId });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-semibold">Pending Approvals</CardTitle>
        <Badge variant="secondary">{bookings.length}</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading && <p className="text-muted-foreground text-sm">Loading pending approvals...</p>}
        {!isLoading && bookings.length === 0 && (
          <p className="text-muted-foreground text-sm">No bookings are waiting for approval.</p>
        )}
        {!isLoading &&
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex flex-col gap-3 rounded-md border p-3 sm:flex-row sm:items-center"
            >
              <Avatar className="h-12 w-12 rounded-md">
                {booking.tour?.images?.[0] ? (
                  <AvatarImage src={booking.tour.images[0]} alt={booking.tour.title} />
                ) : (
                  <AvatarFallback>{booking.tour?.title?.charAt(0) ?? 'T'}</AvatarFallback>
                )}
              </Avatar>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {booking.tour?.title ?? 'Assigned tour'}
                </p>
                <p className="text-muted-foreground flex items-center gap-1 text-xs">
                  <MapPin className="h-3 w-3" />
                  {booking.tour?.location ?? 'Location not set'}
                </p>
                <div className="text-muted-foreground mt-1 flex flex-wrap gap-3 text-xs">
                  <span>
                    {booking.tour?.startDate
                      ? format(new Date(booking.tour.startDate), 'MMM dd, yyyy')
                      : 'Date not set'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {booking.guestCount ?? 0} guests
                  </span>
                  <span>{booking.user?.name ?? 'Traveler'}</span>
                </div>
              </div>

              <div className="flex gap-2 sm:justify-end">
                <Button
                  size="sm"
                  onClick={() => handleApproval(booking._id, true)}
                  disabled={isUpdating}
                >
                  <Check className="h-4 w-4" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleApproval(booking._id, false)}
                  disabled={isUpdating}
                >
                  <X className="h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}

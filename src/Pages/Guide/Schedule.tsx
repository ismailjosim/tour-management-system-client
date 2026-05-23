import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetMyGuideBookingsQuery } from '@/redux/features/guide/guide.api';
import {
  useApproveOrRejectBookingMutation,
  useCompleteBookingMutation,
} from '@/redux/features/booking/booking.api';
import { CalendarClock, Check, CheckCircle2, Mail, MapPin, Phone, X, Users } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import type { GuideBooking } from '@/types/guide';

const Schedule = () => {
  const { data, isLoading, isError } = useGetMyGuideBookingsQuery({ limit: 50 });
  const [approveOrRejectBooking, { isLoading: isApproving }] = useApproveOrRejectBookingMutation();
  const [completeBooking, { isLoading: isCompleting }] = useCompleteBookingMutation();
  const bookings = ((data as any)?.data?.data ?? data?.data ?? []) as GuideBooking[];

  const handleApproval = async (bookingId: string, approved: boolean) => {
    const toastId = toast.loading(approved ? 'Approving booking...' : 'Rejecting booking...');

    try {
      await approveOrRejectBooking({
        bookingId,
        approved,
        rejectionReason: approved ? undefined : 'Guide rejected the booking',
      }).unwrap();
      toast.success(approved ? 'Booking approved' : 'Booking rejected', { id: toastId });
    } catch {
      toast.error('Could not update booking approval', { id: toastId });
    }
  };

  const handleComplete = async (bookingId: string) => {
    const toastId = toast.loading('Marking tour complete...');

    try {
      await completeBooking({ bookingId, completedBy: 'guide' }).unwrap();
      toast.success('Tour marked complete from your side', { id: toastId });
    } catch {
      toast.error('Could not complete tour', { id: toastId });
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-semibold">Bookings & Schedule</h3>
        <p className="text-muted-foreground text-sm">
          Upcoming assigned bookings with guest and contact details.
        </p>
      </div>

      {isError && (
        <Card className="border-destructive/40">
          <CardContent className="text-destructive p-5 text-sm">
            Upcoming schedule could not be loaded.
          </CardContent>
        </Card>
      )}

      {isLoading && <Card className="p-5 text-sm">Loading upcoming schedule...</Card>}

      {!isLoading && bookings.length === 0 && (
        <Card>
          <CardContent className="text-muted-foreground p-8 text-center">
            You do not have upcoming assigned bookings.
          </CardContent>
        </Card>
      )}

      {!isLoading && bookings.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tour</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>
                      <div className="max-w-[260px]">
                        <p className="truncate font-medium">
                          {booking.tour?.title ?? 'Assigned tour'}
                        </p>
                        <p className="text-muted-foreground flex items-center gap-1 text-xs">
                          <MapPin className="h-3 w-3" />
                          {booking.tour?.location ?? 'Location not set'}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{booking.user?.name ?? 'Traveler'}</p>
                      <p className="text-muted-foreground text-xs">{booking.user?.email}</p>
                    </TableCell>
                    <TableCell>
                      <p className="flex items-center gap-1">
                        <CalendarClock className="h-4 w-4" />
                        {booking.tour?.startDate
                          ? format(new Date(booking.tour.startDate), 'MMM dd, yyyy p')
                          : 'Not set'}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {booking.guestCount ?? 0}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="secondary">{booking.status ?? 'PENDING'}</Badge>
                        {booking.guideApprovalStatus && (
                          <p className="text-muted-foreground text-xs">
                            Guide: {booking.guideApprovalStatus}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{booking.payment?.status ?? 'UNPAID'}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        {booking.guideApprovalStatus === 'PENDING' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApproval(booking._id, true)}
                              disabled={isApproving}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleApproval(booking._id, false)}
                              disabled={isApproving}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {booking.payment?.status === 'PAID' &&
                          booking.status !== 'COMPLETE' &&
                          !booking.guideCompleted &&
                          (!booking.tour?.startDate ||
                            new Date(booking.tour.startDate).getTime() <= Date.now()) && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleComplete(booking._id)}
                              disabled={isCompleting}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          )}
                        {booking.user?.email && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={`mailto:${booking.user.email}`}>
                              <Mail className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {booking.user?.phone && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={`tel:${booking.user.phone}`}>
                              <Phone className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Schedule;

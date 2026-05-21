import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useGetMyGuideScheduleQuery,
  useUpdateMyGuideBookingStatusMutation,
} from '@/redux/features/guide/guide.api';
import { CalendarClock, Mail, MapPin, Phone, Users } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const guideStatusOptions = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'IN_PROGRESS', label: 'In progress' },
  { value: 'COMPLETE', label: 'Complete' },
  { value: 'REJECTED', label: 'Rejected' },
];

const Schedule = () => {
  const { data, isLoading, isError } = useGetMyGuideScheduleQuery();
  const [updateBookingStatus, { isLoading: isUpdating }] = useUpdateMyGuideBookingStatusMutation();
  const bookings = data?.data ?? [];

  const handleStatusChange = async (bookingId: string, status: string) => {
    const toastId = toast.loading('Updating booking status...');

    try {
      await updateBookingStatus({ bookingId, status }).unwrap();
      toast.success('Booking status updated', { id: toastId });
    } catch {
      toast.error('Could not update booking status', { id: toastId });
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
                  <TableHead className="text-right">Contact</TableHead>
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
                      <Select
                        value={booking.status ?? 'PENDING'}
                        disabled={isUpdating}
                        onValueChange={(status) => handleStatusChange(booking._id, status)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {guideStatusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{booking.payment?.status ?? 'UNPAID'}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
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

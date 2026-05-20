import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetMyGuideBookingsQuery } from '@/redux/features/guide/guide.api';
import type { GuideBooking } from '@/types/guide';
import { Mail, MessageSquare, Phone } from 'lucide-react';

const getUniqueGuests = (bookings: GuideBooking[]) => {
  const guests = new Map<string, GuideBooking>();

  for (const booking of bookings) {
    const key = booking.user?.email ?? booking.user?.phone ?? booking._id;
    guests.set(key, booking);
  }

  return Array.from(guests.values());
};

const Communication = () => {
  const { data, isLoading, isError } = useGetMyGuideBookingsQuery({ limit: 50 });
  const bookings = data?.data ?? [];
  const guests = getUniqueGuests(bookings);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-semibold">Communication</h3>
        <p className="text-muted-foreground text-sm">
          Quick contact panel for travelers assigned to your bookings.
        </p>
      </div>

      {isError && (
        <Card className="border-destructive/40">
          <CardContent className="text-destructive p-5 text-sm">
            Contact list could not be loaded.
          </CardContent>
        </Card>
      )}

      {isLoading && <Card className="p-5 text-sm">Loading assigned contacts...</Card>}

      {!isLoading && guests.length === 0 && (
        <Card>
          <CardContent className="text-muted-foreground p-8 text-center">
            No assigned traveler contacts yet.
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {guests.map((booking) => (
          <Card key={booking.user?.email ?? booking._id}>
            <CardHeader className="flex flex-row items-center gap-3">
              <Avatar>
                <AvatarImage src={booking.user?.picture} />
                <AvatarFallback>{booking.user?.name?.charAt(0) ?? 'T'}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{booking.user?.name ?? 'Traveler'}</CardTitle>
                <p className="text-muted-foreground text-sm">
                  {booking.tour?.title ?? 'Assigned booking'}
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {booking.user?.email && (
                <Button size="sm" variant="outline" asChild>
                  <a href={`mailto:${booking.user.email}`}>
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                </Button>
              )}
              {booking.user?.phone && (
                <Button size="sm" variant="outline" asChild>
                  <a href={`tel:${booking.user.phone}`}>
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                </Button>
              )}
              <Button size="sm" variant="secondary" disabled>
                <MessageSquare className="h-4 w-4" />
                In-app message
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Communication;

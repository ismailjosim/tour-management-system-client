import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetMyGuideBookingsQuery } from '@/redux/features/guide/guide.api';
import type { GuideBooking } from '@/types/guide';
import { Check, Copy, Mail, MessageSquare, Phone } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const bookings = data?.data ?? [];
  const guests = getUniqueGuests(bookings);

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      toast.success(`${label} copied`);
      window.setTimeout(() => setCopiedValue(null), 1500);
    } catch {
      toast.error(`Could not copy ${label.toLowerCase()}`);
    }
  };

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
            <CardContent className="space-y-3">
              {booking.user?.email && (
                <div className="border-border/70 flex items-center justify-between gap-3 rounded-md border px-3 py-2">
                  <a
                    href={`mailto:${booking.user.email}`}
                    className="flex min-w-0 items-center gap-2 text-sm"
                  >
                    <Mail className="text-muted-foreground h-4 w-4 shrink-0" />
                    <span className="truncate">{booking.user.email}</span>
                  </a>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => handleCopy(booking.user?.email ?? '', 'Email')}
                    aria-label="Copy email"
                  >
                    {copiedValue === booking.user.email ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
              {booking.user?.phone && (
                <div className="border-border/70 flex items-center justify-between gap-3 rounded-md border px-3 py-2">
                  <a
                    href={`tel:${booking.user.phone}`}
                    className="flex min-w-0 items-center gap-2 text-sm"
                  >
                    <Phone className="text-muted-foreground h-4 w-4 shrink-0" />
                    <span className="truncate">{booking.user.phone}</span>
                  </a>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => handleCopy(booking.user?.phone ?? '', 'Phone number')}
                    aria-label="Copy phone number"
                  >
                    {copiedValue === booking.user.phone ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
              <Button size="sm" variant="secondary" disabled className="mt-1">
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

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetMyGuideToursQuery } from '@/redux/features/guide/guide.api';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';

const MyTours = () => {
  const { data, isLoading, isError } = useGetMyGuideToursQuery();
  const tours = data?.data ?? [];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-semibold">My Tours</h3>
        <p className="text-muted-foreground text-sm">
          Tours and bookings currently assigned to you.
        </p>
      </div>

      {isError && (
        <Card className="border-destructive/40">
          <CardContent className="text-destructive p-5 text-sm">
            Assigned tours could not be loaded.
          </CardContent>
        </Card>
      )}

      {isLoading && <Card className="p-5 text-sm">Loading assigned tours...</Card>}

      {!isLoading && tours.length === 0 && (
        <Card>
          <CardContent className="text-muted-foreground p-8 text-center">
            No tours have been assigned to your guide profile yet.
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {tours.map((item) => (
          <Card key={item.tour?._id ?? item.tour?.slug} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-lg">{item.tour?.title ?? 'Assigned tour'}</CardTitle>
                  <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                    <MapPin className="h-4 w-4" />
                    {item.tour?.location ?? 'Location not set'}
                  </p>
                </div>
                <Badge variant="outline">{item.bookingCount} bookings</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="bg-muted/50 rounded-md p-3">
                  <p className="text-muted-foreground">Guests</p>
                  <p className="mt-1 flex items-center gap-1 font-semibold">
                    <Users className="h-4 w-4" />
                    {item.guestCount}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-md p-3">
                  <p className="text-muted-foreground">Completed</p>
                  <p className="mt-1 font-semibold">{item.completedBookings}</p>
                </div>
                <div className="bg-muted/50 rounded-md p-3">
                  <p className="text-muted-foreground">Earnings</p>
                  <p className="mt-1 font-semibold">৳{item.earnings.toLocaleString()}</p>
                </div>
              </div>

              <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  {item.tour?.startDate
                    ? format(new Date(item.tour.startDate), 'MMM dd, yyyy')
                    : 'Start date not set'}
                </span>
                <span>{item.tour?.departureLocation ?? 'Departure TBD'}</span>
                <span>{item.tour?.arrivalLocation ?? 'Arrival TBD'}</span>
              </div>

              {item.tour?.tourPlan?.length ? (
                <div>
                  <p className="mb-2 text-sm font-medium">Itinerary</p>
                  <ol className="text-muted-foreground list-inside list-decimal space-y-1 text-sm">
                    {item.tour.tourPlan.slice(0, 3).map((plan) => (
                      <li key={plan}>{plan}</li>
                    ))}
                  </ol>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyTours;

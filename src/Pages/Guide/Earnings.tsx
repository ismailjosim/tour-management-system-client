import { EarningsChart } from '@/components/modules/Guide/EarningsChart';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetMyGuideEarningsQuery } from '@/redux/features/guide/guide.api';
import { format } from 'date-fns';

const Earnings = () => {
  const { data, isLoading, isError } = useGetMyGuideEarningsQuery();
  const earnings = data?.data;
  const paidBookings = earnings?.paidBookings ?? [];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-semibold">Earnings</h3>
        <p className="text-muted-foreground text-sm">
          Paid completed bookings, commission, and payout readiness.
        </p>
      </div>

      {isError && (
        <Card className="border-destructive/40">
          <CardContent className="text-destructive p-5 text-sm">
            Earnings could not be loaded.
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">৳{(earnings?.totalEarnings ?? 0).toLocaleString()}</p>
            <p className="text-muted-foreground mt-1 text-sm">
              {Math.round((earnings?.commissionRate ?? 0) * 100)}% commission on paid completed
              bookings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Paid Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{paidBookings.length}</p>
            <p className="text-muted-foreground mt-1 text-sm">Ready for payout review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Latest Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              ৳{(earnings?.monthlyEarnings.at(-1)?.amount ?? 0).toLocaleString()}
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              {earnings?.monthlyEarnings.at(-1)?.month ?? 'No payout month yet'}
            </p>
          </CardContent>
        </Card>
      </div>

      <EarningsChart earnings={earnings} isLoading={isLoading} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Completed Paid Bookings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading && <p className="p-5 text-sm">Loading earning records...</p>}
          {!isLoading && paidBookings.length === 0 && (
            <p className="text-muted-foreground p-8 text-center">
              No paid completed bookings are ready for payout yet.
            </p>
          )}
          {!isLoading && paidBookings.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tour</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paidBookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.tour?.title ?? 'Assigned tour'}</TableCell>
                    <TableCell>{booking.user?.name ?? 'Traveler'}</TableCell>
                    <TableCell>
                      {booking.paidAt ? format(new Date(booking.paidAt), 'MMM dd, yyyy') : 'Paid'}
                    </TableCell>
                    <TableCell>৳{(booking.commissionAmount ?? 0).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{booking.payoutStatus ?? 'PENDING'}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Earnings;

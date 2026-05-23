import { format } from 'date-fns';
import { CalendarDays, FileText, Mail, MapPin, Phone, Star, Users } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Booking } from '@/types/booking';

type UserBookingDetailsModalProps = {
  booking: Booking;
  trigger: React.ReactNode;
};

const formatDate = (date?: string) => (date ? format(new Date(date), 'PPp') : 'Not set');

const getStatusVariant = (status?: string) => {
  if (status === 'COMPLETE' || status === 'PAID' || status === 'APPROVED') return 'default';
  if (status === 'CANCEL' || status === 'FAILED' || status === 'REJECTED') return 'destructive';
  return 'secondary';
};

const InfoItem = ({
  label,
  value,
  className = '',
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <p className="text-muted-foreground text-xs font-medium uppercase">{label}</p>
    <div className="mt-1 text-sm font-medium">{value || 'Not available'}</div>
  </div>
);

const UserBookingDetailsModal = ({ booking, trigger }: UserBookingDetailsModalProps) => {
  const guideRating = booking.guide?.averageRating ?? booking.guide?.rating;
  const guideReviewCount = booking.guide?.totalReviews ?? booking.guide?.reviewCount;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription>Booking ID: {booking._id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Avatar className="h-24 w-24 rounded-md">
              {booking.tour?.images?.[0] ? (
                <AvatarImage src={booking.tour.images[0]} alt={booking.tour.title} />
              ) : (
                <AvatarFallback>{booking.tour?.title?.charAt(0) ?? 'T'}</AvatarFallback>
              )}
            </Avatar>

            <div className="min-w-0 flex-1 space-y-2">
              <div>
                <h4 className="text-lg font-semibold">{booking.tour?.title ?? 'Tour'}</h4>
                <p className="text-muted-foreground flex items-center gap-1 text-sm">
                  <MapPin className="h-4 w-4" />
                  {booking.tour?.location ?? 'Location not set'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={getStatusVariant(booking.status)}>{booking.status}</Badge>
                <Badge variant={getStatusVariant(booking.payment?.status)}>
                  {booking.payment?.status ?? 'UNPAID'}
                </Badge>
                {booking.guideApprovalStatus && (
                  <Badge variant={getStatusVariant(booking.guideApprovalStatus)}>
                    Guide {booking.guideApprovalStatus}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-4 rounded-md border p-4 sm:grid-cols-2 lg:grid-cols-4">
            <InfoItem label="Guests" value={booking.guestCount} />
            <InfoItem label="Price / Person" value={`$${booking.tour?.costFrom ?? 0}`} />
            <InfoItem label="Total Paid" value={`$${booking.payment?.amount ?? 0}`} />
            <InfoItem label="Booked On" value={formatDate(booking.createdAt)} />
          </div>

          <div className="grid gap-4 rounded-md border p-4 sm:grid-cols-2">
            <InfoItem
              label="Tour Starts"
              value={
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(booking.tour?.startDate)}
                </span>
              }
            />
            <InfoItem
              label="Tour Ends"
              value={
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(booking.tour?.endDate)}
                </span>
              }
            />
            <InfoItem
              label="Your Completion"
              value={booking.userCompleted ? 'Marked complete' : 'Not completed yet'}
            />
            <InfoItem
              label="Guide Completion"
              value={booking.guideCompleted ? 'Marked complete' : 'Not completed yet'}
            />
          </div>

          <div className="rounded-md border p-4">
            <h5 className="mb-3 font-semibold">Guide Information</h5>
            {booking.guide ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <Avatar className="h-16 w-16">
                  {booking.guide.picture ? (
                    <AvatarImage src={booking.guide.picture} alt={booking.guide.name} />
                  ) : (
                    <AvatarFallback>{booking.guide.name?.charAt(0) ?? 'G'}</AvatarFallback>
                  )}
                </Avatar>
                <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-2">
                  <InfoItem label="Name" value={booking.guide.name ?? 'Assigned guide'} />
                  <InfoItem
                    label="Rating"
                    value={
                      guideRating ? (
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          {guideRating.toFixed(1)} / 5
                          {guideReviewCount ? ` (${guideReviewCount} reviews)` : ''}
                        </span>
                      ) : (
                        'No rating yet'
                      )
                    }
                  />
                  <InfoItem
                    label="Email"
                    value={
                      booking.guide.email ? (
                        <a
                          className="flex items-center gap-2"
                          href={`mailto:${booking.guide.email}`}
                        >
                          <Mail className="h-4 w-4" />
                          {booking.guide.email}
                        </a>
                      ) : null
                    }
                  />
                  <InfoItem
                    label="Phone"
                    value={
                      booking.guide.phone ? (
                        <a className="flex items-center gap-2" href={`tel:${booking.guide.phone}`}>
                          <Phone className="h-4 w-4" />
                          {booking.guide.phone}
                        </a>
                      ) : null
                    }
                  />
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No guide has been assigned yet.</p>
            )}
          </div>

          <div className="grid gap-4 rounded-md border p-4 sm:grid-cols-2">
            <InfoItem
              label="Transaction ID"
              value={<span className="font-mono text-xs">{booking.payment?.transactionId}</span>}
            />
            <InfoItem
              label="Invoice"
              value={
                booking.payment?.invoiceUrl ? (
                  <Button asChild size="sm" variant="outline">
                    <a href={booking.payment.invoiceUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4" />
                      View Invoice
                    </a>
                  </Button>
                ) : (
                  'Invoice not available'
                )
              }
            />
            {booking.rejectionReason && (
              <InfoItem
                className="sm:col-span-2"
                label="Rejection Reason"
                value={booking.rejectionReason}
              />
            )}
          </div>

          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Users className="h-4 w-4" />
            Booking updates after payment, guide approval, and both-side completion.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserBookingDetailsModal;

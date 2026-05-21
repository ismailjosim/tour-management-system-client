/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'date-fns';
import { CreditCard, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import DeleteConfirmation from '@/components/DeleteConfirmation';

import usePagination from '@/hooks/usePagination';
import DataTable from '../../utils/DataTable';
import DataPagination from '../../utils/DataPagination';
import {
  useGetMyBookingsQuery,
  useInitiatePaymentMutation,
  useRemoveBookingMutation,
} from '../../redux/features/booking/booking.api';
import AddReviewButton from '../../components/modules/booking/AddReviewButton';
import type { ApiError } from '@/types';
import type { Booking } from '@/types/booking';

const Bookings = () => {
  const { currentPage, limit, handlePageChange, handleLimitChange } = usePagination();

  const { data, isLoading } = useGetMyBookingsQuery({
    page: currentPage,
    limit,
  });

  const [removeBooking] = useRemoveBookingMutation();
  const [initiatePayment, { isLoading: isPaymentLoading }] = useInitiatePaymentMutation();

  const handleDelete = async (id: string) => {
    return removeBooking(id).unwrap();
  };

  const handlePayNow = async (booking: Booking) => {
    const toastId = toast.loading('Preparing payment...');

    try {
      const res = await initiatePayment(booking._id).unwrap();

      if (res.success && res.data?.paymentUrl) {
        sessionStorage.setItem(
          'payment_state',
          JSON.stringify({
            bookingId: res.data.booking._id,
            transactionId: res.data.booking.payment.transactionId,
            amount: res.data.booking.payment.amount,
            timestamp: Date.now(),
            tourTitle: res.data.booking.tour.title,
          })
        );

        toast.success('Redirecting to payment gateway...', { id: toastId });
        window.location.href = res.data.paymentUrl;
        return;
      }

      toast.error('Payment URL not received', { id: toastId });
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.data?.message || 'Failed to start payment', { id: toastId });
    }
  };

  const canPay = (booking: Booking) =>
    booking.payment?.status === 'UNPAID' ||
    booking.payment?.status === 'FAILED' ||
    booking.payment?.status === 'CANCELLED' ||
    booking.status === 'PENDING' ||
    booking.status === 'FAILED' ||
    booking.status === 'CANCEL';

  const canReview = (booking: Booking) =>
    booking.status === 'COMPLETE' && booking.payment?.status === 'PAID';

  const getReviewableGuide = (booking: Booking) =>
    booking.guide?.role === 'GUIDE' ? booking.guide : undefined;

  const columns = [
    {
      key: 'tour',
      header: 'Tour',
      className: 'font-medium',
      render: (tour: Booking['tour']) => (
        <div className="max-w-[220px] truncate font-medium">{tour?.title || 'Tour'}</div>
      ),
    },
    {
      key: 'guestCount',
      header: 'Guests',
      className: 'text-center',
      render: (guestCount: number) => <div className="text-center">{guestCount}</div>,
    },
    {
      key: 'status',
      header: 'Status',
      className: 'text-center',
      render: (status: string) => (
        <span
          className={`rounded px-2 py-1 text-xs font-medium ${
            status === 'COMPLETE'
              ? 'bg-green-100 text-green-700'
              : status === 'CANCEL'
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      key: 'payment',
      header: 'Payment',
      className: 'text-center',
      render: (payment: Booking['payment']) => (
        <span
          className={`rounded px-2 py-1 text-xs font-medium ${
            payment?.status === 'PAID'
              ? 'bg-green-100 text-green-700'
              : payment?.status === 'FAILED' || payment?.status === 'CANCELLED'
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {payment?.status || 'UNPAID'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Booking Date',
      className: 'font-medium',
      render: (createdAt: string) => <span>{format(new Date(createdAt), 'MMM dd, yyyy')}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (_: any, item: Booking) => {
        const guide = getReviewableGuide(item);

        return (
          <div className="flex items-center justify-end gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to={`/destination/${item.tour?.slug || item.tour?._id}`}>View Tour</Link>
            </Button>
            {canPay(item) && item.payment?.status !== 'PAID' && (
              <Button
                size="sm"
                onClick={() => handlePayNow(item)}
                disabled={isPaymentLoading}
                className="text-white"
              >
                <CreditCard className="h-4 w-4" />
                Pay Now
              </Button>
            )}
            {canReview(item) && (
              <AddReviewButton
                tourId={item.tour?._id || ''}
                guideId={guide?._id}
                guideName={guide?.name}
              />
            )}
            <DeleteConfirmation onConfirm={() => handleDelete(item._id)}>
              <Button size="sm" variant="destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </DeleteConfirmation>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-2xl font-semibold">All Bookings</h3>
      </div>

      <DataTable
        columns={columns}
        data={data?.data?.data || []}
        isLoading={isLoading}
        emptyMessage="No bookings found"
      />

      {data?.data?.meta && (
        <DataPagination
          currentPage={currentPage}
          totalPage={data.data.meta.totalPage}
          limit={limit}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      )}
    </div>
  );
};

export default Bookings;

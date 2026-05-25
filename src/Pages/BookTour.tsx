/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, MapPin, Calendar, Users, Minus, Plus } from 'lucide-react';
import type { ApiError, IDestination, IResponse } from '../types';
import { useParams } from 'react-router';
import { useGetSingleTourQuery } from '../redux/features/Tour/tour.api';
import { useAddBookingMutation } from '../redux/features/booking/booking.api';
import { useGetAvailableGuidesForTourQuery } from '../redux/features/guide/guide.api';
import { toast } from 'sonner';
import { format } from 'date-fns';

const BookTour = () => {
  const [guestCount, setGuestCount] = useState(1);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const { data } = useGetSingleTourQuery(slug);
  const [addBooking] = useAddBookingMutation();

  const apiResponse = data as IResponse<IDestination> | undefined;
  const tour = apiResponse?.data;

  // Fetch available guides for the tour
  const { data: guidesResponse } = useGetAvailableGuidesForTourQuery(tour?._id || '', {
    skip: !tour?._id,
  });

  const availableGuides = guidesResponse?.data || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!tour) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white dark:bg-gray-950">
        Loading booking info...
      </div>
    );
  }

  const {
    _id,
    title,
    description,
    images,
    location,
    maxGuest,
    included,
    tourPlan,
    costFrom,
    startDate,
    endDate,
  } = tour || {};

  const totalAmount = (costFrom || 0) * guestCount;

  const handleGuestChange = (type: 'increment' | 'decrement') => {
    if (type === 'increment' && guestCount < maxGuest) {
      setGuestCount(guestCount + 1);
    }
    if (type === 'decrement' && guestCount > 1) {
      setGuestCount(guestCount - 1);
    }
  };

  const handleBookNow = async () => {
    if (!data) return;

    const toastId = toast.loading('Processing booking...');
    const bookingData: any = {
      tour: _id,
      guestCount,
    };

    // Include guide if selected
    if (selectedGuide) {
      bookingData.guide = selectedGuide;
    }

    try {
      const res = await addBooking(bookingData).unwrap();
      console.log({ res });

      if (res.success && res.data?.paymentUrl) {
        // Store payment session data before redirecting
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
        console.log({ paymentUrl: res.data.paymentUrl });

        // Redirect to payment gateway
        window.location.href = res.data.paymentUrl;
      } else {
        toast.error('Payment URL not received', { id: toastId });
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Booking error:', apiError);
      // navigate profile page if user profile is not updated Phone and address is required for booking
      if (
        apiError.status === 400 &&
        apiError.data?.message.includes('Please Update Your Profile to Book a Tour')
      ) {
        toast.error('Please update your profile with phone and address to proceed with booking', {
          id: toastId,
        });
        setTimeout(() => {
          window.location.href = '/profile';
        }, 3000);
        return;
      }
      toast.error(apiError.data?.message || 'Booking failed', { id: toastId });
    }
  };

  return (
    <section className="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-200">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Column: Tour Details */}
          <div className="space-y-10 lg:col-span-2">
            {/* Main Image */}
            <div className="overflow-hidden rounded-lg shadow-2xl dark:shadow-none">
              <img src={images[0]} alt={title} className="h-[500px] w-full object-cover" />
            </div>

            {/* Title and Description */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 md:text-5xl dark:text-gray-50">
                {title}
              </h1>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </div>

            {/* Tour Info */}
            <div className="grid gap-6 font-medium text-gray-600 md:grid-cols-2 lg:grid-cols-3 dark:text-gray-400">
              <div className="flex items-center space-x-3">
                <MapPin className="text-blue-500" size={20} />
                <span>Location: {location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="text-blue-500" size={20} />
                <span>
                  Duration: {format(startDate, 'PP')} - {format(endDate, 'PP')}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="text-blue-500" size={20} />
                <span>Max Guests: {maxGuest}</span>
              </div>
            </div>

            {/* What's Included */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                What's Included
              </h3>
              <ul className="grid gap-4 md:grid-cols-2">
                {included.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300"
                  >
                    <Check className="text-green-500" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tour Plan */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Tour Plan</h3>
              <ol className="space-y-3 pl-4 text-gray-700 dark:text-gray-300">
                {tourPlan.map((step, index) => (
                  <li key={index} className="text-lg">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right Column: Booking Details */}
          <div className="lg:col-span-1">
            <Card className="self-start bg-white text-gray-900 shadow-lg lg:sticky lg:top-8 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Select Your Local Guide */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold">Select Your Local Guide</h4>
                  {availableGuides.length > 0 ? (
                    <div className="max-h-48 space-y-2 overflow-y-auto">
                      {/* Optional: No Guide Option */}
                      <div
                        onClick={() => setSelectedGuide(null)}
                        className={`cursor-pointer rounded-lg border-2 p-3 transition-all ${
                          selectedGuide === null
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                            : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                        }`}
                      >
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          Let us assign a guide
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          We'll match you with an available guide
                        </p>
                      </div>

                      {/* Guide Options */}
                      {availableGuides.map((guide: any) => (
                        <div
                          key={guide._id}
                          onClick={() => setSelectedGuide(guide._id)}
                          className={`cursor-pointer rounded-lg border-2 p-3 transition-all ${
                            selectedGuide === guide._id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                              : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {(guide.photo || guide.user?.picture) && (
                              <img
                                src={guide.photo || guide.user.picture}
                                alt={guide.user.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-gray-700 dark:text-gray-300">
                                {guide.user?.name}
                              </p>
                              {guide.bio && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {guide.bio.substring(0, 50)}...
                                </p>
                              )}
                              {guide.experience && (
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                  {guide.experience} years experience
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No guides available for this tour. We'll assign one from our team.
                    </p>
                  )}
                </div>

                {/* Number of Guests */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold">Number of Guests</h4>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleGuestChange('decrement')}
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10"
                    >
                      <Minus size={20} />
                    </Button>
                    <Input
                      type="text"
                      value={guestCount}
                      readOnly
                      className="w-20 border-gray-300 bg-gray-100 text-center text-lg font-semibold dark:border-gray-700 dark:bg-gray-900"
                    />
                    <Button
                      onClick={() => handleGuestChange('increment')}
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10"
                    >
                      <Plus size={20} />
                    </Button>
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Price per person:</span>
                    <span>${costFrom}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Guests:</span>
                    <span>{guestCount}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-lg font-bold dark:border-gray-700">
                    <span>Total Amount:</span>
                    <span className="text-green-600 dark:text-green-400">${totalAmount}</span>
                  </div>
                </div>

                {/* Book Now Button */}
                <Button
                  onClick={handleBookNow}
                  className="w-full py-6 text-lg font-semibold text-white"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookTour;

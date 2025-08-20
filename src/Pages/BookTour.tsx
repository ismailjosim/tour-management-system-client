import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, MapPin, Calendar, Users, Minus, Plus } from 'lucide-react'
import type { IDestination } from '../types'
import { dummyTourData } from '../DummyData'

const BookTour = () => {
    const [guestCount, setGuestCount] = useState(3)
    const [tour, setTour] = useState<IDestination | null>(null)

    useEffect(() => {
        setTour(dummyTourData as IDestination)
        window.scrollTo(0, 0)
    }, [])

    if (!tour) {
        return (
            <div className='min-h-screen bg-gray-950 dark:bg-gray-950 flex items-center justify-center text-white'>
                Loading tour details...
            </div>
        )
    }

    const {
        title,
        description,
        images,
        location,
        maxGuest,
        included,
        tourPlan,
        costFrom,
    } = tour

    const totalAmount = (costFrom || 0) * guestCount

    const handleGuestChange = (type: 'increment' | 'decrement') => {
        if (type === 'increment' && guestCount < maxGuest) {
            setGuestCount(guestCount + 1)
        }
        if (type === 'decrement' && guestCount > 1) {
            setGuestCount(guestCount - 1)
        }
    }

    const handleBookNow = () => {
        console.log('Initiating SSLCommerz payment with the following data:')
        console.log('Tour ID:', tour._id)
        console.log('Guest Count:', guestCount)
        console.log('Total Amount:', totalAmount)

        alert('Booking process initiated. Redirecting to payment gateway...')
    }

    return (
        <section className='min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200'>
            <div className='container mx-auto px-4 py-16'>
                <div className='grid lg:grid-cols-3 gap-12'>
                    {/* Left Column: Tour Details */}
                    <div className='lg:col-span-2 space-y-10'>
                        {/* Main Image */}
                        <div className='rounded-lg overflow-hidden shadow-2xl dark:shadow-none'>
                            <img
                                src={images[0]}
                                alt={title}
                                className='w-full h-[500px] object-cover'
                            />
                        </div>

                        {/* Title and Description */}
                        <div className='space-y-4'>
                            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50'>
                                {title}
                            </h1>
                            <p className='text-gray-600 dark:text-gray-400 text-lg leading-relaxed'>
                                {description}
                            </p>
                        </div>

                        {/* Tour Info */}
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-600 dark:text-gray-400 font-medium'>
                            <div className='flex items-center space-x-3'>
                                <MapPin className='text-blue-500' size={20} />
                                <span>Location: {location}</span>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <Calendar className='text-blue-500' size={20} />
                                <span>Duration: {'duration'}</span>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <Users className='text-blue-500' size={20} />
                                <span>Max Guests: {maxGuest}</span>
                            </div>
                        </div>

                        {/* What's Included */}
                        <div className='space-y-4'>
                            <h3 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
                                What's Included
                            </h3>
                            <ul className='grid md:grid-cols-2 gap-4'>
                                {included.map((item, index) => (
                                    <li
                                        key={index}
                                        className='flex items-center space-x-3 text-gray-700 dark:text-gray-300'
                                    >
                                        <Check className='text-green-500' size={20} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tour Plan */}
                        <div className='space-y-4'>
                            <h3 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
                                Tour Plan
                            </h3>
                            <ol className='list-decimal list-inside space-y-3 pl-4 text-gray-700 dark:text-gray-300'>
                                {tourPlan.map((step, index) => (
                                    <li key={index} className='text-lg'>
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* Right Column: Booking Details */}
                    <div className='lg:col-span-1'>
                        <Card className='bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-gray-700 shadow-lg lg:sticky lg:top-8 self-start'>
                            <CardHeader>
                                <CardTitle className='text-2xl text-center'>
                                    Booking Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-6'>
                                {/* Number of Guests */}
                                <div className='space-y-3'>
                                    <h4 className='text-lg font-semibold'>Number of Guests</h4>
                                    <div className='flex items-center space-x-2'>
                                        <Button
                                            onClick={() => handleGuestChange('decrement')}
                                            variant='secondary'
                                            size='icon'
                                            className='w-10 h-10'
                                        >
                                            <Minus size={20} />
                                        </Button>
                                        <Input
                                            type='text'
                                            value={guestCount}
                                            readOnly
                                            className='text-center w-20 text-lg font-semibold bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700'
                                        />
                                        <Button
                                            onClick={() => handleGuestChange('increment')}
                                            variant='secondary'
                                            size='icon'
                                            className='w-10 h-10'
                                        >
                                            <Plus size={20} />
                                        </Button>
                                    </div>
                                </div>

                                {/* Booking Summary */}
                                <div className='space-y-3 text-gray-600 dark:text-gray-300'>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-semibold'>Price per person:</span>
                                        <span>${costFrom}</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-semibold'>Guests:</span>
                                        <span>{guestCount}</span>
                                    </div>
                                    <div className='flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700 text-lg font-bold'>
                                        <span>Total Amount:</span>
                                        <span className='text-green-600 dark:text-green-400'>
                                            ${totalAmount}
                                        </span>
                                    </div>
                                </div>

                                {/* Book Now Button */}
                                <Button
                                    onClick={handleBookNow}
                                    className='w-full text-lg font-semibold py-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'
                                >
                                    Book Now
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookTour

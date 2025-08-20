import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { MapPin, Star, Check, X, Facebook, Twitter, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import PageHeading from '../utils/PageHeading'
import { useGetSingleTourQuery } from '../redux/features/Tour/tour.api'
import type { IDestination, IResponse } from '../types'





// Define a default image for when no image is found
const DEFAULT_IMAGE = "https://via.placeholder.com/1200x800.png?text=No+Image+Available";

const DestinationDetails: React.FC = () => {
    const { slug } = useParams<{ slug: string }>()
    const { data, isLoading, isError } = useGetSingleTourQuery(slug);

    // Cast the data to the defined ApiResponse interface
    const apiResponse = data as IResponse<IDestination> | undefined;
    const destination = apiResponse?.data;

    const {
        title,
        description,
        images,
        location,
        included,
        excluded,
        amenities,
    } = destination || {};

    // A simple mapping with default values for rendering
    const newTitle = title || "No Title Found";
    const newLocation = location || "No Location Found";
    const newCity = newLocation.split(',')[0]?.trim() || "No City Found";
    const newCountry = newLocation.split(',')[1]?.trim() || "No Country Found";
    const newDescription = description || "No Description Found";
    const newIncluded = included && included.length > 0 ? included : ["No Included Items Found"];
    const newExcluded = excluded && excluded.length > 0 ? excluded : ["No Excluded Items Found"];
    const newGallery = images && images.length > 0 ? images : [DEFAULT_IMAGE];
    const newThumbnail = newGallery[0];
    const newAmenities = amenities || [];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">Loading...</h2>
                </div>
            </div>
        );
    }

    if (isError || !destination) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">No Destination Found</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">The destination you're looking for could not be found. Please try again later.</p>
                </div>
            </div>
        );
    }

    // Dummy data for reviews, categories, and tags as they are not in the provided API response
    const dummyReviews = [
        { label: 'Cleanliness', value: 80 },
        { label: 'Facilities', value: 60 },
        { label: 'Value for money', value: 100 },
        { label: 'Service', value: 40 },
        { label: 'Location', value: 75 }
    ];
    const dummyCategories = ["Adventure", "Beach", "Cultural", "Hiking", "Relaxation"];
    const dummyTags = newAmenities.length > 0 ? newAmenities : ["Travel", "Explore", "Nature", "City Break"];
    const dummyFeaturedContent = "https://via.placeholder.com/400x300.png?text=Featured+Content";

    // Dummy user reviews
    const userReviews = [
        {
            name: "Jane Doe",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Jane",
            rating: 5,
            comment: "This tour was an amazing experience! Everything was well-organized and the guides were fantastic. Highly recommend!",
            date: "August 15, 2025"
        },
        {
            name: "John Smith",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=John",
            rating: 4,
            comment: "Had a great time, but the schedule was a bit rushed. The scenery was beautiful though.",
            date: "August 10, 2025"
        },
        {
            name: "Alice Johnson",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alice",
            rating: 5,
            comment: "A perfect getaway! The facilities were top-notch and the value for money was excellent.",
            date: "July 28, 2025"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <PageHeading headTitle={newTitle} sectionBackground='' />

            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side: Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Destination Title & Booking Button */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold capitalize mb-2">
                                    {newTitle}
                                </h2>
                                <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        <span>{newCity}, {newCountry}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="text-gray-500 dark:text-gray-500">(500 Reviews)</span>
                                </div>
                            </div>
                            <Button className="w-full md:w-auto text-lg font-semibold px-8 py-6">
                                Book Now
                            </Button>
                        </div>

                        {/* Destination Image */}
                        <Card className="overflow-hidden shadow-lg dark:shadow-none">
                            <img
                                className="w-full h-64 md:h-96 object-cover"
                                src={newThumbnail}
                                alt={newTitle}
                            />
                        </Card>



                        {/* Description */}
                        <Card className="dark:bg-gray-800">
                            <CardHeader>
                                <CardTitle className="text-xl">Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                    {newDescription}
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Price Includes */}
                                    <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                                        <CardHeader>
                                            <CardTitle className="text-lg text-green-800 dark:text-green-300">Price Includes</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-3">
                                                {newIncluded.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-3">
                                                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                        <span className="text-green-700 dark:text-green-300">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    {/* Package Not Included */}
                                    <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                                        <CardHeader>
                                            <CardTitle className="text-lg text-red-800 dark:text-red-300">Package Not Included</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-3">
                                                {newExcluded.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-3">
                                                        <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                                                        <span className="text-red-700 dark:text-red-300">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Gallery */}
                        <Card className="dark:bg-gray-800">
                            <CardHeader>
                                <CardTitle className="text-2xl">Gallery</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {newGallery.length > 0 && newGallery[0] !== DEFAULT_IMAGE ? (
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {newGallery.map((image, idx) => (
                                            <div key={idx} className="aspect-video rounded-lg overflow-hidden shadow-md">
                                                <img
                                                    src={image}
                                                    alt={`Gallery image ${idx + 1}`}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500 dark:text-gray-400">No Gallery Images Found</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Map Section */}
                        <Card className="dark:bg-gray-800">
                            <CardHeader>
                                <CardTitle className="text-2xl">Map</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                                    <p className="text-gray-500 dark:text-gray-400">Interactive map will be implemented here</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Reviews */}
                        <Card className="dark:bg-gray-800">
                            <CardHeader>
                                <CardTitle className="text-2xl">Average Reviews</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Card className="bg-blue-600 text-white text-center dark:bg-blue-800">
                                    <CardContent className="pt-6">
                                        <h3 className="text-3xl font-bold">2.2/5</h3>
                                        <h4 className="text-xl font-semibold my-2">
                                            "Feel So Much Worse Than Thinking"
                                        </h4>
                                        <p>From 40 Reviews</p>
                                    </CardContent>
                                </Card>
                                <div className="space-y-4">
                                    {dummyReviews.map(({ label, value }) => (
                                        <div key={label} className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="font-medium">{label}</span>
                                                <span className="text-gray-500 dark:text-gray-400">{value}%</span>
                                            </div>
                                            <Progress value={value} className="h-3" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>



                        {/* Users Reviews Section */}
                        <Card className="dark:bg-gray-800">
                            <CardHeader>
                                <CardTitle className="text-2xl">User Reviews</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                {userReviews.length > 0 ? (
                                    userReviews.map((review, index) => (
                                        <div key={index} className="flex items-start gap-4 pb-4 border-b dark:border-gray-700 last:border-b-0">
                                            <Avatar className="w-12 h-12">
                                                <AvatarImage src={review.avatar} alt={review.name} />
                                                <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-semibold text-lg">{review.name}</h4>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(review.rating)].map((_, i) => (
                                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                                                </div>
                                                <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                                                    {review.comment}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 dark:text-gray-400">No reviews yet. Be the first to leave one!</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Side: Sticky Sidebar */}
                    <div className="space-y-6 lg:sticky lg:top-8 self-start">


                        {/* Author Profile */}
                        <Card className="dark:bg-gray-800">
                            <CardContent className="pt-6">
                                <div className="text-center space-y-4">
                                    <Avatar className="w-24 h-24 mx-auto">
                                        <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=Relson" alt="Relson Dulux" />
                                        <AvatarFallback>RD</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold text-lg">Relson Dulux</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                                            Hello, We're content writers who are fascinated by content
                                            fashion, celebrity and lifestyle. We help clients bring the
                                            right content to the right people.
                                        </p>
                                    </div>
                                    <div className="flex justify-center gap-3">
                                        <Button size="icon" variant="outline" className="dark:bg-gray-900 dark:border-gray-700">
                                            <Facebook className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="outline" className="dark:bg-gray-900 dark:border-gray-700">
                                            <Twitter className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="outline" className="dark:bg-gray-900 dark:border-gray-700">
                                            <Instagram className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Categories */}
                        <Card className="dark:bg-gray-800">
                            <CardHeader>
                                <CardTitle className="text-xl">All Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {dummyCategories.map((category, idx) => (
                                        <li key={idx}>
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                                            >
                                                {category}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Featured Content (for advertising) */}
                        <Card className="overflow-hidden dark:bg-gray-800 shadow-lg dark:shadow-none">
                            <CardHeader>
                                <CardTitle className="text-xl">Featured Content</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <img
                                    src={dummyFeaturedContent}
                                    alt="Featured content"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">Special Travel Package!</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        Explore the breathtaking beauty of the mountains with our limited-time offer. Book now and save 20%!
                                    </p>
                                    <Button size="sm" className="mt-4 w-full">
                                        Learn More
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Packages & Relevant Tours Section */}
                        <Card className="dark:bg-gray-800">
                            <CardHeader>
                                <CardTitle className="text-xl">Packages & Relevant Tours</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Placeholder for Packages and Relevant Tours */}
                                <div className="text-center text-gray-500 dark:text-gray-400 space-y-4">
                                    <p>This section will feature a list of packages and other tours relevant to this destination.</p>
                                    <p>You can fetch this data from your API and render it here in a carousel or grid format.</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tags */}
                        <Card className="dark:bg-gray-800">
                            <CardHeader>
                                <CardTitle className="text-xl">Tags</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {dummyTags.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {dummyTags.map((tag, idx) => (
                                            <Badge
                                                key={idx}
                                                variant="outline"
                                                className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-gray-700 dark:border-gray-700 dark:hover:border-blue-400"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">No Tags Found</p>
                                )}
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DestinationDetails;

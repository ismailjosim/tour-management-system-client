export type GuideUser = {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  picture?: string;
  role?: string;
};

export type GuideTour = {
  _id?: string;
  title?: string;
  slug?: string;
  images?: string[];
  location?: string;
  costFrom?: number;
  startDate?: string;
  endDate?: string;
  departureLocation?: string;
  arrivalLocation?: string;
  tourPlan?: string[];
  included?: string[];
  excluded?: string[];
  amenities?: string[];
};

export type GuidePayment = {
  _id?: string;
  transactionId?: string;
  status?: string;
  amount?: number;
  invoiceUrl?: string;
};

export type GuideBooking = {
  _id: string;
  user?: GuideUser;
  tour?: GuideTour;
  guide?: GuideUser;
  payment?: GuidePayment;
  guestCount?: number;
  status?: string;
  guideApprovalStatus?: string;
  userCompleted?: boolean;
  guideCompleted?: boolean;
  rejectionReason?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type GuideStats = {
  assignedTours: number;
  assignedBookings: number;
  upcomingTours: number;
  completedTours: number;
  totalEarnings: number;
  averageRating: number;
  totalReviews: number;
  commissionRate: number;
};

export type GuideTourSummary = {
  tour?: GuideTour;
  bookingCount: number;
  guestCount: number;
  completedBookings: number;
  earnings: number;
  bookings: GuideBooking[];
};

export type GuideEarningBooking = {
  _id: string;
  tour?: GuideTour;
  user?: GuideUser;
  guestCount?: number;
  bookingStatus?: string;
  paymentStatus?: string;
  paymentAmount?: number;
  commissionAmount?: number;
  payoutStatus?: string;
  paidAt?: string;
};

export type GuideEarnings = {
  totalEarnings: number;
  commissionRate: number;
  paidBookings: GuideEarningBooking[];
  monthlyEarnings: { month: string; amount: number }[];
};

export type GuideReview = {
  _id: string;
  user?: GuideUser;
  tour?: GuideTour;
  rating: number;
  comments: string;
  guideRating?: number;
  guideComments?: string;
  createdAt?: string;
};

export type GuideReviews = {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { rating: number; count: number }[];
  reviews: GuideReview[];
};

export type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
};

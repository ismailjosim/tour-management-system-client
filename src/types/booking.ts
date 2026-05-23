export type Booking = {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  guide?: {
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
    picture?: string;
    role?: string;
  };
  tour: {
    _id?: string;
    title: string;
    slug?: string;
    images: string[];
    location: string;
    costFrom: number;
    startDate: string;
    endDate: string;
  };
  guestCount: number;
  status: string;
  guideApprovalStatus?: string;
  userCompleted?: boolean;
  guideCompleted?: boolean;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  payment: {
    _id: string;
    transactionId: string;
    status: string;
    amount: number;
    invoiceUrl: string;
  };
};

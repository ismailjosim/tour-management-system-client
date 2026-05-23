import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAddReviewMutation } from '../../../redux/features/review/review.api';
import { useUserInfoQuery } from '../../../redux/features/auth/auth.api';
import { toast } from 'sonner';
import { Rating, RatingButton } from '../../ui/shadcn-io/rating';
import type { ApiError } from '../../../types';

interface AddReviewButtonProps {
  bookingId: string;
  tourId: string;
  guideId?: string;
  guideName?: string;
}

const AddReviewButton: React.FC<AddReviewButtonProps> = ({
  bookingId,
  tourId,
  guideId,
  guideName,
}) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comments, setComments] = useState<string>('');

  const [addReview, { isLoading }] = useAddReviewMutation();
  const { data } = useUserInfoQuery(undefined);
  const hasGuide = Boolean(guideId);

  const handleSubmit = async () => {
    if (rating === 0 || !comments.trim()) {
      toast('Please provide a tour rating and comment.');
      return;
    }

    const formData = {
      bookingId,
      tour: tourId,
      user: data?.data?._id,
      ...(hasGuide ? { guide: guideId } : {}),
      rating,
      comments,
    };

    try {
      const res = await addReview(formData).unwrap();
      if (res.statusCode === 201) {
        toast.success(res.message ?? 'Review submitted successfully');
        setOpen(false);
        setComments('');
        setRating(0);
      }
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.data.message);
      setComments('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          Add Reviews
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Your Review</DialogTitle>
          <DialogDescription>
            Share your experience with this tour
            {hasGuide ? ` and ${guideName ?? 'your guide'}.` : '.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2 rounded-md border p-4">
            <Label>Tour Rating</Label>
            <div className="flex flex-col items-center gap-3">
              <Rating value={rating} onValueChange={setRating}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton className="text-yellow-500" key={index} />
                ))}
              </Rating>
              <span className="text-muted-foreground text-xs">{rating}/5</span>
            </div>
          </div>

          <div>
            <Label>Tour Comments</Label>
            <Textarea rows={4} value={comments} onChange={(e) => setComments(e.target.value)} />
          </div>

          {hasGuide && (
            <div className="space-y-4 rounded-md border p-4">
              <div>
                <Label>Guide</Label>
                <p className="text-muted-foreground text-sm">
                  This review will be linked to {guideName ?? 'your selected guide'}.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
            {isLoading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewButton;

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button';

const TourReviewForm = () => {
    return (
        <div>
            {/* Review Form */}
            <Card className="dark:bg-gray-800">
                <CardHeader>
                    <CardTitle className="text-2xl">Write A Review</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <Input placeholder="Name" className="dark:bg-gray-900 dark:border-gray-700" />
                            <Input type="email" placeholder="Email" className="dark:bg-gray-900 dark:border-gray-700" />
                        </div>
                        <Textarea
                            placeholder="Write Your Comment"
                            className="min-h-[100px] resize-none dark:bg-gray-900 dark:border-gray-700"
                        />
                        <Button type="submit" className="w-full md:w-auto">
                            Submit Review
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default TourReviewForm;

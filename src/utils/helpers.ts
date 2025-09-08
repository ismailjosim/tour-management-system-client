// Helper function to calculate average rating
export const calculateAverageRating = (reviews: { rating: number }[]) => {
	if (!reviews || reviews.length === 0) return { average: 0, total: 0 }
	const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
	const average = totalRating / reviews.length
	return { average, total: reviews.length }
}

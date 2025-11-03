import type { ComponentType } from 'react'
import { Navigate, useSearchParams, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

export const withPaymentGuard = (Component: ComponentType) => {
	return function PaymentGuardWrapper() {
		const [searchParams] = useSearchParams()
		const navigate = useNavigate()
		const [isValidating, setIsValidating] = useState(true)
		const [isValid, setIsValid] = useState(false)

		useEffect(() => {
			const validatePaymentAccess = () => {
				// Check for common SSLCommerz/payment gateway parameters
				const transactionId =
					searchParams.get('tran_id') ||
					searchParams.get('transactionId') ||
					searchParams.get('transaction_id')

				const bookingId =
					searchParams.get('booking_id') || searchParams.get('bookingId')

				const status = searchParams.get('status')
				const valId = searchParams.get('val_id')

				// Check sessionStorage for payment state
				const paymentStateStr = sessionStorage.getItem('payment_state')
				let paymentState = null

				if (paymentStateStr) {
					try {
						paymentState = JSON.parse(paymentStateStr)
					} catch (e) {
						console.error('Failed to parse payment state:', e)
					}
				}

				// Validate: must have payment gateway params OR valid session state
				const hasPaymentParams = transactionId || bookingId || status || valId
				const hasValidSession =
					paymentState && paymentState.timestamp > Date.now() - 600000 // 10 min expiry

				if (hasPaymentParams || hasValidSession) {
					setIsValid(true)

					// Clear session state after successful validation
					if (paymentStateStr) {
						sessionStorage.removeItem('payment_state')
					}
				} else {
					setIsValid(false)
				}

				setIsValidating(false)
			}

			validatePaymentAccess()
		}, [searchParams])

		// Prevent back button navigation
		useEffect(() => {
			if (!isValid) return

			const preventBackNavigation = () => {
				window.history.pushState(null, '', window.location.href)
			}

			preventBackNavigation()
			window.addEventListener('popstate', preventBackNavigation)

			// Optional: Auto redirect to bookings page after 60 seconds
			const redirectTimer = setTimeout(() => {
				navigate('/user/bookings', { replace: true })
			}, 60000)

			return () => {
				window.removeEventListener('popstate', preventBackNavigation)
				clearTimeout(redirectTimer)
			}
		}, [isValid, navigate])

		// Show loading while validating
		if (isValidating) {
			return (
				<div className='flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950'>
					<div className='text-center space-y-4'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto'></div>
						<p className='text-gray-600 dark:text-gray-400'>
							Validating payment...
						</p>
					</div>
				</div>
			)
		}

		// Redirect if invalid
		if (!isValid) {
			return <Navigate to='/' replace />
		}

		return <Component />
	}
}

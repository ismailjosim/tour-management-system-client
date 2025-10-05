import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
	BadgeCheck,
	CheckCircle,
	Mail,
	ShieldAlert,
	XCircle,
} from 'lucide-react'
import DataLoader from '@/utils/DataLoader'
import { useGetMyGuideApplicationQuery } from '@/redux/features/guide/guide.api'
import { useEffect } from 'react'

interface IUser {
	name: string
	email: string
	picture: string
	role: string
	isActive: string
	isVerified: boolean
}

interface IDivision {
	name: string
	thumbnail: string
	description: string
}

interface IGuideApplication {
	_id: string
	user: IUser
	division: IDivision
	nidPhoto: string
	status: 'PENDING' | 'APPROVED' | 'REJECTED'
	createdAt: string
	updatedAt: string
}
interface GuideApplicationProfileProps {
	setIsApplied: React.Dispatch<React.SetStateAction<boolean>>
}
const GuideApplicationProfile = ({
	setIsApplied,
}: GuideApplicationProfileProps) => {
	const { data, isLoading, isError, error } =
		useGetMyGuideApplicationQuery(undefined)
	const guideApplication: IGuideApplication | undefined = data?.data

	useEffect(() => {
		if (guideApplication) {
			setIsApplied(true)
		}
	}, [guideApplication, setIsApplied])

	if (isLoading) return <DataLoader />

	if (isError)
		return (
			<Alert variant='destructive'>
				<ShieldAlert className='h-4 w-4' />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					{(error as { message?: string })?.message || 'Something went wrong'}
				</AlertDescription>
			</Alert>
		)

	if (!guideApplication)
		return (
			<Card className='p-6 bg-card text-card-foreground mt-10'>
				<p className='text-center text-muted-foreground'>
					No guide application found.
				</p>
			</Card>
		)

	return (
		<section className='bg-background min-h-screen py-8 text-foreground'>
			<div className='max-w-7xl mx-auto space-y-6'>
				{/* Header */}
				<div className='mb-6 text-center '>
					<h1 className='text-3xl font-bold text-foreground underline'>
						Guide Application Details
					</h1>
				</div>

				{/* Main Profile Card */}
				<Card className='overflow-hidden rounded-xl bg-card shadow'>
					<div className='md:flex'>
						{/* Profile Image */}
						<div className='md:w-1/3 ml-5 rounded-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-800 p-8 flex items-center justify-center'>
							<div className='text-center'>
								<img
									src={guideApplication.user.picture}
									alt={guideApplication.user.name}
									className='w-40 h-40 rounded-full mx-auto border-4 border-card shadow-lg object-cover'
								/>
								<div className='mt-4'>
									<Badge variant='secondary'>
										{guideApplication.status.replace('_', ' ')}
									</Badge>
								</div>
							</div>
						</div>

						{/* Basic Info */}
						<div className='md:w-2/3 p-8'>
							<h2 className='text-3xl font-bold text-card-foreground mb-2'>
								{guideApplication.user.name}
							</h2>
							<p className='text-muted-foreground mb-6 flex gap-1 items-center'>
								<Mail />
								<span>{guideApplication.user.email}</span>
							</p>

							<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
								<div className='p-4 rounded-lg bg-muted'>
									<p className='text-xs text-muted-foreground uppercase tracking-wide mb-1'>
										Current Role
									</p>
									<p className='text-lg font-semibold text-card-foreground'>
										{guideApplication.user.role}
									</p>
								</div>
								<div className='p-4 rounded-lg bg-muted'>
									<p className='text-xs text-muted-foreground uppercase tracking-wide mb-1'>
										Account Status
									</p>
									<p className='text-lg font-semibold text-green-600 flex items-center gap-1'>
										<BadgeCheck />
										<span>{guideApplication.user.isActive.toLowerCase()}</span>
									</p>
								</div>
								<div className='p-4 rounded-lg bg-muted'>
									<p className='text-xs text-muted-foreground uppercase tracking-wide mb-1'>
										Verification
									</p>
									<p className='text-lg font-semibold flex items-center gap-2'>
										{guideApplication.user.isVerified ? (
											<>
												<CheckCircle className='w-5 h-5 text-green-600' />
												Verified
											</>
										) : (
											<>
												<XCircle className='w-5 h-5 text-red-600' />
												Unverified
											</>
										)}
									</p>
								</div>
							</div>

							<div className='border-t border-border pt-4'>
								<p className='text-sm text-muted-foreground mb-1'>
									Application ID
								</p>
								<p className='font-mono text-sm text-card-foreground bg-muted px-3 py-2 rounded inline-block'>
									{guideApplication._id}
								</p>
							</div>
						</div>
					</div>
				</Card>

				{/* Specialization & Timeline */}
				<div className='grid md:grid-cols-2 gap-6'>
					{/* Specialization */}
					<Card>
						<div className='bg-gradient-to-r from-primary via-secondary/50 to-destructive px-6 py-4 rounded-t-lg'>
							<h2 className='text-xl font-bold text-white flex items-center'>
								Tour Division
							</h2>
						</div>
						<CardContent>
							<img
								src={guideApplication.division.thumbnail}
								alt={guideApplication.division.name}
								className='w-full h-48 object-cover rounded-lg shadow-md mb-4'
							/>
							<h3 className='text-xl font-bold text-card-foreground mb-2'>
								{guideApplication.division.name}
							</h3>
							<p className='text-sm text-muted-foreground leading-relaxed'>
								{guideApplication.division.description}
							</p>
						</CardContent>
					</Card>

					{/* Timeline */}
					<Card>
						<div className='bg-gradient-to-r from-destructive via-secondary/50 to-primary px-6 py-4 rounded-t-lg'>
							<h2 className='text-xl font-bold text-white flex items-center'>
								Application Timeline
							</h2>
						</div>
						<CardContent>
							<ol className='relative space-y-8 before:absolute before:-ml-px before:h-full before:w-0.5 before:rounded-full before:bg-gray-200 dark:before:bg-gray-700'>
								{/* Submitted */}
								<li className='relative -ms-1.5 flex items-start gap-4'>
									<span className='h-3 w-3 shrink-0 rounded-full bg-green-500 mt-1'></span>
									<div className='-mt-2'>
										<time className='text-xs font-medium text-gray-700 dark:text-gray-200'>
											{new Date(guideApplication.createdAt).toLocaleDateString(
												'en-US',
												{
													weekday: 'short',
													day: '2-digit',
													month: 'short',
													year: 'numeric',
												},
											)}{' '}
											{new Date(guideApplication.createdAt).toLocaleTimeString(
												'en-US',
												{
													hour: '2-digit',
													minute: '2-digit',
												},
											)}
										</time>
										<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
											Submitted
										</h3>
										<p className='mt-0.5 text-sm text-gray-700 dark:text-gray-200'>
											Your application has been submitted.
										</p>
									</div>
								</li>

								{/* Last Updated */}
								<li className='relative -ms-1.5 flex items-start gap-4'>
									<span className='h-3 w-3 shrink-0 rounded-full bg-blue-500 mt-1'></span>
									<div className='-mt-2'>
										<time className='text-xs font-medium text-gray-700 dark:text-gray-200'>
											{new Date(guideApplication.updatedAt).toLocaleDateString(
												'en-US',
												{
													weekday: 'short',
													day: '2-digit',
													month: 'short',
													year: 'numeric',
												},
											)}{' '}
											{new Date(guideApplication.updatedAt).toLocaleTimeString(
												'en-US',
												{
													hour: '2-digit',
													minute: '2-digit',
												},
											)}
										</time>
										<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
											Last Updated
										</h3>
										<p className='mt-0.5 text-sm text-gray-700 dark:text-gray-200'>
											Your application was last updated.
										</p>
									</div>
								</li>

								{/* Current Status */}
								<li className='relative -ms-1.5 flex items-start gap-4'>
									<span className='h-3 w-3 shrink-0 rounded-full bg-yellow-500 mt-1 animate-pulse'></span>
									<div className='-mt-2'>
										<time className='text-xs font-medium text-gray-700 dark:text-gray-200'>
											{new Date().toLocaleDateString('en-US', {
												weekday: 'short',
												day: '2-digit',
												month: 'short',
												year: 'numeric',
											})}{' '}
											{new Date().toLocaleTimeString('en-US', {
												hour: '2-digit',
												minute: '2-digit',
											})}
										</time>
										<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
											Current Status
										</h3>
										<p className='mt-0.5 text-sm text-yellow-500 font-medium'>
											{guideApplication.status.replace('_', ' ')}
										</p>
									</div>
								</li>
							</ol>
						</CardContent>
					</Card>
				</div>

				{/* NID Document */}
				<Card>
					<div className='bg-gradient-to-r from-primary via-destructive to-secondary px-6 py-4'>
						<h2 className='text-xl font-bold text-white flex items-center'>
							Identity Verification Documents
						</h2>
					</div>
					<CardContent>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6 '>
							<div className='block p-4 rounded-xl border-2 border-dashed border-border hover:border-primary transition'>
								<img
									src={guideApplication.nidPhoto}
									alt='NID Front'
									className='w-full h-full max-h-56 object-contain mx-auto rounded-lg cursor-pointer'
								/>
								<p className='text-center text-sm text-muted-foreground mt-4 font-semibold'>
									National ID Card - Front Side
								</p>
							</div>
							<div className='block p-4 rounded-xl border-2 border-dashed border-border hover:border-primary transition'>
								<img
									src={guideApplication.nidPhoto}
									alt='NID Back'
									className='w-full h-full max-h-56 object-contain mx-auto rounded-lg cursor-pointer'
								/>
								<p className='text-center text-sm text-muted-foreground mt-4 font-semibold'>
									National ID Card - Back Side
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	)
}

export default GuideApplicationProfile

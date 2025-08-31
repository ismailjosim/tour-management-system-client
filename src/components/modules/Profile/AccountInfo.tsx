/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, Calendar } from 'lucide-react'

const formatDate = (dateString: string) =>
	new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

const AccountInfo = ({ userData }: { userData: any }) => {
	return (
		<Card className='shadow-lg border'>
			<CardHeader>
				<CardTitle className='text-lg'>Account Information</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Status */}
					<div>
						<Label>Account Status</Label>
						<div className='mt-1'>
							<Badge
								className={
									userData.isActive === 'ACTIVE'
										? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
										: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
								}
								variant='outline'
							>
								{userData.isActive === 'ACTIVE' ? (
									<CheckCircle className='w-3 h-3 mr-1' />
								) : (
									<Clock className='w-3 h-3 mr-1' />
								)}
								{userData.isActive}
							</Badge>
						</div>
					</div>

					{/* Auth */}
					<div>
						<Label>Authentication Method</Label>
						<p className='mt-1 capitalize'>
							{userData.auths[0]?.provider || 'Not specified'}
						</p>
					</div>

					{/* Dates */}
					<div>
						<Label>Member Since</Label>
						<div className='mt-1 flex items-center space-x-2'>
							<Calendar className='w-4 h-4 text-muted-foreground' />
							<p>{formatDate(userData.createdAt)}</p>
						</div>
					</div>

					<div>
						<Label>Last Updated</Label>
						<div className='mt-1 flex items-center space-x-2'>
							<Clock className='w-4 h-4 text-muted-foreground' />
							<p>{formatDate(userData.updatedAt)}</p>
						</div>
					</div>
				</div>

				{/* ID */}
				<div className='mt-6 pt-4 border-t'>
					<Label>User ID</Label>
					<p className='mt-1 font-mono text-sm bg-muted px-3 py-2 rounded-md break-all'>
						{userData._id}
					</p>
				</div>
			</CardContent>
		</Card>
	)
}

export default AccountInfo

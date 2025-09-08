import React, { useState } from 'react'
import { Edit3, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	useUpdateProfileMutation,
	useUserInfoQuery,
} from '@/redux/features/auth/auth.api'
import ProfileSummary from '../components/modules/Profile/ProfileSummary'
import PersonalInfo from '../components/modules/Profile/PersonalInfo'
import AccountInfo from '../components/modules/Profile/AccountInfo'
import { toast } from 'sonner'
import type { ApiError } from '../types'

export interface EditFormData {
	name: string
	phone: string
	address: string
}

const Profile: React.FC = () => {
	const { data, isError, isLoading } = useUserInfoQuery(undefined)
	const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
	const [isEditing, setIsEditing] = useState(false)
	const [editData, setEditData] = useState<EditFormData>({
		name: '',
		phone: '',
		address: '',
	})

	const userData = data?.data

	/** Handlers */
	const handleEditToggle = async () => {
		if (isEditing) {
			try {
				// API কল
				const res = await updateProfile({
					id: userData?._id,
					...editData,
				}).unwrap()

				if (res.statusCode === 201) {
					toast.success(res?.message)
				}

				setIsEditing(false)
			} catch (error) {
				const apiError = error as ApiError
				toast.error(apiError.data.message)
			}
		} else {
			if (userData) {
				setEditData({
					name: userData.name,
					phone: userData.phone,
					address: userData.address,
				})
			}
			setIsEditing(true)
		}
	}

	const handleInputChange =
		(field: keyof EditFormData) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setEditData((prev) => ({ ...prev, [field]: event.target.value }))
		}

	/** Loading */
	if (isLoading) {
		return (
			<div className='container mx-auto min-h-screen flex items-center justify-center'>
				<div className='text-center space-y-4'>
					<Loader2 className='w-12 h-12 animate-spin text-primary mx-auto' />
					<p className='text-muted-foreground text-lg'>
						Loading your profile...
					</p>
				</div>
			</div>
		)
	}

	/** Error */
	if (isError || !userData) {
		return (
			<div className='container mx-auto min-h-screen flex items-center justify-center px-4'>
				<Card className='max-w-md w-full shadow-lg'>
					<CardContent className='pt-6 text-center space-y-4'>
						<div className='w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto'>
							<X className='w-6 h-6 text-destructive' />
						</div>
						<div>
							<h3 className='text-lg font-semibold'>Failed to Load Profile</h3>
							<p className='text-muted-foreground text-sm'>
								Unable to fetch your profile information. Please try again.
							</p>
						</div>
						<Button onClick={() => window.location.reload()} className='w-full'>
							Try Again
						</Button>
					</CardContent>
				</Card>
			</div>
		)
	}

	/** Main UI */
	return (
		<div className='min-h-screen bg-background'>
			<div className='container mx-auto py-8'>
				{/* Header */}
				<div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
					<div>
						<h1 className='text-3xl font-bold'>My Profile</h1>
						<p className='text-muted-foreground'>
							Manage your account information and settings
						</p>
					</div>
					<Button
						onClick={handleEditToggle}
						variant={isEditing ? 'outline' : 'default'}
						disabled={isUpdating}
					>
						{isUpdating ? (
							<>
								<Loader2 className='w-4 h-4 mr-2 animate-spin' />
								Saving...
							</>
						) : isEditing ? (
							<>
								<X className='w-4 h-4 mr-2' />
								Cancel
							</>
						) : (
							<>
								<Edit3 className='w-4 h-4 mr-2' />
								Edit Profile
							</>
						)}
					</Button>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Sidebar */}
					<div className='lg:col-span-1'>
						<ProfileSummary userData={userData} />
					</div>

					{/* Main Content */}
					<div className='lg:col-span-3 space-y-6'>
						<PersonalInfo
							userData={userData}
							isEditing={isEditing}
							editData={editData}
							handleInputChange={handleInputChange}
							handleEditToggle={handleEditToggle}
						/>
						<AccountInfo userData={userData} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, BadgeCheck, ShieldAlert, Edit, X } from 'lucide-react'
import { useState } from 'react'
import SingleImageUploader from '../../SingleImageUploader'
import { Button } from '../../ui/button'
import { toast } from 'sonner'
import { useUpdateUserProfilePictureMutation } from '@/redux/features/auth/auth.api'
import type { ApiError } from '@/types'

const getInitials = (name: string) =>
	name
		.split(' ')
		.map((w) => w[0])
		.join('')
		.toUpperCase()

const getRoleColor = (role: string) => {
	switch (role) {
		case 'ADMIN':
			return 'bg-destructive/10 text-destructive hover:bg-destructive/20'
		case 'MANAGER':
			return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
		case 'USER':
			return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
		default:
			return 'bg-muted text-foreground'
	}
}

const ProfileSummary = ({ userData }: { userData: any }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [image, setImage] = useState<File | null>(null)
	const [updateUserProfilePicture, { isLoading: isUpdating }] =
		useUpdateUserProfilePictureMutation()

	const handleUpdateProfile = async () => {
		if (isEditing && image) {
			try {
				const formData = new FormData()
				formData.append('file', image)

				const res = await updateUserProfilePicture({
					id: userData?._id,
					formData,
				}).unwrap()

				if (res.success || res.statusCode === 201) {
					toast.success(res.message || 'Profile picture updated successfully')

					// Optional: Update the local image immediately
					if (res.data?.picture) {
						userData.picture = res.data.picture
					}
				}

				setIsEditing(false)
				setImage(null)
			} catch (error) {
				const apiError = error as ApiError
				toast.error(apiError?.data?.message || 'Failed to update image')
			}
			return
		}

		setIsEditing(true)
	}

	return (
		<Card className='shadow-lg border'>
			<CardContent className='relative pt-6 text-center space-y-4'>
				{/* Edit / Cancel Toggle */}
				<Button
					onClick={() => setIsEditing(!isEditing)}
					variant='ghost'
					className='absolute -top-6 right-0'
					disabled={isUpdating}
				>
					{isEditing ? <X /> : <Edit />}
				</Button>

				{/* Avatar / Uploader */}
				<div className='relative w-24 h-24 mx-auto'>
					{isEditing ? (
						<SingleImageUploader
							showInfo
							initialImage={userData.picture}
							onChange={(file) => setImage(file)}
						/>
					) : (
						<>
							<Avatar className='w-24 h-24'>
								<AvatarImage src={userData.picture} />
								<AvatarFallback className='bg-primary text-white text-xl font-bold'>
									{getInitials(userData.name)}
								</AvatarFallback>
							</Avatar>

							{/* Verification Status */}
							<div className='absolute -top-1 -right-1 bg-background rounded-full p-1 shadow'>
								{userData.isVerified ? (
									<BadgeCheck className='w-6 h-6 text-primary' />
								) : (
									<ShieldAlert className='w-6 h-6 text-destructive' />
								)}
							</div>
						</>
					)}
				</div>

				{/* Info */}
				{!isEditing && (
					<div>
						<h2 className='text-xl font-bold'>{userData.name}</h2>
						<p className='text-muted-foreground text-sm mb-3'>
							{userData.email}
						</p>

						<div
							className={`flex items-center px-4 py-2 rounded-full font-semibold text-sm justify-center ${getRoleColor(
								userData.role,
							)}`}
						>
							<Shield className='w-5 h-5 mr-2' />
							<span>{userData.role}</span>
						</div>
					</div>
				)}

				{/* Save Button (visible in edit mode) */}
				{isEditing && (
					<div className='pt-28'>
						<Button
							onClick={handleUpdateProfile}
							className='w-full mt-2'
							disabled={!image || isUpdating}
						>
							{isUpdating ? 'Updating...' : 'Update Profile Picture'}
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default ProfileSummary

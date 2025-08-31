/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, User, Save } from 'lucide-react'
import type { EditFormData } from '../../../Pages/Profile'

interface Props {
	userData: any
	isEditing: boolean
	editData: EditFormData
	handleInputChange: (
		field: keyof EditFormData,
	) => (e: React.ChangeEvent<HTMLInputElement>) => void
	handleEditToggle: () => void
}

const PersonalInfo: React.FC<Props> = ({
	userData,
	isEditing,
	editData,
	handleInputChange,
	handleEditToggle,
}) => {
	return (
		<Card className='shadow-lg border'>
			<CardHeader>
				<CardTitle className='flex items-center text-lg'>
					<User className='w-5 h-5 mr-2 text-primary' />
					Personal Information
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Full Name */}
					<div>
						<Label>Full Name</Label>
						{isEditing ? (
							<Input
								value={editData.name}
								onChange={handleInputChange('name')}
								className='mt-1'
							/>
						) : (
							<p className='mt-1 font-medium'>{userData.name}</p>
						)}
					</div>

					{/* Email */}
					<div>
						<Label>Email Address</Label>
						<div className='mt-1 flex items-center space-x-2'>
							<Mail className='w-4 h-4 text-muted-foreground' />
							<p className='truncate'>{userData.email}</p>
						</div>
						<p className='text-xs text-muted-foreground mt-1'>
							Email cannot be changed
						</p>
					</div>

					{/* Phone */}
					<div>
						<Label>Phone Number</Label>
						{isEditing ? (
							<Input
								value={editData.phone}
								onChange={handleInputChange('phone')}
								className='mt-1'
							/>
						) : (
							<div className='mt-1 flex items-center space-x-2'>
								<Phone className='w-4 h-4 text-muted-foreground' />
								<p>{userData.phone}</p>
							</div>
						)}
					</div>

					{/* Address */}
					<div>
						<Label>Address</Label>
						{isEditing ? (
							<Input
								value={editData.address}
								onChange={handleInputChange('address')}
								className='mt-1'
							/>
						) : (
							<div className='mt-1 flex items-center space-x-2'>
								<MapPin className='w-4 h-4 text-muted-foreground' />
								<p>{userData.address}</p>
							</div>
						)}
					</div>
				</div>

				{isEditing && (
					<div className='flex justify-end pt-4 border-t'>
						<Button onClick={handleEditToggle}>
							<Save className='w-4 h-4 mr-2' />
							Save Changes
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default PersonalInfo

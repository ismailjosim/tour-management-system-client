import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import type { ReactNode } from 'react'
import { toast } from 'sonner'
import type { ApiError } from '@/types'

interface IProps {
	children: ReactNode
	onConfirm: () => Promise<{ success: boolean; message: string }>
}

export default function DeleteConfirmation({ children, onConfirm }: IProps) {
	const handleConfirm = async () => {
		try {
			const result = await onConfirm()
			if (result.success) {
				toast.success(result.message)
			}
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError.data.message)
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

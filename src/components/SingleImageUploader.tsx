import { AlertCircleIcon, ImageUpIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFileUpload } from '../hooks/use-file-upload'

interface ISingleImageUploaderProps {
	onChange: (file: File | null) => void
	initialImage?: string | null // URL of the existing image
	showInfo?: boolean
}

export default function SingleImageUploader({
	onChange,
	initialImage = null,
	showInfo = false,
}: ISingleImageUploaderProps) {
	const maxSizeMB = 5
	const maxSize = maxSizeMB * 1024 * 1024 // 5MB

	const [
		{ files, isDragging, errors },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			removeFile,
			getInputProps,
		},
	] = useFileUpload({
		accept: 'image/*',
		maxSize,
	})

	// Track previous image state
	const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage)

	// Update preview when user uploads a new file
	useEffect(() => {
		if (files.length > 0) {
			const maybeFile = files[0].file
			if (maybeFile instanceof File) {
				onChange(maybeFile)
				setPreviewUrl(files[0].preview || null)
			} else {
				onChange(null)
			}
		} else {
			// If user removed the file, reset
			onChange(null)
			setPreviewUrl(initialImage)
		}
	}, [files, onChange, initialImage])

	return (
		<div className='flex flex-col gap-2'>
			<div className='relative'>
				<div
					role='button'
					onClick={openFileDialog}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
					data-dragging={isDragging || undefined}
					className='border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors'
				>
					<input
						{...getInputProps()}
						className='sr-only'
						aria-label='Upload file'
					/>

					{previewUrl ? (
						<div className='absolute inset-0'>
							<img
								src={previewUrl}
								alt='Uploaded image'
								className='w-full h-full object-cover'
							/>
						</div>
					) : (
						<div className='flex flex-col items-center justify-center px-4 py-3 text-center'>
							<div className='bg-background mb-2 flex h-11 w-11 items-center justify-center rounded-full border'>
								<ImageUpIcon className='h-4 w-4 opacity-60' />
							</div>
							{!showInfo && (
								<div>
									<p className='mb-1.5 text-sm font-medium'>
										Drop your image here or click to browse
									</p>
									<p className='text-muted-foreground text-xs'>
										Max size: {maxSizeMB}MB
									</p>
								</div>
							)}
						</div>
					)}
				</div>

				{previewUrl && (
					<div className='absolute top-4 right-4'>
						<button
							type='button'
							className='z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 focus:outline-none'
							onClick={() => {
								removeFile(files[0]?.id)
								setPreviewUrl(null) // remove old image
							}}
							aria-label='Remove image'
						>
							<XIcon className='h-4 w-4' />
						</button>
					</div>
				)}
			</div>

			{errors.length > 0 && (
				<div
					className='text-destructive flex items-center gap-1 text-xs'
					role='alert'
				>
					<AlertCircleIcon className='h-3 w-3' />
					<span>{errors[0]}</span>
				</div>
			)}
		</div>
	)
}

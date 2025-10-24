import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useFileUpload } from '@/hooks/use-file-upload'

interface MultipleImageUploaderProps {
	onChange: (images: (File | string)[]) => void
	initialImages?: string[] // existing image URLs for edit mode
}

export default function MultipleImageUploader({
	onChange,
	initialImages = [],
}: MultipleImageUploaderProps) {
	const maxSizeMB = 5
	const maxSize = maxSizeMB * 1024 * 1024
	const maxFiles = 6

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
		multiple: true,
		maxFiles,
	})

	const [previews, setPreviews] = useState<(File | string)[]>([])
	const isInitialized = useRef(false)

	// Initialize with existing images only once (edit mode)
	useEffect(() => {
		if (!isInitialized.current && initialImages.length > 0) {
			setPreviews(initialImages)
			onChange(initialImages)
			isInitialized.current = true
		}
	}, [initialImages, onChange])

	// When new files are uploaded, merge them with existing previews
	useEffect(() => {
		if (files.length > 0) {
			const uploadedFiles = files.map((f) => f.file as File)
			setPreviews((prev) => {
				const merged = [...prev, ...uploadedFiles].slice(0, maxFiles)
				onChange(merged)
				return merged
			})
		}
	}, [files, onChange])

	// Remove an image (either URL or File)
	const handleRemove = (img: string | File) => {
		setPreviews((prev) => {
			const updated = prev.filter((i) => i !== img)
			onChange(updated)
			return updated
		})

		if (img instanceof File) {
			const fileEntry = files.find((f) => f.file === img)
			if (fileEntry) removeFile(fileEntry.id)
		}
	}

	return (
		<div className='flex flex-col gap-2'>
			{/* Drop area */}
			<div
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				data-dragging={isDragging || undefined}
				data-files={previews.length > 0 || undefined}
				className='border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]'
			>
				<input
					{...getInputProps()}
					className='sr-only'
					aria-label='Upload image files'
				/>

				{previews.length > 0 ? (
					<div className='flex w-full flex-col gap-3'>
						<div className='flex items-center justify-between gap-2'>
							<h3 className='truncate text-sm font-medium'>
								Uploaded Images ({previews.length})
							</h3>
							<Button
								variant='outline'
								size='sm'
								onClick={openFileDialog}
								disabled={previews.length >= maxFiles}
								type='button'
							>
								<UploadIcon className='-ms-0.5 size-3.5 opacity-60' />
								Add more
							</Button>
						</div>

						<div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
							{previews.map((img, idx) => (
								<div
									key={idx}
									className='bg-accent relative aspect-square rounded-md overflow-hidden'
								>
									<img
										src={
											typeof img === 'string' ? img : URL.createObjectURL(img)
										}
										alt={`Image ${idx}`}
										className='size-full object-cover rounded-[inherit]'
									/>
									<Button
										onClick={() => handleRemove(img)}
										size='icon'
										className='border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none'
										aria-label='Remove image'
										type='button'
									>
										<XIcon className='size-3.5' />
									</Button>
								</div>
							))}
						</div>
					</div>
				) : (
					<div className='flex flex-col items-center justify-center px-4 py-3 text-center'>
						<div
							className='bg-background mb-2 flex size-11 items-center justify-center rounded-full border'
							aria-hidden='true'
						>
							<ImageIcon className='size-4 opacity-60' />
						</div>
						<p className='mb-1.5 text-sm font-medium'>Drop your images here</p>
						<p className='text-muted-foreground text-xs'>
							JPG, PNG, GIF (max. {maxSizeMB}MB each)
						</p>
						<Button
							type='button'
							variant='outline'
							className='mt-4'
							onClick={openFileDialog}
						>
							<UploadIcon className='-ms-1 opacity-60' aria-hidden='true' />
							Select images
						</Button>
					</div>
				)}
			</div>

			{errors.length > 0 && (
				<div
					className='text-destructive flex items-center gap-1 text-xs'
					role='alert'
				>
					<AlertCircleIcon className='size-3 shrink-0' />
					<span>{errors[0]}</span>
				</div>
			)}
		</div>
	)
}

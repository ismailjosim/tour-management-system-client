import ButtonNavigate from '../utils/ButtonNavigate'

const Settings = () => {
	return (
		<div className='flex min-h-[60vh] flex-col items-center justify-center px-4 text-center'>
			<h1 className='mb-3 text-3xl font-bold text-body'>Settings</h1>

			<p className='max-w-md text-primary-foreground'>
				This page is currently under development. We’re working on adding
				customization and preference options soon.
			</p>

			{/* Animated badge */}
			<div className='relative my-6'>
				<div className='absolute inset-0 rounded-full bg-yellow-300 opacity-40 blur-md animate-pulse' />
				<div className='relative inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700 animate-bounce'>
					🚧 Work in Progress
				</div>
			</div>

			<ButtonNavigate btnText='Back To Home' destination='/' size='lg' />
		</div>
	)
}

export default Settings

import { LayoutGrid, Rows3 } from 'lucide-react'
import { Button } from '../../ui/button'

// Layout toggle component
const LayoutToggle = ({
	isFlexLayout,
	onToggle,
}: {
	isFlexLayout: boolean
	onToggle: () => void
}) => (
	<Button
		onClick={onToggle}
		variant='default'
		size='sm'
		aria-label={`Switch to ${isFlexLayout ? 'grid' : 'flex'} layout`}
	>
		{isFlexLayout ? <Rows3 size={16} /> : <LayoutGrid size={16} />}
	</Button>
)
export default LayoutToggle

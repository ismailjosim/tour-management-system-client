import { Badge } from '@/components/ui/badge'
import type { Role } from '@/types/auth.type'

const UserRoleBadge = ({ role }: { role: Role }) => {
	const variant =
		role === 'ADMIN' || role === 'SUPER_ADMIN'
			? 'destructive'
			: role === 'GUIDE'
			? 'default'
			: role === 'USER'
			? 'secondary'
			: 'outline'

	return (
		<Badge variant={variant} className='capitalize'>
			{role}
		</Badge>
	)
}

export default UserRoleBadge

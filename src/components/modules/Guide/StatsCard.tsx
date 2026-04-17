import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
	title: string
	value: string
	trend: string
	trendUp: boolean
	icon: React.ReactNode
	subtitle?: string
}

export function StatsCard({
	title,
	value,
	trend,
	trendUp,
	icon,
	subtitle,
}: StatsCardProps) {
	return (
		<Card className='transition-colors duration-200 hover:shadow-lg bg-card border-border'>
			<CardContent className='p-5'>
				<div className='flex items-start justify-between mb-3'>
					{/* Changed from primary-foreground to muted-foreground */}
					<p className='text-sm text-muted-foreground font-medium'>{title}</p>
					<div className='p-2 rounded-lg bg-primary text-primary-foreground'>
						{icon}
					</div>
				</div>
				{/* Changed from primary-foreground to foreground */}
				<p className='text-2xl font-bold text-foreground tracking-tight mb-1'>
					{value}
				</p>
				{subtitle && (
					/* Changed from primary-foreground to muted-foreground */
					<p className='text-xs text-muted-foreground mb-2'>{subtitle}</p>
				)}
				<div
					className={cn(
						'flex items-center gap-1 text-xs font-medium',
						trendUp ? 'text-primary' : 'text-destructive',
					)}
				>
					{trendUp ? (
						<TrendingUp className='w-3 h-3' />
					) : (
						<TrendingDown className='w-3 h-3' />
					)}
					{trend}
				</div>
			</CardContent>
		</Card>
	)
}

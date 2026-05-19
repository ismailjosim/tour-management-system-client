import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: React.ReactNode;
  subtitle?: string;
}

export function StatsCard({ title, value, trend, trendUp, icon, subtitle }: StatsCardProps) {
  return (
    <Card className="bg-card border-border transition-colors duration-200 hover:shadow-lg">
      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between">
          {/* Changed from primary-foreground to muted-foreground */}
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <div className="bg-primary text-primary-foreground rounded-lg p-2">{icon}</div>
        </div>
        {/* Changed from primary-foreground to foreground */}
        <p className="text-foreground mb-1 text-2xl font-bold tracking-tight">{value}</p>
        {subtitle && (
          /* Changed from primary-foreground to muted-foreground */
          <p className="text-muted-foreground mb-2 text-xs">{subtitle}</p>
        )}
        <div
          className={cn(
            'flex items-center gap-1 text-xs font-medium',
            trendUp ? 'text-primary' : 'text-destructive'
          )}
        >
          {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {trend}
        </div>
      </CardContent>
    </Card>
  );
}

import { Bell, Pencil } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  name: string;
  role: string;
  avatarUrl?: string;
  notificationCount?: number;
}

export function DashboardHeader({
  name,
  role,
  avatarUrl,
  notificationCount = 3,
}: DashboardHeaderProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#2a2d35] px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-teal-600">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
            <AvatarFallback className="bg-teal-700 text-sm font-bold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm leading-tight font-semibold text-white">{name}</p>
            <p className="text-xs text-zinc-500 capitalize">{role}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 text-zinc-400 hover:text-white"
          >
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center border-0 bg-teal-600 p-0 text-[10px]">
                {notificationCount}
              </Badge>
            )}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1.5 border-[#2a2d35] bg-[#252830] text-xs text-zinc-300 hover:bg-[#2a2d37] hover:text-white"
          >
            <Pencil className="h-3 w-3" />
            Edit profile
          </Button>
        </div>
      </header>

      {/* Page title */}
      <div className="px-6 pt-6 pb-2">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          {greeting}, {name.split(' ')[0]} 👋
        </h1>
        <p className="mt-0.5 text-sm text-zinc-500">
          Here's what's happening with your tours today — {today}
        </p>
      </div>
    </>
  );
}

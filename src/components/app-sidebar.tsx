import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useTheme } from '@/hooks/useTheme';
import { Link, NavLink, useLocation } from 'react-router';
import logoBlack from '@/assets/images/site-logo-dark.png';
import logoWhile from '@/assets/images/site-logo-light.png';
import { getSidebarItems } from '@/utils/getSidebarItems';
import { useUserInfoQuery, useLogoutMutation, authApi } from '@/redux/features/auth/auth.api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/redux/app/hook';
import { toast } from 'sonner';
import type { TRole, ApiError } from '@/types';
import { ModeToggle } from './layout/ModeToggler';
import { LogOut } from 'lucide-react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);
  const getRole = userData?.data.role as TRole;
  const { theme } = useTheme();
  const location = useLocation();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const user = userData?.data;

  const handleLogout = async () => {
    try {
      // Reset API state immediately
      dispatch(authApi.util.resetApiState());

      // Call logout endpoint to clear cookies on backend
      const { data } = await logout(undefined);

      if (data?.success) {
        toast.success(data.message);
        // Redirect to login page after successful logout
        setTimeout(() => {
          window.location.href = '/login';
        }, 500);
      } else {
        toast.error('Logout failed. Please try again.');
      }
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message || 'Logout failed');
      // Reset API state on error
      dispatch(authApi.util.resetApiState());
    }
  };

  const data = {
    navMain: getSidebarItems(getRole),
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 font-medium">
          <img
            src={theme === 'dark' ? logoWhile : logoBlack}
            alt="Site logo"
            className="h-10 w-auto object-contain"
          />
        </Link>
      </SidebarHeader>

      {/* Main menu items */}
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => {
                  const isActive = location.pathname === subItem.url;
                  return (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton
                        asChild
                        className={isActive ? 'bg-primary text-primary-foreground' : ''}
                      >
                        <Link to={subItem.url}>{subItem.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* ✅ Footer always at bottom */}
      <SidebarFooter>
        <div className="flex items-center justify-between gap-2 rounded-2xl border px-2 py-3">
          {/* Avatar */}
          <NavLink to="/profile">
            <Avatar className="h-8 w-8">
              {user?.picture ? (
                <AvatarImage src={user.picture} alt={user.name} />
              ) : (
                <AvatarFallback>{user?.name?.charAt(0) ?? 'U'}</AvatarFallback>
              )}
            </Avatar>
          </NavLink>

          {/* Dark/Light Toggle */}
          <ModeToggle />
          {/* Logout */}
          <Button variant="destructive" size="sm" className="px-4" onClick={handleLogout}>
            <LogOut />
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

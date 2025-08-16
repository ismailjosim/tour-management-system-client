import * as React from "react"

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
} from "@/components/ui/sidebar"
import { useTheme } from "../hooks/useTheme"
import { Link } from "react-router"
import logoBlack from "@/assets/icons/logo.png"
import logoWhile from "@/assets/images/site-logo.png"
import { getSidebarItems } from "../utils/getSidebarItems"
import { useUserInfoQuery } from "../redux/features/auth/auth.api"
import type { TRole } from "../types"
// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined)
  const getRole = userData?.data.role as TRole
  const { theme } = useTheme()

  const data = {
    navMain: getSidebarItems(getRole)
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to='/' className="flex items-center gap-2 font-medium">
          <img src={theme === 'dark' ? logoWhile : logoBlack} alt="Site logo" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

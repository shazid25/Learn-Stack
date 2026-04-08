"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFileDescription,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconSettings,
  IconUsers,
  IconBook,
  IconAward,
  IconMessageChatbot,
  IconLayoutDashboard,
  IconUserCircle
} from "@tabler/icons-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { authClient } from "@/lib/auth-client";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const role = session?.user?.role || "user";

  // Role-based navigation logic
  const getNavItems = () => {
    switch (role) {
      case "admin":
        return [
          { title: "Admin Console", url: "/admin", icon: IconLayoutDashboard },
          { title: "Course Manager", url: "/admin/courses", icon: IconListDetails },
          { title: "User Analytics", url: "/admin/analytics", icon: IconChartBar },
          { title: "Project Vault", url: "/admin/projects", icon: IconFolder },
          { title: "Staff & Teams", url: "/admin/team", icon: IconUsers },
          { title: "Global Settings", url: "/admin/settings", icon: IconSettings },
        ];
      case "manager":
        return [
          { title: "Management Hub", url: "/manager", icon: IconLayoutDashboard },
          { title: "Blog Manager", url: "/manager/blogs", icon: IconFileDescription },
          { title: "FAQ Center", url: "/manager/faq", icon: IconMessageChatbot },
          { title: "Help Library", url: "/manager/help", icon: IconHelp },
          { title: "User Base", url: "/manager/users", icon: IconUsers },
        ];
      default: // user
        return [
          { title: "My Dashboard", url: "/dashboard", icon: IconDashboard },
          { title: "My Learning", url: "/dashboard/courses", icon: IconBook },
          { title: "AI Assistant", url: "/dashboard/ai-chat", icon: IconMessageChatbot },
          { title: "Profile", url: "/dashboard/profile", icon: IconUserCircle },
        ];
    }
  };

  const secondaryNav = [
    { title: "Help Center", url: "/help", icon: IconHelp },
    { title: "FAQ Center", url: "/faq", icon: IconMessageChatbot },
    { title: "Settings", url: "/dashboard/settings", icon: IconSettings },
  ];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-sidebar-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[slot=sidebar-menu-button]:!px-2"
            >
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-sidebar-primary-foreground shadow-lg shadow-blue-600/20">
                  <Image src={Logo} alt="logo" className="size-5 brightness-0 invert" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-slate-900 dark:text-white">Learn Stack</span>
                  <span className="truncate text-xs text-slate-500 dark:text-slate-400">Premium LMS</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-2 py-4">
          <p className="px-3 mb-2 text-xs font-black text-slate-400 uppercase tracking-widest">
            {role} Navigation
          </p>
          <NavMain items={getNavItems()} />
        </div>
        <NavSecondary items={secondaryNav} className="mt-auto border-t border-sidebar-border/50 p-2" />
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/50 p-4">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

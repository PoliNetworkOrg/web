"use client";

import { Compass, Home, Settings2, Users, Wrench } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { Session } from "next-auth";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/admin",
      icon: Home,
    },
    {
      title: "HR",
      url: "/admin/hr",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "/admin/hr/users",
        },
        {
          title: "Admins",
          url: "/admin/hr/admins",
        },
      ],
    },
    {
      title: "Management",
      url: "/admin/management",
      icon: Wrench,
      items: [
      ],
    },
    {
      title: "Website Data",
      url: "/admin/website",
      icon: Compass,
      items: [
        {
          title: "TG Users",
          url: "/admin/website/tg-users",
        },
        {
          title: "Groups",
          url: "/admin/website/groups",
        },
        {
          title: "Info",
          url: "/admin/website/info",
        },
      ],
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/admin/settings/general",
        },
      ],
    },
  ],
};

export function AdminSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: Session["user"] }) {
  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="top-[--header-height] pb-[--header-height]"
      {...props}
    >
      <SidebarHeader>
        <div className="flex items-center justify-start gap-2">
          <SidebarTrigger className="h-8 w-8" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

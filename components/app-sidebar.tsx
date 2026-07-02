"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { Link } from "next-view-transitions";
import { ScrollArea } from "./ui/scroll-area";
import { NavUser } from "./nav-user";
import { MyNav } from "./my-nav";
import { ViewMenuButton } from "./view-menu-button";
// import { useProfileStore } from "@/lib/store/profile-store"
// import { useProfileStore } from "@/lib/stores/profile-store"

// This is sample data.

export function AppSidebar({
  layout,
  ...props
}: { layout: "admin" | "dash" } & React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      className="bg-transparent"
      {...props}
    >
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <Link href={`/dash/menu`} className="flex ">
          <div
            className={`text-sidebar-primary-foreground flex aspect-square items-center justify-center `}
          >
            {/* <activeTeam.logo className="size-4" /> */}
            <div className="size-10 flex justify-center items-center rounded-full">
              {/* <Sparkles className="text-white size-14" /> */}
              <Image
                alt="logo"
                src={logo}
                width={50}
                height={50}
                className="w-full h-full"
              />

              {/* <Image
                src="/logo.logo"
                alt="Logo"
                width={200}
                height={200}
                priority
                className=""
              /> */}
            </div>
          </div>
          <div className="flex-1 text-left text-sm leading-tight ml-2 grid data-[state=collapsed]:hidden">
            <h2 className="truncate font-bold ">QR Menü</h2>
            <span className="truncate text-xs text-gray-500">Panel</span>
          </div>
        </Link>
        {layout === "dash" && (
          <div className="mt-2 px-1 group-data-[state=collapsed]:px-0">
            <ViewMenuButton collapsed={isCollapsed} />
          </div>
        )}
        {/* <ChevronsUpDown className="ml-auto" /> */}
        {/* <div className="flex gap-x-2 items-center px-3">
          <div className="w-20">
            <Image alt="logo" src={logo} width={200} height={200} />
          </div>
          {open && (
            <h2 className="font-medium">Pro-ihale</h2>
          )}
        </div> */}
      </SidebarHeader>
      <SidebarContent className="">
        <ScrollArea className="h-full">
          <MyNav layout={layout} />
        </ScrollArea>
        {/* <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter className="overflow-hidden ">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
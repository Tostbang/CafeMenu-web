"use client";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { ReactNode, useEffect } from "react";
import { Separator } from "./ui/separator";
import { NavUser } from "./nav-user";
import DashPage from "./DashPage";
import DynamicBreadcrumb from "./BreadCrumb";
import { useProfileStore } from "@/lib/store/profile-store";
import useGetProfile from "@/app/dash/_services/queries";

export function DashProviders({
  children,
  sideBarDefaultValue,
}: {
  children: React.ReactNode;
  sideBarDefaultValue: boolean;
}) {
  const { setProfile } = useProfileStore();
  const { data: profile } = useGetProfile();
  useEffect(() => {
    if (profile) {
      setProfile(profile.user);
    }
  }, [profile, setProfile]);
  return (
    <SidebarProvider defaultOpen={sideBarDefaultValue}>
      {children}
    </SidebarProvider>
  );
}

export function MainComponent({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  // const { state } = useSidebar()
  // ${state === "expanded" ? "md:w-[calc(100vw-19rem)]" : "md:w-[calc(100vw-6rem)]"} transition-all duration-300
  return (
    <main className="mr-2 flex h-screen w-full flex-col overflow-hidden pb-2 pl-2 pr-4">
      <header className="flex h-14 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 " />
          <Separator
            orientation="vertical"
            className="mr-2 mt-1.5 data-[orientation=vertical]:h-4"
          />
          <div>
            <DynamicBreadcrumb />
          </div>
        </div>
        <NavUser />
      </header>
      <DashPage>{children}</DashPage>
    </main>
  );
}


import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, } from "@/components/ui/sidebar";
import React from "react";
import { ViewTransitions } from "next-view-transitions";
import { cookies } from "next/headers";
import { DashProviders, MainComponent } from "@/components/DashProviders";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const sideBarDefaultValue = (await cookies()).get("sidebar_state")?.value === "true" ? true : false;

  return (
    <ViewTransitions>
      <main>
        <DashProviders sideBarDefaultValue={sideBarDefaultValue}>
          <AppSidebar layout="dash" variant="floating" />
          <SidebarInset className="overflow-hidden">
            <MainComponent>
              {children}
            </MainComponent>
          </SidebarInset>
        </DashProviders>
      </main>
    </ViewTransitions>
  )
}

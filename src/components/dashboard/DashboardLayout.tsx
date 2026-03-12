import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-12 flex items-center border-b border-border bg-card px-2">
          <SidebarTrigger />
        </header>
        <main className="flex-1 p-8 bg-background overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  </SidebarProvider>
);

export default DashboardLayout;

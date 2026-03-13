import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full bg-[#f6f3ef]">

      <AppSidebar />

      <div className="flex-1 flex flex-col">

        {/* Top Header */}
        <header className="
          h-14
          flex
          items-center
          justify-between
          border-b
          border-[#efe8df]
          bg-[#fdfaf6]
          px-6
          shadow-sm
        ">
          <SidebarTrigger />
        </header>

        {/* Main Content */}
        <main className="
          flex-1
          p-8
          overflow-auto
        ">
          <Outlet />
        </main>

      </div>

    </div>
  </SidebarProvider>
);

export default DashboardLayout;
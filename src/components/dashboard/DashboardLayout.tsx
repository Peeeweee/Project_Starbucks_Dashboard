import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { Bell, Search, Settings, HelpCircle, User } from "lucide-react";

const DashboardLayout = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full bg-[#FBF9F6]">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 flex items-center justify-between border-b border-border/20 bg-white/40 backdrop-blur-3xl px-10 sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-6">
            <SidebarTrigger className="text-[#006241] h-11 w-11 hover:bg-[#006241]/10 transition-colors rounded-2xl" />
          </div>
        </header>
        
        <main className="flex-1 p-8 md:p-12 lg:p-16 overflow-auto scroll-smooth">
          <div className="max-w-[1700px] mx-auto">
            <Outlet />
          </div>
          
        </main>
      </div>
    </div>
  </SidebarProvider>
);

export default DashboardLayout;

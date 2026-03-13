import { BarChart3, Users, ShoppingCart, Clock, Coffee, DollarSign, Lightbulb, ChevronRight } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const tabs = [
  { label: "Overview", path: "/", icon: BarChart3 },
  { label: "Customers", path: "/demographics", icon: Users },
  { label: "Ordering", path: "/behavior", icon: ShoppingCart },
  { label: "Visit Times", path: "/time-patterns", icon: Clock },
  { label: "Drinks", path: "/products", icon: Coffee },
  { label: "Spending", path: "/spending", icon: DollarSign },
  { label: "Quick Facts", path: "/insights", icon: Lightbulb },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-none shadow-2xl">
      <SidebarContent className="bg-[#002B1B] text-white">
        {/* Brand Identity */}
        <div className="relative overflow-hidden group px-6 py-12 mb-4">
          <div className="flex items-center gap-5 relative z-10 transition-transform duration-500 group-hover:translate-x-1">
            {/* Liquid Logo Container */}
            <div className="relative h-14 w-14 rounded-[22px] bg-[#002B1B] overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 animate-float">
              {/* Liquid Wave Effect */}
              <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-[#006241] rounded-[40%] animate-liquid opacity-80" />
              <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-emerald-500/30 rounded-[35%] animate-liquid !animation-delay-[-5s] opacity-50" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <Coffee className="h-8 w-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-transform duration-700 group-hover:scale-110" />
              </div>
            </div>

            {!collapsed && (
              <div className="flex flex-col">
                <div className="relative">
                  <span className="text-2xl font-black text-white tracking-[-0.03em] leading-none block">
                    STARBUCKS
                  </span>
                  <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                </div>
                
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <span className="text-[10px] font-black text-emerald-400/60 tracking-[0.35em] uppercase">
                    DATA GUIDE
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Subtle Background Glow */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
        </div>

        {/* Navigation */}
        <SidebarGroup className="px-3">
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {tabs.map(({ label, path, icon: Icon }) => (
                <SidebarMenuItem key={path}>
                  <SidebarMenuButton asChild tooltip={label}>
                    <NavLink
                      to={path}
                      end
                      className="group flex items-center justify-between px-4 py-7 rounded-2xl transition-all duration-500 text-emerald-100/40 hover:bg-white/5 hover:text-white"
                      activeClassName="bg-[#006241] shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)] text-white ring-1 ring-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="h-5 w-5 shrink-0 transition-all duration-700 group-hover:scale-125 group-hover:rotate-12" />
                        {!collapsed && <span className="text-sm font-bold tracking-tight">{label}</span>}
                      </div>
                      {!collapsed && <ChevronRight className="h-4 w-4 opacity-0 group-[.active]:opacity-40 transition-all duration-500 group-hover:translate-x-1" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

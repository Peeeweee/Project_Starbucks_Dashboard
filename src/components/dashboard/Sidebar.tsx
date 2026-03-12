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
  { label: "Demographics", path: "/demographics", icon: Users },
  { label: "Behavior", path: "/behavior", icon: ShoppingCart },
  { label: "Temporal", path: "/time-patterns", icon: Clock },
  { label: "Products", path: "/products", icon: Coffee },
  { label: "Financials", path: "/spending", icon: DollarSign },
  { label: "Insights", path: "/insights", icon: Lightbulb },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-none shadow-2xl">
      <SidebarContent className="bg-[#002B1B] text-white">
        {/* Brand Identity */}
        <div className="flex items-center gap-4 px-6 py-10">
          <div className="h-12 w-12 rounded-2xl bg-[#006241] flex items-center justify-center shadow-2xl shadow-black/40 rotate-3 transform group-hover:rotate-0 transition-transform duration-500">
            <Coffee className="h-7 w-7 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tighter leading-none mb-0.5">
                STARBUCKS
              </span>
              <span className="text-[10px] font-bold text-emerald-400/60 tracking-[0.3em] uppercase">
                Intelligence
              </span>
            </div>
          )}
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

import { BarChart3, Users, ShoppingCart, Clock, Coffee, DollarSign, Lightbulb } from "lucide-react";
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
  { label: "Customer Demographics", path: "/demographics", icon: Users },
  { label: "Ordering Behavior", path: "/behavior", icon: ShoppingCart },
  { label: "Time & Visit Patterns", path: "/time-patterns", icon: Clock },
  { label: "Product Preferences", path: "/products", icon: Coffee },
  { label: "Spending Insights", path: "/spending", icon: DollarSign },
  { label: "Key Insights", path: "/insights", icon: Lightbulb },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-card">

        {/* Brand Header */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-border">
          <div className="p-2 rounded-lg bg-[#006241]/10">
            <Coffee className="h-6 w-6 text-[#006241]" />
          </div>

          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-foreground">
                Starbucks
              </span>
              <span className="text-xs text-muted-foreground">
                Analytics Dashboard
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <SidebarGroup className="mt-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-3">

              {tabs.map(({ label, path, icon: Icon }) => (
                <SidebarMenuItem key={path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={path}
                      end
                      className="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-muted/60"
                      activeClassName="bg-[#006241]/10 text-[#006241] font-medium"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="text-sm">{label}</span>}
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
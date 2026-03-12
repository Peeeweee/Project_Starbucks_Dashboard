import { BarChart3, Users, ShoppingCart, Clock, Coffee, DollarSign, Lightbulb } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
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
      <SidebarContent>
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-border">
          <Coffee className="h-7 w-7 text-primary shrink-0" />
          {!collapsed && (
            <span className="text-base font-semibold text-foreground tracking-tight">
              Starbucks Analytics
            </span>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabs.map(({ label, path, icon: Icon }) => (
                <SidebarMenuItem key={path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={path}
                      end
                      className="hover:bg-muted/50"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <Icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{label}</span>}
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

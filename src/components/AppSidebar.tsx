import { 
  Calendar, 
  LayoutDashboard, 
  Settings, 
  Users, 
  BarChart3, 
  Armchair,
  BookOpen,
  Shield
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.jpg";

// Mock user role - in real app this would come from auth context
const userRole: "employee" | "admin" = "employee";

const employeeItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Book Chair", url: "/book", icon: Armchair },
  { title: "My Bookings", url: "/bookings", icon: BookOpen },
];

const adminItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Chair Management", url: "/admin/chairs", icon: Armchair },
  { title: "Booking Management", url: "/admin/bookings", icon: Calendar },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const items = userRole === "admin" ? adminItems : employeeItems;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="ChairRotate" 
              className="h-8 w-8 rounded-lg object-cover"
            />
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-foreground">ChairRotate</h2>
                <p className="text-xs text-muted-foreground">Scheduler</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="px-4">
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {userRole === "admin" ? "Admin Panel" : "Employee"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive(item.url)
                          ? "bg-primary text-primary-foreground shadow-primary"
                          : "hover:bg-accent text-foreground"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Role Badge */}
        {!isCollapsed && (
          <div className="p-4 mt-auto">
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Role</p>
                <Badge variant={userRole === "admin" ? "default" : "secondary"} className="text-xs">
                  {userRole === "admin" ? "Administrator" : "Employee"}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3,
  Home,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  Upload,
  Wallet,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";

const SellerLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigationItems = [
    {
      title: "Dashboard",
      href: "/seller/dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      title: "My Templates",
      href: "/seller/templates",
      icon: <Package className="mr-2 h-4 w-4" />,
    },
    {
      title: "Upload Template",
      href: "/seller/templates/new",
      icon: <Upload className="mr-2 h-4 w-4" />,
    },
    {
      title: "Sales",
      href: "/seller/sales",
      icon: <ShoppingBag className="mr-2 h-4 w-4" />,
    },
    {
      title: "Analytics",
      href: "/seller/analytics",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
    },
    {
      title: "Wallet",
      href: "/seller/wallet",
      icon: <Wallet className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/seller/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex h-16 items-center border-b px-4">
        <Button
          variant="ghost"
          size="icon"
          className="mr-4 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex flex-1 items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">TemplaMarT</span>
            <span className="ml-2 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              Seller Dashboard
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <LogOut className="mr-2 h-4 w-4" />
                Back to Marketplace
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-1">
        <div
          className={`bg-muted/40 ${
            isSidebarOpen ? "block" : "hidden"
          } w-64 border-r md:block`}
        >
          <ScrollArea className="h-[calc(100vh-4rem)] py-6">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Seller Dashboard
              </h2>
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <Button
                    key={item.title}
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to={item.href}>
                      {item.icon}
                      {item.title}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
            <Separator className="my-4" />
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Support
              </h2>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/seller/help">Help Center</Link>
                </Button>
                <Button onClick={logout} variant="ghost" className="w-full justify-start">
                  Logout
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="container py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;

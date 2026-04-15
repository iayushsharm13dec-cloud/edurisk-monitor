import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldAlert,
  Users,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  ocid: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    ocid: "nav.dashboard.link",
  },
  {
    label: "Students",
    href: "/students",
    icon: Users,
    ocid: "nav.students.link",
  },
  {
    label: "Interventions",
    href: "/interventions",
    icon: ShieldAlert,
    ocid: "nav.interventions.link",
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { logout, shortPrincipal } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="font-display font-bold text-sm text-sidebar-foreground leading-tight">
            EduRisk Monitor
          </p>
          <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
            Academic Intelligence
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive =
            currentPath === item.href ||
            currentPath.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              to={item.href}
              data-ocid={item.ocid}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-smooth group",
                isActive
                  ? "bg-primary/15 text-primary border border-primary/20"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground border border-transparent",
              )}
            >
              <item.icon
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-sidebar-foreground",
                )}
              />
              <span className="flex-1 truncate">{item.label}</span>
              {isActive && (
                <ChevronRight className="w-3 h-3 text-primary opacity-60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User / Logout */}
      <div className="px-3 pb-4 pt-2 border-t border-sidebar-border space-y-2">
        <div className="px-3 py-2 rounded-md bg-sidebar-accent">
          <p className="text-xs text-muted-foreground mb-0.5">Signed in as</p>
          <p className="text-xs font-mono text-sidebar-foreground truncate">
            {shortPrincipal ?? "—"}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          data-ocid="nav.logout.button"
          onClick={logout}
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-sidebar border-r border-sidebar-border flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
          role="presentation"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <aside
            className="absolute left-0 top-0 h-full w-60 bg-sidebar border-r border-sidebar-border flex flex-col z-50"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="presentation"
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-4 lg:px-6 py-3 bg-card border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              data-ocid="nav.mobile_menu.button"
            >
              <Menu className="w-5 h-5" />
            </button>
            {/* Page title breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="hidden sm:flex items-center gap-2"
            >
              {navItems.map((item) => {
                if (
                  currentPath === item.href ||
                  currentPath.startsWith(`${item.href}/`)
                ) {
                  return (
                    <div key={item.href} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-semibold font-display text-foreground">
                        {item.label}
                      </span>
                    </div>
                  );
                }
                return null;
              })}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              System Active
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>
    </div>
  );
}

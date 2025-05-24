"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Tablets, Utensils } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/tables", label: "Tables", icon: Tablets },
  { href: "/products", label: "Products", icon: ShoppingBag },
  // { href: "/orders", label: "All Orders", icon: ListOrdered }, // Example for a future page
];

export function SidebarNav() {
  const pathname = usePathname();
  const { open, setOpen, state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/tables" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sidebar-primary">
            <path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 2.5 1.2 4.8 3 6.2V22h10v-5.8c1.8-1.4 3-3.7 3-6.2Z"/>
            <path d="M12 2a3 3 0 0 0-3 3c0 .4.1.9.3 1.3"/>
            <path d="M12 12a2.5 2.5 0 0 0 0-5"/>
          </svg>
          {state === "expanded" && (
            <h1 className="text-2xl font-semibold text-sidebar-foreground">MesaFacil</h1>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{ children: item.label, side: "right", align: "center" }}
                  className={cn(
                    "justify-start",
                    state === "collapsed" && "justify-center"
                  )}
                >
                  <a>
                    <item.icon className="shrink-0" />
                    {state === "expanded" && <span>{item.label}</span>}
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        {state === "expanded" && (
          <Button variant="outline" className="w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent">
            Settings
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

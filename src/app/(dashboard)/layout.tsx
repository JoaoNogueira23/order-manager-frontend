import { SidebarProvider, SidebarInset, SidebarTrigger, SidebarRail } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/navigation/SidebarNav";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <SidebarNav />
      <SidebarRail />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6 md:hidden">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">MesaFacil</h1>
        </header>
        <ScrollArea className="h-[calc(100vh-3.5rem)] md:h-screen"> {/* Adjust height for mobile header */}
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}

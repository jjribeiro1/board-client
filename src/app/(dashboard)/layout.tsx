import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { NotificationSSEConnector } from "@/features/notifications/components/notification-sse-connector";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <NotificationSSEConnector />
      <AppSidebar />
      <main className="w-full px-8 py-6">{children}</main>
    </SidebarProvider>
  );
}

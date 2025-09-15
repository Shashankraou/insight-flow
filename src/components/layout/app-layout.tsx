"use client";
import { SidebarProvider, Sidebar, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/sidebar';
import { AppHeader } from '@/components/layout/header';
import { ScrollArea } from '../ui/scroll-area';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarRail />
        <SidebarInset>
            <AppHeader />
            <ScrollArea className="h-[calc(100vh-theme(spacing.14))] lg:h-[calc(100vh-theme(spacing.16))]">
                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </ScrollArea>
        </SidebarInset>
    </SidebarProvider>
  );
}

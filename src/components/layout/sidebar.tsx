'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  BrainCircuit,
  Wrench,
  History,
  Library,
  BarChart2,
  TestTube2,
  FlaskConical,
  Sigma,
  FileText,
  Network,
  ThumbsUp,
  AreaChart,
  LifeBuoy,
  Settings,
} from 'lucide-react';
import { Logo } from '../icons/logo';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { cn } from '@/lib/utils';
import { toolkitPages } from '@/lib/toolkit-data';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-primary" />
            <span className="text-lg font-semibold">InsightFlow</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/'} tooltip="Dashboard">
              <Link href="/">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Collapsible asChild>
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className='w-full justify-start data-[state=open]:bg-sidebar-accent'>
                    <BrainCircuit />
                    <span>Analysis Tools</span>
                  </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent asChild>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild isActive={pathname === '/analysis/failure-root-cause'}>
                        <Link href="/analysis/failure-root-cause">
                          <Wrench />
                          <span>Failure Root Cause</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild isActive={pathname === '/analysis/historical'}>
                        <Link href="/analysis/historical">
                          <History />
                          <span>Historical Analysis</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <Collapsible asChild>
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className='w-full justify-start data-[state=open]:bg-sidebar-accent'>
                    <Library />
                    <span>DS Toolkit</span>
                  </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent asChild>
                  <SidebarMenuSub>
                    {toolkitPages.map((page) => (
                      <SidebarMenuSubItem key={page.slug}>
                        <SidebarMenuSubButton asChild isActive={pathname === `/toolkit/${page.slug}`}>
                            <Link href={`/toolkit/${page.slug}`}>
                                <page.icon />
                                <span>{page.shortTitle}</span>
                            </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Support">
                    <LifeBuoy />
                    <span>Support</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

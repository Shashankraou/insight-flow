'use client';

import { useState } from 'react';
import { MachineCard } from "@/components/dashboard/machine-card";
import { Machine, MachineStatus, MachineType } from "@/lib/data";
import { AlertTriangle, CheckCircle, Construction, HardHat } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DashboardClientPageProps {
  initialMachines: Machine[];
}

export default function DashboardClientPage({ initialMachines }: DashboardClientPageProps) {
  const [statusFilter, setStatusFilter] = useState<MachineStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<MachineType | 'all'>('all');

  const filteredMachines = initialMachines.filter(machine => {
    const statusMatch = statusFilter === 'all' || machine.status === statusFilter;
    const typeMatch = typeFilter === 'all' || machine.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const highRiskMachines = initialMachines.filter(m => m.status === 'Failure imminent').length;
  const warningMachines = initialMachines.filter(m => m.status === 'Warning').length;
  const operationalMachines = initialMachines.length - highRiskMachines - warningMachines;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {/* Stat cards will remain unfiltered for now, showing overall stats */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Machines</h3>
            <Construction className="h-4 w-4 text-muted-foreground"/>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{initialMachines.length}</div>
            <p className="text-xs text-muted-foreground">all systems monitored</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">High Risk</h3>
            <AlertTriangle className="h-4 w-4 text-destructive"/>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-destructive">{highRiskMachines}</div>
            <p className="text-xs text-muted-foreground">immediate attention required</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Warnings</h3>
            <HardHat className="h-4 w-4 text-yellow-500"/>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-yellow-500">{warningMachines}</div>
            <p className="text-xs text-muted-foreground">potential issues detected</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Operational</h3>
            <CheckCircle className="h-4 w-4 text-green-500"/>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-green-500">{operationalMachines}</div>
            <p className="text-xs text-muted-foreground">running as expected</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <Select onValueChange={(value: MachineStatus | 'all') => setStatusFilter(value)} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Operational">Operational</SelectItem>
            <SelectItem value="Warning">Warning</SelectItem>
            <SelectItem value="Failure imminent">Failure imminent</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value: MachineType | 'all') => setTypeFilter(value)} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredMachines.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </>
  );
}
import { MachineCard } from "@/components/dashboard/machine-card";
import { loadMachinesData } from "@/lib/data-loader";
import { AlertTriangle, CheckCircle, Construction, HardHat } from "lucide-react";

export default function DashboardPage() {
  const machines = loadMachinesData();
  const highRiskMachines = machines.filter(m => m.status === 'Failure imminent').length;
  const warningMachines = machines.filter(m => m.status === 'Warning').length;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Machines</h3>
            <Construction className="h-4 w-4 text-muted-foreground"/>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{machines.length}</div>
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
            <div className="text-2xl font-bold text-green-500">{machines.length - highRiskMachines - warningMachines}</div>
            <p className="text-xs text-muted-foreground">running as expected</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {machines.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </>
  );
}

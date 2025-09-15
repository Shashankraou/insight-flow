import { MachineCard } from "@/components/dashboard/machine-card";
import { machines } from "@/lib/data";

export default function DashboardPage() {
  const highRiskMachines = machines.filter(m => m.status === 'Failure imminent').length;
  const warningMachines = machines.filter(m => m.status === 'Warning').length;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Machines</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 7 1.6-1.6"/><path d="m5.4 18.6 1.6-1.6"/><path d="M22 12h-2"/><path d="M4 12H2"/><path d="m18.6 18.6-1.6-1.6"/><path d="m7 7-1.6-1.6"/></svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{machines.length}</div>
            <p className="text-xs text-muted-foreground">all systems operational</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">High Risk</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-destructive"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-destructive">{highRiskMachines}</div>
            <p className="text-xs text-muted-foreground">machines need immediate attention</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Warnings</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-yellow-500"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-yellow-500">{warningMachines}</div>
            <p className="text-xs text-muted-foreground">potential issues detected</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Uptime</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-500"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-green-500">99.8%</div>
            <p className="text-xs text-muted-foreground">in the last 24 hours</p>
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

import { Badge } from "@/components/ui/badge";
import type { MachineStatus } from "@/lib/data";

type StatusBadgeProps = {
  status: MachineStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles: Record<MachineStatus, string> = {
    Operational: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800",
    Warning: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800",
    'Failure imminent': "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800",
  };

  return (
    <Badge variant="outline" className={statusStyles[status]}>
      {status}
    </Badge>
  );
}

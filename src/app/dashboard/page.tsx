import { loadMachinesData } from '@/lib/data-loader';
import DashboardClientPage from './client-page';

export default function DashboardPage() {
  const machines = loadMachinesData();
  return <DashboardClientPage initialMachines={machines} />;
}
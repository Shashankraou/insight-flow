import { loadMachinesData } from '@/lib/data-loader';
import SensorCorrelationClientPage from './client-page';

export default function SensorCorrelationPage() {
  const machines = loadMachinesData();
  return <SensorCorrelationClientPage machines={machines} />;
}
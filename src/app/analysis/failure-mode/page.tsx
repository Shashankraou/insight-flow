import { loadMachinesData } from '@/lib/data-loader';
import FailureModeClientPage from './client-page';

export default function FailureModePage() {
  const machines = loadMachinesData();
  return <FailureModeClientPage machines={machines} />;
}
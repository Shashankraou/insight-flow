import { loadMachinesData } from '@/lib/data-loader';
import FailureRootCauseClientPage from './client-page';

export default function FailureRootCausePage() {
  const machines = loadMachinesData();
  return <FailureRootCauseClientPage machines={machines} />;
}

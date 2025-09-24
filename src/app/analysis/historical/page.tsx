import { loadMachinesData } from '@/lib/data-loader';
import HistoricalAnalysisClientPage from './client-page';

export default function HistoricalAnalysisPage() {
  const machines = loadMachinesData();
  return <HistoricalAnalysisClientPage machines={machines} />;
}
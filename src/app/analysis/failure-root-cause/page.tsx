'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Wrench } from 'lucide-react';
import { machines } from '@/lib/data';
import type { Machine } from '@/lib/data';
import { runFailureAnalysis } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function FailureRootCausePage() {
  const [selectedMachineId, setSelectedMachineId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedMachine = machines.find(m => m.id === selectedMachineId);

  const handleSubmit = async () => {
    if (!selectedMachine) {
      setError('Please select a machine to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await runFailureAnalysis({
        machineId: selectedMachine.id,
        featureImportances: selectedMachine.featureImportances,
      });
      setAnalysisResult(result.probableCause);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Analyze Failure Cause</CardTitle>
          <CardDescription>
            Select a machine to analyze its feature importance and get a probable root cause for failure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="machine-select" className="text-sm font-medium mb-2 block">
              Machine
            </label>
            <Select onValueChange={setSelectedMachineId} value={selectedMachineId}>
              <SelectTrigger id="machine-select">
                <SelectValue placeholder="Select a machine..." />
              </SelectTrigger>
              <SelectContent>
                {machines.map(machine => (
                  <SelectItem key={machine.id} value={machine.id}>
                    {machine.name} ({machine.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={isLoading || !selectedMachineId}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze
          </Button>
        </CardFooter>
      </Card>
      
      <div className="lg:col-span-2">
        {isLoading && (
            <div className="flex items-center justify-center h-full rounded-xl border bg-card text-card-foreground shadow p-6">
                <div className='text-center'>
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Analyzing data...</p>
                </div>
            </div>
        )}
        {!isLoading && (analysisResult || error || !selectedMachine) && (
            <Card className='h-full'>
                <CardHeader>
                    <CardTitle>Analysis Result</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                         <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {analysisResult && !error &&(
                        <Alert>
                            <Wrench className="h-4 w-4" />
                            <AlertTitle>Probable Root Cause</AlertTitle>
                            <AlertDescription>{analysisResult}</AlertDescription>
                        </Alert>
                    )}
                    {!analysisResult && !error && !selectedMachine && (
                        <p className="text-muted-foreground">Select a machine and click "Analyze" to see the results.</p>
                    )}
                     {selectedMachine && !analysisResult && !error && (
                        <div>
                            <h3 className="font-semibold mb-2">Feature Importances for {selectedMachine.name}</h3>
                            <ul className="list-disc list-inside bg-muted/50 p-4 rounded-md text-sm">
                                {Object.entries(selectedMachine.featureImportances).map(([feature, importance]) => (
                                    <li key={feature}>
                                        <span className="font-mono">{feature}:</span> {(importance * 100).toFixed(2)}%
                                    </li>
                                ))}
                            </ul>
                        </div>
                     )}
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}

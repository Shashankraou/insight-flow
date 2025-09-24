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
import type { Machine } from '@/lib/data';
import { runFailureAnalysis } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  importance: {
    label: "Importance",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

interface FailureRootCauseClientPageProps {
  machines: Machine[];
}

export default function FailureRootCauseClientPage({ machines }: FailureRootCauseClientPageProps) {
  const [selectedMachineId, setSelectedMachineId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedMachine = machines.find(m => m.id === selectedMachineId);

  const featureImportanceData = selectedMachine
  ? Object.entries(selectedMachine.featureImportances)
      .map(([name, importance]) => ({ name, importance }))
      .sort((a, b) => b.importance - a.importance)
  : [];

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
            <Select onValueChange={(value) => {
              setSelectedMachineId(value);
              setAnalysisResult(null);
              setError(null);
            }} value={selectedMachineId}>
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

      <Card className="lg:col-span-2">
        <CardHeader>
            <CardTitle>Analysis Details</CardTitle>
            {!selectedMachine && <CardDescription>Select a machine to view its details.</CardDescription>}
            {selectedMachine && <CardDescription>Feature importances for {selectedMachine.name}</CardDescription>}
        </CardHeader>
        <CardContent>
            {isLoading && (
                <div className="flex items-center justify-center h-64">
                    <div className='text-center'>
                        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                        <p className="mt-4 text-muted-foreground">Analyzing data...</p>
                    </div>
                </div>
            )}
            {!isLoading && error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {!isLoading && analysisResult && !error && (
                <Alert>
                    <Wrench className="h-4 w-4" />
                    <AlertTitle>Probable Root Cause</AlertTitle>
                    <AlertDescription>{analysisResult}</AlertDescription>
                </Alert>
            )}
            {!isLoading && !selectedMachine && !error && (
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Select a machine and click "Analyze" to see the results.</p>
                </div>
            )}
             {selectedMachine && !isLoading && (
                <div>
                  <ChartContainer config={chartConfig} className="h-64 w-full">
                    <BarChart accessibilityLayer data={featureImportanceData} layout="vertical" margin={{ left: 40, right: 20 }}>
                      <CartesianGrid horizontal={false} />
                       <XAxis type="number" dataKey="importance" tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                      <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={8} width={120} />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent
                          labelFormatter={(label, payload) => `${payload?.[0]?.payload.name}`}
                          formatter={(value) => `${(Number(value) * 100).toFixed(2)}%`}
                          indicator="dot"
                        />}
                      />
                      <Bar dataKey="importance" fill="var(--color-importance)" radius={4} />
                    </BarChart>
                  </ChartContainer>
                </div>
             )}
        </CardContent>
      </Card>
    </div>
  );
}

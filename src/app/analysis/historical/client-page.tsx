'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Machine } from '@/lib/data';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HistoricalAnalysisClientPageProps {
  machines: Machine[];
}

export default function HistoricalAnalysisClientPage({ machines }: HistoricalAnalysisClientPageProps) {
  const [selectedMachineId, setSelectedMachineId] = useState<string | undefined>();

  const selectedMachine = machines.find(m => m.id === selectedMachineId);

  // Prepare data for charting
  const chartData = selectedMachine ? selectedMachine.sensors.temperature.map((temp, index) => ({
    name: temp.name,
    temperature: temp.value,
    torque: selectedMachine.sensors.torque[index]?.value,
    rotation: selectedMachine.sensors.rotation[index]?.value,
    wear: selectedMachine.sensors.wear[index]?.value,
  })).reverse() : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Historical Analysis</CardTitle>
          <CardDescription>
            Select a machine to view its historical sensor data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-xs">
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
      </Card>

      {selectedMachine && (
        <Card>
          <CardHeader>
            <CardTitle>Sensor Data for {selectedMachine.name}</CardTitle>
            <CardDescription>
              Showing historical data for Temperature, Torque, Rotational Speed, and Tool Wear.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="temperature" name="Temperature (K)" stroke="#8884d8" />
                <Line yAxisId="left" type="monotone" dataKey="torque" name="Torque (Nm)" stroke="#82ca9d" />
                <Line yAxisId="right" type="monotone" dataKey="rotation" name="Rotation (rpm)" stroke="#ffc658" />
                <Line yAxisId="right" type="monotone" dataKey="wear" name="Tool Wear (min)" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
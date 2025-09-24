'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Machine } from '@/lib/data';
import * as d3 from 'd3-array';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SensorCorrelationClientPageProps {
  machines: Machine[];
}

export default function SensorCorrelationClientPage({ machines }: SensorCorrelationClientPageProps) {
  const [selectedMachineId, setSelectedMachineId] = useState<string | undefined>();

  const selectedMachine = machines.find(m => m.id === selectedMachineId);

  const getCorrelationColor = (value: number) => {
    if (value > 0.5) return 'bg-green-500 text-white';
    if (value > 0) return 'bg-green-200';
    if (value < -0.5) return 'bg-red-500 text-white';
    if (value < 0) return 'bg-red-200';
    return 'bg-gray-100';
  };

  let correlationMatrix: (number | undefined)[][] = [];
  const sensorKeys: (keyof Machine['sensors'])[] = ['temperature', 'torque', 'rotation', 'wear'];

  if (selectedMachine) {
    const sensorData = {
      temperature: selectedMachine.sensors.temperature.map(s => s.value),
      torque: selectedMachine.sensors.torque.map(s => s.value),
      rotation: selectedMachine.sensors.rotation.map(s => s.value),
      wear: selectedMachine.sensors.wear.map(s => s.value),
    };

    for (const key1 of sensorKeys) {
      const row: (number | undefined)[] = [];
      for (const key2 of sensorKeys) {
        row.push(d3.correlation(sensorData[key1], sensorData[key2]));
      }
      correlationMatrix.push(row);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sensor Correlation Matrix</CardTitle>
          <CardDescription>
            Select a machine to view the correlation between its sensor readings.
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
            <CardTitle>Correlation Matrix for {selectedMachine.name}</CardTitle>
            <CardDescription>
              Values close to 1 or -1 indicate a strong correlation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2"></th>
                  {sensorKeys.map(key => <th key={key} className="border p-2 capitalize">{key}</th>)}
                </tr>
              </thead>
              <tbody>
                {correlationMatrix.map((row, i) => (
                  <tr key={i}>
                    <th className="border p-2 capitalize">{sensorKeys[i]}</th>
                    {row.map((value, j) => (
                      <td key={j} className={`border p-2 text-center font-mono ${getCorrelationColor(value || 0)}`}>
                        {value !== undefined ? value.toFixed(2) : 'N/A'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
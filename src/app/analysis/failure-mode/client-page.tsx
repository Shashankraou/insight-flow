'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Machine } from '@/lib/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FailureModeClientPageProps {
  machines: Machine[];
}

export default function FailureModeClientPage({ machines }: FailureModeClientPageProps) {

  const failureData = [
    { name: 'Tool Wear', count: machines.filter(m => m.failureType?.twf).length },
    { name: 'Heat Dissipation', count: machines.filter(m => m.failureType?.hdf).length },
    { name: 'Power Failure', count: machines.filter(m => m.failureType?.pwf).length },
    { name: 'Overstrain', count: machines.filter(m => m.failureType?.osf).length },
    { name: 'Random', count: machines.filter(m => m.failureType?.rnf).length },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Failure Mode Analysis</CardTitle>
        <CardDescription>
          A breakdown of the most common types of machine failures across all machines.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={failureData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Failure Count" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
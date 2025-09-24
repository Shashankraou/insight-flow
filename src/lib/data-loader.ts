import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { Machine, MachineStatus, MachineType } from './data';

const generateSensorData = (base: number, variance: number, length: number) =>
  Array.from({ length }, (_, i) => ({
    name: `T-${length - i}`,
    value: parseFloat((base + (Math.random() - 0.5) * variance).toFixed(2)),
  }));

const getMachineType = (type: string): MachineType => {
  if (type === 'L') return 'Low';
  if (type === 'M') return 'Medium';
  if (type === 'H') return 'High';
  return 'Low';
};

const getMachineStatus = (failure: string): MachineStatus => {
  if (failure === '1') return 'Failure imminent';
  // Add some logic for 'Warning' status, for now, let's make it random
  if (Math.random() > 0.8) return 'Warning';
  return 'Operational';
};

const getRiskScore = (status: MachineStatus): number => {
  if (status === 'Failure imminent') return Math.floor(Math.random() * 21) + 80; // 80-100
  if (status === 'Warning') return Math.floor(Math.random() * 41) + 40; // 40-80
  return Math.floor(Math.random() * 40); // 0-39
};

export const loadMachinesData = (): Machine[] => {
  const csvFilePath = path.join(process.cwd(), 'src/lib/raw-data.csv');
  const csvFileContent = fs.readFileSync(csvFilePath, 'utf8');

  const parsedData = Papa.parse(csvFileContent, {
    header: true,
    skipEmptyLines: true,
  });

  const machines: Machine[] = parsedData.data.map((row: any) => {
    const status = getMachineStatus(row['Machine failure']);
    const machine: Machine = {
      id: row['Product ID'],
      name: `Machine ${row['Product ID']}`,
      type: getMachineType(row['Type']),
      status: status,
      riskScore: getRiskScore(status),
      sensors: {
        temperature: generateSensorData(parseFloat(row['Process temperature [K]']), 5, 20),
        torque: generateSensorData(parseFloat(row['Torque [Nm]']), 10, 20),
        rotation: generateSensorData(parseFloat(row['Rotational speed [rpm]']), 100, 20),
        wear: generateSensorData(parseFloat(row['Tool wear [min]']), 20, 20),
      },
      featureImportances: { 'Torque [Nm]': 0.45, 'Rotational speed [rpm]': 0.25, 'Tool wear [min]': 0.15, 'Process temperature [K]': 0.1, 'Air temperature [K]': 0.05 },
    };
    return machine;
  });

  return machines;
};

export type MachineStatus = 'Operational' | 'Warning' | 'Failure imminent';

const generateSensorData = (base: number, variance: number, length: number) =>
  Array.from({ length }, (_, i) => ({
    name: `T-${length - i}`,
    value: parseFloat((base + (Math.random() - 0.5) * variance).toFixed(2)),
  }));

const machineTypes = ['Low', 'Medium', 'High'] as const;
export type MachineType = (typeof machineTypes)[number];

const machineStatuses = ['Operational', 'Warning', 'Failure imminent'] as const;

export type Machine = {
  id: string;
  name: string;
  type: MachineType;
  status: MachineStatus;
  riskScore: number;
  sensors: {
    temperature: { name: string, value: number }[];
    torque: { name: string, value: number }[];
    rotation: { name: string, value: number }[];
    wear: { name: string, value: number }[];
  };
  featureImportances: Record<string, number>;
};

export const machines: Machine[] = [
  {
    id: 'M14860',
    name: 'CNC Mill 3A',
    type: 'Low',
    status: 'Operational',
    riskScore: 12,
    sensors: {
      temperature: generateSensorData(301.6, 2, 20),
      torque: generateSensorData(42.8, 5, 20),
      rotation: generateSensorData(1551, 50, 20),
      wear: generateSensorData(0, 5, 20)
    },
    featureImportances: { 'Torque [Nm]': 0.45, 'Rotational speed [rpm]': 0.25, 'Tool wear [min]': 0.15, 'Process temperature [K]': 0.1, 'Air temperature [K]': 0.05 },
  },
  {
    id: 'L47382',
    name: 'Lathe 1B',
    type: 'Low',
    status: 'Warning',
    riskScore: 68,
    sensors: {
      temperature: generateSensorData(310.2, 5, 20),
      torque: generateSensorData(55.1, 10, 20),
      rotation: generateSensorData(1382, 100, 20),
      wear: generateSensorData(105, 10, 20)
    },
    featureImportances: { 'Tool wear [min]': 0.60, 'Torque [Nm]': 0.20, 'Process temperature [K]': 0.12, 'Rotational speed [rpm]': 0.05, 'Air temperature [K]': 0.03 },
  },
  {
    id: 'H32981',
    name: 'Grinder 5',
    type: 'High',
    status: 'Operational',
    riskScore: 25,
    sensors: {
      temperature: generateSensorData(298.1, 1, 20),
      torque: generateSensorData(39.5, 4, 20),
      rotation: generateSensorData(1408, 30, 20),
      wear: generateSensorData(19, 5, 20)
    },
    featureImportances: { 'Rotational speed [rpm]': 0.35, 'Torque [Nm]': 0.30, 'Process temperature [K]': 0.15, 'Tool wear [min]': 0.15, 'Air temperature [K]': 0.05 },
  },
  {
    id: 'M14861',
    name: 'CNC Mill 3B',
    type: 'Low',
    status: 'Failure imminent',
    riskScore: 92,
    sensors: {
      temperature: generateSensorData(312.5, 6, 20),
      torque: generateSensorData(72.3, 15, 20),
      rotation: generateSensorData(1282, 150, 20),
      wear: generateSensorData(220, 20, 20)
    },
    featureImportances: { 'Rotational speed [rpm]': 0.55, 'Torque [Nm]': 0.30, 'Tool wear [min]': 0.05, 'Process temperature [K]': 0.05, 'Air temperature [K]': 0.05 },
  },
    {
    id: 'L47383',
    name: 'Lathe 1C',
    type: 'Medium',
    status: 'Operational',
    riskScore: 8,
    sensors: {
      temperature: generateSensorData(300.1, 1, 20),
      torque: generateSensorData(35.2, 3, 20),
      rotation: generateSensorData(1602, 20, 20),
      wear: generateSensorData(3, 2, 20)
    },
    featureImportances: { 'Torque [Nm]': 0.40, 'Rotational speed [rpm]': 0.20, 'Tool wear [min]': 0.20, 'Process temperature [K]': 0.15, 'Air temperature [K]': 0.05 },
  },
  {
    id: 'H32982',
    name: 'Grinder 6',
    type: 'High',
    status: 'Warning',
    riskScore: 55,
    sensors: {
      temperature: generateSensorData(305.7, 4, 20),
      torque: generateSensorData(50.1, 8, 20),
      rotation: generateSensorData(1450, 80, 20),
      wear: generateSensorData(80, 15, 20)
    },
    featureImportances: { 'Process temperature [K]': 0.50, 'Tool wear [min]': 0.25, 'Torque [Nm]': 0.15, 'Rotational speed [rpm]': 0.08, 'Air temperature [K]': 0.02 },
  },
  {
    id: 'M14862',
    name: 'CNC Mill 4A',
    type: 'Medium',
    status: 'Operational',
    riskScore: 18,
    sensors: {
      temperature: generateSensorData(302.4, 2, 20),
      torque: generateSensorData(45.9, 5, 20),
      rotation: generateSensorData(1500, 40, 20),
      wear: generateSensorData(14, 5, 20)
    },
    featureImportances: { 'Torque [Nm]': 0.38, 'Rotational speed [rpm]': 0.28, 'Tool wear [min]': 0.18, 'Process temperature [K]': 0.12, 'Air temperature [K]': 0.04 },
  },
  {
    id: 'L47384',
    name: 'Lathe 2A',
    type: 'Low',
    status: 'Operational',
    riskScore: 5,
    sensors: {
      temperature: generateSensorData(299.5, 1, 20),
      torque: generateSensorData(33.4, 2, 20),
      rotation: generateSensorData(1750, 25, 20),
      wear: generateSensorData(5, 1, 20)
    },
    featureImportances: { 'Rotational speed [rpm]': 0.42, 'Torque [Nm]': 0.32, 'Process temperature [K]': 0.10, 'Tool wear [min]': 0.10, 'Air temperature [K]': 0.06 },
  },
];

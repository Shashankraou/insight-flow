export type MachineStatus = 'Operational' | 'Warning' | 'Failure imminent';

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

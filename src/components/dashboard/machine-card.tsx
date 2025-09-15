import type { Machine } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "./status-badge";
import { SensorChart } from "./sensor-chart";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Thermometer, Gauge, Drill, Settings2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MachineCardProps = {
  machine: Machine;
};

export function MachineCard({ machine }: MachineCardProps) {
  const riskColor =
    machine.riskScore > 80
      ? "text-destructive"
      : machine.riskScore > 50
      ? "text-yellow-500"
      : "text-primary";
  
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
            <div>
                <CardTitle>{machine.name}</CardTitle>
                <CardDescription>Type: {machine.type}</CardDescription>
            </div>
            <StatusBadge status={machine.status} />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
            <div>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Risk Score</span>
                    <span className={`text-sm font-bold ${riskColor}`}>{machine.riskScore}%</span>
                </div>
                <Progress value={machine.riskScore} />
            </div>
            <div>
                <h4 className="text-sm font-medium mb-2">Live Sensor Data</h4>
                 <Tabs defaultValue="temperature" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 h-9">
                    <TabsTrigger value="temperature" className="p-1.5"><Thermometer className="w-4 h-4" /></TabsTrigger>
                    <TabsTrigger value="torque" className="p-1.5"><Gauge className="w-4 h-4"/></TabsTrigger>
                    <TabsTrigger value="rotation" className="p-1.5"><Settings2 className="w-4 h-4" /></TabsTrigger>
                    <TabsTrigger value="wear" className="p-1.5"><Drill className="w-4 h-4" /></TabsTrigger>
                  </TabsList>
                  <TabsContent value="temperature">
                    <SensorChart data={machine.sensors.temperature} color="hsl(var(--chart-2))" />
                  </TabsContent>
                  <TabsContent value="torque">
                    <SensorChart data={machine.sensors.torque} color="hsl(var(--chart-3))"/>
                  </TabsContent>
                  <TabsContent value="rotation">
                    <SensorChart data={machine.sensors.rotation} color="hsl(var(--chart-4))" />
                  </TabsContent>
                  <TabsContent value="wear">
                    <SensorChart data={machine.sensors.wear} color="hsl(var(--chart-5))"/>
                  </TabsContent>
                </Tabs>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/analysis/failure-root-cause?machine=${machine.id}`}>
            Analyze Failure <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

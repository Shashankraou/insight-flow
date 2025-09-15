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
import { ArrowRight } from "lucide-react";

type MachineCardProps = {
  machine: Machine;
};

export function MachineCard({ machine }: MachineCardProps) {
  let progressColor = "bg-green-500";
  if (machine.riskScore > 80) {
    progressColor = "bg-destructive";
  } else if (machine.riskScore > 50) {
    progressColor = "bg-yellow-500";
  }
  
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
                    <span className="text-sm font-bold">{machine.riskScore}%</span>
                </div>
                <Progress value={machine.riskScore} indicatorClassName={progressColor} />
            </div>
            <div>
                <h4 className="text-sm font-medium mb-2">Live Sensor Data</h4>
                <SensorChart data={machine.sensors.temperature} />
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href="#">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

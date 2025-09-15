'use client';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type SensorChartProps = {
  data: { name: string; value: number }[];
};

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function SensorChart({ data }: SensorChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-24 w-full">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: -20,
          right: 10,
          top: 5,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={() => ""}
        />
         <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickCount={3}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="value"
          type="natural"
          fill="var(--color-value)"
          fillOpacity={0.4}
          stroke="var(--color-value)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}

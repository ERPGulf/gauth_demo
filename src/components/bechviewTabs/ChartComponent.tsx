import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Metrics } from "@/types/metrics-types";

const ChartComponent: React.FC<Metrics> = ({
  title,
  description,
  data,
  unit,
}) => {
  const chartConfig: ChartConfig = {
    y: {
      label: "y",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className="w-100 h-fit">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription> {description}</CardDescription>
        <CardDescription>Unit : {unit}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={data} margin={{ left: 1, right: 12 }}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis dataKey="x" tickLine={false} tickMargin={8} />
            <YAxis dataKey="y" tickLine={false} tickMargin={6} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="y"
              type="natural"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-1))"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartComponent;

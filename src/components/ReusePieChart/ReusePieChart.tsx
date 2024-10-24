import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartData = {
  [key: string]: number;
};

interface ReusablePieChartProps {
  data: ChartData;
  title: string;
  description?: string;
  leftFooterText?: string;
  rightFooterText?: string;
}

const chartColors = [
  "hsl(221.2, 83.2%, 53.3%)",
  "hsl(212, 95%, 68%)",
  "hsl(216, 92%, 60%)",
  "hsl(210, 98%, 78%)",
  "hsl(212, 97%, 87%)",
  "#c4b5fd",
  "#a5b4fc",
];

const ReusablePieChart = ({
  data,
  title,
  description,
  leftFooterText,
  rightFooterText,
}: ReusablePieChartProps) => {
  const chartData = React.useMemo(
    () =>
      Object.entries(data).map(([name, value]) => ({
        name,
        value: Math.round(value * 100) / 100, // round to 2 decimal places
      })),
    [data]
  );

  // get largest value
  const largestValue = React.useMemo(() => {
    const maxEntry = chartData.reduce(
      (max, current) => (current.value > max.value ? current : max),
      chartData[0]
    );
    return { value: maxEntry.value, name: maxEntry.name };
  }, [chartData]);

  // map color
  const chartConfig = React.useMemo(
    () =>
      Object.fromEntries(
        Object.keys(data).map((key, index) => [
          key.toLowerCase(),
          {
            label: key,
            color: chartColors[index % chartColors.length],
          },
        ])
      ),
    [data]
  ) as ChartConfig;

  return (
    <Card className="flex flex-col h-full shadow-sm">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      {(largestValue !== undefined || leftFooterText || rightFooterText) && (
        <CardFooter className="flex-col gap-2 text-sm">
          {largestValue !== undefined && (
            <div className="font-medium text-center">
              {leftFooterText} <b>{largestValue.name}</b> {rightFooterText}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ReusablePieChart;

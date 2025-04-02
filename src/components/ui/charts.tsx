
import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  Line,
  Pie,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

interface ChartProps {
  data: Array<Record<string, any>>;
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export const BarChart = ({
  data,
  index,
  categories,
  colors = ["#2563eb"],
  valueFormatter = (value: number) => `${value}`,
  className,
}: ChartProps) => {
  return (
    <ChartContainer className={className} config={{}}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={index} />
        <YAxis tickFormatter={valueFormatter} />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload) return null;
            return (
              <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid grid-cols-2 gap-2">
                  {payload.map((entry) => (
                    <div key={entry.dataKey} className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        {entry.name}
                      </span>
                      <span className="text-sm font-bold">
                        {valueFormatter(entry.value as number)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        />
        <Legend />
        {categories.map((category, index) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[index % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
};

export const LineChart = ({
  data,
  index,
  categories,
  colors = ["#2563eb"],
  valueFormatter = (value: number) => `${value}`,
  className,
}: ChartProps) => {
  return (
    <ChartContainer className={className} config={{}}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={index} />
        <YAxis tickFormatter={valueFormatter} />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload) return null;
            return (
              <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid grid-cols-2 gap-2">
                  {payload.map((entry) => (
                    <div key={entry.dataKey} className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        {entry.name}
                      </span>
                      <span className="text-sm font-bold">
                        {valueFormatter(entry.value as number)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        />
        <Legend />
        {categories.map((category, index) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[index % colors.length]}
            activeDot={{ r: 8 }}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
};

export const PieChart = ({
  data,
  index,
  categories,
  colors = ["#2563eb", "#7c3aed", "#4f46e5", "#0ea5e9", "#06b6d4"],
  valueFormatter = (value: number) => `${value}`,
  className,
}: ChartProps) => {
  const categoryKey = categories[0]; // Pie charts typically use just one category

  return (
    <ChartContainer className={className} config={{}}>
      <RechartsPieChart>
        <Pie
          data={data}
          nameKey={index}
          dataKey={categoryKey}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]} 
            />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload || !payload[0]) return null;
            const data = payload[0];
            return (
              <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    {data.name}
                  </span>
                  <span className="text-sm font-bold">
                    {valueFormatter(data.value as number)}
                  </span>
                </div>
              </div>
            );
          }}
        />
        <Legend />
      </RechartsPieChart>
    </ChartContainer>
  );
};

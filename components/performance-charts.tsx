"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Strategy } from "@/lib/strategy-data";

interface PerformanceChartsProps {
  strategies: Strategy[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mt-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">{entry.name}:</span>
            <span className="text-sm font-medium text-gray-900">
              {entry.value.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function PerformanceCharts({ strategies }: PerformanceChartsProps) {
  const chartData =
    strategies[0]?.data.map((_, index) => {
      const point: any = { date: strategies[0].data[index].date };
      strategies.forEach((strategy) => {
        point[strategy.name] = strategy.data[index].value;
      });
      return point;
    }) || [];

  // Calculate total returns for pie chart
  const pieData = strategies.map((strategy) => ({
    name: strategy.name,
    value:
      strategy.data[strategy.data.length - 1].value - strategy.data[0].value,
    color: strategy.color,
  }));

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Strategy Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {strategies.map((strategy) => (
                  <Line
                    key={strategy.name}
                    type="monotone"
                    dataKey={strategy.name}
                    stroke={strategy.color}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white/50 backdrop-blur-sm border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">
            Total Returns Distribution
          </CardTitle>
          <p className="text-sm text-gray-500">Strategy Contribution</p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{
                    paddingTop: "20px",
                  }}
                />
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const data = [
  { metric: "Alpha", value: 0.05, fullMark: 0.1 },
  { metric: "Beta", value: 1.2, fullMark: 2 },
  { metric: "Sharpe", value: 1.1, fullMark: 2 },
  { metric: "Sortino", value: 1.3, fullMark: 2 },
];

export function StrategyAChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis />
          <Radar
            name="Strategy A"
            dataKey="value"
            stroke="hsl(222.2 47.4% 55.2%)"
            fill="hsl(222.2 47.4% 55.2%)"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

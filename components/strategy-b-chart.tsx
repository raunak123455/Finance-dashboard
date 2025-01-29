"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Simulated monthly data showing growth with max drawdown period
const data = Array.from({ length: 24 }, (_, i) => {
  const month = i + 1;
  // Simulate 8% CAGR with a 15% drawdown between months 8-14
  let value = 100 * Math.pow(1 + 0.08, i / 12);
  if (i >= 8 && i <= 14) {
    value = value * (1 - 0.15);
  }
  return {
    month: `M${month}`,
    value: Math.round(value * 100) / 100,
  };
});

export function StrategyBChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(222.2 47.4% 55.2%)"
            fill="hsl(222.2 47.4% 55.2%)"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

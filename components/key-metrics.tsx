"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type TimeFrame = "monthly" | "yearly";

interface MetricsData {
  totalReturns: {
    value: number;
    change: number;
    trend: "up" | "down";
    chartData: number[];
  };
  riskMetrics: {
    value: number;
    change: number;
    trend: "up" | "down";
  };
  annualGrowth: {
    value: number;
    change: number;
    trend: "up" | "down";
  };
}

interface KeyMetricsProps {
  timeFrame: TimeFrame;
  customData?: MetricsData;
  isLoading?: boolean;
}

export function KeyMetrics({
  timeFrame = "monthly",
  customData,
  isLoading = false,
}: KeyMetricsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 bg-white rounded-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
            <div className="h-8 bg-gray-200 rounded w-32 mb-4" />
            <div className="h-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!customData) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="p-6 bg-white rounded-lg">
        <div className="mb-4">
          <h3 className="text-sm text-[#323842]">Total Returns</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl font-semibold">
              ${customData.totalReturns.value.toLocaleString()}
            </span>
            <span
              className={`flex items-center text-sm ${
                customData.totalReturns.trend === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {customData.totalReturns.trend === "up" ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              {customData.totalReturns.change}%
            </span>
          </div>
        </div>
        <div className="h-16 flex items-end gap-1">
          {customData.totalReturns.chartData.map((height, index) => (
            <div
              key={index}
              className="w-4 bg-[#5568c4] rounded"
              style={{ height: `${height * 4}px` }}
            />
          ))}
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg">
        <div className="mb-4">
          <h3 className="text-sm text-[#323842]">Risk Metrics</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl font-semibold">
              {customData.riskMetrics.value}
            </span>
            <span
              className={`flex items-center text-sm ${
                customData.riskMetrics.trend === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {customData.riskMetrics.trend === "up" ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              {customData.riskMetrics.change}%
            </span>
          </div>
        </div>
        <div className="h-16 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-[#c6d7ff]" />
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg">
        <div className="mb-4">
          <h3 className="text-sm text-[#323842]">Annual Growth</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl font-semibold">
              ${customData.annualGrowth.value.toLocaleString()}
            </span>
            <span
              className={`flex items-center text-sm ${
                customData.annualGrowth.trend === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {customData.annualGrowth.trend === "up" ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              {customData.annualGrowth.change}%
            </span>
          </div>
        </div>
        <div className="h-16 flex items-end">
          <svg
            viewBox="0 0 100 40"
            className={`w-full h-full ${
              customData.annualGrowth.trend === "up"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            <path
              d="M0 20 Q 25 40, 50 20 T 100 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

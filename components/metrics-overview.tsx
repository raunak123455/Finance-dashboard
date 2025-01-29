"use client";

import { KeyMetrics } from "@/components/key-metrics";
import { DataFiltering } from "@/components/data-filtering";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface MetricsData {
  date: string;
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

export function MetricsOverview() {
  const [timeFrame, setTimeFrame] = useState<"monthly" | "yearly">("monthly");
  const [metricsData, setMetricsData] = useState<
    MetricsData | MetricsData[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async (params: {
    timeFrame?: string;
    start?: Date;
    end?: Date;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      let url = "http://localhost:5000/api/metrics";
      const queryParams = new URLSearchParams();

      if (params.timeFrame) {
        queryParams.append("timeFrame", params.timeFrame);
      }
      if (params.start) {
        queryParams.append("start", params.start.toISOString());
      }
      if (params.end) {
        queryParams.append("end", params.end.toISOString());
      }

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch metrics data");
      }
      const data = await response.json();
      setMetricsData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch metrics data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics({ timeFrame });
  }, [timeFrame]);

  const handleTimeFrameChange = (newTimeFrame: "monthly" | "yearly") => {
    setTimeFrame(newTimeFrame);
  };

  const handleDateRangeChange = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    if (startDate && endDate) {
      fetchMetrics({ start: startDate, end: endDate });
    }
  };

  // Get the latest metrics for display
  const displayMetrics = Array.isArray(metricsData)
    ? metricsData[0]
    : metricsData;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#171a1f] mb-4">
          Key Metrics Overview
        </h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <div className="flex gap-2 mb-6">
          <Button
            variant={timeFrame === "monthly" ? "default" : "ghost"}
            size="sm"
            className={timeFrame === "monthly" ? "bg-[#5568c4]" : ""}
            onClick={() => handleTimeFrameChange("monthly")}
            disabled={isLoading}
          >
            30 days
          </Button>
          <Button
            variant={timeFrame === "yearly" ? "default" : "ghost"}
            size="sm"
            className={timeFrame === "yearly" ? "bg-[#5568c4]" : ""}
            onClick={() => handleTimeFrameChange("yearly")}
            disabled={isLoading}
          >
            12 month
          </Button>
        </div>
        {displayMetrics && (
          <KeyMetrics timeFrame={timeFrame} customData={displayMetrics} />
        )}
      </div>
      <h2 className="text-2xl font-semibold text-[#171a1f] my-8">
        Data Filtering and Sorting
      </h2>
      <DataFiltering
        onDateRangeChange={handleDateRangeChange}
        isLoading={isLoading}
      />
    </div>
  );
}

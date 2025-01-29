"use client";

import { NavBar } from "@/components/nav-bar";
import { KeyMetrics } from "@/components/key-metrics";
import { DataFiltering } from "@/components/data-filtering";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

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

export default function MetricsPage() {
  const [timeFrame, setTimeFrame] = useState<"monthly" | "yearly">("monthly");
  const [metricsData, setMetricsData] = useState<MetricsData | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async (
    timeFrame: "monthly" | "yearly",
    startDate?: Date,
    endDate?: Date
  ) => {
    try {
      setIsLoading(true);
      let url = `http://localhost:5000/api/metrics?timeFrame=${timeFrame}`;
      if (startDate && endDate) {
        url += `&start=${startDate.toISOString()}&end=${endDate.toISOString()}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch metrics data");
      }
      const data = await response.json();
      setMetricsData(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching metrics:", err);
      setError("Failed to fetch metrics data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics(timeFrame);
  }, [timeFrame]);

  const handleTimeFrameChange = (newTimeFrame: "monthly" | "yearly") => {
    setTimeFrame(newTimeFrame);
  };

  const handleDateRangeChange = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    if (startDate && endDate) {
      const daysDiff = Math.floor(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const newTimeFrame = daysDiff <= 31 ? "monthly" : "yearly";
      setTimeFrame(newTimeFrame);
      fetchMetrics(newTimeFrame, startDate, endDate);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto py-8 px-4">
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
          <KeyMetrics
            timeFrame={timeFrame}
            customData={metricsData}
            isLoading={isLoading}
          />
        </div>
        <h2 className="text-2xl font-semibold text-[#171a1f] my-8">
          Data Filtering and Sorting
        </h2>
        <DataFiltering
          onDateRangeChange={handleDateRangeChange}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
}

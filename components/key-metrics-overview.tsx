"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bar, Doughnut } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { DataFiltering } from "@/components/data-filtering";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface KeyMetricsData {
  totalPortfolioValue: {
    value: number;
    trend: "up" | "down";
    historicalData: Array<{ month: string; value: number }>;
  };
  dailyPnL: {
    value: number;
    percentageChange: number;
    trend: "up" | "down";
    historicalData: Array<{ month: string; value: number }>;
  };
  winRate: {
    value: number;
    trend: "up" | "down";
    distribution: {
      wins: number;
      losses: number;
    };
    historicalData: Array<{ month: string; value: number }>;
  };
}

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: "75%",
};

export function KeyMetricsOverview() {
  const [metricsData, setMetricsData] = useState<KeyMetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  const fetchMetricsData = async (startDate?: Date, endDate?: Date) => {
    try {
      let url = "http://localhost:5000/api/key-metrics";
      if (startDate && endDate) {
        url += `?start=${startDate.toISOString()}&end=${endDate.toISOString()}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch metrics");
      }
      const data = await response.json();
      setMetricsData(data);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetricsData();
  }, []);

  const handleDateRangeChange = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    setDateRange({ start: startDate, end: endDate });
    if (startDate && endDate) {
      fetchMetricsData(startDate, endDate);
    }
  };

  if (loading) {
    return <div>Loading metrics...</div>;
  }

  if (!metricsData) {
    return <div>No metrics data available</div>;
  }

  const portfolioBarData = {
    labels: metricsData.totalPortfolioValue.historicalData.map((d) => d.month),
    datasets: [
      {
        data: metricsData.totalPortfolioValue.historicalData.map(
          (d) => d.value
        ),
        backgroundColor: "#5568c4",
      },
    ],
  };

  const pnlBarData = {
    labels: metricsData.dailyPnL.historicalData.map((d) => d.month),
    datasets: [
      {
        data: metricsData.dailyPnL.historicalData.map((d) => d.value),
        backgroundColor: "#5568c4",
      },
    ],
  };

  const winRateData = {
    datasets: [
      {
        data: [
          metricsData.winRate.distribution.wins,
          metricsData.winRate.distribution.losses,
        ],
        backgroundColor: ["#5568c4", "#ccd1ed"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-500">Total Portfolio Value</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold">
                  ${metricsData.totalPortfolioValue.value.toLocaleString()}
                </h3>
                <span
                  className={
                    metricsData.totalPortfolioValue.trend === "up"
                      ? "text-[#14923e]"
                      : "text-red-500"
                  }
                >
                  {metricsData.totalPortfolioValue.trend === "up" ? "↑" : "↓"}
                </span>
              </div>
            </div>
            <div className="h-24">
              <Bar options={barOptions} data={portfolioBarData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-500">Daily P&L</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold">
                  ${metricsData.dailyPnL.value.toLocaleString()}
                </h3>
                <span
                  className={
                    metricsData.dailyPnL.trend === "up"
                      ? "text-[#14923e]"
                      : "text-red-500"
                  }
                >
                  {metricsData.dailyPnL.trend === "up" ? "↑" : "↓"}{" "}
                  {metricsData.dailyPnL.percentageChange}%
                </span>
              </div>
            </div>
            <div className="h-24">
              <Bar options={barOptions} data={pnlBarData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-500">Win Rate</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold">
                  {metricsData.winRate.value}%
                </h3>
                <span
                  className={
                    metricsData.winRate.trend === "up"
                      ? "text-[#14923e]"
                      : "text-red-500"
                  }
                >
                  {metricsData.winRate.trend === "up" ? "↑" : "↓"}
                </span>
              </div>
            </div>
            <div className="h-24">
              <Doughnut options={doughnutOptions} data={winRateData} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-[#171a1f] mb-6">
          Data Filtering and Sorting
        </h2>
        <DataFiltering onDateRangeChange={handleDateRangeChange} />
      </div>
    </div>
  );
}

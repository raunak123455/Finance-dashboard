"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      align: "start" as const,
      labels: {
        boxWidth: 8,
        usePointStyle: true,
        padding: 15,
      },
    },
    tooltip: {
      mode: "index" as const,
      intersect: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        maxRotation: 45,
        minRotation: 45,
        font: {
          size: 11,
        },
      },
    },
    y: {
      grid: {
        color: "#f3f4f6",
      },
      ticks: {
        callback: function (value: any) {
          return "$" + value.toLocaleString();
        },
        font: {
          size: 11,
        },
      },
    },
  },
  interaction: {
    mode: "nearest" as const,
    axis: "x" as const,
    intersect: false,
  },
};

// Keeping the sample data as fallback
const sampleMonthlyData = {
  labels: ["1", "5", "10", "15", "20", "25", "30"],
  datasets: [
    {
      label: "Stocks",
      data: [65000, 67000, 72000, 71000, 74000, 75000, 78000],
      borderColor: "#5568c4",
      tension: 0.4,
    },
    {
      label: "Bonds",
      data: [40000, 41000, 42000, 43000, 42500, 43500, 44000],
      borderColor: "#213cd1",
      tension: 0.4,
    },
    {
      label: "Real Estate",
      data: [25000, 26000, 27000, 28000, 27500, 29000, 30000],
      borderColor: "#e4b122",
      tension: 0.4,
    },
    {
      label: "Cash",
      data: [10000, 10200, 10400, 10600, 10800, 11000, 11200],
      borderColor: "#c6d7ff",
      tension: 0.4,
    },
  ],
};

const sampleYearlyData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Stocks",
      data: [
        65000, 68000, 72000, 75000, 78000, 82000, 85000, 88000, 92000, 95000,
        98000, 102000,
      ],
      borderColor: "#5568c4",
      tension: 0.4,
    },
    {
      label: "Bonds",
      data: [
        40000, 41000, 42000, 43000, 44000, 45000, 46000, 47000, 48000, 49000,
        50000, 51000,
      ],
      borderColor: "#213cd1",
      tension: 0.4,
    },
    {
      label: "Real Estate",
      data: [
        25000, 26000, 27500, 28000, 29000, 30000, 31000, 32000, 33000, 34000,
        35000, 36000,
      ],
      borderColor: "#e4b122",
      tension: 0.4,
    },
    {
      label: "Cash",
      data: [
        10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000, 14500,
        15000, 15500,
      ],
      borderColor: "#c6d7ff",
      tension: 0.4,
    },
  ],
};

interface PortfolioData {
  timeFrame: "monthly" | "yearly";
  data: {
    date: string;
    stocks: number;
    bonds: number;
    realEstate: number;
    cash: number;
  }[];
}

const exportToExcel = (chartData: any) => {
  const workbook = XLSX.utils.book_new();

  // Prepare data for export
  const exportData = chartData.labels.map((label: string, index: number) => {
    const dataPoint: any = {
      Date: label,
    };
    chartData.datasets.forEach((dataset: any) => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    return dataPoint;
  });

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Add summary statistics
  const summary = [
    [],
    ["Asset Class Summary"],
    ["Asset", "Latest Value", "Change from Start"],
    ...chartData.datasets.map((dataset: any) => [
      dataset.label,
      dataset.data[dataset.data.length - 1],
      (
        ((dataset.data[dataset.data.length - 1] - dataset.data[0]) /
          dataset.data[0]) *
        100
      ).toFixed(2) + "%",
    ]),
  ];

  // Add summary to worksheet
  XLSX.utils.sheet_add_aoa(worksheet, summary, {
    origin: `A${exportData.length + 2}`,
  });

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Portfolio Growth");

  // Save the file
  XLSX.writeFile(workbook, "portfolio_growth_report.xlsx");
};

export function PortfolioGrowth() {
  const [timeFrame, setTimeFrame] = useState<"monthly" | "yearly">("yearly");
  const [chartData, setChartData] = useState(sampleYearlyData);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/portfolio-growth?timeFrame=${timeFrame}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const portfolioData = data[0];
          const formattedData = {
            labels: portfolioData.data.map((d: any) => d.date),
            datasets: [
              {
                label: "Stocks",
                data: portfolioData.data.map((d: any) => d.stocks),
                borderColor: "#5568c4",
                tension: 0.4,
              },
              {
                label: "Bonds",
                data: portfolioData.data.map((d: any) => d.bonds),
                borderColor: "#213cd1",
                tension: 0.4,
              },
              {
                label: "Real Estate",
                data: portfolioData.data.map((d: any) => d.realEstate),
                borderColor: "#e4b122",
                tension: 0.4,
              },
              {
                label: "Cash",
                data: portfolioData.data.map((d: any) => d.cash),
                borderColor: "#c6d7ff",
                tension: 0.4,
              },
            ],
          };
          setChartData(formattedData);
        } else {
          // Use sample data as fallback
          setChartData(
            timeFrame === "yearly" ? sampleYearlyData : sampleMonthlyData
          );
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        // Use sample data as fallback
        setChartData(
          timeFrame === "yearly" ? sampleYearlyData : sampleMonthlyData
        );
      }
    };

    fetchPortfolioData();
  }, [timeFrame]);

  const handleExport = () => {
    if (chartData) {
      exportToExcel(chartData);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-lg sm:text-xl font-semibold text-[#171a1f]">
          Portfolio Growth by Asset Class
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleExport}
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <Button
          variant={timeFrame === "yearly" ? "default" : "ghost"}
          size="sm"
          className={timeFrame === "yearly" ? "bg-[#5568c4]" : ""}
          onClick={() => setTimeFrame("yearly")}
        >
          12 month
        </Button>
        <Button
          variant={timeFrame === "monthly" ? "default" : "ghost"}
          size="sm"
          className={timeFrame === "monthly" ? "bg-[#5568c4]" : ""}
          onClick={() => setTimeFrame("monthly")}
        >
          30 days
        </Button>
      </div>
      <div className="h-[250px] sm:h-[300px] w-full">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}

"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";
import * as XLSX from "xlsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Stocks", "Bonds", "Real Estate", "Cash"],
  datasets: [
    {
      data: [40, 30, 20, 10],
      backgroundColor: ["#5568c4", "#213cd1", "#e4b122", "#c6d7ff"],
      borderWidth: 0,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
  },
  cutout: "70%",
};

export function AssetAllocation() {
  const handleExport = () => {
    // Prepare data for Excel
    const excelData = data.labels.map((label, index) => ({
      "Asset Class": label,
      "Allocation (%)": data.datasets[0].data[index],
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Asset Allocation");

    // Save file
    XLSX.writeFile(wb, "asset_allocation.xlsx");
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#171a1f]">
          Asset Class Allocation
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
      <div className="h-[300px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

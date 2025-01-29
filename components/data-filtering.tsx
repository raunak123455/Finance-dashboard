"use client";

import { Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

interface DataFilteringProps {
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
  isLoading?: boolean;
}

const performanceCriteria = [
  { value: "returns", label: "Total Returns" },
  { value: "risk", label: "Risk Level" },
  { value: "growth", label: "Growth Rate" },
  { value: "volatility", label: "Market Volatility" },
  { value: "trend", label: "Trend Direction" },
  { value: "performance", label: "Overall Performance" },
  { value: "comparison", label: "Benchmark Comparison" },
  { value: "momentum", label: "Market Momentum" },
];

export function DataFiltering({
  onDateRangeChange,
  isLoading,
}: DataFilteringProps) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [selectedCriteria, setSelectedCriteria] = useState<string>("");
  const [startDate, endDate] = dateRange;

  const handleDateChange = (update: [Date | null, Date | null]) => {
    setDateRange(update);
  };

  const handleApply = () => {
    onDateRangeChange(startDate, endDate);
  };

  const handleCriteriaChange = (value: string) => {
    setSelectedCriteria(value);
    // Here you can add logic to filter based on the selected criteria
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 z-10" />
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
              className="w-full pl-10 bg-white rounded-md border border-input h-10 text-sm text-[#171a1f]"
              placeholderText="Select Date Range"
              dateFormat="MMM d, yyyy"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleApply}
            disabled={isLoading}
          >
            Apply
          </Button>
        </div>
        {/* <div className="h-2 bg-[#ccd1ed] rounded-full">
          <div className="h-full w-2/4 bg-[#5568c4] rounded-full" />
        </div> */}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 z-10" />
            <Select
              value={selectedCriteria}
              onValueChange={handleCriteriaChange}
            >
              <SelectTrigger className="w-full pl-10">
                <SelectValue placeholder="Select Performance Criteria" />
              </SelectTrigger>
              <SelectContent>
                {performanceCriteria.map((criteria) => (
                  <SelectItem key={criteria.value} value={criteria.value}>
                    {criteria.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCriteriaChange(selectedCriteria)}
            disabled={isLoading}
          >
            Apply
          </Button>
        </div>
        {/* <div className="h-2 bg-[#ccd1ed] rounded-full">
          <div className="h-full w-1/2 bg-[#5568c4] rounded-full" />
        </div> */}
      </div>
    </div>
  );
}

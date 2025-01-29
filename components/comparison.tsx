"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchStrategies, Strategy } from "@/lib/strategy-data";
import { Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ComparisonChart } from "./comparison-chart";

export default function InvestmentAnalyzer() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [selectedStrategies, setSelectedStrategies] = useState({
    strategyA: "",
    strategyB: "",
  });
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  const [hasCompared, setHasCompared] = useState(false);

  useEffect(() => {
    const loadStrategies = async () => {
      const data = await fetchStrategies();
      setStrategies(data);
    };
    loadStrategies();
  }, []);

  const handleStrategyChange = (
    value: string,
    type: "strategyA" | "strategyB"
  ) => {
    setSelectedStrategies((prev) => ({
      ...prev,
      [type]: value,
    }));
    setHasCompared(false);
  };

  const handleCompare = () => {
    const strategyA = strategies.find(
      (s) => s.name === selectedStrategies.strategyA
    )!;
    const strategyB = strategies.find(
      (s) => s.name === selectedStrategies.strategyB
    )!;

    const metrics = [
      {
        name: "Sharpe Ratio",
        strategyA: strategyA.metrics.performanceMetrics.sharpeRatio,
        strategyB: strategyB.metrics.performanceMetrics.sharpeRatio,
        description: "Risk-adjusted return measure",
      },
      {
        name: "Sortino Ratio",
        strategyA: strategyA.metrics.performanceMetrics.sortinoRatio,
        strategyB: strategyB.metrics.performanceMetrics.sortinoRatio,
        description: "Downside risk-adjusted return",
      },
      {
        name: "Alpha",
        strategyA: strategyA.metrics.performanceMetrics.alpha,
        strategyB: strategyB.metrics.performanceMetrics.alpha,
        description: "Excess return over benchmark",
      },
      {
        name: "Beta",
        strategyA: strategyA.metrics.performanceMetrics.beta,
        strategyB: strategyB.metrics.performanceMetrics.beta,
        description: "Market sensitivity measure",
      },
      {
        name: "Max Drawdown",
        strategyA: strategyA.metrics.performanceMetrics.maxDrawdown,
        strategyB: strategyB.metrics.performanceMetrics.maxDrawdown,
        description: "Maximum peak-to-trough decline",
      },
      {
        name: "Volatility",
        strategyA: strategyA.metrics.performanceMetrics.volatility,
        strategyB: strategyB.metrics.performanceMetrics.volatility,
        description: "Price variation measure",
      },
    ];

    setComparisonData(metrics);
    setHasCompared(true);
  };

  const getPercentageDifference = (a: number, b: number) => {
    return (((b - a) / a) * 100).toFixed(1);
  };

  const getComparisonIndicator = (row: any) => {
    const isInverse = row.name === "Max Drawdown" || row.name === "Volatility";
    const diff = getPercentageDifference(row.strategyA, row.strategyB);
    const isImproved = isInverse
      ? row.strategyB < row.strategyA
      : row.strategyB > row.strategyA;

    return (
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center ${
            isImproved ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {isImproved ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          )}
          <span className="font-medium">
            {isImproved ? "Better" : "Worse"}
            <span className="ml-1 text-sm">
              ({isImproved ? "+" : ""}
              {diff}%)
            </span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold">
          Investment Strategy Comparison
        </h1>
        <p className="text-gray-500 mt-2">
          Compare performance metrics between different investment strategies
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1fr_auto] gap-4 mb-12">
          <div>
            <Select
              value={selectedStrategies.strategyA}
              onValueChange={(value) =>
                handleStrategyChange(value, "strategyA")
              }
            >
              <SelectTrigger className="w-full bg-[#f3f4f6]">
                <SelectValue placeholder="Select Strategy 1" />
              </SelectTrigger>
              <SelectContent>
                {strategies.map((strategy) => (
                  <SelectItem
                    key={strategy.name}
                    value={strategy.name}
                    className="flex items-center gap-2"
                    disabled={strategy.name === selectedStrategies.strategyB}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: strategy.color }}
                      />
                      {strategy.name} ({strategy.riskLevel} Risk)
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              value={selectedStrategies.strategyB}
              onValueChange={(value) =>
                handleStrategyChange(value, "strategyB")
              }
            >
              <SelectTrigger className="w-full bg-[#f3f4f6]">
                <SelectValue placeholder="Select Strategy 2" />
              </SelectTrigger>
              <SelectContent>
                {strategies.map((strategy) => (
                  <SelectItem
                    key={strategy.name}
                    value={strategy.name}
                    className="flex items-center gap-2"
                    disabled={strategy.name === selectedStrategies.strategyA}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: strategy.color }}
                      />
                      {strategy.name} ({strategy.riskLevel} Risk)
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            className="bg-[#2747dd] hover:bg-[#1e3bb8] px-8"
            disabled={
              !selectedStrategies.strategyA || !selectedStrategies.strategyB
            }
            onClick={handleCompare}
          >
            Compare
          </Button>
        </div>
      </div>

      {hasCompared && (
        <div className="space-y-8 max-w-[1200px] mx-auto">
          <div>
            <h2 className="text-xl font-semibold mb-6 text-center">
              Performance Metrics Comparison
            </h2>
            <ComparisonChart
              data={comparisonData}
              colors={{
                strategyA:
                  strategies.find(
                    (s) => s.name === selectedStrategies.strategyA
                  )?.color || "#000",
                strategyB:
                  strategies.find(
                    (s) => s.name === selectedStrategies.strategyB
                  )?.color || "#000",
              }}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-[200px] font-semibold">
                    Metrics
                  </TableHead>
                  <TableHead className="w-[150px]">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: strategies.find(
                            (s) => s.name === selectedStrategies.strategyA
                          )?.color,
                        }}
                      />
                      {selectedStrategies.strategyA}
                    </div>
                  </TableHead>
                  <TableHead className="w-[150px]">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: strategies.find(
                            (s) => s.name === selectedStrategies.strategyB
                          )?.color,
                        }}
                      />
                      {selectedStrategies.strategyB}
                    </div>
                  </TableHead>
                  <TableHead className="w-[200px]">Comparison</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row) => (
                  <TableRow key={row.name} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">
                      {row.name}
                    </TableCell>
                    <TableCell>
                      <div className="text-base tabular-nums font-medium text-gray-700 text-center">
                        {row.strategyA.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-base tabular-nums font-medium text-gray-700 text-center">
                        {row.strategyB.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>{getComparisonIndicator(row)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {row.description}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Strategy, getStrategyPerformance } from "@/lib/strategy-data";
import { useState } from "react";

interface StrategyPerformanceProps {
  strategies: Strategy[];
}

export function StrategyPerformance({ strategies }: StrategyPerformanceProps) {
  const [selectedStrategy, setSelectedStrategy] = useState<string>(
    strategies[0]?.name || ""
  );
  const currentStrategy = strategies.find(
    (s: Strategy) => s.name === selectedStrategy
  )!;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">Strategy Performance Report</h2>
        <div className="w-[200px]">
          <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
            <SelectTrigger>
              <SelectValue placeholder="Select strategy" />
            </SelectTrigger>
            <SelectContent>
              {strategies.map((strategy: Strategy) => (
                <SelectItem
                  key={strategy.name}
                  value={strategy.name}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: strategy.color }}
                  />
                  {strategy.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {strategies.map((strategy) => {
          const performance = getStrategyPerformance(strategy);
          return (
            <Card key={strategy.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {strategy.name}
                </CardTitle>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: strategy.color }}
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performance.currentValue.toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {strategy.description}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">
                      Total Return:{" "}
                    </span>
                    <span
                      className={
                        performance.totalReturn >= 0
                          ? "text-emerald-500"
                          : "text-red-500"
                      }
                    >
                      {performance.totalReturn >= 0 ? "+" : ""}
                      {performance.totalReturn}%
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">
                      Monthly Change:{" "}
                    </span>
                    <span
                      className={
                        performance.monthlyChange >= 0
                          ? "text-emerald-500"
                          : "text-red-500"
                      }
                    >
                      {performance.monthlyChange >= 0 ? "+" : ""}
                      {performance.monthlyChange}%
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Volatility: </span>
                    <span>{performance.volatility}%</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Risk Level: </span>
                    <span>{strategy.riskLevel}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {currentStrategy && (
        <Card className="mt-6">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Strategy Details</th>
                  <th className="text-left p-4">Risk Level</th>
                  <th className="text-left p-4">Current Value</th>
                  <th className="text-left p-4">Monthly Change</th>
                  <th className="text-left p-4">Performance Rating</th>
                  <th className="text-left p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: currentStrategy.color }}
                      />
                      <span>{currentStrategy.description}</span>
                    </div>
                  </td>
                  <td className="p-4">{currentStrategy.riskLevel}</td>
                  <td className="p-4">
                    {
                      currentStrategy.data[currentStrategy.data.length - 1]
                        .value
                    }
                  </td>
                  <td className="p-4">
                    {
                      currentStrategy.data[currentStrategy.data.length - 1]
                        .change
                    }
                    %
                  </td>
                  <td className="p-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      style={{
                        backgroundColor: currentStrategy.color,
                        color: "white",
                      }}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

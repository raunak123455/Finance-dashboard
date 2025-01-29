"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Strategy } from "@/lib/strategy-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface SimulationToolsProps {
  strategies: Strategy[];
}

export function SimulationTools({ strategies }: SimulationToolsProps) {
  const [selectedStrategy, setSelectedStrategy] = useState<string>("");
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [timeHorizon, setTimeHorizon] = useState(12);
  const [simulationResult, setSimulationResult] = useState<number | null>(null);

  const handleSimulate = () => {
    const strategy = strategies.find((s) => s.name === selectedStrategy);
    if (!strategy) return;

    // Calculate returns based on time horizon
    const monthlyData = strategy.data.slice(0, timeHorizon);
    const returns = monthlyData.reduce(
      (acc, point) => acc * (1 + point.change / 100),
      1
    );
    const projectedValue = investmentAmount * returns;
    setSimulationResult(projectedValue);
  };

  return (
    <div className="flex justify-center px-4">
      <Card className="w-[1000px]">
        <CardHeader>
          <CardTitle>Investment Simulator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Select Strategy
              </label>
              <Select
                value={selectedStrategy}
                onValueChange={setSelectedStrategy}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a strategy" />
                </SelectTrigger>
                <SelectContent>
                  {strategies.map((strategy) => (
                    <SelectItem key={strategy.name} value={strategy.name}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: strategy.color }}
                        />
                        {strategy.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Investment Amount
              </label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[investmentAmount]}
                  onValueChange={(value) => setInvestmentAmount(value[0])}
                  min={1000}
                  max={100000}
                  step={1000}
                  className="flex-1"
                />
                <span className="text-sm font-medium min-w-[100px]">
                  ${investmentAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Time Horizon (months)
              </label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[timeHorizon]}
                  onValueChange={(value) => setTimeHorizon(value[0])}
                  min={1}
                  max={36}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-medium min-w-[100px]">
                  {timeHorizon} months
                </span>
              </div>
            </div>

            <div>
              <Button
                onClick={handleSimulate}
                disabled={!selectedStrategy}
                className="w-full bg-[#213cd1] text-white"
              >
                Run Simulation
              </Button>
            </div>

            {simulationResult !== null && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Simulation Results</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Initial Investment:</span>
                    <span className="font-medium">
                      ${investmentAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Projected Value:</span>
                    <span className="font-medium">
                      ${Math.round(simulationResult).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Return:</span>
                    <span
                      className={`font-medium ${
                        simulationResult > investmentAmount
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {(
                        ((simulationResult - investmentAmount) /
                          investmentAmount) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

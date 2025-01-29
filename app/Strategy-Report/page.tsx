"use client";

import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { StrategyPerformance } from "@/components/strategy-performance";
import { PerformanceCharts } from "@/components/performance-charts";
import { SimulationTools } from "@/components/simulation-tools";
import { fetchStrategies, Strategy } from "@/lib/strategy-data";
import { useEffect, useState } from "react";
import InvestmentAnalyzer from "@/components/comparison";

export default function StrategyReportPage() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);

  useEffect(() => {
    const loadStrategies = async () => {
      const data = await fetchStrategies();
      setStrategies(data);
    };
    loadStrategies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#171a1f] mb-6">
            Strategy Report
          </h1>
          <StrategyPerformance strategies={strategies} />
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#171a1f] mb-6">
            Performance Analysis
          </h2>
          <PerformanceCharts strategies={strategies} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-[#171a1f] mb-6">
            Strategy Simulation
          </h2>
          <SimulationTools strategies={strategies} />
          <InvestmentAnalyzer />
        </div>
      </main>
      <Footer />
    </div>
  );
}

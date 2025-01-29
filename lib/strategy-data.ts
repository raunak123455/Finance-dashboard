interface StrategyDataPoint {
  date: string;
  value: number;
  change: number;
}

interface StrategyMetrics {
  monthlyRevenue: number;
  monthlyRevenueChange: number;
  newUsers: number;
  newUsersChange: number;
  customerSatisfaction: number;
  customerSatisfactionPercentage: number;
  performanceMetrics: {
    sharpeRatio: number;
    sortinoRatio: number;
    alpha: number;
    beta: number;
    maxDrawdown: number;
    volatility: number;
  };
}

export interface Strategy {
  id?: string;
  name: string;
  description: string;
  color: string;
  riskLevel: "Low" | "Medium" | "High";
  data: StrategyDataPoint[];
  metrics: StrategyMetrics;
}

export async function fetchStrategies(): Promise<Strategy[]> {
  try {
    const response = await fetch("http://localhost:5000/api/strategies");
    const data = await response.json();
    return data.map((strategy: any) => ({
      id: strategy._id,
      name: strategy.name,
      description: strategy.description,
      color: strategy.color,
      riskLevel: strategy.riskLevel,
      data: strategy.data,
      metrics: strategy.metrics,
    }));
  } catch (error) {
    console.error("Error fetching strategies:", error);
    return sampleStrategyData;
  }
}

// Keeping sample data as fallback
export const sampleStrategyData: Strategy[] = [
  {
    name: "Value Strategy",
    description: "Low-risk strategy focusing on stable blue-chip stocks",
    color: "#7C3AED", // Primary purple from Moneyy.ai
    riskLevel: "Low",
    metrics: {
      monthlyRevenue: 25000,
      monthlyRevenueChange: 5,
      newUsers: 1200,
      newUsersChange: 12,
      customerSatisfaction: 4.8,
      customerSatisfactionPercentage: 96,
      performanceMetrics: {
        sharpeRatio: 1.8,
        sortinoRatio: 2.1,
        alpha: 0.4,
        beta: 0.75,
        maxDrawdown: 12,
        volatility: 8,
      },
    },
    data: [
      { date: "Jan", value: 105, change: 5 },
      { date: "Feb", value: 107, change: 1.9 },
      { date: "Mar", value: 106, change: -0.9 },
      { date: "Apr", value: 108, change: 1.9 },
      { date: "May", value: 110, change: 1.8 },
      { date: "Jun", value: 112, change: 1.8 },
      { date: "Jul", value: 114, change: 1.8 },
      { date: "Aug", value: 115, change: 0.9 },
      { date: "Sep", value: 117, change: 1.7 },
      { date: "Oct", value: 119, change: 1.7 },
      { date: "Nov", value: 121, change: 1.7 },
      { date: "Dec", value: 123, change: 1.7 },
    ],
  },
  {
    name: "Growth Strategy",
    description: "High-risk strategy targeting emerging tech companies",
    color: "#06B6D4", // Teal from Moneyy.ai
    riskLevel: "High",
    metrics: {
      monthlyRevenue: 35000,
      monthlyRevenueChange: 8.5,
      newUsers: 2100,
      newUsersChange: 15,
      customerSatisfaction: 4.6,
      customerSatisfactionPercentage: 92,
      performanceMetrics: {
        sharpeRatio: 2.2,
        sortinoRatio: 2.5,
        alpha: 0.8,
        beta: 1.2,
        maxDrawdown: 25,
        volatility: 18,
      },
    },
    data: [
      { date: "Jan", value: 100, change: 0 },
      { date: "Feb", value: 108, change: 8 },
      { date: "Mar", value: 105, change: -2.8 },
      { date: "Apr", value: 115, change: 9.5 },
      { date: "May", value: 112, change: -2.6 },
      { date: "Jun", value: 125, change: 11.6 },
      { date: "Jul", value: 122, change: -2.4 },
      { date: "Aug", value: 135, change: 10.7 },
      { date: "Sep", value: 130, change: -3.7 },
      { date: "Oct", value: 145, change: 11.5 },
      { date: "Nov", value: 140, change: -3.4 },
      { date: "Dec", value: 155, change: 10.7 },
    ],
  },
  {
    name: "Balanced Strategy",
    description: "Mixed strategy balancing growth and stability",
    color: "#3B82F6", // Blue from Moneyy.ai
    riskLevel: "Medium",
    metrics: {
      monthlyRevenue: 30000,
      monthlyRevenueChange: 6.5,
      newUsers: 1500,
      newUsersChange: 10,
      customerSatisfaction: 4.9,
      customerSatisfactionPercentage: 98,
      performanceMetrics: {
        sharpeRatio: 2.0,
        sortinoRatio: 2.3,
        alpha: 0.6,
        beta: 0.95,
        maxDrawdown: 18,
        volatility: 12,
      },
    },
    data: [
      { date: "Jan", value: 102, change: 2 },
      { date: "Feb", value: 105, change: 2.9 },
      { date: "Mar", value: 108, change: 2.9 },
      { date: "Apr", value: 112, change: 3.7 },
      { date: "May", value: 115, change: 2.7 },
      { date: "Jun", value: 119, change: 3.5 },
      { date: "Jul", value: 122, change: 2.5 },
      { date: "Aug", value: 126, change: 3.3 },
      { date: "Sep", value: 129, change: 2.4 },
      { date: "Oct", value: 133, change: 3.1 },
      { date: "Nov", value: 137, change: 3.0 },
      { date: "Dec", value: 141, change: 2.9 },
    ],
  },
  {
    name: "Income Strategy",
    description: "Focus on high-dividend yield stocks",
    color: "#6366F1", // Indigo from Moneyy.ai
    riskLevel: "Low",
    metrics: {
      monthlyRevenue: 28000,
      monthlyRevenueChange: 4.2,
      newUsers: 900,
      newUsersChange: 8,
      customerSatisfaction: 4.7,
      customerSatisfactionPercentage: 94,
      performanceMetrics: {
        sharpeRatio: 1.6,
        sortinoRatio: 1.9,
        alpha: 0.3,
        beta: 0.65,
        maxDrawdown: 10,
        volatility: 7,
      },
    },
    data: [
      { date: "Jan", value: 103, change: 3 },
      { date: "Feb", value: 104, change: 1 },
      { date: "Mar", value: 106, change: 1.9 },
      { date: "Apr", value: 107, change: 0.9 },
      { date: "May", value: 109, change: 1.9 },
      { date: "Jun", value: 111, change: 1.8 },
      { date: "Jul", value: 113, change: 1.8 },
      { date: "Aug", value: 114, change: 0.9 },
      { date: "Sep", value: 116, change: 1.8 },
      { date: "Oct", value: 118, change: 1.7 },
      { date: "Nov", value: 120, change: 1.7 },
      { date: "Dec", value: 122, change: 1.7 },
    ],
  },
];

// Helper function to get strategy performance summary
export function getStrategyPerformance(strategy: Strategy) {
  const firstValue = strategy.data[0].value;
  const lastValue = strategy.data[strategy.data.length - 1].value;
  const totalReturn = ((lastValue - firstValue) / firstValue) * 100;

  // Calculate volatility (standard deviation of changes)
  const avgChange =
    strategy.data.reduce((sum, point) => sum + point.change, 0) /
    strategy.data.length;
  const volatility = Math.sqrt(
    strategy.data.reduce(
      (sum, point) => sum + Math.pow(point.change - avgChange, 2),
      0
    ) / strategy.data.length
  );

  return {
    name: strategy.name,
    description: strategy.description,
    color: strategy.color,
    riskLevel: strategy.riskLevel,
    totalReturn: Number(totalReturn.toFixed(1)),
    volatility: Number(volatility.toFixed(1)),
    currentValue: lastValue,
    monthlyChange: Number(
      strategy.data[strategy.data.length - 1].change.toFixed(1)
    ),
  };
}

// Helper function to get comparative data for charts
export async function getStrategyComparisonData() {
  const strategies = await fetchStrategies();
  return strategies[0].data.map((_, index) => {
    const point: any = { date: strategies[0].data[index].date };
    strategies.forEach((strategy) => {
      point[strategy.name] = strategy.data[index].value;
    });
    return point;
  });
}

// Helper function to get strategy names and colors
export async function getStrategyColors() {
  const strategies = await fetchStrategies();
  return strategies.map((strategy) => ({
    name: strategy.name,
    color: strategy.color,
  }));
}

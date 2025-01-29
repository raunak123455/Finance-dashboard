export interface Trade {
  id: string;
  symbol: string;
  type: "buy" | "sell";
  price: number;
  quantity: number;
  timestamp: string;
  change: number;
  marketCap: string;
  volume: string;
  status: "completed" | "pending" | "failed";
}

interface MarketUpdate {
  id: string;
  title: string;
  description: string;
  impact: "positive" | "negative" | "neutral";
  timestamp: string;
  category: "stocks" | "crypto" | "forex" | "commodities";
  source: string;
}

export async function fetchRecentTrades(): Promise<Trade[]> {
  try {
    const response = await fetch("http://localhost:5000/api/trades");
    const data = await response.json();
    return data.map((trade: any) => ({
      id: trade._id,
      symbol: trade.symbol,
      type: trade.type as "buy" | "sell",
      price: trade.price,
      quantity: trade.quantity,
      timestamp: new Date(trade.timestamp).toISOString(),
      change: trade.change,
      marketCap: trade.marketCap,
      volume: trade.volume,
      status: trade.status as "completed" | "pending" | "failed",
    }));
  } catch (error) {
    console.error("Error fetching trades:", error);
    return [];
  }
}

// Keeping the sample data as fallback
export const sampleTrades: Trade[] = [
  {
    id: "1",
    symbol: "AAPL",
    type: "buy",
    price: 175.25,
    quantity: 100,
    timestamp: "2024-01-20T10:30:00Z",
    change: 2.5,
    marketCap: "2.95T",
    volume: "12.5M",
    status: "completed",
  },
  {
    id: "2",
    symbol: "TSLA",
    type: "sell",
    price: 218.89,
    quantity: 50,
    timestamp: "2024-01-20T10:28:00Z",
    change: -1.8,
    marketCap: "692.8B",
    volume: "8.2M",
    status: "completed",
  },
  {
    id: "3",
    symbol: "MSFT",
    type: "buy",
    price: 390.12,
    quantity: 75,
    timestamp: "2024-01-20T10:25:00Z",
    change: 1.2,
    marketCap: "2.90T",
    volume: "9.8M",
    status: "completed",
  },
  {
    id: "4",
    symbol: "NVDA",
    type: "buy",
    price: 547.1,
    quantity: 30,
    timestamp: "2024-01-20T10:22:00Z",
    change: 3.7,
    marketCap: "1.35T",
    volume: "7.1M",
    status: "completed",
  },
  {
    id: "5",
    symbol: "AMZN",
    type: "sell",
    price: 155.36,
    quantity: 120,
    timestamp: "2024-01-20T10:20:00Z",
    change: -0.8,
    marketCap: "1.61T",
    volume: "10.3M",
    status: "completed",
  },
];

export const marketUpdates: MarketUpdate[] = [
  {
    id: "1",
    title: "Fed Signals Potential Rate Cuts",
    description:
      "Federal Reserve hints at possible interest rate reductions in the coming months as inflation shows signs of cooling.",
    impact: "positive",
    timestamp: "2024-01-20T10:15:00Z",
    category: "stocks",
    source: "Federal Reserve",
  },
  {
    id: "2",
    title: "Tech Sector Rally Continues",
    description:
      "Technology stocks extend gains amid strong earnings reports and positive AI developments.",
    impact: "positive",
    timestamp: "2024-01-20T10:10:00Z",
    category: "stocks",
    source: "Market Analysis",
  },
  {
    id: "3",
    title: "Oil Prices Surge on Supply Concerns",
    description:
      "Crude oil prices rise sharply following geopolitical tensions in major producing regions.",
    impact: "negative",
    timestamp: "2024-01-20T10:05:00Z",
    category: "commodities",
    source: "Energy Report",
  },
  {
    id: "4",
    title: "European Markets Show Mixed Results",
    description:
      "European stock indices display varied performance amid economic data releases.",
    impact: "neutral",
    timestamp: "2024-01-20T10:00:00Z",
    category: "stocks",
    source: "European Markets",
  },
  {
    id: "5",
    title: "Cryptocurrency Market Volatility",
    description:
      "Major cryptocurrencies experience significant price swings following regulatory news.",
    impact: "negative",
    timestamp: "2024-01-20T09:55:00Z",
    category: "crypto",
    source: "Crypto Analysis",
  },
];

export function formatMarketCap(marketCap: string): string {
  return marketCap;
}

export function formatVolume(volume: string): string {
  return volume;
}

export function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getImpactColor(impact: MarketUpdate["impact"]): string {
  switch (impact) {
    case "positive":
      return "text-emerald-500";
    case "negative":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}

export function getChangeColor(change: number): string {
  return change >= 0 ? "text-emerald-500" : "text-red-500";
}

export function formatChange(change: number): string {
  return `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
}

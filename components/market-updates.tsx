"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchRecentTrades,
  sampleTrades,
  marketUpdates,
  formatMarketCap,
  formatVolume,
  formatTimestamp,
  getImpactColor,
  getChangeColor,
  formatChange,
} from "@/lib/market-data";
import { ArrowDown, ArrowUp, Bell } from "lucide-react";
import { Trade } from "@/lib/market-data";

export function MarketUpdates() {
  const [trades, setTrades] = useState<Trade[]>(sampleTrades);

  useEffect(() => {
    const loadTrades = async () => {
      const fetchedTrades = await fetchRecentTrades();
      if (fetchedTrades.length > 0) {
        setTrades(fetchedTrades);
      }
    };

    loadTrades();
  }, []);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symboll</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell className="font-medium">{trade.symbol}</TableCell>
                  <TableCell>
                    <span
                      className={`flex items-center gap-1 ${
                        trade.type === "buy"
                          ? "text-emerald-500"
                          : "text-red-500"
                      }`}
                    >
                      {trade.type === "buy" ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      {trade.type.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono">${trade.price.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono">{trade.quantity}</span>
                  </TableCell>
                  <TableCell>
                    <span className={getChangeColor(trade.change)}>
                      {formatChange(trade.change)}
                    </span>
                  </TableCell>
                  <TableCell>{formatMarketCap(trade.marketCap)}</TableCell>
                  <TableCell>{formatVolume(trade.volume)}</TableCell>
                  <TableCell className="text-gray-500">
                    {formatTimestamp(trade.timestamp)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketUpdates.map((update) => (
              <div
                key={update.id}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className={`${getImpactColor(update.impact)} mt-1`}>
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{update.title}</p>
                    <span className="text-sm text-gray-500">
                      {formatTimestamp(update.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{update.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-medium">
                      {update.category.toUpperCase()}
                    </span>
                    <span>•</span>
                    <span>{update.source}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

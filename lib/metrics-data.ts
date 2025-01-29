interface MetricsDataPoint {
  date: string;
  totalReturns: {
    value: number;
    change: number;
    trend: "up" | "down";
    chartData: number[];
  };
  riskMetrics: {
    value: number;
    change: number;
    trend: "up" | "down";
  };
  annualGrowth: {
    value: number;
    change: number;
    trend: "up" | "down";
  };
}

// Daily data points for the last year
export const metricsData: MetricsDataPoint[] = [
  // December 2024
  {
    date: "2024-12-31",
    totalReturns: {
      value: 25000,
      change: 4.2,
      trend: "up",
      chartData: [12, 15, 14],
    },
    riskMetrics: {
      value: 1.8,
      change: 5.9,
      trend: "up",
    },
    annualGrowth: {
      value: 3500,
      change: 6.1,
      trend: "up",
    },
  },
  {
    date: "2024-12-15",
    totalReturns: {
      value: 24000,
      change: 3.8,
      trend: "up",
      chartData: [11, 14, 13],
    },
    riskMetrics: {
      value: 1.7,
      change: 5.5,
      trend: "up",
    },
    annualGrowth: {
      value: 3300,
      change: 5.8,
      trend: "up",
    },
  },
  // November 2024
  {
    date: "2024-11-30",
    totalReturns: {
      value: 23100,
      change: -1.2,
      trend: "down",
      chartData: [10, 13, 12],
    },
    riskMetrics: {
      value: 1.6,
      change: -0.8,
      trend: "down",
    },
    annualGrowth: {
      value: 3120,
      change: -1.5,
      trend: "down",
    },
  },
  {
    date: "2024-11-15",
    totalReturns: {
      value: 23400,
      change: 2.1,
      trend: "up",
      chartData: [11, 14, 13],
    },
    riskMetrics: {
      value: 1.65,
      change: 1.8,
      trend: "up",
    },
    annualGrowth: {
      value: 3170,
      change: 2.5,
      trend: "up",
    },
  },
  // October 2024
  {
    date: "2024-10-31",
    totalReturns: {
      value: 22900,
      change: 3.5,
      trend: "up",
      chartData: [10, 13, 12],
    },
    riskMetrics: {
      value: 1.62,
      change: 2.8,
      trend: "up",
    },
    annualGrowth: {
      value: 3090,
      change: 4.1,
      trend: "up",
    },
  },
  {
    date: "2024-10-15",
    totalReturns: {
      value: 22100,
      change: 2.8,
      trend: "up",
      chartData: [9, 12, 11],
    },
    riskMetrics: {
      value: 1.58,
      change: 2.2,
      trend: "up",
    },
    annualGrowth: {
      value: 2970,
      change: 3.5,
      trend: "up",
    },
  },
  // September 2024
  {
    date: "2024-09-30",
    totalReturns: {
      value: 21500,
      change: -2.1,
      trend: "down",
      chartData: [8, 11, 10],
    },
    riskMetrics: {
      value: 1.54,
      change: -1.5,
      trend: "down",
    },
    annualGrowth: {
      value: 2870,
      change: -2.8,
      trend: "down",
    },
  },
  {
    date: "2024-09-15",
    totalReturns: {
      value: 21950,
      change: 1.8,
      trend: "up",
      chartData: [9, 12, 11],
    },
    riskMetrics: {
      value: 1.56,
      change: 1.2,
      trend: "up",
    },
    annualGrowth: {
      value: 2950,
      change: 2.1,
      trend: "up",
    },
  },
  // August 2024
  {
    date: "2024-08-31",
    totalReturns: {
      value: 21550,
      change: 4.2,
      trend: "up",
      chartData: [8, 11, 10],
    },
    riskMetrics: {
      value: 1.54,
      change: 3.5,
      trend: "up",
    },
    annualGrowth: {
      value: 2890,
      change: 4.8,
      trend: "up",
    },
  },
  {
    date: "2024-08-15",
    totalReturns: {
      value: 20700,
      change: 3.1,
      trend: "up",
      chartData: [7, 10, 9],
    },
    riskMetrics: {
      value: 1.49,
      change: 2.8,
      trend: "up",
    },
    annualGrowth: {
      value: 2760,
      change: 3.9,
      trend: "up",
    },
  },
  // July 2024
  {
    date: "2024-07-31",
    totalReturns: {
      value: 20100,
      change: -1.5,
      trend: "down",
      chartData: [6, 9, 8],
    },
    riskMetrics: {
      value: 1.45,
      change: -1.2,
      trend: "down",
    },
    annualGrowth: {
      value: 2660,
      change: -2.1,
      trend: "down",
    },
  },
  {
    date: "2024-07-15",
    totalReturns: {
      value: 20400,
      change: 2.5,
      trend: "up",
      chartData: [7, 10, 9],
    },
    riskMetrics: {
      value: 1.47,
      change: 2.1,
      trend: "up",
    },
    annualGrowth: {
      value: 2720,
      change: 3.2,
      trend: "up",
    },
  },
  // June 2024
  {
    date: "2024-06-30",
    totalReturns: {
      value: 19900,
      change: 3.8,
      trend: "up",
      chartData: [6, 9, 8],
    },
    riskMetrics: {
      value: 1.44,
      change: 3.2,
      trend: "up",
    },
    annualGrowth: {
      value: 2640,
      change: 4.5,
      trend: "up",
    },
  },
  {
    date: "2024-06-15",
    totalReturns: {
      value: 19200,
      change: 2.9,
      trend: "up",
      chartData: [5, 8, 7],
    },
    riskMetrics: {
      value: 1.39,
      change: 2.5,
      trend: "up",
    },
    annualGrowth: {
      value: 2530,
      change: 3.8,
      trend: "up",
    },
  },
  // May 2024
  {
    date: "2024-05-31",
    totalReturns: {
      value: 18700,
      change: -2.2,
      trend: "down",
      chartData: [4, 7, 6],
    },
    riskMetrics: {
      value: 1.36,
      change: -1.8,
      trend: "down",
    },
    annualGrowth: {
      value: 2440,
      change: -2.5,
      trend: "down",
    },
  },
  {
    date: "2024-05-15",
    totalReturns: {
      value: 19100,
      change: 1.9,
      trend: "up",
      chartData: [5, 8, 7],
    },
    riskMetrics: {
      value: 1.38,
      change: 1.5,
      trend: "up",
    },
    annualGrowth: {
      value: 2500,
      change: 2.2,
      trend: "up",
    },
  },
  // April 2024
  {
    date: "2024-04-30",
    totalReturns: {
      value: 18750,
      change: 4.1,
      trend: "up",
      chartData: [4, 7, 6],
    },
    riskMetrics: {
      value: 1.36,
      change: 3.5,
      trend: "up",
    },
    annualGrowth: {
      value: 2445,
      change: 4.8,
      trend: "up",
    },
  },
  {
    date: "2024-04-15",
    totalReturns: {
      value: 18000,
      change: 3.2,
      trend: "up",
      chartData: [3, 6, 5],
    },
    riskMetrics: {
      value: 1.31,
      change: 2.8,
      trend: "up",
    },
    annualGrowth: {
      value: 2330,
      change: 3.9,
      trend: "up",
    },
  },
  // March 2024
  {
    date: "2024-03-31",
    totalReturns: {
      value: 17450,
      change: -1.8,
      trend: "down",
      chartData: [2, 5, 4],
    },
    riskMetrics: {
      value: 1.28,
      change: -1.5,
      trend: "down",
    },
    annualGrowth: {
      value: 2240,
      change: -2.2,
      trend: "down",
    },
  },
  {
    date: "2024-03-15",
    totalReturns: {
      value: 17750,
      change: 2.4,
      trend: "up",
      chartData: [3, 6, 5],
    },
    riskMetrics: {
      value: 1.3,
      change: 2.0,
      trend: "up",
    },
    annualGrowth: {
      value: 2290,
      change: 3.1,
      trend: "up",
    },
  },
  // February 2024
  {
    date: "2024-02-29",
    totalReturns: {
      value: 17350,
      change: 3.5,
      trend: "up",
      chartData: [2, 5, 4],
    },
    riskMetrics: {
      value: 1.27,
      change: 3.0,
      trend: "up",
    },
    annualGrowth: {
      value: 2220,
      change: 4.2,
      trend: "up",
    },
  },
  {
    date: "2024-02-15",
    totalReturns: {
      value: 16750,
      change: 2.8,
      trend: "up",
      chartData: [1, 4, 3],
    },
    riskMetrics: {
      value: 1.23,
      change: 2.5,
      trend: "up",
    },
    annualGrowth: {
      value: 2130,
      change: 3.5,
      trend: "up",
    },
  },
  // January 2024
  {
    date: "2024-01-31",
    totalReturns: {
      value: 16300,
      change: -1.5,
      trend: "down",
      chartData: [0, 3, 2],
    },
    riskMetrics: {
      value: 1.2,
      change: -1.2,
      trend: "down",
    },
    annualGrowth: {
      value: 2060,
      change: -1.8,
      trend: "down",
    },
  },
  {
    date: "2024-01-15",
    totalReturns: {
      value: 16550,
      change: 2.1,
      trend: "up",
      chartData: [1, 4, 3],
    },
    riskMetrics: {
      value: 1.22,
      change: 1.8,
      trend: "up",
    },
    annualGrowth: {
      value: 2100,
      change: 2.5,
      trend: "up",
    },
  },
];

export function getMetricsForDateRange(
  startDate: Date,
  endDate: Date
): MetricsDataPoint[] {
  // Ensure we're comparing dates at the start of the day
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  return metricsData
    .filter((dataPoint) => {
      const date = new Date(dataPoint.date);
      return date >= startDate && date <= endDate;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getAggregatedMetrics(dataPoints: MetricsDataPoint[]) {
  if (!dataPoints || dataPoints.length === 0) {
    // Return the most recent data point if no data points in range
    const mostRecent = metricsData[0];
    return {
      totalReturns: {
        ...mostRecent.totalReturns,
        value: mostRecent.totalReturns.value,
        change: Number(mostRecent.totalReturns.change.toFixed(1)),
      },
      riskMetrics: {
        ...mostRecent.riskMetrics,
        value: Number(mostRecent.riskMetrics.value.toFixed(1)),
        change: Number(mostRecent.riskMetrics.change.toFixed(1)),
      },
      annualGrowth: {
        ...mostRecent.annualGrowth,
        value: mostRecent.annualGrowth.value,
        change: Number(mostRecent.annualGrowth.change.toFixed(1)),
      },
    };
  }

  const latest = dataPoints[dataPoints.length - 1];
  const oldest = dataPoints[0];

  const totalReturnsChange =
    ((latest.totalReturns.value - oldest.totalReturns.value) /
      oldest.totalReturns.value) *
    100;
  const riskMetricsChange =
    ((latest.riskMetrics.value - oldest.riskMetrics.value) /
      oldest.riskMetrics.value) *
    100;
  const annualGrowthChange =
    ((latest.annualGrowth.value - oldest.annualGrowth.value) /
      oldest.annualGrowth.value) *
    100;

  return {
    totalReturns: {
      value: latest.totalReturns.value,
      change: Number(totalReturnsChange.toFixed(1)),
      trend:
        latest.totalReturns.value >= oldest.totalReturns.value
          ? ("up" as const)
          : ("down" as const),
      chartData: latest.totalReturns.chartData,
    },
    riskMetrics: {
      value: Number(latest.riskMetrics.value.toFixed(1)),
      change: Number(riskMetricsChange.toFixed(1)),
      trend:
        latest.riskMetrics.value >= oldest.riskMetrics.value
          ? ("up" as const)
          : ("down" as const),
    },
    annualGrowth: {
      value: latest.annualGrowth.value,
      change: Number(annualGrowthChange.toFixed(1)),
      trend:
        latest.annualGrowth.value >= oldest.annualGrowth.value
          ? ("up" as const)
          : ("down" as const),
    },
  };
}

export function getDefaultMetrics(timeFrame: "monthly" | "yearly") {
  const now = new Date();
  let startDate = new Date();

  if (timeFrame === "monthly") {
    startDate.setMonth(now.getMonth() - 1);
  } else {
    startDate.setFullYear(now.getFullYear() - 1);
  }

  const dataPoints = getMetricsForDateRange(startDate, now);
  return getAggregatedMetrics(dataPoints);
}

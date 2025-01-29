const mongoose = require("mongoose");

const timeRangeMetricSchema = new mongoose.Schema({
  start: Number,
  end: Number,
  change: Number,
});

const timeRangeSchema = new mongoose.Schema({
  totalPortfolioValue: timeRangeMetricSchema,
  dailyPnL: timeRangeMetricSchema,
  winRate: timeRangeMetricSchema,
});

const historicalDataPointSchema = new mongoose.Schema({
  month: String,
  value: Number,
});

const keyMetricsSchema = new mongoose.Schema(
  {
    totalPortfolioValue: {
      value: {
        type: Number,
        required: true,
      },
      trend: {
        type: String,
        enum: ["up", "down"],
        required: true,
      },
      historicalData: [historicalDataPointSchema],
    },
    dailyPnL: {
      value: {
        type: Number,
        required: true,
      },
      percentageChange: {
        type: Number,
        required: true,
      },
      trend: {
        type: String,
        enum: ["up", "down"],
        required: true,
      },
      historicalData: [historicalDataPointSchema],
    },
    winRate: {
      value: {
        type: Number,
        required: true,
      },
      trend: {
        type: String,
        enum: ["up", "down"],
        required: true,
      },
      distribution: {
        wins: {
          type: Number,
          required: true,
        },
        losses: {
          type: Number,
          required: true,
        },
      },
      historicalData: [historicalDataPointSchema],
    },
    timeRanges: {
      daily: timeRangeSchema,
      weekly: timeRangeSchema,
      monthly: timeRangeSchema,
      yearly: timeRangeSchema,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("KeyMetrics", keyMetricsSchema);

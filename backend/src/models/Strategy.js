const mongoose = require("mongoose");

const strategyDataPointSchema = new mongoose.Schema({
  date: String,
  value: Number,
  change: Number,
});

const performanceMetricsSchema = new mongoose.Schema({
  sharpeRatio: Number,
  sortinoRatio: Number,
  alpha: Number,
  beta: Number,
  maxDrawdown: Number,
  volatility: Number,
});

const strategyMetricsSchema = new mongoose.Schema({
  monthlyRevenue: Number,
  monthlyRevenueChange: Number,
  newUsers: Number,
  newUsersChange: Number,
  customerSatisfaction: Number,
  customerSatisfactionPercentage: Number,
  performanceMetrics: performanceMetricsSchema,
});

const strategySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    data: [strategyDataPointSchema],
    metrics: strategyMetricsSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Strategy", strategySchema);

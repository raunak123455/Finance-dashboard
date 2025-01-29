const mongoose = require("mongoose");

const metricsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    totalReturns: {
      value: {
        type: Number,
        required: true,
      },
      change: {
        type: Number,
        required: true,
      },
      trend: {
        type: String,
        enum: ["up", "down"],
        required: true,
      },
      chartData: [
        {
          type: Number,
        },
      ],
    },
    riskMetrics: {
      value: {
        type: Number,
        required: true,
      },
      change: {
        type: Number,
        required: true,
      },
      trend: {
        type: String,
        enum: ["up", "down"],
        required: true,
      },
    },
    annualGrowth: {
      value: {
        type: Number,
        required: true,
      },
      change: {
        type: Number,
        required: true,
      },
      trend: {
        type: String,
        enum: ["up", "down"],
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Metrics", metricsSchema);

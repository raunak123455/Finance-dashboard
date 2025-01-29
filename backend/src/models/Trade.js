const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      uppercase: true,
    },
    type: {
      type: String,
      enum: ["buy", "sell"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
      default: () => new Date().toISOString(),
    },
    change: {
      type: Number,
      required: true,
    },
    marketCap: {
      type: String,
      required: true,
    },
    volume: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trade", tradeSchema);

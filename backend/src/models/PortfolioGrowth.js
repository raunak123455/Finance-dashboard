const mongoose = require("mongoose");

const dataPointSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  stocks: {
    type: Number,
    required: true,
  },
  bonds: {
    type: Number,
    required: true,
  },
  realEstate: {
    type: Number,
    required: true,
  },
  cash: {
    type: Number,
    required: true,
  },
});

const portfolioGrowthSchema = new mongoose.Schema(
  {
    timeFrame: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },
    data: [dataPointSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PortfolioGrowth", portfolioGrowthSchema);

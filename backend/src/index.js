const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const tradeRoutes = require("./routes/tradeRoutes");
const strategyRoutes = require("./routes/strategyRoutes");
const portfolioGrowthRoutes = require("./routes/portfolioGrowthRoutes");
const keyMetricsRoutes = require("./routes/keyMetricsRoutes");
const metricsRoutes = require("./routes/metricsRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/investsmart")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api/trades", tradeRoutes);
app.use("/api/strategies", strategyRoutes);
app.use("/api/portfolio-growth", portfolioGrowthRoutes);
app.use("/api/key-metrics", keyMetricsRoutes);
app.use("/api/metrics", metricsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

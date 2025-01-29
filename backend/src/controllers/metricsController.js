const Metrics = require("../models/Metrics");

const getDefaultMetrics = async (timeFrame) => {
  const now = new Date();
  let startDate = new Date();

  if (timeFrame === "monthly") {
    startDate.setMonth(now.getMonth() - 1);
  } else {
    startDate.setFullYear(now.getFullYear() - 1);
  }

  // Query metrics based on timeframe
  const metrics = await Metrics.find({}).sort({ date: -1 });

  // Filter metrics based on value ranges that match the timeframe
  const timeFrameMetrics = metrics.filter((metric) => {
    if (timeFrame === "monthly") {
      return metric.totalReturns.value <= 20000; // Monthly metrics have lower values
    } else {
      return metric.totalReturns.value > 20000; // Yearly metrics have higher values
    }
  });

  return timeFrameMetrics.length > 0
    ? timeFrameMetrics[0]
    : generateMetricsData(timeFrame);
};

const generateMetricsData = (timeFrame) => {
  const now = new Date();

  // Significantly different values for monthly vs yearly views
  if (timeFrame === "monthly") {
    return {
      date: now,
      totalReturns: {
        value: 15000,
        change: 5.2,
        trend: "up",
        chartData: [8, 12, 10, 15, 13, 16],
      },
      riskMetrics: {
        value: 1.2,
        change: 3.5,
        trend: "up",
      },
      annualGrowth: {
        value: 2300,
        change: 4.8,
        trend: "up",
      },
    };
  } else {
    // Yearly data with higher values and different trends
    return {
      date: now,
      totalReturns: {
        value: 180000,
        change: 12.5,
        trend: "up",
        chartData: [100, 120, 115, 140, 135, 150],
      },
      riskMetrics: {
        value: 1.8,
        change: 7.2,
        trend: "up",
      },
      annualGrowth: {
        value: 27600,
        change: 15.3,
        trend: "up",
      },
    };
  }
};

exports.getMetrics = async (req, res) => {
  try {
    const { timeFrame, start, end } = req.query;

    let metrics;
    if (start && end) {
      // If date range is provided, fetch metrics within that range
      const startDate = new Date(start);
      const endDate = new Date(end);

      metrics = await Metrics.find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      }).sort({ date: -1 });

      if (metrics.length === 0) {
        return res.status(404).json({
          message: "No metrics found for the specified date range",
        });
      }

      // Return all metrics in the range
      return res.status(200).json(metrics);
    } else {
      // For timeFrame requests (monthly/yearly), use value-based filtering
      const allMetrics = await Metrics.find({}).sort({ date: -1 });

      const filteredMetrics = allMetrics.filter((metric) => {
        if (timeFrame === "monthly") {
          return metric.totalReturns.value <= 20000; // Monthly metrics have lower values
        } else {
          return metric.totalReturns.value > 20000; // Yearly metrics have higher values
        }
      });

      metrics =
        filteredMetrics.length > 0
          ? filteredMetrics
          : [generateMetricsData(timeFrame || "monthly")];
      return res.status(200).json(metrics[0]);
    }
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({
      message: "Error fetching metrics data",
      error: error.message,
    });
  }
};

exports.createMetrics = async (req, res) => {
  try {
    const metrics = new Metrics(req.body);
    await metrics.save();
    res.status(201).json(metrics);
  } catch (error) {
    console.error("Error creating metrics:", error);
    res.status(400).json({
      message: "Error creating metrics data",
      error: error.message,
    });
  }
};

exports.createBulkMetrics = async (req, res) => {
  try {
    const metricsArray = req.body;

    if (!Array.isArray(metricsArray)) {
      return res.status(400).json({
        message: "Request body must be an array of metrics",
      });
    }

    // Insert all metrics
    const insertedMetrics = await Metrics.insertMany(metricsArray);

    res.status(201).json({
      message: `Successfully inserted ${insertedMetrics.length} metrics`,
      metrics: insertedMetrics,
    });
  } catch (error) {
    console.error("Error creating bulk metrics:", error);
    res.status(400).json({
      message: "Error creating bulk metrics data",
      error: error.message,
    });
  }
};

const express = require("express");
const router = express.Router();
const {
  getMetrics,
  createMetrics,
  createBulkMetrics,
} = require("../controllers/metricsController");

// GET /api/metrics?timeFrame=monthly|yearly&start=date&end=date
router.get("/", getMetrics);

// POST /api/metrics
router.post("/", createMetrics);

// POST /api/metrics/bulk
router.post("/bulk", createBulkMetrics);

module.exports = router;

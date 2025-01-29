const express = require("express");
const router = express.Router();
const {
  getKeyMetrics,
  createKeyMetrics,
  updateKeyMetrics,
  deleteKeyMetrics,
} = require("../controllers/keyMetricsController");

// Get key metrics data
router.get("/", getKeyMetrics);

// Create new key metrics
router.post("/", createKeyMetrics);

// Update key metrics
router.patch("/:id", updateKeyMetrics);

// Delete key metrics
router.delete("/:id", deleteKeyMetrics);

module.exports = router;

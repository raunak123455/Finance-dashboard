const express = require("express");
const router = express.Router();
const strategyController = require("../controllers/strategyController");

// Get all strategies
router.get("/", strategyController.getAllStrategies);

// Get a single strategy
router.get("/:id", strategyController.getStrategy);

// Create a new strategy
router.post("/", strategyController.createStrategy);

// Update a strategy
router.patch("/:id", strategyController.updateStrategy);

// Delete a strategy
router.delete("/:id", strategyController.deleteStrategy);

module.exports = router;

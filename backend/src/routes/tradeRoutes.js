const express = require("express");
const router = express.Router();
const tradeController = require("../controllers/tradeController");

// Get all trades
router.get("/", tradeController.getAllTrades);

// Get a single trade
router.get("/:id", tradeController.getTrade);

// Create a new trade
router.post("/", tradeController.createTrade);

// Update a trade
router.patch("/:id", tradeController.updateTrade);

// Delete a trade
router.delete("/:id", tradeController.deleteTrade);

module.exports = router;

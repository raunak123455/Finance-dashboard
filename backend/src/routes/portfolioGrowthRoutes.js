const express = require("express");
const router = express.Router();
const {
  getPortfolioGrowth,
  createPortfolioGrowth,
  updatePortfolioGrowth,
  deletePortfolioGrowth,
} = require("../controllers/portfolioGrowthController");

// Get portfolio growth data
router.get("/", getPortfolioGrowth);

// Create new portfolio growth data
router.post("/", createPortfolioGrowth);

// Update portfolio growth data
router.patch("/:id", updatePortfolioGrowth);

// Delete portfolio growth data
router.delete("/:id", deletePortfolioGrowth);

module.exports = router;

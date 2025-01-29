const PortfolioGrowth = require("../models/PortfolioGrowth");

// Get portfolio growth data by timeframe
exports.getPortfolioGrowth = async (req, res) => {
  try {
    const { timeFrame } = req.query;
    const query = timeFrame ? { timeFrame } : {};
    const portfolioData = await PortfolioGrowth.find(query);
    res.status(200).json(portfolioData);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching portfolio growth data",
      error: error.message,
    });
  }
};

// Create new portfolio growth data
exports.createPortfolioGrowth = async (req, res) => {
  try {
    const portfolioGrowth = new PortfolioGrowth(req.body);
    const savedData = await portfolioGrowth.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({
      message: "Error creating portfolio growth data",
      error: error.message,
    });
  }
};

// Update portfolio growth data
exports.updatePortfolioGrowth = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = await PortfolioGrowth.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedData) {
      return res
        .status(404)
        .json({ message: "Portfolio growth data not found" });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json({
      message: "Error updating portfolio growth data",
      error: error.message,
    });
  }
};

// Delete portfolio growth data
exports.deletePortfolioGrowth = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await PortfolioGrowth.findByIdAndDelete(id);
    if (!deletedData) {
      return res
        .status(404)
        .json({ message: "Portfolio growth data not found" });
    }
    res
      .status(200)
      .json({ message: "Portfolio growth data deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting portfolio growth data",
      error: error.message,
    });
  }
};

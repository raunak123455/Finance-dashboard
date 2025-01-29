const Strategy = require("../models/Strategy");

// Get all strategies
exports.getAllStrategies = async (req, res) => {
  try {
    const strategies = await Strategy.find();
    res.json(strategies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single strategy
exports.getStrategy = async (req, res) => {
  try {
    const strategy = await Strategy.findById(req.params.id);
    if (!strategy) {
      return res.status(404).json({ message: "Strategy not found" });
    }
    res.json(strategy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new strategy
exports.createStrategy = async (req, res) => {
  const strategy = new Strategy({
    name: req.body.name,
    description: req.body.description,
    color: req.body.color,
    riskLevel: req.body.riskLevel,
    data: req.body.data,
    metrics: req.body.metrics,
  });

  try {
    const newStrategy = await strategy.save();
    res.status(201).json(newStrategy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a strategy
exports.updateStrategy = async (req, res) => {
  try {
    const strategy = await Strategy.findById(req.params.id);
    if (!strategy) {
      return res.status(404).json({ message: "Strategy not found" });
    }

    Object.assign(strategy, req.body);
    const updatedStrategy = await strategy.save();
    res.json(updatedStrategy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a strategy
exports.deleteStrategy = async (req, res) => {
  try {
    const strategy = await Strategy.findById(req.params.id);
    if (!strategy) {
      return res.status(404).json({ message: "Strategy not found" });
    }

    await strategy.deleteOne();
    res.json({ message: "Strategy deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

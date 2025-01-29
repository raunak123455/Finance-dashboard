const KeyMetrics = require("../models/KeyMetrics");

// Get key metrics data
exports.getKeyMetrics = async (req, res) => {
  try {
    const metrics = await KeyMetrics.findOne().sort({ createdAt: -1 });
    res.status(200).json(metrics);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching key metrics", error: error.message });
  }
};

// Create new key metrics
exports.createKeyMetrics = async (req, res) => {
  try {
    const keyMetrics = new KeyMetrics(req.body);
    const savedMetrics = await keyMetrics.save();
    res.status(201).json(savedMetrics);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating key metrics", error: error.message });
  }
};

// Update key metrics
exports.updateKeyMetrics = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMetrics = await KeyMetrics.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMetrics) {
      return res.status(404).json({ message: "Key metrics not found" });
    }
    res.status(200).json(updatedMetrics);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating key metrics", error: error.message });
  }
};

// Delete key metrics
exports.deleteKeyMetrics = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMetrics = await KeyMetrics.findByIdAndDelete(id);
    if (!deletedMetrics) {
      return res.status(404).json({ message: "Key metrics not found" });
    }
    res.status(200).json({ message: "Key metrics deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting key metrics", error: error.message });
  }
};

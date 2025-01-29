const Trade = require("../models/Trade");

// Get all trades
exports.getAllTrades = async (req, res) => {
  try {
    const trades = await Trade.find().sort({ timestamp: -1 });
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single trade
exports.getTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);
    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }
    res.json(trade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new trade
exports.createTrade = async (req, res) => {
  const trade = new Trade({
    symbol: req.body.symbol,
    type: req.body.type,
    price: req.body.price,
    quantity: req.body.quantity,
    timestamp: req.body.timestamp || new Date().toISOString(),
    change: req.body.change,
    marketCap: req.body.marketCap,
    volume: req.body.volume,
    status: req.body.status || "completed",
  });

  try {
    const newTrade = await trade.save();
    res.status(201).json(newTrade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a trade
exports.updateTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);
    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }

    Object.assign(trade, req.body);
    const updatedTrade = await trade.save();
    res.json(updatedTrade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a trade
exports.deleteTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);
    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }

    await trade.remove();
    res.json({ message: "Trade deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

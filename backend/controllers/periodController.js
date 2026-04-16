const Period = require("../models/Period");

exports.addPeriod = async (req, res) => {
  try {
    const period = await Period.create(req.body);
    res.status(201).json(period);
  } catch (err) {
    res.status(500).json({ error: "Failed to save period data" });
  }
};

exports.getPeriods = async (req, res) => {
  try {
    const data = await Period.find({ userId: req.params.userId })
      .sort({ startDate: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

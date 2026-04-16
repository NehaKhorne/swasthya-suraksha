const express = require("express");
const router = express.Router();
const PCOSResult = require("../models/PCOSResult");
const authMiddleware = require("../middleware/authMiddleware");
const getPCOSRecommendations = require("../services/pcosRecommendations");


// SAVE PCOS RESULT
router.post("/save", async (req, res) => {
  const userId = req.user ? req.user.id : "000000000000000000000001"; // Fallback user ID
  const { percentage, level, totalScore } = req.body;

  try {
    const result = new PCOSResult({ userId, percentage, level, totalScore });
    await result.save();
    res.status(200).json({ message: "PCOS result saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save PCOS result", error });
  }
});

// GET USER PCOS HISTORY
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const history = await PCOSResult.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
});
// GET RECOMMENDATIONS BASED ON LATEST RESULT
router.get("/recommendations", authMiddleware, async (req, res) => {
  try {
    const latest = await PCOSResult.findOne({ user: req.user.id })
      .sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({ message: "No PCOS result found" });
    }

    const recommendations = getPCOSRecommendations(latest.riskLevel);

    res.json({
      riskLevel: latest.riskLevel,
      percentage: latest.percentage,
      recommendations
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
});


module.exports = router;
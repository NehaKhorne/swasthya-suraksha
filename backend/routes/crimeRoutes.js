const express = require("express");
const router = express.Router();
const Crime = require("../models/Crime");
const policeStations = require("../data/policeStations");

// ================================
// 1️⃣ GET ALL CRIMES
// ================================
router.get("/", async (req, res) => {
  try {
    const crimes = await Crime.find();
    res.json(crimes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching crimes", error });
  }
});

// ================================
// 2️⃣ ADD COMMUNITY REPORT
// ================================
router.post("/", async (req, res) => {
  try {
    const newCrime = await Crime.create({
      ...req.body,
      source: req.body.source || "Community"
    });

    res.status(201).json(newCrime);
  } catch (error) {
    res.status(500).json({ message: "Error adding crime report", error });
  }
});

// ================================
// 3️⃣ GET CRIMES BY AREA
// ================================
router.get("/area/:area", async (req, res) => {
  try {
    const crimes = await Crime.find({
      area: new RegExp(req.params.area, "i")
    });

    res.json(crimes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching area crimes", error });
  }
});

// ================================
// 4️⃣ GET POLICE STATION INFO
// ================================
router.get("/police/:area", (req, res) => {
  try {
    const station = policeStations.find(
      s => s.area.toLowerCase() === req.params.area.toLowerCase()
    );

    if (!station) {
      return res.json({ message: "No police station found for this area" });
    }

    res.json(station);
  } catch (error) {
    res.status(500).json({ message: "Error fetching police station", error });
  }
});

// ================================
// 5️⃣ SEND SOS (NO TWILIO VERSION)
// ================================
router.post("/send-sos", async (req, res) => {
  try {
    const { lat, lng } = req.body;

    console.log("🚨 SOS TRIGGERED at location:", lat, lng);

    // Later you can integrate Twilio here

    res.json({ message: "SOS triggered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending SOS", error });
  }
});

module.exports = router;

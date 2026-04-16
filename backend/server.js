require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const twilio = require("twilio");
const crimeRoutes = require("./routes/crimeRoutes");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE =================
mongoose
  .connect("mongodb://127.0.0.1:27017/swasthya")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ================= ROUTES =================
//app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/pcos", require("./routes/pcos"));
app.use("/api/crimes", crimeRoutes);
app.use("/api/crimes", require("./routes/crimeRoutes"));


// ================= TWILIO CONFIG =================
const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

// ================= SOS ROUTE =================
app.post("/api/sos/send", async (req, res) => {
  try {
    const { contacts, lat, lng } = req.body;

    if (!contacts || contacts.length === 0) {
      return res.status(400).json({ error: "No contacts provided" });
    }

    if (!lat || !lng) {
      return res.status(400).json({ error: "Location not provided" });
    }

    console.log("🚨 SOS REQUEST RECEIVED");
    console.log("Contacts:", contacts);
    console.log("Location:", lat, lng);

    // Google Maps link
    const locationLink = `https://www.google.com/maps?q=${lat},${lng}`;

    const message = `
🚨 EMERGENCY ALERT 🚨

I need immediate help.

📍 My Live Location:
${locationLink}

Please reach me as soon as possible.
`;

    // Send message to all contacts
    for (let number of contacts) {
      await client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: `whatsapp:${number}`,
        body: message,
      });
      console.log("FROM NUMBER:", process.env.TWILIO_WHATSAPP_FROM);
      console.log("📤 Message sent to:", number)
    }

    res.json({
      success: true,
      message: "SOS sent successfully",
    });

  } catch (err) {
    console.error("❌ SOS ERROR:", err.message);
    res.status(500).json({ error: "Failed to send SOS" });
  }
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

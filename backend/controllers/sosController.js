const twilio = require("twilio");
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

exports.sendSOS = async (req, res) => {
  try {
    const { contacts, lat, lng } = req.body;

    const locationLink = `https://maps.google.com/?q=${lat},${lng}`;
    const message = `🚨 *EMERGENCY ALERT* 🚨

I need immediate help!

📍 Location:
${locationLink}

🕒 ${new Date().toLocaleString()}
`;

    const results = [];

    for (const number of contacts) {
      try {
        const msg = await client.messages.create({
          from: process.env.TWILIO_WHATSAPP_FROM,
          to: `whatsapp:${number}`,
          body: message
        });
        results.push({ number, status: "sent", sid: msg.sid });
      } catch (err) {
        console.error(`Failed for ${number}:`, err.message);
        results.push({ number, status: "failed" });
      }
    }

    res.json({
      success: true,
      report: results
    });

  } catch (err) {
    res.status(500).json({ error: "SOS failed" });
  }
};

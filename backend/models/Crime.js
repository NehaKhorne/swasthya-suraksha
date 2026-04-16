const mongoose = require("mongoose");

const crimeSchema = new mongoose.Schema({
  area: String,
  lat: Number,
  lng: Number,
  type: String,
  count: Number,
  zoneColor: String,
  source: String
});

module.exports = mongoose.model("Crime", crimeSchema);

// const mongoose = require("mongoose");

// const periodSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   startDate: {
//     type: Date,
//     required: true
//   },
//   endDate: {
//     type: Date
//   },
//   flow: {
//     type: String,
//     enum: ["light", "medium", "heavy"]
//   },
//   symptoms: [String], // cramps, headache, bloating
//   mood: String
// }, { timestamps: true });

// module.exports = mongoose.model("Period", periodSchema);
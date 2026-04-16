const fs = require("fs");
const path = require("path");

const patternsPath = path.join(__dirname, "..", "data", "pcos_patterns.json");
const patterns = JSON.parse(fs.readFileSync(patternsPath, "utf-8"));

const calculatePCOSInsight = (answers) => {
  let score = 0;

  for (let key in patterns.features) {
    const userAnswer = answers[key];
    const mappedValue = patterns.answer_mapping[userAnswer] || 0;
    const weight = patterns.features[key].weight;
    score += mappedValue * weight;
  }

  let level = "Low Pattern Match";
  if (score >= patterns.thresholds.moderate) {
    level = "Higher Pattern Match";
  } else if (score >= patterns.thresholds.low) {
    level = "Moderate Pattern Match";
  }

  return {
    level,
    score: score.toFixed(2),
    message:
      "This insight is based on lifestyle patterns and is not a medical diagnosis."
  };
};
const reasons = [];

// if (answers.irregularCycle) {
//   reasons.push("Irregular menstrual cycle reported");
// }
// if (answers.acneOrHairGrowth) {
//   reasons.push("Symptoms like acne or excessive hair growth selected");
// }
// if (answers.weightChange) {
//   reasons.push("Weight fluctuation observed");
// }

// return {
//   score,
//   level,
//   message,
//   reasons
// };

module.exports = { calculatePCOSInsight };

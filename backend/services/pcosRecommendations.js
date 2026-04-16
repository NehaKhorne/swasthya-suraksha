module.exports = function getPCOSRecommendations(riskLevel) {
  const base = {
    lifestyle: [
      "Maintain a consistent sleep schedule",
      "Manage stress through yoga or meditation",
      "Avoid smoking and alcohol"
    ],
    diet: [
      "Eat whole foods and avoid processed sugar",
      "Include fiber-rich vegetables and fruits",
      "Stay hydrated"
    ],
    medical: [
      "Track menstrual cycles regularly",
      "Consult a gynecologist if symptoms persist"
    ]
  };

  if (riskLevel === "Mild Risk") {
    base.lifestyle.push("Increase daily physical activity (30 min walk)");
    base.diet.push("Reduce refined carbs");
  }

  if (riskLevel === "Moderate Risk") {
    base.lifestyle.push("Structured exercise 4–5 days/week");
    base.diet.push("Low glycemic index foods");
    base.medical.push("Consider hormone evaluation with doctor");
  }

  if (riskLevel === "High Risk") {
    base.lifestyle.push("Weight management under guidance");
    base.diet.push("PCOS-specific diet plan");
    base.medical.push("Hormonal tests & ultrasound evaluation");
  }

  return base;
};

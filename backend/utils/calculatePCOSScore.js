module.exports = function calculatePCOSScore(answers) {
  let score = 0;

  if (answers.irregularPeriods) score += 20;
  if (answers.acne) score += 15;
  if (answers.weightGain) score += 15;
  if (answers.hairFall) score += 10;
  if (answers.facialHair) score += 20;
  if (answers.familyHistory) score += 20;

  return score;
};

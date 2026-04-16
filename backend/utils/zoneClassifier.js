function getZoneColor(count) {
  if (count > 20) return "red";
  if (count > 10) return "orange";
  return "green";
}

module.exports = getZoneColor;

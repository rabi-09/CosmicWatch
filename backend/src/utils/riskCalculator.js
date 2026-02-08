export function calculateRisk(diameter, speed, distance) {
  const sizeScore = Math.min(diameter / 0.3, 1) * 40;
  const speedScore = Math.min(speed / 80000, 1) * 30;
  const distanceScore = Math.max(1 - distance / 20000000, 0) * 30;

  const score = Math.round(sizeScore + speedScore + distanceScore);

  let level = "Low";
  if (score >= 70) level = "High";
  else if (score >= 40) level = "Medium";

  return { score, level };
}

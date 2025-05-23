export * from "./personName";
export * from "./companyName";
export * from "./uuid";
export * from "./email";
export * from "./featureFlags";

function generateInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateFloat(min: number, max: number, decimals: number = 2) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

function generateBoolean(trueChance: number = 0.5) {
  return Math.random() < trueChance;
}

const TIERS = ["Basic", "Premium", "Enterprise"] as const;

function generateTier(): (typeof TIERS)[number] {
  return TIERS[Math.floor(Math.random() * TIERS.length)];
}

function generateDate(min: Date, max: Date) {
  return new Date(
    min.getTime() + Math.random() * (max.getTime() - min.getTime())
  );
}

export {
  generateInt as int,
  generateFloat as float,
  generateBoolean as boolean,
  generateTier as tier,
  generateDate as date,
};

function money(value) {
  return Number(value || 0).toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function toNumber(name, fallback) {
  const value = process.env[name];
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
}

const price = toNumber("PROPERTY_PRICE", 0);
const sellerCommissionRate = toNumber("SELLER_COMMISSION_RATE", 0.01);
const teamContributionRate = toNumber("TEAM_CONTRIBUTION_RATE", 0.10);
const shares = (process.env.TEAM_SHARES || "")
  .split(",")
  .map((entry) => {
    const [name, rate] = entry.split(":");
    return { name: name?.trim(), rate: Number(rate) };
  })
  .filter((share) => share.name && Number.isFinite(share.rate));

if (!price) {
  console.error("Usage: PROPERTY_PRICE=2800000 SELLER_COMMISSION_RATE=0.01 TEAM_CONTRIBUTION_RATE=0.10 TEAM_SHARES='Socio A:0.5,Socio B:0.5' node scripts/calculate-commission-shares.mjs");
  process.exit(1);
}

const sellerCommissionAmount = price * sellerCommissionRate;
const teamContributionAmount = sellerCommissionAmount * teamContributionRate;
const teamContributionMonthly = teamContributionAmount / 12;

console.log(`Property price: ${money(price)} MXN`);
console.log(`Seller commission: ${sellerCommissionRate} = ${money(sellerCommissionAmount)} MXN`);
console.log(`Team contribution: ${teamContributionRate} = ${money(teamContributionAmount)} MXN`);
console.log(`Monthly planning: ${money(teamContributionMonthly)} MXN`);

if (shares.length) {
  const totalShareRate = shares.reduce((total, share) => total + share.rate, 0);
  if (totalShareRate > 1) {
    console.warn(`Warning: team shares total ${totalShareRate}, above 1.00.`);
  }

  console.log("\nTeam shares:");
  for (const share of shares) {
    console.log(`- ${share.name}: ${share.rate} = ${money(teamContributionAmount * share.rate)} MXN`);
  }
}

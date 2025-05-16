import type { EligibilityResult } from "@/types/eligibility";

export const checkEligibility = (stakeAmount: number): EligibilityResult => {
  const requiredAmount = 0.01;
  const silverTier = 0.1;
  const goldTier = 1;

  const result: EligibilityResult = {
    isEligible: false,
    checkComplete: true,
    message: "",
    tier: "standard",
  };

  if (stakeAmount >= goldTier) {
    result.isEligible = true;
    result.tier = "gold";
    result.message =
      "Gold Tier: You qualify for our premium mint with added benefits!";
  } else if (stakeAmount >= silverTier) {
    result.isEligible = true;
    result.tier = "silver";
    result.message =
      "Silver Tier: You qualify for bonus features with your mint!";
  } else if (stakeAmount >= requiredAmount) {
    result.isEligible = true;
    result.tier = "standard";
    result.message =
      "You have met the minimum staking requirement and can mint your NFT.";
  } else {
    result.isEligible = false;
    result.tier = "standard";
    result.message = `You need at least ${requiredAmount.toLocaleString()} tokens staked to be eligible. Currently staked: ${stakeAmount.toLocaleString()}.`;
  }

  return result;
};

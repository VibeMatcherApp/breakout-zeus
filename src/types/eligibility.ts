export interface WalletStatus {
  connected: boolean;
  address: string;
  shortAddress: string;
}

export interface EligibilityResult {
  isEligible: boolean;
  checkComplete: boolean;
  message: string;
  tier: string;
}

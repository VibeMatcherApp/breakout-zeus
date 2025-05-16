"use client";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { CheckCircle, XCircle } from "lucide-react";
import React, { useState } from "react";

import { useNetworkConfig } from "@/hooks/misc/useNetworkConfig";
import type { WalletStatus, EligibilityResult } from "@/types/eligibility";
import { BTC_DECIMALS } from "@/utils/constant";
import { checkEligibility } from "@/utils/eligibilityUtils";

import EligibilityModal from "./EligibilityModal";
import EligibilityStatus from "./EligibilityStatus";
import StakeInfo from "./StakeInfo";
import WalletConnect from "./WalletConnect";

const EligibilityChecker: React.FC = () => {
  const { connection } = useConnection();
  const config = useNetworkConfig();
  const { publicKey: solanaPubkey } = useWallet();

  const [walletStatus, setWalletStatus] = useState<WalletStatus>({
    connected: false,
    address: "6Ez6FWMv1TwDefo7NPQQQHRFsqK5Gm2DAgzcpq7gVoDk",
    shortAddress: "6Ez..oDk",
  });

  const [stakeInfo, setStakeInfo] = useState({
    amount: 0,
    isLoading: false,
  });

  const [eligibility, setEligibility] = useState<EligibilityResult>({
    isEligible: false,
    checkComplete: false,
    message: "",
    tier: "bronze",
  });

  const [showModal, setShowModal] = useState(false);

  const handleConnectWallet = async () => {
    setWalletStatus({ connected: false, address: "", shortAddress: "" });
    setStakeInfo({ amount: 0, isLoading: true });
    setEligibility({
      isEligible: false,
      checkComplete: false,
      message: "",
      tier: "standard",
    });

    const solanaPubkey = `0x${Math.random().toString(16).substring(2, 14)}`;
    const shortAddress = `${solanaPubkey.substring(0, 6)}...${solanaPubkey.substring(solanaPubkey.length - 4)}`;

    setWalletStatus({
      connected: true,
      address: solanaPubkey,
      shortAddress,
    });

    await fetchStakeAmount();
  };

  async function getTokenBalance(ata: PublicKey): Promise<number> {
    return Number.parseInt(
      (await connection.getTokenAccountBalance(ata)).value.amount
    );
  }
  const fetchStakeAmount = async () => {
    if (!solanaPubkey) {
      return 0;
    }
    const vaultAta = getAssociatedTokenAddressSync(
      new PublicKey(config.assetMint),
      new PublicKey("Gy2gFUXnpg7dcShA3YsxCtBCofZWxffvMkQ35T9JrbE5"),
      true
    );
    const tokenBalance = await getTokenBalance(vaultAta);

    const result = checkEligibility(tokenBalance / 10 ** BTC_DECIMALS);
    setEligibility(result);

    if (result.isEligible) {
      setShowModal(true);
    }
    setStakeInfo({
      amount: tokenBalance / 10 ** BTC_DECIMALS,
      isLoading: false,
    });
  };

  const handleDisconnect = () => {
    setWalletStatus({ connected: false, address: "", shortAddress: "" });
    setStakeInfo({ amount: 0, isLoading: false });
    setEligibility({
      isEligible: false,
      checkComplete: false,
      message: "",
      tier: "standard",
    });
    setShowModal(false);
  };

  const handleCheckAgain = () => {
    if (walletStatus.connected) {
      setStakeInfo({ ...stakeInfo, isLoading: true });
      setEligibility({
        isEligible: false,
        checkComplete: false,
        message: "",
        tier: "standard",
      });
      fetchStakeAmount();
    }
  };

  return (
    <div className="rounded-xl border border-purple-500/20 bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all duration-300">
      <WalletConnect
        walletStatus={walletStatus}
        onConnect={handleConnectWallet}
        onDisconnect={handleDisconnect}
      />

      {walletStatus.connected && (
        <div className="mt-6 space-y-6">
          <StakeInfo stakeInfo={stakeInfo} />

          <EligibilityStatus eligibility={eligibility} />

          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <button
              onClick={handleCheckAgain}
              disabled={stakeInfo.isLoading}
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow transition-all hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Check Again
            </button>

            {eligibility.isEligible && eligibility.checkComplete && (
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 text-sm font-medium text-white shadow transition-all hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Proceed to Mint</span>
                </div>
              </button>
            )}

            {!eligibility.isEligible && eligibility.checkComplete && (
              <button
                disabled
                className="flex-1 cursor-not-allowed rounded-lg bg-gray-500 px-4 py-3 text-sm font-medium text-white opacity-50 shadow"
              >
                <div className="flex items-center justify-center gap-2">
                  <XCircle className="h-5 w-5" />
                  <span>Ineligible for Mint</span>
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      <EligibilityModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        tier={eligibility.tier as "bronze" | "silver" | "gold"}
      />
    </div>
  );
};

export default EligibilityChecker;

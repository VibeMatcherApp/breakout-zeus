import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import React from "react";

import type { EligibilityResult } from "@/types/eligibility";

interface EligibilityStatusProps {
  eligibility: EligibilityResult;
}

const EligibilityStatus: React.FC<EligibilityStatusProps> = ({
  eligibility,
}) => {
  const { isEligible, checkComplete, message } = eligibility;

  if (!checkComplete) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-indigo-500/20 bg-indigo-900/40 p-4">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
        <p className="text-indigo-200">Checking eligibility status...</p>
      </div>
    );
  }

  if (isEligible) {
    return (
      <div className="animate-fadeIn rounded-lg border border-green-500/20 bg-green-900/30 p-4">
        <div className="mb-2 flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-green-400" />
          <h3 className="font-medium text-white">Eligible for NFT Mint</h3>
        </div>
        <p className="pl-9 text-green-200">{message}</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn rounded-lg border border-red-500/20 bg-red-900/30 p-4">
      <div className="mb-2 flex items-center gap-3">
        <AlertCircle className="h-6 w-6 text-red-400" />
        <h3 className="font-medium text-white">Not Eligible</h3>
      </div>
      <p className="pl-9 text-red-200">{message}</p>
    </div>
  );
};

export default EligibilityStatus;

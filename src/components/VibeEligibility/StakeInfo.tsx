import { Coins, Loader } from "lucide-react";
import React from "react";

interface StakeInfoProps {
  stakeInfo: {
    amount: number;
    isLoading: boolean;
  };
}

const StakeInfo: React.FC<StakeInfoProps> = ({ stakeInfo }) => {
  const { amount, isLoading } = stakeInfo;

  // The minimum amount required for eligibility
  const requiredAmount = 0.01;

  // Calculate percentage for progress bar (capped at 100%)
  const progressPercentage = Math.min(
    Math.round((amount / requiredAmount) * 100),
    100
  );

  // Determine progress bar color based on amount
  const getProgressBarColor = () => {
    if (amount >= requiredAmount)
      return "bg-gradient-to-r from-green-400 to-emerald-500";
    if (amount >= requiredAmount * 0.7)
      return "bg-gradient-to-r from-yellow-400 to-amber-500";
    return "bg-gradient-to-r from-red-400 to-rose-500";
  };

  return (
    <div className="rounded-lg border border-purple-400/20 bg-white/10 p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500">
          <Coins className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-medium text-white">Your Stake</h3>
          <p className="text-sm text-purple-200">
            Minimum required: {requiredAmount.toLocaleString()} tokens
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-6">
          <Loader className="mb-2 h-8 w-8 animate-spin text-purple-300" />
          <p className="text-purple-200">Fetching stake information...</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-white">
              {amount.toLocaleString()}{" "}
              <span className="font-normal text-purple-300">tokens</span>
            </p>
            <span
              className={`text-sm font-medium ${amount >= requiredAmount ? "text-green-400" : "text-amber-400"}`}
            >
              {progressPercentage}%
            </span>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-700/50">
            <div
              className={`h-full ${getProgressBarColor()} transition-all duration-1000 ease-out`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <p className="text-sm text-purple-200">
            {amount >= requiredAmount
              ? `You have staked enough tokens! (${(amount - requiredAmount).toLocaleString()} tokens above minimum)`
              : `You need ${(requiredAmount - amount).toLocaleString()} more tokens to be eligible`}
          </p>
        </div>
      )}
    </div>
  );
};

export default StakeInfo;

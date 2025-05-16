import { Wallet, Link as LinkBreak } from "lucide-react";
import React from "react";

import type { WalletStatus } from "../types";

interface WalletConnectProps {
  walletStatus: WalletStatus;
  onConnect: () => void;
  onDisconnect: () => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({
  walletStatus,
  onConnect,
  onDisconnect,
}) => {
  const { connected, shortAddress } = walletStatus;

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-lg font-semibold text-white">
        Wallet Connection
      </h2>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        {connected ? (
          <>
            <div className="flex flex-1 items-center gap-3 rounded-lg border border-purple-400/30 bg-white/20 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-indigo-500">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  Connected Wallet
                </p>
                <p className="text-sm text-purple-200">{shortAddress}</p>
              </div>
              <div className="ml-auto flex items-center">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                </span>
              </div>
            </div>

            <button
              onClick={onDisconnect}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/20 px-4 py-2 text-red-300 transition-colors hover:bg-red-500/30 sm:w-auto"
            >
              <LinkBreak className="h-4 w-4" />
              <span>Disconnect</span>
            </button>
          </>
        ) : (
          <button
            onClick={onConnect}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-3 font-medium text-white shadow-sm transition-all hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
          >
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default WalletConnect;

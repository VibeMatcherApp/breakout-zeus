"use client";
import { Sparkles } from "lucide-react";
import React from "react";

import EligibilityChecker from "@/components/VibeEligibility/EligibilityChecker";

export default function EligibilityPage() {
  return (
    <div className="flex min-h-screen items-center  justify-center bg-gradient-to-br from-blue-600 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="particles-container" aria-hidden="true"></div>
      </div>

      <div className="container mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-purple-300" />
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              NFT Mint Eligibility
            </h1>
          </div>
          <p className="mx-auto max-w-md text-purple-200">
            {
              "Check if you're eligible to mint our exclusive NFT collection based on your staked amount."
            }
          </p>
        </header>

        <EligibilityChecker />

        <footer className="mt-12 text-center text-sm text-purple-300">
          <p>© 2025 NFT Stake Checker. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

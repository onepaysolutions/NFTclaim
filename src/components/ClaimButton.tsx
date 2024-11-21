"use client";
import { useTranslation } from "react-i18next";
import {
  useActiveAccount,
  PayEmbed,
} from "thirdweb/react";
import { client } from "../client";
import { defineChain } from "thirdweb/chains";
import { getContract } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc721";
import { useState } from "react";
import { toast } from "react-hot-toast";
import nft1 from "@/assets/images/nft1.png";

interface ClaimButtonProps {
  address: string;
  claimCondition: any;
}

const NFTContract = getContract({
  client,
  chain: defineChain(56),
  address: "0x3c1641A0de76B550C26D25d7f8ee3Ca19966E981",
});

export function ClaimButton({ address }: ClaimButtonProps) {
  const { t } = useTranslation();
  const account = useActiveAccount();
  const [showPayEmbed, setShowPayEmbed] = useState(false);

  if (!account) {
    return null;
  }

  if (!showPayEmbed) {
    return (
      <button
        onClick={() => setShowPayEmbed(true)}
        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-purple-500/20 w-full"
      >
        {t("Claim NFT")} ({t("Price", { amount: "1000 USDT" })})
      </button>
    );
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
        onClick={() => setShowPayEmbed(false)}
      />
      
      <div className="fixed left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 z-[10000] w-full max-w-md mx-4">
        <div className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-purple-500/20 shadow-xl shadow-purple-500/10">
          <button
            onClick={() => setShowPayEmbed(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-[10001] bg-black/20 p-2 rounded-lg backdrop-blur-sm"
            aria-label={t("Close")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="bg-gradient-to-r from-purple-900/50 to-black/50 backdrop-blur-sm p-4 border-b border-purple-500/20">
            <h3 className="text-xl font-bold text-center text-white">
              {t("NFT Claim")}
            </h3>
          </div>

          <div className="p-4">
            <PayEmbed
              client={client}
              payOptions={{
                mode: "transaction",
                transaction: claimTo({
                  contract: NFTContract,
                  to: address,
                  quantity: 1n,
                }),
                metadata: {
                  name: t("NFT Claim"),
                  image: nft1
                }
              }}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
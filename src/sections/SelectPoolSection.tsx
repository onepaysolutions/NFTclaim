import { NFTContract } from "@/utils/contracts";
import { distributeTokens } from "@/utils/tokens";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useActiveAccount } from "thirdweb/react";
import { sendTransaction } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc721";
import { supabase } from "@/utils/supabase";

const NFTClaimSection: React.FC = () => {
  const { t } = useTranslation();
  const address = useActiveAccount();
  const [referral, setReferral] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle NFT claiming
  const handleClaim = async () => {
    if (!address) return;
    setIsLoading(true);
    setError(null);
    
    try {
      // Prepare claim transaction using claimTo
      const transaction = claimTo({
        contract: NFTContract,
        to: address.address,
        quantity: 1n
      });

      // Send transaction
      const { transactionHash } = await sendTransaction({
        transaction,
        account: address
      });

      console.log("Transaction sent:", transactionHash);

      // Distribute OPE tokens if referral exists
      if(referral) {
        await saveReferralRecord(address.address, referral);
        await distributeTokens(address.address, referral);
      }

      window.location.reload();
    } catch (error: any) {
      console.error("NFT claim failed:", error);
      setError(error.message || "Failed to claim NFT");
    } finally {
      setIsLoading(false);
    }
  };

  // Get referral from URL on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const ref = searchParams.get("REF");
    if (ref && ref.length === 42 && ref.startsWith('0x')) {
      setReferral(ref);
      console.log("Referral set:", ref);
    }
  }, []);

  // Save referral record
  const saveReferralRecord = async (userAddress: string, referralAddress: string) => {
    try {
      const { error } = await supabase
        .from('referrals')
        .insert([
          { 
            user_address: userAddress,
            referrer_address: referralAddress,
            claimed_at: new Date().toISOString(),
            status: 'completed'
          }
        ]);

      if (error) throw error;
      
    } catch (error) {
      console.error('Error saving referral record:', error);
    }
  };

  return (
    <div className="w-full mt-20 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8">{t("Claim Your Exclusive NFT")}</h1>
      
      <div className="nft-preview w-64 h-64 bg-[#632667] rounded-lg mb-8 flex items-center justify-center">
        <img 
          src="https://your-nft-preview-url.com" 
          alt="NFT Preview"
          className="max-w-full max-h-full rounded-lg"
        />
      </div>

      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      {address && (
        <button
          className={`bg-[#632667] text-white text-lg rounded-lg px-8 py-3 
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
          onClick={handleClaim}
          disabled={isLoading}
        >
          {isLoading ? t("Claiming...") : t("Claim Now")}
        </button>
      )}

      {referral && (
        <p className="mt-4 text-sm opacity-75">
          * {t("Referred by")}: {referral.slice(0, 6)}...{referral.slice(-4)}
        </p>
      )}

      <p className="mt-4 text-sm opacity-75">
        * {t("Both you and your referrer will receive 1000 OPE tokens upon successful claim")}
      </p>

      {/* Debug info */}
      <div className="mt-4 text-xs text-gray-500">
        <p>Connected Wallet: {address?.address}</p>
        <p>Referral: {referral || "None"}</p>
      </div>
    </div>
  );
};

export default NFTClaimSection;

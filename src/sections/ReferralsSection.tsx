import { NFTContract } from "@/utils/contracts";
import { showSuccessAlert } from "@/utils/notifications";
import React from "react";
import { useTranslation } from "react-i18next";
import { useActiveAccount } from "thirdweb/react";

interface ReferralData {
  totalReferrals: number;
  referralLink: string;
  earnedTokens: number;
}

const Referrals: React.FC<{ data: ReferralData }> = ({ data }) => {
  const { t } = useTranslation();
  const address = useActiveAccount();

  const { referralLink, totalReferrals, earnedTokens } = data;

  const handleShare = async () => {
    if (!address) return;
    
    try {
      await navigator.share({
        title: 'Join NFT Referral Program',
        text: `Use my referral link to claim your NFT and earn OPE tokens! Referral: ${address.address}`, 
        url: referralLink
      });
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  const handleCopy = () => {
    if (!referralLink) return;
    
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        showSuccessAlert("Referral link copied!");
      })
      .catch((err) => {
        console.error("Copy failed: ", err);
      });
  };

  return (
    <div className="Referrals mt-20 flex flex-col items-center">
      <h1 className="w-full text-2xl font-bold mb-4">
        <span>Referral Rewards</span>
      </h1>
      
      <div className="stats-container flex justify-between w-full mb-8">
        <div className="stat-box text-center">
          <p className="text-lg">Total Referrals</p>
          <p className="text-2xl font-bold">{totalReferrals}</p>
        </div>
        
        <div className="stat-box text-center">
          <p className="text-lg">Earned OPE</p>
          <p className="text-2xl font-bold">{earnedTokens}</p>
        </div>
      </div>

      {address && (
        <div className="w-full">
          <p className="font-bold mb-2">Your Referral Link:</p>
          <div className="bg-[#632667] rounded px-4 py-2 break-all">
            {referralLink}
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              className="bg-[#632667] text-white rounded px-6 py-2 hover:opacity-90"
              onClick={handleCopy}
            >
              Copy Link
            </button>
            
            <button 
              className="bg-[#632667] text-white rounded px-6 py-2 hover:opacity-90"
              onClick={handleShare}
            >
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Referrals;

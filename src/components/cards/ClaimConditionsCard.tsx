import { useTranslation } from "react-i18next";
import { defineChain, getContract, readContract } from "thirdweb";
import { client } from "../../client";
import { useEffect, useState } from "react";
import { formatEther } from "ethers";

interface ClaimCondition {
  startTimestamp: bigint;
  maxClaimableSupply: bigint;
  supplyClaimed: bigint;
  quantityLimitPerWallet: bigint;
  merkleRoot: `0x${string}`;
  pricePerToken: bigint;
  currency: string;
  metadata: string;
}

const contract = getContract({
  client,
  chain: defineChain(56),
  address: "0x3c1641A0de76B550C26D25d7f8ee3Ca19966E981",
});

export function ClaimConditionsCard() {
  const { t } = useTranslation();
  const [claimCondition, setClaimCondition] = useState<ClaimCondition | null>(null);

  useEffect(() => {
    async function fetchClaimCondition() {
      try {
        const activeConditionId = await readContract({
          contract,
          method: "function claimCondition() view returns (uint256 currentStartId, uint256 count)",
          params: [],
        });

        if (activeConditionId) {
          const condition = await readContract({
            contract,
            method: "function getClaimConditionById(uint256 _conditionId) view returns ((uint256 startTimestamp, uint256 maxClaimableSupply, uint256 supplyClaimed, uint256 quantityLimitPerWallet, bytes32 merkleRoot, uint256 pricePerToken, address currency, string metadata) condition)",
            params: [activeConditionId[0]],
          });
          setClaimCondition(condition as unknown as ClaimCondition);
        }
      } catch (error) {
        console.error("Error fetching claim condition:", error);
      }
    }

    fetchClaimCondition();
  }, []);

  if (!claimCondition) return null;

  return (
    <div className="bg-purple-800/30 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-2">{t("Claim Conditions")}</h3>
      <div className="space-y-2">
        <p className="text-3xl font-bold">
          {claimCondition.pricePerToken ? formatEther(claimCondition.pricePerToken) : "0"} USDT
        </p>
        <div className="text-sm text-gray-300">
          <p>{t("Total Supply")}: {claimCondition.maxClaimableSupply.toString()}</p>
          <p>{t("Claimed")}: {claimCondition.supplyClaimed.toString()}</p>
          <p>{t("Available")}: {
            (claimCondition.maxClaimableSupply - claimCondition.supplyClaimed).toString()
          }</p>
        </div>
      </div>
    </div>
  );
} 
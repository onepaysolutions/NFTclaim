import { useTranslation } from "react-i18next";
import { defineChain, getContract, readContract } from "thirdweb";
import { client } from "../../client";
import { useEffect, useState } from "react";

interface NFTInfoCardProps {
  address?: string;
}

const contract = getContract({
  client,
  chain: defineChain(56),
  address: "0x3c1641A0de76B550C26D25d7f8ee3Ca19966E981",
});

export function NFTInfoCard({ address }: NFTInfoCardProps) {
  const { t } = useTranslation();
  const [balance, setBalance] = useState<bigint | null>(null);
  
  useEffect(() => {
    async function fetchBalance() {
      if (!address) return;
      try {
        const nftBalance = await readContract({
          contract,
          method: "function balanceOf(address owner) view returns (uint256)",
          params: [address],
        });
        setBalance(nftBalance);
      } catch (error) {
        console.error("Error fetching NFT balance:", error);
      }
    }

    fetchBalance();
  }, [address]);

  return (
    <div className="bg-purple-800/30 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-2">{t("Your NFTs")}</h3>
      <p className="text-3xl font-bold">{balance?.toString() || "0"}</p>
    </div>
  );
} 
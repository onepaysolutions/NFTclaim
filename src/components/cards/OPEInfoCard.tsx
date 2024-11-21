import { useTranslation } from "react-i18next";
import { defineChain, getContract, readContract } from "thirdweb";
import { client } from "../../client";
import { useEffect, useState } from "react";

interface OPEInfoCardProps {
  address?: string;
}

const contract = getContract({
  client,
  chain: defineChain(56),
  address: "0xd73250B2e1B744d18709f530dC91345dFCB51Eb2",
});

export function OPEInfoCard({ address }: OPEInfoCardProps) {
  const { t } = useTranslation();
  const [balance, setBalance] = useState<bigint | null>(null);
  
  useEffect(() => {
    async function fetchBalance() {
      if (!address) return;
      try {
        const opeBalance = await readContract({
          contract,
          method: "function balanceOf(address account) view returns (uint256)",
          params: [address],
        });
        setBalance(opeBalance);
      } catch (error) {
        console.error("Error fetching OPE balance:", error);
      }
    }

    fetchBalance();
  }, [address]);

  return (
    <div className="bg-purple-800/30 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-2">{t("OPE Balance")}</h3>
      <p className="text-3xl font-bold">
        {balance ? Number(balance) / 10**18 : "0"} OPE
      </p>
    </div>
  );
} 
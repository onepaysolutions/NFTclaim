import { NFTContract } from "@/utils/contracts";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useActiveAccount, useReadContract } from "thirdweb/react";

interface UserStats {
  totalUsers: number;
  paid: number;
  colorIndicator: "green" | "yellow";
  positionOptions: string[];
}

interface StatisticsSectionProps {
  stats: UserStats[];
}

const Indicator: React.FC<{ amount: number, id: number }> = ({ amount, id }) => (
  <div
    className={`w-6 h-6 rounded-full mr-3 ${
      amount >= id ? "bg-green-500" : "bg-yellow-500"
    }`}
  />
);

const StatisticsCard: React.FC<{ stats: UserStats; index: number }> = ({
  stats,
  index,
}) => {
  const { t } = useTranslation();
  const address = useActiveAccount();

  // Get NFT balance for user
  const { data: nftBalance } = useReadContract({
    contract: NFTContract,
    method: "balanceOf",
    params: address ? [address.address] : ["0x0000000000000000000000000000000000000000"]
  });

  // Get total NFTs minted
  const { data: totalSupply } = useReadContract({
    contract: NFTContract,
    method: "getClaimConditionById",
    params: [0n]
  });

  return (
    <div className="w-[45%] lg:w-[20%] flex flex-col items-center justify-center rounded-lg m-2 overflow-visible">
      <div className="w-full h-44 text-2xl font-semibold text-center bg-[#632667] rounded-lg px-2 py-4 flex flex-col justify-between relative">
        <div className="absolute flex flex-row top-2 justify-between w-full">
          <div className="w-6 h-6 border border-white flex items-center justify-center text-sm font-semibold rounded-md">
            <p className="text-white">{index}</p>
          </div>
          <Indicator amount={nftBalance ? Number(nftBalance) : 0} id={index - 1}/>
        </div>
        <div className="mt-8 text-white">
          <div className="text-lg font-normal">{t("Total NFTs")}</div>
          <div className="text-3xl font-bold">{totalSupply ? totalSupply.toString() : "0"}</div>
        </div>
      </div>
    </div>
  );
};

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ stats }) => {
  const { t } = useTranslation();

  return (
    <div className="StatisticsSection mt-20 flex flex-col items-center">
      <h1 className="w-full text-2xl font-bold mb-4 flex flex-col items-start">
        <span>{t("Statistics")}</span>
      </h1>
      <div className="flex flex-wrap justify-center">
        {stats.map((stat, index) => (
          <StatisticsCard key={index} stats={stat} index={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection;

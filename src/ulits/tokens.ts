// Token distribution utility for handling OPE token rewards
import { NFTRewardContract } from "./contracts";
import { prepareContractCall, sendTransaction, waitForReceipt } from "thirdweb";
import { client } from "@/client";
import { chain } from "@/chain";
import { useActiveAccount } from "thirdweb/react";

export const distributeTokens = async (claimer: string, referrer: string) => {
  const account = useActiveAccount();
  
  try {
    if (!account) throw new Error("No wallet connected");

    // Call NFTReward contract to distribute tokens
    const rewardTx = prepareContractCall({
      contract: NFTRewardContract,
      method: "distributeRewards",
      params: [claimer, referrer]
    });

    const { transactionHash } = await sendTransaction({
      transaction: rewardTx,
      account: account
    });

    await waitForReceipt({
      client,
      chain,
      transactionHash
    });

  } catch (error) {
    console.error("Token distribution failed:", error);
    throw error;
  }
}; 
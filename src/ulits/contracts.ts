import { getContract } from "thirdweb/contract";
import { NFTAbi } from "./abis/NFTAbi";
import { OPEAbi } from "./abis/OPEAbi";
import { NFTReward } from "./abis/NFTReward";
import { createThirdwebClient } from "thirdweb";
import { bsc } from "thirdweb/chains";

// 创建 thirdweb 客户端
const client = createThirdwebClient({
  clientId: import.meta.env.VITE_TEMPLATE_CLIENT_ID,
});

// Contract addresses
export const USDTAddress = "0x31B4245d9f88DA6Fa01A14398adA46b177c7F2ba";
export const NFTAddress = "0x3c1641A0de76B550C26D25d7f8ee3Ca19966E981";
export const OPEAddress = "0xd73250B2e1B744d18709f530dC91345dFCB51Eb2";
export const NFTRewardAddress = "0x8FB373e4744AaeC31413effca98f241b33181A67";
export const PaymentAddress = "0xC746caacB60cA0043994e64cDDE57f318765a9Eb";

// NFT Contract
export const NFTContract = getContract({
  address: NFTAddress,
  abi: NFTAbi,
  client,
  chain: bsc,
});

// OPE Token Contract
export const OPEContract = getContract({
  address: OPEAddress,
  abi: OPEAbi,
  client,
  chain: bsc,
});

// NFT Reward Contract
export const NFTRewardContract = getContract({
  address: NFTRewardAddress,
  abi: NFTReward,
  client,
  chain: bsc,
});

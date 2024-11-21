import { defineChain } from "thirdweb";

export const chain = defineChain({
  id: Number(process.env.VITE_CHAIN_ID),
  // 其他必要的链配置...
});
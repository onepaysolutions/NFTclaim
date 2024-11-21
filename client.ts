import { createThirdwebClient } from "thirdweb";

const clientId = process.env.VITE_TEMPLATE_CLIENT_ID;
const secretKey = process.env.VITE_TEMPLATE_SECRET_KEY ?? "";

export const client = createThirdwebClient({
  clientId: clientId,
  secretKey: secretKey,
});

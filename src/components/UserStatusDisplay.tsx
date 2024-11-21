import { useTranslation } from "react-i18next";
import { useActiveAccount } from "thirdweb/react";

export function UserStatusDisplay() {
  const { t } = useTranslation();
  const account = useActiveAccount();

  if (!account) {
    return null;
  }

  return (
    <div className="bg-purple-800/30 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">{t("Your Status")}</h2>
      
      <div className="grid gap-6">
        {/* 注册状态 */}
        <div className="flex items-center justify-between">
          <span>{t("Registration")}</span>
          <span className="text-green-400">
            {t("Connected")} ✓
          </span>
        </div>

        {/* NFT 认领状态 */}
        <div className="flex items-center justify-between">
          <span>{t("NFT Claim")}</span>
          <span className="text-gray-400">{t("Not Claimed")} ✗</span>
        </div>

        {/* OPE 奖励状态 */}
        <div className="flex items-center justify-between">
          <span>{t("OPE Rewards")}</span>
          <span className="text-gray-400">{t("Not Received")} ✗</span>
        </div>
      </div>
    </div>
  );
} 
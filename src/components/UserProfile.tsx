import { useTranslation } from "react-i18next";
import { useActiveAccount } from "thirdweb/react";
import { InfoSlider } from './InfoSlider';

export function UserProfile() {
  const { t } = useTranslation();
  const account = useActiveAccount();

  if (!account) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">{t("Please connect your wallet")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 信息卡片 */}
      <InfoSlider address={account.address} />

      {/* 推荐链接部分 */}
      <div className="bg-purple-900/30 rounded-2xl p-8 backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-6">{t("Your Referral Link")}</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={`${window.location.origin}?REF=${account.address}`}
            readOnly
            aria-label="Referral Link"
            title="Your referral link"
            className="flex-1 bg-black/30 rounded-lg px-4 py-2"
          />
          <button 
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}?REF=${account.address}`);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
          >
            {t("Copy")}
          </button>
        </div>
      </div>
    </div>
  );
} 
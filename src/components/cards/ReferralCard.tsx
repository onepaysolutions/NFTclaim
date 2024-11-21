import { useTranslation } from "react-i18next";

interface ReferralCardProps {
  referralCount: number;
}

export function ReferralCard({ referralCount }: ReferralCardProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-purple-800/30 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-2">{t("Total Referrals")}</h3>
      <p className="text-3xl font-bold">{referralCount}</p>
    </div>
  );
} 